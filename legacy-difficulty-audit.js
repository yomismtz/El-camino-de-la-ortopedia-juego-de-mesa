(()=>{
  'use strict';

  const audit='Auditoría pedagógica de dificultad 2026-09-20';

  const general={
    'Básico':[1,3,5,10,12,17,22,27,35,36,42,44,45,47,50,52,55,60,70,72,74,75,76,81,82,84,85,87,88,94,95,96,97,99],
    'Intermedio':[2,4,8,11,13,14,18,20,23,24,28,29,30,33,34,37,41,49,54,56,57,63,64,65,69,71,77,79,80,89,90,91,92],
    'Clínico':[6,7,9,15,16,19,21,25,26,31,32,38,39,40,43,46,48,51,53,58,59,61,62,66,67,68,73,78,83,86,93,98,100]
  };

  const fundamentos={
    'Básico':[
      'FO001','FO002','FO003','FO004','FO005','FO006','FO007','FO008','FO009','FO010',
      'FO011','FO012','FO021','FO022','FO023','FO024','FO025','FO026','FO027','FO029',
      'FO030','FO031','FO033','FO034','FO035','FO036','FO037','FO038','FO039','FO040',
      'FO061','FO062','FO063','FO064','FO070','FO071','FO081','FO082','FO083','FO084'
    ],
    'Clínico':[
      'FO041','FO043','FO044','FO045','FO047','FO048','FO049','FO050','FO053','FO054',
      'FO055','FO056','FO057','FO058','FO059','FO060','FO067','FO069','FO075','FO077'
    ]
  };

  const steiner={
    'Básico':Array.from({length:34},(_,i)=>'ST'+String(i+1).padStart(3,'0')),
    'Intermedio':Array.from({length:33},(_,i)=>'ST'+String(i+35).padStart(3,'0')),
    'Clínico':Array.from({length:33},(_,i)=>'ST'+String(i+68).padStart(3,'0'))
  };

  function applyMap(bank,map){
    if(!Array.isArray(bank))return;
    const lookup=new Map();
    Object.entries(map).forEach(([difficulty,ids])=>ids.forEach(id=>lookup.set(String(id),difficulty)));
    bank.forEach(q=>{
      const d=lookup.get(String(q.id));
      if(d){
        q.difficulty=d;
        q.difficultyAudit=audit;
      }
    });
  }

  applyMap(window.QUESTIONS,general);

  if(Array.isArray(window.FUNDAMENTOS_OCLUSION)){
    const explicit=new Map();
    Object.entries(fundamentos).forEach(([difficulty,ids])=>ids.forEach(id=>explicit.set(id,difficulty)));
    window.FUNDAMENTOS_OCLUSION.forEach(q=>{
      const d=explicit.get(String(q.id))||'Intermedio';
      q.difficulty=d;
      q.difficultyAudit=audit;
    });
  }

  applyMap(window.STEINER_QUESTIONS,steiner);
})();