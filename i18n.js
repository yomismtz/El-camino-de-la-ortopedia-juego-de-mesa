(()=> {
  const KEY='elCaminoDentalLanguage';
  const lang=(localStorage.getItem(KEY)||'es').toLowerCase()==='en'?'en':'es';
  const map=new Map(Object.entries({
    'Personajes':'Characters',
    'Juega y aprueba':'Play and pass',
    'Examen':'Exam',
    'Docentes':'Teachers',
    'Privacidad':'Privacy',
    'Jugar ahora':'Play now',
    '🎲 Jugar ahora':'🎲 Play now',
    '🎲🎲 Juego educativo dental · dos dados':'🎲🎲 Dental learning game · two dice',
    'Aprender odontología jugando.':'Learn dentistry by playing.',
    'Un juego educativo de recorrido circular con 100 casillas, meta en el centro, 800 preguntas y 355 casos clínicos en orden aleatorio, Modo Examen, Modo Docente, partidas locales y desafío contra la computadora.':'A circular-path learning game with 100 spaces, a center goal, 900 questions and 355 clinical cases in random order, Exam Mode, Teacher Mode, local games and a computer challenge.',
    'Jugar ahora →':'Play now →',
    '🎯 Juega y aprueba':'🎯 Play and pass',
    '📝 Modo Examen':'📝 Exam Mode',
    '🎓 Modo Docente':'🎓 Teacher Mode',
    'Política de privacidad':'Privacy policy',
    'preguntas':'questions',
    'casos clínicos':'clinical cases',
    'jugadores':'players',
    'casillas':'spaces',
    'dos dados':'two dice',
    '🎯 5 versiones · 200 reactivos':'🎯 5 versions · 200 items',
    'Juega y aprueba':'Play and pass',
    'Practica con los cinco exámenes: opción múltiple, relación de columnas, verdadero/falso, nomenclatura y casos clínicos integradores. El banco se mezcla para que cada partida sea diferente.':'Practice with the five exams: multiple choice, matching, true/false, nomenclature and integrated clinical cases. The bank is shuffled so each game is different.',
    '🎲 Jugar en el tablero':'🎲 Play on the board',
    '📝 Simular examen':'📝 Simulate exam',
    'Doce personajes, muchos estilos':'Twelve characters, many styles',
    'Privacidad por diseño.':'Privacy by design.',
    'La partida se guarda localmente en tu dispositivo.':'Your game is saved locally on your device.',
    'Leer política':'Read policy',

    '🎲🎲 2 dados · 100 casillas · Meta al centro':'🎲🎲 2 dice · 100 spaces · Goal at the center',
    'Aprender ortopedia dental jugando.':'Learn dentofacial orthopedics by playing.',
    'Forma de 2 a 5 jugadores o equipos. Cada participante elige un personaje distinto y recorre un tablero circular de 100 casillas hasta llegar a la meta.':'Create a game with 2 to 5 players or teams. Each participant chooses a different character and moves through a 100-space circular board to reach the goal.',
    '🧠 800 preguntas':'🧠 900 questions',
    '📋 355 casos clínicos':'📋 355 clinical cases',
    '🤖 Vs computadora':'🤖 Vs computer',
    '🎵 Música + efectos':'🎵 Music + effects',
    '👥 2–5 jugadores':'👥 2–5 players',
    '🏆 Meta 100':'🏆 Goal 100',
    'Módulo de preguntas':'Question module',
    'Fundamentos de la oclusión · 100 preguntas + 30 casos':'Fundamentals of occlusion · 100 questions + 30 cases',
    '🎯 Juega y aprueba · 200 reactivos':'🎯 Play and pass · 200 items',
    'Fisiología + Alteraciones de la función · 100 preguntas + 60 casos':'Physiology + Functional alterations · 100 questions + 60 cases',
    'Crecimiento y desarrollo craneofacial · 100 preguntas + 60 casos':'Craniofacial growth and development · 100 questions + 60 cases',
    'Hábitos y parafunciones · 100 preguntas + 60 casos':'Habits and parafunctions · 100 questions + 60 cases',
    'Cefalometría de Steiner · 100 preguntas + 60 casos':'Steiner cephalometrics · 100 questions + 60 cases',
    'Ortopedia / banco general':'Orthopedics / general bank',
    'Fundamentos de la oclusión':'Fundamentals of occlusion',
    'Nomenclatura y etimología médica':'Medical terminology and etymology',
    '🔤 Nomenclatura y etimología':'🔤 Terminology and etymology',
    '🔤 Nomenclatura y etimología · 100 preguntas':'🔤 Terminology and etymology · 100 questions',
    '🔤 Nomenclatura y etimología médica · 100 preguntas':'🔤 Medical terminology and etymology · 100 questions',
    '🔤 100 preguntas · raíces griegas y latinas':'🔤 100 questions · Greek and Latin roots',
    'Practica prefijos, raíces, sufijos y formación de términos en odontología, especialidades dentales, células, microbiología, patología y medicina general.':'Practice prefixes, roots, suffixes and word formation in dentistry, dental specialties, cells, microbiology, pathology and general medicine.',
    '🎲 Jugar módulo':'🎲 Play module',
    'Fisiología + función':'Physiology + function',
    'Fisiología + Alteraciones de la función':'Physiology + Functional alterations',
    'Crecimiento y desarrollo':'Growth and development',
    'Crecimiento y desarrollo craneofacial':'Craniofacial growth and development',
    'Hábitos y parafunciones':'Habits and parafunctions',
    'Cefalometría de Steiner':'Steiner cephalometrics',
    'Juega y aprueba':'Play and pass',
    'Modo de juego':'Game mode',
    'Jugadores locales':'Local players',
    'Contra la computadora 🤖':'Against the computer 🤖',
    'Dificultad de preguntas':'Question difficulty',
    'Todas':'All',
    'Básico':'Basic',
    'Intermedio':'Intermediate',
    'Clínico':'Clinical',
    'Número de jugadores':'Number of players',
    '2 jugadores':'2 players','3 jugadores':'3 players','4 jugadores':'4 players','5 jugadores':'5 players',
    'Nivel de la computadora':'Computer level',
    'Bajo · ~38% de aciertos':'Low · ~38% accuracy',
    'Medio · ~64% de aciertos':'Medium · ~64% accuracy',
    'Alto · ~86% de aciertos':'High · ~86% accuracy',
    'Súper inteligente · 100% + mejor de 3 tiradas':'Super smart · 100% + best of 3 rolls',
    'Elegir personajes →':'Choose characters →',
    'Continuar partida guardada':'Continue saved game',
    '🎭 Personajes únicos':'🎭 Unique characters',
    'Conoce a los personajes':'Meet the characters',
    '🎭 Conoce a los personajes':'🎭 Meet the characters',
    'Cada personaje tiene identidad visual, frase y reacción propia. Ninguno modifica la dificultad ni otorga ventajas académicas.':'Each character has a distinct visual identity, phrase and reaction. None changes difficulty or grants academic advantages.',
    'PERSONAJE SELECCIONADO':'SELECTED CHARACTER',
    'Tutorial':'Tutorial',
    'Omitir':'Skip',
    'Entendido ✓':'Got it ✓',
    'Aciertos':'Accuracy',
    'Reactivos':'Items',
    'Excelentes':'Excellent',
    'Mejor tema':'Strongest topic',
    'Repasar':'Review',
    'Elige tu personaje':'Choose your character',
    '← Volver':'← Back',
    'Siguiente →':'Next →',
    'Preparando El Camino Dental…':'Preparing El Camino Dental…',
    '100 casillas · dos dados · 12 personajes':'100 spaces · two dice · 12 characters',
    'TABLERO PRINCIPAL':'MAIN BOARD',
    'Camino a la meta':'Path to the goal',
    'Turno':'Turn',
    'Jugador':'Player',
    'META':'GOAL',
    'Ver significado de casillas':'View space meanings',
    'Pregunta':'Question','Caso':'Case','Avanza':'Move forward','Tratamiento':'Treatment','Cancelación':'Cancellation','Expediente':'Record','Mal tratamiento':'Poor treatment','Vacaciones':'Vacation','Impuestos':'Taxes','Demanda':'Lawsuit','Cárcel':'Jail','Equipo':'Equipment',
    'AHORA JUEGA':'NOW PLAYING',
    'Tira los dados':'Roll the dice',
    '🎲🎲 DOS DADOS':'🎲🎲 TWO DICE',
    'Total:':'Total:',
    'Tirar los dados':'Roll the dice',
    'Pulsa los dados para comenzar.':'Tap the dice to begin.',
    'Jugadores':'Players',
    'Reiniciar':'Restart',
    'Iniciar 30 s':'Start 30 s',
    'Confirmar respuesta':'Confirm answer',
    'Continuar':'Continue',
    '📖 Reglas':'📖 Rules',
    'Cerrar':'Close',
    'Reglas del camino':'Path rules',
    'Dos dados':'Two dice',
    'Avanza la suma de ambos.':'Move forward by the sum of both dice.',
    'Contra la computadora':'Against the computer',
    'Elige razonamiento Bajo, Medio, Alto o Súper inteligente.':'Choose Low, Medium, High or Super smart reasoning.',
    'Caso clínico':'Clinical case',
    'Diagnóstico':'Diagnosis',
    'Tratamiento concluido':'Treatment completed',
    'Expediente perdido':'Lost record',
    'Tratamiento salió mal':'Treatment went wrong',
    'Equipo descompuesto':'Broken equipment',
    'Victoria':'Victory',
    'Jugar otra vez':'Play again',
    'Correcta · permaneces en tu casilla':'Correct · stay on your space',
    'Incorrecta · retrocedes 1 casilla':'Incorrect · move back 1 space',
    'Excelente · avanzas 2 casillas':'Excellent · move forward 2 spaces',
    'Buena · avanzas 1 casilla':'Good · move forward 1 space',
    'Tiempo terminado':'Time is up',
    '⏱ Tiempo terminado · respuesta incorrecta · retrocedes 1 casilla':'⏱ Time is up · incorrect answer · move back 1 space',
    'La computadora continúa…':'The computer continues…',
    'Continúa el recorrido.':'Continue along the path.',
    'Revisa el razonamiento clínico.':'Review the clinical reasoning.',
    'Se agotó el tiempo. Revisa la respuesta correcta antes de continuar.':'Time is up. Review the correct answer before continuing.',
    'Se agotó el tiempo. Revisa el razonamiento clínico antes de continuar.':'Time is up. Review the clinical reasoning before continuing.',

    'MODO EXAMEN':'EXAM MODE',
    'Evalúa lo aprendido sin pistas inmediatas.':'Assess what you learned without immediate hints.',
    'Selecciona un módulo, dificultad y extensión. Durante el examen no se revela si una respuesta es correcta. Al finalizar obtienes porcentaje, aciertos, errores, desempeño por tema, áreas débiles y revisión.':'Select a module, difficulty and length. During the exam, correct answers are not revealed. At the end you receive a percentage, correct answers, errors, performance by topic, weak areas and review.',
    '🔒 Sin retroalimentación inmediata':'🔒 No immediate feedback',
    '📊 Resultado por tema':'📊 Results by topic',
    '🔎 Revisión de errores':'🔎 Error review',
    '📱 Adaptado a celular':'📱 Mobile friendly',
    'Módulo':'Module',
    'Dificultad':'Difficulty',
    '🧠 Adaptativo: los temas que más falles aparecerán antes en futuras preguntas.':'🧠 Adaptive: topics you miss more often will appear earlier in future questions.',
    '🧠 Adaptativo: los temas con más errores reciben mayor prioridad en futuros exámenes.':'🧠 Adaptive: topics with more errors receive higher priority in future exams.',
    'Todas las dificultades':'All difficulties',
    'Número de preguntas':'Number of questions',
    '20 preguntas':'20 questions','40 preguntas · simulación de una versión':'40 questions · version simulation','50 preguntas':'50 questions','100 preguntas':'100 questions','200 preguntas · banco completo':'200 questions · full bank',
    'Comenzar examen →':'Start exam →',
    '← Volver al juego':'← Back to game',
    'respondidas':'answered',
    '← Anterior':'← Previous',
    'Finalizar examen ✓':'Finish exam ✓',
    '📊 RESULTADOS':'📊 RESULTS',
    'Resultado del examen':'Exam result',
    'calificación':'score',
    'Correctas':'Correct','Incorrectas':'Incorrect','Sin responder':'Unanswered','Total':'Total',
    'Desempeño por tema':'Performance by topic',
    '📚 Resultados de Juega y aprueba por materia':'📚 Play and pass results by subject',
    'Así se distribuyeron tus aciertos por materia en Juega y aprueba.':'This is how your correct answers were distributed by subject in Play and pass.',
    'Áreas a reforzar':'Areas to reinforce',
    'Revisión de respuestas':'Answer review',
    'Mostrar revisión':'Show review',
    'Ocultar revisión':'Hide review',
    'Repetir configuración':'Repeat setup',
    '🎲 Ir al juego':'🎲 Go to game',
    '¿Finalizar el examen?':'Finish the exam?',
    'Seguir respondiendo':'Keep answering',
    'Finalizar y calificar':'Finish and score',

    'Modo Docente':'Teacher Mode',
    'Nueva actividad':'New activity',
    'Exportar':'Export',
    'Importar':'Import',
    'Preguntas':'Questions',
    'Casos clínicos':'Clinical cases',
    'Actividad terminada':'Activity finished',
    'Repetir actividad':'Repeat activity',
    'Comenzar actividad proyectada':'Start projected activity',
    'Nombre del grupo o equipo':'Group or team name',
    'Incluir preguntas':'Include questions',
    'Incluir casos clínicos':'Include clinical cases',
    'Mezclar el orden':'Shuffle order',
    'Pantalla completa':'Full screen',
    'Agregar pregunta':'Add question',
    'Cancelar edición':'Cancel edit',
    'Agregar caso clínico':'Add clinical case',
    'Descripción del caso':'Case description',
    'Respuesta correcta':'Correct answer',
    'Retroalimentación clínica':'Clinical feedback',

    'Inicio':'Home',
    'Jugar':'Play',
    'Política de Privacidad':'Privacy Policy',
    'Última actualización: 18 de septiembre de 2026.':'Last updated: September 18, 2026.',
    '🎲 Ir al juego':'🎲 Go to game',
    'Volver al sitio':'Back to site'
  }));

  const patterns=[
    [/^Jugador (\d+)$/,'Player $1'],
    [/^Jugador (\d+) de (\d+)\. Cada personaje solo puede elegirse una vez\.$/,'Player $1 of $2. Each character can only be chosen once.'],
    [/^Pregunta (\d+) de (\d+)$/,'Question $1 of $2'],
    [/^Pregunta (.+)$/,'Question $1'],
    [/^Reactivo (\d+) de (\d+)$/,'Item $1 of $2'],
    [/^(\d+) respondidas$/,'$1 answered'],
    [/^Disponibles: (\d+) preguntas\.$/,'Available: $1 questions.'],
    [/^(\d+) de (\d+) correctas$/,'$1 of $2 correct'],
    [/^Casilla (\d+)$/,'Space $1'],
    [/^Pregunta (\d+)$/,'Question $1'],
    [/^(.+), tira los dos dados\.$/,'$1, roll the two dice.'],
    [/^🤖 (.+) está pensando…$/,'🤖 $1 is thinking…'],
    [/^Partida recuperada\. (.+), tira los dos dados\.$/,'Game restored. $1, roll the two dice.'],
    [/^Partida recuperada\. 🤖 (.+) continúa automáticamente\.$/,'Game restored. 🤖 $1 continues automatically.'],
    [/^(.+): tirar dados$/,'$1: roll dice'],
    [/^🤖 (.+): juega automáticamente$/,'🤖 $1: plays automatically'],
    [/^(.+) de (\d+) respuestas correctas \((\d+)%\)\.$/,'$1: $2 correct answers ($3%).']
  ];

  const attrMap={
    'Nombre del jugador 1':'Player 1 name',
    'Nombre del jugador 2':'Player 2 name',
    'Nombre del jugador 3':'Player 3 name',
    'Nombre del jugador 4':'Player 4 name',
    'Nombre del jugador 5':'Player 5 name',
    'Ej. Grupo 401 / Equipo Azul':'e.g. Group 401 / Blue Team',
    'Describe edad, hallazgos, diagnóstico, antecedentes o situación clínica':'Describe age, findings, diagnosis, history or clinical situation',
    'Explica por qué esa es la mejor respuesta':'Explain why this is the best answer'
  };

  function translateString(raw){
    if(lang!=='en') return raw;
    const lead=raw.match(/^\s*/)?.[0]||'', trail=raw.match(/\s*$/)?.[0]||'';
    const core=raw.trim();
    if(!core) return raw;
    if(map.has(core)) return lead+map.get(core)+trail;
    for(const [re,repl] of patterns) if(re.test(core)) return lead+core.replace(re,repl)+trail;
    return raw;
  }

  function translateTree(root=document.body){
    if(lang!=='en'||!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{if(!n.parentElement?.closest('[data-no-i18n]'))n.nodeValue=translateString(n.nodeValue)});
    root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(el=>{
      ['placeholder','aria-label','title'].forEach(a=>{
        const v=el.getAttribute(a);if(!v)return;
        el.setAttribute(a,attrMap[v]||translateString(v))
      })
    });
  }

  function privacyEnglish(){
    if(lang!=='en'||!location.pathname.endsWith('/privacy.html')&&!location.pathname.endsWith('privacy.html'))return;
    const card=document.querySelector('.legal-card');if(!card)return;
    card.innerHTML=`<span class="kicker">Privacy</span><h1>Privacy Policy</h1><p><strong>Last updated: September 18, 2026.</strong></p><p>This policy describes how <strong>El Camino Dental</strong> currently works, a digital educational board game developed by Mtra. Yomira Salgado Martinez and published as a web project on GitHub Pages.</p><div class="notice"><strong>Summary:</strong> the game does not require an account, does not sell data, includes no advertising or first-party analytics, and does not send player names, answers or game progress to a server controlled by the author.</div><h2>1. Data used by the game</h2><p>The game may ask for player names or nicknames only to identify turns. It also stores game progress, token positions, selected characters and already-used questions and clinical cases locally.</p><p>This information is stored through <code>localStorage</code> in the user's browser or device. The game code does not send it to a database or server controlled by the author.</p><h2>2. Data we do not request</h2><ul><li>No account or sign-in is required.</li><li>We do not request legal name, address, phone number, email address or date of birth.</li><li>We do not request financial information.</li><li>We do not request precise location.</li><li>We do not request access to contacts, camera, microphone, gallery or personal files.</li><li>No advertising or ad tracking is integrated.</li><li>No first-party behavioral analytics tool is used.</li></ul><h2>3. Local storage and deletion</h2><p>Progress remains on the device until the user restarts the game, clears site data or removes the application's storage. Starting a new game removes the saved progress for that session.</p><h2>4. Teacher Mode and user-created content</h2><p>Teacher Mode can create activities, questions, clinical cases, answer choices, correct answers, instructions and feedback. This content is stored locally through <code>localStorage</code>. Export creates a JSON file on the device and import only reads the file selected by the user.</p><p>Do not enter full student names, institutional grades, real clinical data or sensitive information.</p><h2>5. GitHub Pages hosting</h2><p>The web version is hosted on GitHub Pages. GitHub may process technical information associated with visits, such as IP address, device information, date and time of requests and site usage, according to its own privacy and security practices.</p><h2>6. Cookies and similar technologies</h2><p>The game's own code does not install advertising or tracking cookies. It uses local storage to maintain game state.</p><h2>7. Minors</h2><p>The game is educational and may be used in academic contexts. It is not designed to deliberately collect personal data from children or teenagers. Use first names, nicknames or team numbers and avoid personal or real clinical information.</p><h2>8. Clinical and educational information</h2><p>Questions and clinical cases are for educational purposes. The game must not be used to enter identifiable patient information and does not replace professional evaluation, diagnosis or treatment.</p><h2>9. Third parties</h2><p>The site may link to GitHub or reference sources. External sites are governed by their own privacy policies. The game currently does not integrate third-party authentication, advertising, payments or analytics.</p><h2>10. Security</h2><p>The project minimizes data collection through a local, static architecture. Do not enter sensitive information, passwords or patient data.</p><h2>11. Future changes</h2><p>If a future version adds online services, accounts, synchronization, analytics, advertising, remote storage or additional Android permissions, this policy must be updated before those features are enabled.</p><h2>12. Contact</h2><p>For privacy, operation or content questions, use the public <a href="https://github.com/yomismtz/El-camino-de-la-ortopedia-juego-de-mesa/issues" target="_blank" rel="noopener noreferrer">GitHub repository Issues</a>.</p><h2>13. Project owner</h2><p><strong>Mtra. Yomira Salgado Martinez</strong><br>Educational project: <em>El Camino Dental</em>.</p><div class="hero-actions"><a class="btn btn-primary" href="play.html">🎲 Go to game</a><a class="btn btn-secondary" href="./">Back to site</a></div>`;
  }

  function addSwitcher(){
    const host=document.querySelector('.top-actions,.exam-nav,.navlinks,.nav-links,.topbar nav');
    if(document.querySelector('.language-switcher'))return;
    const wrap=document.createElement('label');wrap.className='language-switcher';wrap.setAttribute('data-no-i18n','');
    wrap.innerHTML='<span>🌐</span><select aria-label="Language"><option value="es">ES</option><option value="en">EN</option></select>';
    const sel=wrap.querySelector('select');sel.value=lang;sel.addEventListener('change',()=>{localStorage.setItem(KEY,sel.value);location.reload()});
    if(host)host.prepend(wrap);else document.body.appendChild(wrap)
  }

  const nativeAlert=window.alert.bind(window),nativeConfirm=window.confirm.bind(window);
  window.alert=(m)=>nativeAlert(translateString(String(m)));
  window.confirm=(m)=>nativeConfirm(translateString(String(m)));

  window.I18N={lang,text:(es,en)=>lang==='en'?en:es,translate:translateTree};
  document.documentElement.lang=lang==='en'?'en':'es-MX';

  document.addEventListener('DOMContentLoaded',()=>{
    privacyEnglish();translateTree();addSwitcher();
    if(lang==='en'){
      const observer=new MutationObserver(ms=>{
        observer.disconnect();
        ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)n.nodeValue=translateString(n.nodeValue);else if(n.nodeType===Node.ELEMENT_NODE)translateTree(n)}));
        observer.observe(document.body,{childList:true,subtree:true,characterData:true});
      });
      observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    }
  });
})();