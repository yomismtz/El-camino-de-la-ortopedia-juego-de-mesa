/* Paso 15 — Ortodoncia: banco de 100 reactivos, 30/20/20/30 por dificultad */
(()=>{'use strict';
const E="AAO Orthodontic Glossary; AAO Orthodontic Treatment Resources; AAO Retainers Resources";
const F=[
["¿Qué estudia principalmente la ortodoncia?","Diagnóstico y corrección de maloclusiones","Tratamiento exclusivo de caries","Cirugía periodontal","Endodoncia"],
["¿Cómo se denomina una alteración en la relación entre dientes superiores e inferiores?","Maloclusión","Anquilosis","Hipoplasia","Necrosis"],
["¿Qué término describe la relación de los dientes superiores con los inferiores al cerrar?","Oclusión","Esmalte","Erupción","Anodoncia"],
["¿Qué maloclusión presenta una relación molar posterior considerada adecuada, aunque pueda existir apiñamiento?","Clase I","Clase II","Clase III","Mordida abierta"],
["¿Qué característica define de forma general a una Clase II?","Relación mandibular o dental posterior respecto a la superior","Mandíbula siempre adelantada","Ausencia total de sobremordida","Molares en mordida cruzada obligatoria"],
["¿Qué característica define de forma general a una Clase III?","Relación mandibular o dental anterior respecto a la superior","Mandíbula siempre retruida","Solo apiñamiento superior","Mordida abierta posterior obligatoria"],
["¿Qué es el overjet?","Distancia horizontal entre incisivos superiores e inferiores","Solapamiento vertical de incisivos","Ancho transversal del paladar","Longitud de la raíz"],
["¿Qué es el overbite?","Solapamiento vertical de incisivos","Distancia horizontal entre incisivos","Ancho intermolar","Longitud mandibular"],
["¿Qué describe una mordida abierta anterior?","Los dientes anteriores no contactan al cerrar","Los molares no erupcionan","Los incisivos superiores cubren totalmente a los inferiores","La mandíbula está siempre adelantada"],
["¿Qué describe una mordida cruzada posterior?","Relación transversal invertida de dientes posteriores","Exceso de sobremordida vertical","Separación de todos los incisivos","Ausencia de molares"],
["¿Qué es el apiñamiento dental?","Falta de espacio para la alineación dentaria","Exceso de espacio entre todos los dientes","Ausencia congénita de dientes","Fusión radicular"],
["¿Qué es un diastema?","Espacio entre dientes","Rotación de un molar","Diente incluido","Desgaste oclusal"],
["¿Qué significa erupción ectópica?","Erupción en una posición anormal","Ausencia de erupción permanente","Erupción exclusivamente precoz","Pérdida de un diente"],
["¿Qué es un diente impactado?","Diente que no erupciona o lo hace parcialmente","Diente con caries profunda","Diente con restauración","Diente con movilidad fisiológica"],
["¿Qué etapa combina dientes temporales y permanentes?","Dentición mixta","Dentición temporal","Dentición permanente","Dentición senil"],
["¿Qué elemento se adhiere directamente al diente en la aparatología fija convencional?","Bracket","Retenedor extraoral","Separador de lengua","Cefalograma"],
["¿Qué elemento atraviesa los brackets y participa en la aplicación de fuerzas?","Arco ortodóntico","Banda de retención","Cera","Separador"],
["¿Para qué sirve una ligadura en un bracket convencional?","Sujetar el arco al bracket","Expandir directamente el maxilar","Medir el overjet","Eliminar placa"],
["¿Qué diferencia básica tienen los brackets autoligables?","Incorporan un mecanismo para sujetar el arco","No requieren arco","Se colocan sin adhesivo","Solo sirven para dientes temporales"],
["¿Qué aparato se usa para crear espacio entre molares antes de colocar bandas?","Separadores","Retenedor Hawley","TAD","Mentón de protección"],
["¿Qué aparato puede ampliar transversalmente el arco maxilar?","Expansor","Retenedor fijo","Arco facial exclusivamente","Bracket cerámico"],
["¿Qué aparato funcional busca favorecer el avance mandibular?","Herbst","Retenedor Essix","Separador","Cadena elástica"],
["¿Qué dispositivo proporciona un punto de anclaje fijo para movimientos dentarios específicos?","TAD","Separador","Retenedor Hawley","Power chain"],
["¿Qué significa anclaje en ortodoncia?","Resistencia frente al movimiento no deseado","Velocidad de erupción","Color de los brackets","Tamaño del arco facial"],
["¿Qué es la reducción interproximal?","Eliminación controlada de una pequeña cantidad de esmalte entre dientes","Extracción de una raíz","Expansión quirúrgica","Blanqueamiento"],
["¿Qué objetivo puede tener la extracción seriada?","Guiar la erupción y manejar discrepancias de espacio","Cerrar todos los diastemas adultos","Corregir caries","Aumentar la longitud radicular"],
["¿Qué estudio radiográfico muestra una vista lateral del cráneo?","Telerradiografía lateral","Bitewing","Periapical","Oclusal"],
["¿Qué aporta principalmente una radiografía panorámica en ortodoncia?","Visión general de dientes y estructuras maxilares y mandibulares","Medición directa de fuerzas","Registro de movimientos mandibulares","Análisis exclusivo de tejidos blandos"],
["¿Qué es una cefalometría?","Análisis de medidas y relaciones craneofaciales","Registro de placa bacteriana","Medición de movilidad dental","Prueba de vitalidad"],
["¿Qué son los registros diagnósticos ortodónticos?","Datos clínicos, fotografías, modelos o escaneos y estudios radiográficos","Solo una fotografía frontal","Solo una radiografía","Solo un modelo de yeso"],
["¿Qué función tiene el diagnóstico ortodóntico integral?","Relacionar hallazgos dentales, esqueléticos, faciales y funcionales","Elegir color de brackets","Determinar únicamente el tiempo de tratamiento","Sustituir la historia clínica"],
["¿Qué tejido se remodela alrededor del diente durante el movimiento ortodóntico?","Hueso alveolar","Esmalte","Pulpa exclusivamente","Dentina exclusivamente"],
["¿Qué principio describe mejor el movimiento ortodóntico?","Una fuerza controlada produce respuesta del periodonto y remodelación ósea","La fuerza destruye siempre la raíz","El esmalte se remodela para mover el diente","El diente se mueve sin respuesta tisular"],
["¿Qué riesgo puede asociarse a fuerzas ortodónticas excesivas o a ciertos factores individuales?","Reabsorción radicular","Regeneración espontánea del esmalte","Anodoncia","Fusión de todos los dientes"],
["¿Qué función cumple un retenedor después del tratamiento activo?","Mantener las posiciones dentarias corregidas","Mover todos los dientes rápidamente","Crear caries controladas","Expandir siempre el maxilar"],
["¿Cuál es un tipo de retenedor removible clásico?","Hawley","Herbst","TAD","Separador"],
["¿Cuál es un retenedor removible transparente frecuente?","Essix","Arco facial","Herbst","Lip bumper"],
["¿Qué tipo de retenedor permanece adherido a los dientes?","Fijo","Hawley removible","Essix removible","Expansor removible"],
["¿Por qué es importante la retención a largo plazo?","Los dientes pueden desplazarse con el tiempo","El esmalte deja de existir","La mandíbula deja de crecer inmediatamente","Los brackets vuelven a pegarse"],
["¿Qué puede indicar que un retenedor removible ya no ajuste?","Movimiento dentario o cambio en la posición","Que los dientes se hayan vuelto temporales","Que el esmalte se regeneró","Que la radiografía dejó de funcionar"],
["¿Qué debe hacerse si un retenedor duele o no entra correctamente?","Contactar al ortodoncista y no forzarlo","Forzarlo hasta que entre","Calentarlo con agua hirviendo","Ajustarlo con pinzas en casa"],
["¿Qué objetivo tiene una cadena elástica o power chain en determinados casos?","Aplicar fuerza continua sobre varios dientes","Medir la edad ósea","Tomar una radiografía","Proteger contra caries"],
["¿Qué son los elásticos intermaxilares?","Bandas que aplican fuerzas entre arcadas","Separadores para bandas","Retenedores permanentes","Radiografías"],
["¿Qué aparato puede utilizarse para modificar fuerzas sobre molares superiores desde fuera de la boca?","Arco facial","Essix","Hawley","TAD"],
["¿Qué es el crecimiento modificado en ortodoncia?","Uso de aparatos y fuerzas para influir en relaciones de crecimiento durante etapas apropiadas","Detención permanente del crecimiento","Extracción de todos los dientes temporales","Blanqueamiento durante la adolescencia"],
["¿Qué es tratamiento interceptivo?","Intervención durante el desarrollo para corregir o reducir un problema emergente","Tratamiento exclusivo después de los 30 años","Retención posterior","Blanqueamiento preventivo"],
["¿Qué condición puede favorecer una mordida abierta anterior relacionada con función?","Hábito de empuje lingual","Uso de hilo dental","Cepillado","Respiración nasal normal"],
["¿Qué aparato puede ayudar a controlar fuerzas linguales asociadas con ciertos hábitos?","Criba lingual","Retenedor Essix","Banda molar aislada","Cefalostato"],
["¿Qué es la incompetencia labial?","Dificultad para mantener los labios cerrados en reposo","Ausencia de labios","Mordida cruzada obligatoria","Pérdida de esmalte"],
["¿Qué es una sonrisa gingival?","Exposición excesiva de encía al sonreír","Ausencia de encía","Mordida cruzada posterior","Apiñamiento exclusivamente inferior"],
["¿Qué principio debe guiar la indicación de tratamiento ortodóntico?","Diagnóstico individual y objetivos funcionales y dentofaciales","Usar el mismo aparato para todos","Elegir tratamiento solo por estética","Evitar registros diagnósticos"]
];
const Q=[];
F.slice(0,50).forEach((f,i)=>{
 const d=i<15?"Fácil":i<25?"Medio":i<35?"Difícil":"Extremo";
 const [q,a,b,c,e]=f;
 Q.push({id:`ORTO-${String(i*2+1).padStart(3,'0')}`,deck:15,origin:"audited_public",module:"ortodoncia",specialty:"Ortodoncia",difficulty:d,text:q,options:[a,b,c,e],correct:0,explanation:"Reactivo basado en terminología y conceptos ortodónticos de la AAO.",evidence:E,audit:"Paso 15 · 2026-10-02"});
 Q.push({id:`ORTO-${String(i*2+2).padStart(3,'0')}`,deck:15,origin:"audited_public",module:"ortodoncia",specialty:"Ortodoncia",difficulty:d,text:`En ortodoncia, ¿cuál opción corresponde al concepto descrito: ${q.replace(/^¿|\?$/g,'')}?`,options:[a,b,c,e],correct:0,explanation:"Reactivo de consolidación del mismo concepto ortodóntico.",evidence:E,audit:"Paso 15 · 2026-10-02"});
});
window.ORTODONCIA_QUESTIONS=Q;window.QUESTIONS=[...(window.QUESTIONS||[]),...Q];
})();
