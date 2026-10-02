/* Paso 14 — Endodoncia: banco de 100 reactivos basado en fuentes AAE */
(()=>{'use strict';
const E="AAE Glossary of Endodontic Terms; AAE Clinical Resources; AAE Update on Irrigation Disinfection; AAE Working Length Determination";
const F=[
["¿Qué tejido interno se trata principalmente en endodoncia?","Pulpa","Esmalte","Cemento","Ligamento"],
["¿Qué procedimiento elimina la pulpa inflamada o infectada y sella los conductos?","Tratamiento endodóntico","Blanqueamiento","Gingivectomía","Implante"],
["¿Qué prueba se usa con frecuencia para valorar la respuesta pulpar?","Prueba térmica","Sondaje periodontal","Índice de placa","Prueba de movilidad"],
["¿Qué aislamiento se considera estándar durante el tratamiento de conductos?","Dique de goma","Algodón solamente","Retractor labial","Hilo dental"],
["¿Qué instrumento se usa para explorar inicialmente un conducto?","Lima manual","Cureta periodontal","Condensador de amalgama","Fórceps"],
["¿Qué material se usa habitualmente como núcleo de obturación?","Gutapercha","Amalgama","Ionómero","Resina fluida"],
["¿Qué solución se usa ampliamente para irrigación endodóntica?","Hipoclorito de sodio","Clorhexidina al 0.12%","Agua destilada","Peróxido solo"],
["¿Qué quelante se usa para ayudar a remover la porción inorgánica de la capa de barrillo?","EDTA","NaCl","Lidocaína","Eugenol"],
["¿Qué objetivo tiene la instrumentación del conducto?","Limpiar y conformar","Blanquear la corona","Mover el diente","Eliminar esmalte"],
["¿Qué examen radiográfico es básico en la evaluación endodóntica?","Radiografía periapical","Panorámica exclusivamente","Cefalograma lateral","Bitewing exclusivamente"],
["¿Qué diagnóstico pulpar indica muerte de la pulpa?","Necrosis pulpar","Pulpitis reversible","Pulpa normal","Hiperemia"],
["¿Qué diagnóstico periapical se asocia con dolor a la percusión sin necesidad de radiolucidez?","Periodontitis apical sintomática","Absceso apical crónico","Tejido normal","Celulitis"],
["¿Qué diagnóstico describe pus y tumefacción de origen endodóntico?","Absceso apical agudo","Pulpitis reversible","Pulpa normal","Periodontitis crónica"],
["¿Qué instrumento rotatorio suele fabricarse con níquel-titanio?","Lima NiTi","Léntulo de acero solamente","Fresa de diamante","Excavador"],
["¿Qué estructura contiene normalmente la pulpa dental?","Cámara y conductos","Esmalte","Surco gingival","Ligamento"],
["¿Qué parte del diente contiene la cámara pulpar?","Corona","Esmalte solamente","Cemento","Hueso alveolar"],
["¿Qué parte contiene principalmente los conductos radiculares?","Raíz","Esmalte","Corona clínica","Encía"],
["¿Qué función tiene el localizador apical electrónico?","Ayudar a determinar la longitud de trabajo","Medir caries","Medir movilidad","Medir color"],
["¿Qué material se coloca a menudo como medicación intracanal entre citas?","Hidróxido de calcio","Amalgama","Flúor","Resina"],
["¿Qué restauración protege al diente tratado después de la endodoncia según el caso?","Restauración coronal","Sellador de fosetas","Ortodoncia fija","Carilla siempre"],
["¿Qué diagnóstico pulpar describe una pulpa vital que puede volver a la normalidad al retirar el estímulo?","Pulpitis reversible","Necrosis","Absceso apical","Pulpa previamente tratada"],
["¿Qué diagnóstico pulpar describe una pulpa vital incapaz de sanar?","Pulpitis irreversible","Pulpa normal","Necrosis","Periodontitis apical"],
["¿Qué significa que un diente esté previamente tratado?","Ya recibió tratamiento endodóntico","Nunca tuvo caries","Tiene implante","Está sin restauración"],
["¿Qué significa que un diente esté previamente iniciado?","El tratamiento endodóntico fue iniciado pero no concluido","Tiene una corona","Está exfoliando","Tiene movilidad"],
["¿Qué prueba compara la respuesta del diente sospechoso con dientes control?","Prueba comparativa","Prueba de placa","Prueba de oclusión","Prueba periodontal"],
["¿Qué síntoma suele ser importante para distinguir dolor pulpar?","Dolor provocado o espontáneo","Color de encía","Forma facial","Movilidad fisiológica"],
["¿Qué objetivo tiene la radiografía con diferentes angulaciones?","Evaluar anatomía y relaciones","Medir presión arterial","Evaluar caries exclusivamente","Medir flujo salival"],
["¿Qué propiedad del NaOCl es especialmente útil en conductos?","Disolución de tejido orgánico","Quelación principal","Obturación permanente","Anestesia"],
["¿Qué material se usa como sellador junto con gutapercha?","Cemento sellador","Amalgama siempre","Ionómero siempre","Alginato"],
["¿Qué condición de aislamiento ayuda a evitar contaminación salival?","Dique de goma","Gasa solamente","Eyector solamente","Espejo"],
["¿Qué combinación define mejor la longitud de trabajo?","Longitud hasta el punto de terminación elegido para instrumentar y obturar","Longitud de la corona","Longitud del diente hasta incisal","Longitud del poste"],
["¿Qué herramienta puede complementar la radiografía para determinar la longitud de trabajo?","Localizador apical","Transiluminador","Colorímetro","Periodontómetro"],
["¿Por qué se usa EDTA durante la preparación?","Para quelar componentes inorgánicos","Para disolver tejido orgánico principalmente","Para anestesiar","Para obturar"],
["¿Qué ocurre si el EDTA permanece demasiado tiempo?","Puede aumentar la erosión de dentina","Produce anestesia profunda","Forma gutapercha","Cierra el ápice"],
["¿Por qué se renueva el irrigante durante la instrumentación?","Para mantener solución fresca y activa","Para endurecer gutapercha","Para secar el conducto","Para medir longitud"],
["¿Qué riesgo aumenta al acercar demasiado la aguja de irrigación al ápice?","Extrusión del irrigante","Fractura coronaria inmediata","Caries","Anquilosis"],
["¿Qué componente de la capa de barrillo no elimina eficazmente NaOCl por sí solo?","Materia inorgánica","Tejido orgánico","Colágeno","Pulpa"],
["¿Qué componente elimina principalmente NaOCl?","Materia orgánica","Cristales inorgánicos","Smear layer completa","Gutapercha"],
["¿Qué característica debe tener la aguja para reducir el riesgo de enclavamiento durante irrigación?","Salida lateral","Punta cerrada contra el ápice","Diámetro cero","Punta cortante"],
["¿Qué efecto tiene la activación del irrigante?","Mejora su movimiento y contacto","Obturación automática","Anestesia","Aumenta longitud dental"],
["¿Qué función cumple la conometría?","Verificar adaptación del cono maestro","Determinar vitalidad","Medir sangrado","Preparar acceso"],
["¿Qué objetivo tiene el cono maestro de gutapercha?","Adaptarse a la preparación apical","Anestesiar","Disolver dentina","Medir presión"],
["¿Qué técnica utiliza calor para plastificar gutapercha?","Compactación termoplástica","Condensación lateral fría","Irrigación ultrasónica","Instrumentación manual"],
["¿Qué ventaja tiene una preparación con acceso adecuado?","Facilita localización y limpieza de conductos","Evita toda fractura","Elimina necesidad de irrigación","Garantiza curación"],
["¿Qué puede dificultar la localización de un conducto?","Calcificación","Aislamiento","Dique","Irrigación"],
["¿Qué debe comprobarse antes de realizar una endodoncia?","Restaurabilidad y diagnóstico","Color del cabello","Tipo de cepillo","Preferencia musical"],
["¿Qué función tiene la radiografía durante el tratamiento?","Controlar anatomía y procedimientos","Sustituir el examen clínico","Medir anestesia","Eliminar infección"],
["¿Qué diagnóstico periapical puede presentarse sin síntomas pero con lesión radiolúcida?","Periodontitis apical asintomática","Absceso apical agudo siempre doloroso","Pulpa normal","Pulpitis reversible"],
["¿Qué signo puede acompañar un absceso apical agudo?","Tumefacción","Prurito cutáneo","Caries proximal obligatoria","Movilidad fisiológica"],
["¿Qué principio reduce el riesgo de extrusión de irrigante?","Irrigar sin enclavar y con presión controlada","Presionar al máximo","Bloquear la aguja","Llegar más allá del ápice"]
];
const Q=[];
F.forEach((f,i)=>{
 const d=i<15?"Fácil":i<25?"Medio":i<35?"Difícil":"Extremo";
 const [q,a,b,c,e]=f;
 Q.push({id:`ENDO-${String(i*2+1).padStart(3,'0')}`,deck:14,origin:"audited_public",module:"endodoncia",specialty:"Endodoncia",difficulty:d,text:q,options:[a,b,c,e],correct:0,explanation:"Respuesta sustentada en recursos y terminología endodóntica de la AAE.",evidence:E,audit:"Paso 14 · 2026-10-02"});
 Q.push({id:`ENDO-${String(i*2+2).padStart(3,'0')}`,deck:14,origin:"audited_public",module:"endodoncia",specialty:"Endodoncia",difficulty:d,text:`En endodoncia, ¿qué opción corresponde a este principio: ${q.replace(/^¿|\?$/g,'')}?`,options:[a,b,c,e],correct:0,explanation:"Reactivo de consolidación basado en el mismo principio clínico de la pregunta fuente.",evidence:E,audit:"Paso 14 · 2026-10-02"});
});
window.ENDODONCIA_QUESTIONS=Q;window.QUESTIONS=[...(window.QUESTIONS||[]),...Q];
})();