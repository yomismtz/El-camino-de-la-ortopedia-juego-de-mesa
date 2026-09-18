import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pg from 'pg';
import crypto from 'crypto';

const { Pool } = pg;
const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL || '';
const allowed = new Set((process.env.ALLOWED_ORIGINS || 'https://yomismtz.github.io,http://localhost,capacitor://localhost').split(',').map(x=>x.trim()).filter(Boolean));
const codeAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const memory = new Map();
const pool = DATABASE_URL ? new Pool({connectionString:DATABASE_URL,ssl:process.env.PGSSL==='disable'?false:{rejectUnauthorized:false}}) : null;

app.set('trust proxy', 1);
app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));
app.use(cors({
  origin(origin, cb){
    if(!origin) return cb(null,true);
    if(allowed.has(origin) || origin.startsWith('http://localhost:')) return cb(null,true);
    cb(new Error('Origin not allowed'));
  },
  methods:['GET','POST','PATCH','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));
app.use(express.json({limit:'256kb'}));

const publishLimiter=rateLimit({windowMs:60*60*1000,limit:30,standardHeaders:'draft-8',legacyHeaders:false});
const readLimiter=rateLimit({windowMs:60*1000,limit:180,standardHeaders:'draft-8',legacyHeaders:false});

function normalizeCode(value){return String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6)}
function newCode(){let s='';for(let i=0;i<6;i++)s+=codeAlphabet[crypto.randomInt(codeAlphabet.length)];return s}
function newToken(){return crypto.randomBytes(32).toString('base64url')}
function tokenHash(token){return crypto.createHash('sha256').update(String(token||'')).digest('hex')}
function validateActivity(input){
  const title=String(input?.title||'').trim().slice(0,80);
  const instructions=String(input?.instructions||'').trim().slice(0,500);
  const qs=Array.isArray(input?.questions)?input.questions:[];
  if(!title) throw new Error('La actividad necesita título.');
  if(qs.length<1 || qs.length>200) throw new Error('La actividad debe contener entre 1 y 200 preguntas.');
  const questions=qs.map((q,idx)=>{
    const text=String(q?.text||'').trim().slice(0,500);
    const options=(Array.isArray(q?.options)?q.options:[]).map(x=>String(x||'').trim().slice(0,220)).filter(Boolean).slice(0,4);
    const correct=Number(q?.correct);
    const explanation=String(q?.explanation||'').trim().slice(0,500);
    if(!text) throw new Error('La pregunta '+(idx+1)+' está vacía.');
    if(options.length<2) throw new Error('La pregunta '+(idx+1)+' necesita al menos dos opciones.');
    if(!Number.isInteger(correct)||correct<0||correct>=options.length) throw new Error('La pregunta '+(idx+1)+' no tiene una respuesta correcta válida.');
    return {id:String(q?.id||idx+1).slice(0,80),text,options,correct,explanation};
  });
  return {title,instructions,questions};
}
async function ensureDb(){
  if(!pool) return;
  await pool.query(`CREATE TABLE IF NOT EXISTS teacher_sessions (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(6) UNIQUE NOT NULL,
    title VARCHAR(80) NOT NULL,
    instructions VARCHAR(500) NOT NULL DEFAULT '',
    questions JSONB NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    admin_token_hash CHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
}
async function codeExists(code){
  if(pool){const r=await pool.query('SELECT 1 FROM teacher_sessions WHERE code=$1',[code]);return r.rowCount>0}
  return memory.has(code);
}
async function createSession(activity, hash){
  let code;
  do{code=newCode()}while(await codeExists(code));
  if(pool){
    await pool.query('INSERT INTO teacher_sessions(code,title,instructions,questions,active,admin_token_hash) VALUES($1,$2,$3,$4::jsonb,TRUE,$5)',[code,activity.title,activity.instructions,JSON.stringify(activity.questions),hash]);
  }else{
    memory.set(code,{...activity,active:true,admin_token_hash:hash,created_at:new Date().toISOString()});
  }
  return code;
}
async function getSession(code){
  if(pool){
    const r=await pool.query('SELECT code,title,instructions,questions,active,created_at FROM teacher_sessions WHERE code=$1',[code]);
    return r.rows[0]||null;
  }
  const x=memory.get(code); return x?{code,...x}:null;
}
async function setActive(code,hash,active){
  if(pool){
    const r=await pool.query('UPDATE teacher_sessions SET active=$1,updated_at=NOW() WHERE code=$2 AND admin_token_hash=$3 RETURNING code,active',[active,code,hash]);
    return r.rows[0]||null;
  }
  const x=memory.get(code); if(!x||x.admin_token_hash!==hash)return null; x.active=active; return {code,active};
}
async function deleteSession(code,hash){
  if(pool){
    const r=await pool.query('DELETE FROM teacher_sessions WHERE code=$1 AND admin_token_hash=$2 RETURNING code',[code,hash]);
    return r.rows[0]||null;
  }
  const x=memory.get(code); if(!x||x.admin_token_hash!==hash)return null; memory.delete(code); return {code};
}

app.get('/health',async(_req,res)=>{
  try{
    if(pool) await pool.query('SELECT 1');
    res.json({ok:true,persistence:pool?'postgres':'memory'});
  }catch{res.status(503).json({ok:false})}
});

app.post('/api/sessions',publishLimiter,async(req,res)=>{
  try{
    const activity=validateActivity(req.body?.activity);
    const adminToken=newToken();
    const code=await createSession(activity,tokenHash(adminToken));
    res.status(201).json({code,adminToken,active:true,title:activity.title});
  }catch(e){res.status(400).json({error:e.message||'No se pudo publicar la actividad.'})}
});

app.get('/api/sessions/:code',readLimiter,async(req,res)=>{
  try{
    const code=normalizeCode(req.params.code);
    if(code.length!==6)return res.status(400).json({error:'Código inválido.'});
    const s=await getSession(code);
    if(!s)return res.status(404).json({error:'No existe una actividad con ese código.'});
    if(!s.active)return res.status(410).json({error:'Este código ya no está activo.'});
    res.json({code:s.code,title:s.title,instructions:s.instructions,questions:s.questions,active:true});
  }catch{res.status(500).json({error:'Error al consultar la actividad.'})}
});

app.patch('/api/sessions/:code',publishLimiter,async(req,res)=>{
  try{
    const code=normalizeCode(req.params.code);
    const token=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(!token)return res.status(401).json({error:'Falta autorización docente.'});
    const active=Boolean(req.body?.active);
    const result=await setActive(code,tokenHash(token),active);
    if(!result)return res.status(403).json({error:'No se pudo administrar este código.'});
    res.json(result);
  }catch{res.status(500).json({error:'No se pudo actualizar la actividad.'})}
});

app.delete('/api/sessions/:code',publishLimiter,async(req,res)=>{
  try{
    const code=normalizeCode(req.params.code);
    const token=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(!token)return res.status(401).json({error:'Falta autorización docente.'});
    const result=await deleteSession(code,tokenHash(token));
    if(!result)return res.status(403).json({error:'No se pudo eliminar este código.'});
    res.json({deleted:true,code});
  }catch{res.status(500).json({error:'No se pudo eliminar la actividad.'})}
});

await ensureDb();
app.listen(PORT,'0.0.0.0',()=>console.log('Ortopedia Dental online API listening on '+PORT+(pool?' with Postgres':' with memory fallback')));
