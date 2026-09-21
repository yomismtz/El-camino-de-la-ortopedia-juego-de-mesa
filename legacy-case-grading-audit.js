(()=>{
  'use strict';

  const audit='Auditoría de gradación clínica 2026-09-20';

  const GOOD={
    FOC01:'Hallazgo fisiológico; conviene documentarlo en controles',
    FOC02:'Etapa de transición entre dentición temporal y permanente',
    FOC03:'Separación posterior compatible con guía anterior efectiva',
    FOC04:'Desoclusión del lado de trabajo mediada por el canino',
    FOC05:'Contacto compartido de varios dientes del lado de trabajo',
    FOC06:'Revisar distribución de cargas tras perder soporte posterior',
    FOC07:'Patrón con lateralidad masticatoria reducida',
    FOC08:'Preferencia unilateral que requiere buscar una causa',
    FOC09:'Componente voluntario de transporte oral del bolo',
    FOC10:'Mecanismo de protección nasofaríngea durante la deglución',
    FOC11:'Patrón compatible con función respiratoria nasal',
    FOC12:'Coordinación funcional propia de la alimentación del lactante',
    FOC13:'Valorar permeabilidad nasal y postura orofacial',
    FOC14:'Alteración del balance muscular de labios y región perioral',
    FOC15:'Coordinar valoración dental, funcional y de vía aérea',
    FOC16:'Derivar si se sospecha obstrucción de la vía aérea',
    FOC17:'Coordinación entre disciplinas según el hallazgo funcional',
    FOC18:'Buscar interferencia o causa de la preferencia unilateral',
    FOC19:'Contexto nocturno asociado al inicio de la conducta',
    FOC20:'Conducta cada vez más automática por repetición',
    FOC21:'Sustitución por una respuesta alternativa incompatible',
    FOC22:'Número de episodios por unidad de tiempo',
    FOC23:'Tiempo mantenido en cada episodio',
    FOC24:'Magnitud de la fuerza aplicada',
    FOC25:'Renovación localizada del tejido óseo',
    FOC26:'Cambio de forma por formación y resorción en superficies distintas',
    FOC27:'Formación ósea sin precursor cartilaginoso',
    FOC28:'Formación ósea sobre un molde cartilaginoso',
    FOC29:'Predominio temprano del patrón de crecimiento neural',
    FOC30:'Aceleración somática propia del pico puberal',

    STC01:'ANB aumentado con SNB reducido',
    STC02:'ANB aumentado con SNA elevado',
    STC03:'El maxilar adelantado contribuye al patrón Clase II',
    STC04:'ANB negativo con SNA disminuido',
    STC05:'ANB negativo con SNB aumentado',
    STC06:'Hay contribución maxilar y mandibular al patrón Clase III',
    STC07:'ANB alrededor de 2° sin discrepancia sagital marcada',
    STC08:'ANB aislado cercano a referencia, pero ambas bases están retruidas',
    STC09:'ANB cercano a referencia, con ambas bases adelantadas',
    STC10:'El ANB elevado es coherente con Clase II y debe integrarse con SNB',
    STC11:'El ANB negativo es coherente con Clase III y debe integrarse con SNA',
    STC12:'Comparar ANB con Wits, perfil y trazado antes de concluir',
    STC13:'SN-GoGn por encima de referencia sugiere patrón vertical',
    STC14:'SN-GoGn reducido sugiere un patrón más horizontal',
    STC15:'ANB aumentado y SN-GoGn elevado alteran dos dimensiones',
    STC16:'ANB negativo apoya Clase III y SN-GoGn alto añade componente vertical',
    STC17:'Mayor inclinación del plano oclusal respecto a SN',
    STC18:'Menor inclinación del plano oclusal respecto a SN',
    STC19:'Corroborar ANB con otras medidas por la geometría del plano oclusal',
    STC20:'SN-GoGn alto respalda un patrón vertical',
    STC21:'SN-GoGn bajo respalda un patrón horizontal',
    STC22:'Relación sagital cercana a referencia; la discrepancia principal es vertical',
    STC23:'Relación sagital cercana y baja divergencia vertical',
    STC24:'SN-GoGn aporta información vertical complementaria al ANB',
    STC25:'Ambas medidas incisivas superiores están aumentadas',
    STC26:'Ambas medidas incisivas superiores están reducidas',
    STC27:'Ambas medidas incisivas inferiores están aumentadas',
    STC28:'Ambas medidas incisivas inferiores están reducidas',
    STC29:'La proclinación superior y retroinclinación inferior sugieren compensación',
    STC30:'La retroinclinación superior y proclinación inferior sugieren compensación',
    STC31:'Ángulo interincisal reducido con inclinaciones incisivas aumentadas',
    STC32:'Ángulo interincisal aumentado con inclinaciones incisivas reducidas',
    STC33:'La medida lineal está aumentada aunque la angular esté en referencia',
    STC34:'La medida lineal está aumentada aunque la angular esté en referencia',
    STC35:'ANB cercano a referencia no excluye protrusión dentoalveolar',
    STC36:'Revisar al menos límites periodontales y espacio antes de extraer',
    STC37:'El labio está adelantado respecto a la línea S',
    STC38:'El labio está por detrás de la línea S',
    STC39:'Ambos labios se encuentran por delante de la línea S',
    STC40:'Ambos labios se encuentran por detrás de la línea S',
    STC41:'Relación sagital cercana puede coexistir con protrusión de tejidos blandos',
    STC42:'SNB reducido explica el componente mandibular; el incisivo inferior compensa',
    STC43:'SNA reducido explica el componente maxilar; el incisivo superior compensa',
    STC44:'ANB cercano no implica que ambas bases estén en posición de referencia',
    STC45:'ANB cercano puede coexistir con retrusión de ambas bases',
    STC46:'SN-GoGn elevado concuerda con mordida abierta y patrón vertical',
    STC47:'SN-GoGn reducido concuerda con sobremordida y patrón horizontal',
    STC48:'ANB 0° por sí solo no basta; Wits y perfil deben integrarse',
    STC49:'Una diferencia de 1° puede reflejar localización distinta de puntos',
    STC50:'Comparar ambos trazados y verificar la identificación de puntos',
    STC51:'Las normas poblacionales pueden complementar la referencia clásica',
    STC52:'Es posible si el crecimiento modifica diferencialmente las bases',
    STC53:'Si SNA y SNB cambian igual, ANB puede mantenerse',
    STC54:'Revisar geometría y medidas complementarias antes de clasificar',
    STC55:'Considerar la inclinación del plano oclusal al interpretar ANB',
    STC56:'No necesariamente; el resultado debe juzgarse con objetivos individualizados',
    STC57:'Integrar límites alveolares y periodontales antes de proclinar más',
    STC58:'Valores de referencia útiles, no metas obligatorias',
    STC59:'La medición sagital se acercó a un valor menos aumentado',
    STC60:'La medición sagital se hizo menos negativa',

    FFC01:'Confirmar y tratar el dolor izquierdo como factor contribuyente',
    FFC02:'Buscar interferencias o discrepancias transversales además del patrón funcional',
    FFC03:'Existe lateralidad masticatoria reducida',
    FFC04:'La dureza del alimento puede aumentar ciclos y esfuerzo masticatorio',
    FFC05:'La prótesis puede reducir la trituración y requiere ajuste',
    FFC06:'Mejillas y labios colaboran en contener y dirigir el bolo',
    FFC07:'La lengua participa en posicionar y transportar el alimento',
    FFC08:'La lubricación salival facilita cohesión y transporte del bolo',
    FFC09:'Eliminar el dolor y después reevaluar la unilateralidad',
    FFC10:'Explorar oclusión y musculatura antes de indicar tratamiento',
    FFC11:'Corresponde al componente voluntario de transporte oral del bolo',
    FFC12:'La protección de vía aérea caracteriza la fase faríngea',
    FFC13:'Valorar tránsito esofágico si la sensación aparece después de la faringe',
    FFC14:'La relación puede ser bidireccional y multifactorial',
    FFC15:'La lengua puede adaptarse al espacio anterior existente',
    FFC16:'Integrar oclusión, postura lingual, respiración y hábitos',
    FFC17:'Coordinar evaluación dental, miofuncional y de vía aérea',
    FFC18:'El esfuerzo perioral excesivo puede acompañar deglución alterada',
    FFC19:'Una rejilla puede ser coadyuvante, no una solución universal',
    FFC20:'Mejorar postura y coordinación lingual durante la deglución',
    FFC21:'La tos con líquidos merece valorar seguridad de la deglución',
    FFC22:'Mantener seguimiento funcional aunque la oclusión haya mejorado',
    FFC23:'La maloclusión puede contribuir sin ser la única causa',
    FFC24:'Evaluación de habla y articulación por fonoaudiología',
    FFC25:'La corrección oclusal puede ayudar, pero no garantiza resolver el sigmatismo',
    FFC26:'Evaluar articulación y posición lingual durante el fonema',
    FFC27:'La congestión puede modificar temporalmente la resonancia',
    FFC28:'Es posible porque maloclusión y habla no guardan relación determinista',
    FFC29:'Coordinar evaluación ortodóncica y del habla antes de prometer corrección',
    FFC30:'Evaluar función lingual durante la articulación de esos fonemas',
    FFC31:'Valorar permeabilidad nasal y síntomas antes de atribuirlo a hábito',
    FFC32:'El cuadro requiere tamizaje respiratorio del sueño y derivación apropiada',
    FFC33:'Los datos aumentan sospecha, pero no confirman apnea',
    FFC34:'La obstrucción estacional puede explicar un patrón oral transitorio',
    FFC35:'La valoración por ORL es razonable ante obstrucción estructural conocida',
    FFC36:'La postura lingual baja puede coexistir sin demostrar causalidad',
    FFC37:'Valorar primero la permeabilidad nasal antes de exigir respiración nasal',
    FFC38:'La expansión puede tratar el transversal, pero no es una cura garantizada',
    FFC39:'Observar resolución al ceder el resfriado antes de llamarlo crónico',
    FFC40:'Valorar vía aérea, sellado labial y postura oral',
    FFC41:'Tras excluir obstrucción, considerar un componente funcional',
    FFC42:'Pueden coexistir varios factores; no hay una causa única obligatoria',
    FFC43:'La alimentación coordina succión, deglución y respiración',
    FFC44:'Valorar duración e intensidad del hábito junto con la mordida abierta',
    FFC45:'El chupón persistente se asocia con mayor riesgo de mordida cruzada',
    FFC46:'Usar refuerzo positivo y metas sin avergonzar al niño',
    FFC47:'Comenzar con estrategias conductuales si el niño está motivado',
    FFC48:'Es una forma de hábito de succión labial no nutritiva',
    FFC49:'Relacionar postura labial con incisivos y competencia labial',
    FFC50:'El efecto esperado es dentoalveolar, no crecimiento mandibular garantizado',
    FFC51:'Se ha descrito como posible efecto adverso y requiere seguimiento',
    FFC52:'La respuesta varía y la certeza de la evidencia es limitada',
    FFC53:'Puede considerarse aparato funcional en pacientes seleccionados y en crecimiento',
    FFC54:'El tiempo de uso y la cooperación condicionan la respuesta',
    FFC55:'La fase de crecimiento es relevante para el momento terapéutico',
    FFC56:'Puede haber cambios variables, sin garantía de crecimiento permanente',
    FFC57:'La evaluación miofuncional puede complementar la ortodoncia',
    FFC58:'Valorar articulación y adaptación antes de asumir resolución espontánea',
    FFC59:'Motivación y cooperación son fundamentales antes de aparatología',
    FFC60:'Integrar diagnóstico etiológico y funcional antes de intervenir'
  };

  const EXTRA={
    STC52:['No puede cambiar nunca durante crecimiento','Solo puede cambiar tras cirugía'],
    STC53:['ANB siempre cambia aunque SNA y SNB cambien igual','Los ángulos no pueden modificarse'],
    STC56:['Sí, cualquier desviación de la norma es fracaso','Sí, siempre debe alcanzarse el valor clásico'],
    FFC28:['La ausencia de alteración del habla descarta maloclusión','Toda maloclusión severa produce dislalia'],
    FFC33:['El paladar estrecho confirma apnea','Respirar por boca confirma apnea'],
    FFC51:['Es imposible que cambie la inclinación molar','Solo ocurre si el aparato está roto']
  };

  function apply(bank){
    if(!Array.isArray(bank))return;
    bank.forEach(c=>{
      const good=GOOD[c.id];if(!good)return;
      c.options=[...(c.options||[])];
      c.grades=[...(c.grades||[])];
      c.feedback=[...(c.feedback||[])];
      while(c.options.length<4){
        const extras=EXTRA[c.id]||[];
        c.options.push(extras[c.options.length-2]||'Interpretación no sustentada por los datos');
        c.grades.push('incorrect');
        c.feedback.push('Esta alternativa no está sustentada por los datos del caso.')
      }
      while(c.feedback.length<c.options.length)c.feedback.push('Esta alternativa no es la interpretación principal del caso.');
      let excellent=c.grades.indexOf('excellent');
      if(excellent<0)excellent=0;
      c.grades=c.options.map((_,i)=>i===excellent?'excellent':'incorrect');
      const goodIndex=(excellent+1)%c.options.length;
      c.options[goodIndex]=good;
      c.grades[goodIndex]='good';
      c.feedback[goodIndex]='Es una respuesta clínicamente defendible y parcialmente adecuada, aunque menos completa o específica que la opción Excelente.';
      c.gradingAudit=audit
    })
  }

  apply(window.FUNDAMENTOS_CASES);
  apply(window.STEINER_CASES);
  apply(window.FISIOLOGIA_FUNCION_CASES);
})();