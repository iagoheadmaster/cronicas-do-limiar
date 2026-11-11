
/* Crônicas do Limiar // Neon | RPG de vida real | v2.0 */
'use strict';

const STORAGE_KEY='cronicas-do-limiar-neon-v2';
const TUTORIAL_KEY='cronicas-do-limiar-tutorial-v1';
const QUICKSTART_KEY='cronicas-do-limiar-primeiros-passos-v1';
const TUTORIAL_STEPS=[
  {icon:'◈',tag:'INÍCIO',title:'Bem-vindo ao seu RPG!',lead:'Este jogo transforma coisas da vida real em pontos. Não precisa saber jogar RPG para começar.',example:'Tomar água, trabalhar, estudar, descansar, cuidar de alguém ou se divertir: tudo isso pode virar uma missão.',tip:'Você escolhe as ações que combinam com seu dia. Não há pressa nem punição.'},
  {icon:'◎',tag:'PERSONAGEM',title:'Este é o seu personagem',lead:'Ele representa você dentro do jogo. Você pode escolher um nome e uma classe.',example:'Abra “Personagem” para trocar o nome e escolher uma classe. Pode mudar a classe depois sem perder seu progresso.',tip:'Se quiser, deixe tudo como está agora. Dá para personalizar depois.'},
  {icon:'✓',tag:'MISSÕES',title:'Primeiro você faz. Depois marca.',lead:'Fez algo de verdade? Abra “Missões” e procure o nome da ação.',example:'Bebeu água? Encontre “Manter a hidratação”. Toque no quadradinho ao lado. Aparecerá um ✓ e você ganhará XP.',tip:'Cada ação vale uma vez por dia. Tocou sem querer? Toque outra vez para desfazer.'},
  {icon:'✦',tag:'PONTUAÇÃO',title:'O que são XP, nível e moedas?',lead:'XP significa pontos de experiência. Eles mostram o avanço do seu personagem no jogo.',example:'Ao marcar ações, você recebe XP. Com XP suficiente, sobe de nível. Algumas ações também dão moedas para comprar visuais.',tip:'As moedas são fictícias, não são dinheiro real. A pontuação não mede seu valor como pessoa.'},
  {icon:'⬢',tag:'RECOMPENSAS',title:'Ganhe bônus por pequenas conquistas',lead:'No começo de “Missões”, há desafios extras. Eles pedem combinações simples de ações.',example:'O desafio “Boot do Dia” pede 3 ações. Quando ele mostrar “Resgatar”, toque nesse botão para pegar o bônus.',tip:'O bônus não é automático. Dias de descanso ou sem registro não fazem você perder pontos.'},
  {icon:'⚔',tag:'BATALHAS',title:'Agora vem o lado RPG!',lead:'Você também pode enfrentar um chefe da semana usando um dado de 20 lados, o D20.',example:'Depois de ganhar 35 XP no dia, abra “Batalha” e toque em “Rolar D20 e atacar”. São até 2 tentativas por dia.',tip:'Se o dado cair mal, você não perde seus pontos. O chefe muda toda semana.'},
  {icon:'▤',tag:'PRONTO PARA JOGAR',title:'Sua história começa agora',lead:'Em “Crônicas”, você acompanha conquistas e dias jogados. Em “Personagem”, vê seus atributos e salva o progresso.',example:'O jogo guarda os registros neste navegador. Para jogar em outro aparelho, use “Exportar progresso” e depois “Importar progresso”.',tip:'Não compartilhe arquivos de progresso com informações pessoais. Pronto? Vamos registrar uma missão real!'}
];
const CATEGORIES={
  essencias:{label:'Rotina Base',icon:'◌',description:'Os protocolos essenciais que sustentam a jornada.'},
  natureza:{label:'Corpo & Ecossistema',icon:'⬡',description:'Corpo, presença e cuidado com o ambiente ao redor.'},
  oficio:{label:'Trabalho & Conhecimento',icon:'⌁',description:'Construção de carreira, estudo e progresso intencional.'},
  arte:{label:'Criação & Hobbies',icon:'♫',description:'Expressão, treino, prazer criativo e experimentação.'},
  vinculos:{label:'Relações & Presença',icon:'◎',description:'Laços humanos, gentileza e tempo com propósito.'}
};
const ATTRIBUTES={
  corpo:{label:'Vigor',icon:'✚',desc:'Energia, movimento e manutenção do corpo'},
  mente:{label:'Processamento',icon:'◇',desc:'Estudo, foco e aprendizado prático'},
  ordem:{label:'Estratégia',icon:'⬢',desc:'Planejamento, execução e consistência'},
  arte:{label:'Expressão',icon:'✦',desc:'Criação, repertório e imaginação'},
  vinculos:{label:'Empatia',icon:'♡',desc:'Cuidado, escuta e cooperação'},
  espirito:{label:'Presença',icon:'☽',desc:'Descanso, prazer e equilíbrio interno'}
};
const CLASSES={
  artificie:{title:'Arquiteto de Sistemas',glyph:'⌘',desc:'Transforma conhecimento, estratégia e tecnologia em progresso real.',buff:'mente'},
  bardo:{title:'Sintesista de Rua',glyph:'♫',desc:'Usa criatividade, arte e repertório para mover a própria história.',buff:'arte'},
  guardiao:{title:'Guardião de Neon',glyph:'⛨',desc:'Protege vínculos, bem-estar e aquilo que dá sentido à jornada.',buff:'vinculos'},
  errante:{title:'Errante do Grid',glyph:'✧',desc:'Segue em frente com disciplina, adaptação e coragem para recomeçar.',buff:'ordem'}
};
const TASKS=[
  {id:'despertar',name:'Começar o dia com autocuidado',desc:'Higiene, banho, arrumar-se ou qualquer ritual básico de cuidado pessoal.',xp:8,cat:'essencias',stat:'corpo'},
  {id:'hidratar',name:'Manter a hidratação',desc:'Beber água ou lembrar do básico para o corpo funcionar melhor.',xp:8,cat:'essencias',stat:'corpo'},
  {id:'alimentar',name:'Fazer uma refeição com atenção',desc:'Comer com alguma presença, mesmo que de forma simples.',xp:12,cat:'essencias',stat:'corpo'},
  {id:'refugio',name:'Organizar um espaço',desc:'Arrumar, limpar, lavar ou resolver alguma tarefa doméstica.',xp:12,cat:'essencias',stat:'ordem'},
  {id:'sono',name:'Respeitar meu descanso',desc:'Dormir, cochilar ou recuperar energia do jeito possível.',xp:16,cat:'essencias',stat:'espirito'},
  {id:'movimento',name:'Movimentar o corpo',desc:'Caminhar, treinar, alongar, pedalar, dançar ou fazer algum exercício.',xp:20,cat:'natureza',stat:'corpo'},
  {id:'milla',name:'Cuidar de pet(s) e/ou planta(s)',desc:'Brincar, passear, regar, alimentar ou dar atenção a outra forma de vida sob seu cuidado.',xp:18,cat:'natureza',stat:'vinculos'},
  {id:'ar-livre',name:'Tomar ar livre ou mudar de ambiente',desc:'Ver o céu, pegar sol, sair um pouco ou respirar fora do piloto automático.',xp:12,cat:'natureza',stat:'espirito'},
  {id:'bi',name:'Estudar ou praticar uma habilidade',desc:'Curso, leitura técnica, idioma, código, instrumento, oficina ou qualquer prática de evolução.',xp:24,cat:'oficio',stat:'mente'},
  {id:'carreira',name:'Cumprir jornada de trabalho ou estudo',desc:'Avançar no trabalho, freelas, faculdade, escola ou responsabilidades recorrentes.',xp:22,cat:'oficio',stat:'ordem'},
  {id:'portugal',name:'Buscar oportunidades ou avançar em um projeto de vida',desc:'Recolocação, portfólio, candidatura, networking, documentação ou planejamento de longo prazo.',xp:22,cat:'oficio',stat:'ordem'},
  {id:'financas',name:'Organizar finanças ou pendências',desc:'Revisar orçamento, pagar contas, decidir compras ou resolver burocracias.',xp:15,cat:'oficio',stat:'ordem'},
  {id:'leitura',name:'Ler, pesquisar ou aprender algo novo',desc:'Artigo, capítulo, vídeo, aula ou curiosidade que expanda seu repertório.',xp:14,cat:'oficio',stat:'mente'},
  {id:'instrumento',name:'Praticar uma arte, hobby ou técnica',desc:'Música, desenho, escrita, fotografia, culinária, artesanato ou qualquer treino criativo.',xp:22,cat:'arte',stat:'arte'},
  {id:'hellspawn',name:'Criar algo para um projeto pessoal ou coletivo',desc:'Planejar, ensaiar, editar, divulgar, programar, construir ou produzir algo com autoria.',xp:22,cat:'arte',stat:'arte'},
  {id:'criacao',name:'Produzir uma ideia criativa',desc:'Escrever, editar, desenhar, gravar, montar ou experimentar algo novo.',xp:18,cat:'arte',stat:'arte'},
  {id:'pessoas',name:'Cultivar uma conexão humana',desc:'Conversar com amigos, família, parceiros, colegas ou alguém importante.',xp:16,cat:'vinculos',stat:'vinculos'},
  {id:'gentileza',name:'Fazer uma gentileza',desc:'Ajudar alguém, colaborar ou praticar um gesto de cuidado.',xp:12,cat:'vinculos',stat:'vinculos'},
  {id:'prazer',name:'Fazer algo só por prazer',desc:'Jogar, ouvir música, assistir algo, passear ou curtir uma pausa sem culpa.',xp:14,cat:'vinculos',stat:'espirito'},
  {id:'reflexao',name:'Registrar uma reflexão do dia',desc:'Anotar uma conquista, um sentimento, uma dúvida ou um aprendizado.',xp:10,cat:'vinculos',stat:'espirito'}
];
const QUESTS={
  tres:{name:'Boot do Dia',glyph:'✦',desc:'Realize 3 ações reais no dia.',xp:22,coins:10,check:(d)=>Object.keys(d.completed).length>=3},
  reinos:{name:'Sincronia de Sistemas',glyph:'◇',desc:'Faça ações de 3 áreas diferentes da vida.',xp:28,coins:14,check:(d)=>new Set(Object.values(d.completed).map(x=>x.cat)).size>=3},
  passo:{name:'Patch de Progresso',glyph:'⬢',desc:'Realize uma ação de trabalho ou conhecimento.',xp:18,coins:9,check:(d)=>Object.values(d.completed).some(x=>x.cat==='oficio')}
};
const WEEK_QUEST={name:'Sprint de Quatro Dias',glyph:'☽',desc:'Registre pelo menos uma ação em 4 dias da semana.',xp:110,coins:45};
const BOSSES=[
 {name:'Fantasma da Procrastinação',glyph:'⚠',desc:'Insiste que tudo pode esperar mais um pouco.'},
 {name:'Ruído da Dispersão',glyph:'☁',desc:'Fragmenta o foco em abas, alertas e ruído mental.'},
 {name:'Poço do Scroll Infinito',glyph:'⌛',desc:'Devora horas inteiras sem deixar memória do caminho.'},
 {name:'Algoritmo do Perfeccionismo',glyph:'◈',desc:'Afirma que só vale começar quando tudo estiver impecável.'}
];
const SHOP=[
 {id:'estrela',name:'Filtro Neon',glyph:'✧',price:130,desc:'Um contorno luminoso para o seu avatar.'},
 {id:'ferro',name:'Selo Glitch',glyph:'▣',price:230,desc:'Uma assinatura visual para perfis criativos.'},
 {id:'portal',name:'Coroa Holográfica',glyph:'♛',price:390,desc:'Um efeito raro para quem já cruzou muitos níveis.'}
];
const CHAPTERS=[
 {level:1,title:'I. Login no Limiar',desc:'Na cidade de neon, você percebe que evolução não vem só de grandes feitos. Comer, descansar, estudar e recomeçar também geram poder.'},
 {level:3,title:'II. Circuitos em Movimento',desc:'Trabalho, arte, relações e autocuidado deixam de competir entre si. Cada área passa a alimentar o mesmo sistema: a sua vida real.'},
 {level:5,title:'III. Interferências e Escolhas',desc:'As sombras não desaparecem, mas você aprende a lê-las. Nem toda batalha é vencida com força. Algumas pedem pausa, outras pedem direção.'},
 {level:8,title:'IV. Cidade Expandida',desc:'Os projetos crescem, novas rotas surgem e a jornada deixa de ser apenas sobrevivência. Agora existe construção consciente de futuro.'},
 {level:12,title:'V. Crônica Inacabada',desc:'Você entende que não existe save final. Existe presença, consistência e a arte de atualizar a própria narrativa sem perder a essência.'}
];
const ACHIEVEMENTS=[
 {id:'start',glyph:'✦',name:'Primeiro Login',desc:'Realizou a primeira ação.',check:s=>s.actions>=1},
 {id:'five',glyph:'◌',name:'Dia de Alta Voltagem',desc:'Concluiu 5 ações no mesmo dia.',check:s=>s.maxDay>=5},
 {id:'brain',glyph:'◇',name:'Mente em Upgrade',desc:'Completou 5 ações de trabalho ou conhecimento.',check:s=>(s.categories.oficio||0)>=5},
 {id:'metal',glyph:'♫',name:'Sinal Criativo',desc:'Completou 5 ações criativas.',check:s=>(s.categories.arte||0)>=5},
 {id:'milla',glyph:'⬡',name:'Guardião do Ecossistema',desc:'Cuidou de pet(s) e/ou planta(s) em 5 dias.',check:s=>(s.tasks.milla||0)>=5},
 {id:'rest',glyph:'☽',name:'Mestre da Recuperação',desc:'Respeitou o descanso em 5 dias.',check:s=>(s.tasks.sono||0)>=5},
 {id:'week',glyph:'✧',name:'Ritmo Sustentável',desc:'Registrou atividades em 7 dias diferentes.',check:s=>s.activeDays>=7},
 {id:'boss',glyph:'⚔',name:'Caçador de Bugs',desc:'Venceu o primeiro chefe semanal.',check:s=>s.bossWins>=1},
 {id:'legend',glyph:'♛',name:'Lenda do Neon',desc:'Alcançou o nível 10.',check:s=>s.level>=10}
];

let state=loadState();
let view='inicio';
let taskFilter='todos';
let toastTimer=null;
let lastDay=todayKey();
let tutorialOpen=false;
let tutorialStep=0;
let tutorialReturnFocus=null;
let coachActive=false;
let quickStartOpen=false;
let feedbackOpen=false;
let overlayPreviousFocus=null;
function todayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function fromKey(key){const [y,m,d]=key.split('-').map(Number);return new Date(y,m-1,d,12);}
function weekKey(date=new Date()){const d=new Date(date);const offset=(d.getDay()+6)%7;d.setDate(d.getDate()-offset);return todayKey(d);}
function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function formatDate(key,opts){return new Intl.DateTimeFormat('pt-BR',opts||{weekday:'long',day:'numeric',month:'long'}).format(fromKey(key));}
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const parsed=JSON.parse(raw);if(parsed?.version===1 && parsed.days && typeof parsed.days==='object'){return normalize(parsed);}}}catch(e){console.warn('Não foi possível abrir o save anterior',e);}return normalize({});}
function normalize(s){return {version:1,player:{name:String(s.player?.name||'Operador Neon').slice(0,40),class:CLASSES[s.player?.class]?s.player.class:'artificie'},days:s.days&&typeof s.days==='object'&&!Array.isArray(s.days)?s.days:{},weeks:s.weeks&&typeof s.weeks==='object'&&!Array.isArray(s.weeks)?s.weeks:{},custom:Array.isArray(s.custom)?s.custom.slice(0,25):[],shop:{unlocked:Array.isArray(s.shop?.unlocked)?s.shop.unlocked:[],equipped:s.shop?.equipped||null,spent:Number(s.shop?.spent)||0}};}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch(e){showToast('Não foi possível salvar. Confira o armazenamento do navegador.');return false;}}
function currentDay(key=todayKey()){if(!state.days[key])state.days[key]={completed:{},claimed:[],journal:''};const d=state.days[key];if(!d.completed||typeof d.completed!=='object')d.completed={};if(!Array.isArray(d.claimed))d.claimed=[];if(typeof d.journal!=='string')d.journal='';return d;}
function bossFor(week){let h=0;for(const c of week)h=(h*31+c.charCodeAt(0))>>>0;return BOSSES[h%BOSSES.length];}
function currentWeek(key=weekKey()){if(!state.weeks[key])state.weeks[key]={hp:96,max:96,attacks:{},log:[],defeated:false,weeklyClaimed:false};const w=state.weeks[key];if(!w.attacks)w.attacks={};if(!Array.isArray(w.log))w.log=[];return w;}
function xpThreshold(level){return 100+(level-1)*60;}
function getLevel(xp){let level=1,remaining=Math.max(0,xp);while(remaining>=xpThreshold(level)&&level<100){remaining-=xpThreshold(level);level++;}return {level,progress:remaining,next:xpThreshold(level),ratio:Math.min(100,Math.round(100*remaining/xpThreshold(level)))};}
function toCoins(xp){return Math.ceil(xp/4);}
function getAllTasks(){return [...TASKS,...state.custom.filter(t=>t&&t.id&&t.name&&CATEGORIES[t.cat]).map(t=>({...t,custom:true}))];}
function countRecords(){const records={actions:0,activeDays:0,maxDay:0,categories:{},tasks:{},statCounts:{},daysXP:{},bossWins:0};let xp=0,coins=0;
 for(const [key,d] of Object.entries(state.days)){
   if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||!d?.completed)continue;
   const acts=Object.values(d.completed).filter(a=>a&&Number.isFinite(Number(a.xp)));
   if(acts.length)records.activeDays++;
   records.actions+=acts.length;records.maxDay=Math.max(records.maxDay,acts.length);
   let dayXP=0;
   for(const a of acts){const gained=Math.max(0,Math.min(40,Number(a.xp)||0));dayXP+=gained;coins+=Math.max(0,Math.min(15,Number(a.coins)||0));records.categories[a.cat]=(records.categories[a.cat]||0)+1;records.tasks[a.id]=(records.tasks[a.id]||0)+1;records.statCounts[a.stat]=(records.statCounts[a.stat]||0)+1;}
   for(const id of d.claimed||[]){const q=QUESTS[id];if(q&&q.check(d)){dayXP+=q.xp;coins+=q.coins;}}
   records.daysXP[key]=dayXP;xp+=dayXP;
 }
 for(const [wk,w] of Object.entries(state.weeks)){if(w?.weeklyClaimed&&daysThisWeekFor(wk)>=4){xp+=WEEK_QUEST.xp;coins+=WEEK_QUEST.coins;}if(w?.defeated){records.bossWins++;xp+=140;coins+=65;}}
 const levels=getLevel(xp);const stats={};for(const k of Object.keys(ATTRIBUTES))stats[k]=8+(CLASSES[state.player.class]?.buff===k?4:0)+Math.floor((records.statCounts[k]||0)/3);
 return {...records,xp,coins:Math.max(0,coins-state.shop.spent),grossCoins:coins,level:levels.level,levelData:levels,stats,todayXP:records.daysXP[todayKey()]||0};
}
function daysThisWeekFor(key){const end=new Date(fromKey(key));end.setDate(end.getDate()+6);const last=todayKey(end);return Object.entries(state.days).filter(([d,v])=>d>=key&&d<=last&&v.completed&&Object.keys(v.completed).length>0).length;}
function daysThisWeek(){return daysThisWeekFor(weekKey());}
function getRank(level){if(level>=20)return 'Lenda do Neon';if(level>=12)return 'Veterano do Grid';if(level>=8)return 'Operador Tático';if(level>=5)return 'Nômade de Dados';if(level>=3)return 'Agente em Ascensão';return 'Desperto';}
function showToast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);}

function overlayRoot(id){let el=document.getElementById(id);if(!el){el=document.createElement('div');el.id=id;document.body.append(el);}return el;}
function showQuickStart(){
 if(tutorialOpen||feedbackOpen||quickStartOpen)return;
 quickStartOpen=true;overlayPreviousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
 document.getElementById('app').inert=true;document.body.classList.add('tutorial-active');
 overlayRoot('quickstart-root').innerHTML=`<div class="welcome-overlay"><section class="welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
 <div class="welcome-kicker">◈ CRÔNICAS DO LIMIAR // NEON</div><h2 id="welcome-title">Sua vida já é uma aventura.</h2><p>Experimente o jogo em menos de um minuto. Não precisa saber RPG.</p>
 <div class="welcome-steps"><div><span>01</span><strong>Viva</strong><small>Faça algo comum, como beber água ou organizar seu espaço.</small></div><div><span>02</span><strong>Marque</strong><small>Registre a ação na Central de Missões.</small></div><div><span>03</span><strong>Evolua</strong><small>Ganhe XP e descubra seus próximos desafios.</small></div></div>
 <button type="button" class="btn btn-primary welcome-main" data-quick="play">Começar minha primeira missão →</button>
 <div class="welcome-other"><button type="button" data-quick="tutorial">Ver tutorial completo</button><button type="button" data-quick="dismiss">Explorar sozinho</button></div>
 <p class="welcome-calm">Sem cadastro. Sem competição. Descansar também conta.</p></section></div>`;
 overlayRoot('quickstart-root').querySelector('[data-quick="play"]').focus({preventScroll:true});
}
function closeQuickStart(toMission=false){
 if(!quickStartOpen)return;
 quickStartOpen=false;overlayRoot('quickstart-root').replaceChildren();document.body.classList.remove('tutorial-active');document.getElementById('app').inert=false;
 try{localStorage.setItem(QUICKSTART_KEY,'seen');}catch(e){}
 if(toMission){coachActive=true;view='missoes';taskFilter='essencias';render();window.scrollTo({top:0,behavior:'instant'});
  document.querySelector('.coach-banner')?.scrollIntoView({block:'start'});document.querySelector('.intro-highlight .task-check')?.focus({preventScroll:true});
 }else if(overlayPreviousFocus?.isConnected){overlayPreviousFocus.focus({preventScroll:true});}
 overlayPreviousFocus=null;
}
function handleQuickStart(action){
 if(action==='open'){showQuickStart();return;}
 if(!quickStartOpen)return;
 if(action==='play'){closeQuickStart(true);return;}
 if(action==='tutorial'){closeQuickStart();openTutorial();return;}
 if(action==='dismiss')closeQuickStart();
}
function openFeedback(){
 if(quickStartOpen||tutorialOpen||feedbackOpen)return;
 feedbackOpen=true;overlayPreviousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
 document.getElementById('app').inert=true;document.body.classList.add('tutorial-active');
 overlayRoot('feedback-root').innerHTML=`<div class="welcome-overlay"><section class="welcome-dialog feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
 <div class="welcome-kicker">◎ TESTE COM AMIGOS</div><h2 id="feedback-title">Como foi sua experiência?</h2><p>Responda três perguntas rápidas. Nenhuma resposta é enviada automaticamente.</p>
 <label for="feedback-good">1. O que foi fácil ou divertido?</label><textarea id="feedback-good" maxlength="500" placeholder="O que você gostou?"></textarea>
 <label for="feedback-confusing">2. O que confundiu ou travou?</label><textarea id="feedback-confusing" maxlength="500" placeholder="Onde você ficou em dúvida?"></textarea>
 <label for="feedback-improve">3. O que melhoraria?</label><textarea id="feedback-improve" maxlength="500" placeholder="Que mudança faria diferença?"></textarea>
 <div class="welcome-other"><button type="button" class="btn btn-alt" data-feedback="close">Fechar</button><button type="button" class="btn btn-primary" data-feedback="copy">Copiar respostas</button></div>
 <p class="welcome-calm">Copie e mande as respostas para quem te enviou o jogo. Evite dados pessoais.</p></section></div>`;
 document.getElementById('feedback-good')?.focus({preventScroll:true});
}
function closeFeedback(){if(!feedbackOpen)return;feedbackOpen=false;overlayRoot('feedback-root').replaceChildren();document.body.classList.remove('tutorial-active');document.getElementById('app').inert=false;if(overlayPreviousFocus?.isConnected)overlayPreviousFocus.focus({preventScroll:true});overlayPreviousFocus=null;}
async function copyFeedback(){
 const answer=id=>document.getElementById(id)?.value.trim()||'Sem resposta';
 const txt=['Crônicas do Limiar // Neon - feedback de teste','','1. O que foi fácil ou divertido?',answer('feedback-good'),'','2. O que confundiu ou travou?',answer('feedback-confusing'),'','3. O que melhoraria?',answer('feedback-improve')].join('\n');
 try{await navigator.clipboard.writeText(txt);closeFeedback();showToast('Respostas copiadas! Cole na conversa com quem te convidou.');}
 catch(e){const root=overlayRoot('feedback-root');let fallback=root.querySelector('#feedback-copy-fallback');if(!fallback){fallback=document.createElement('textarea');fallback.id='feedback-copy-fallback';fallback.readOnly=true;fallback.className='feedback-fallback';root.querySelector('.feedback-dialog')?.append(fallback);}fallback.value=txt;fallback.focus();fallback.select();showToast('Selecione e copie o texto para enviar ao seu amigo.');}
}

function tutorialMarkup(){
 const item=TUTORIAL_STEPS[tutorialStep],last=tutorialStep===TUTORIAL_STEPS.length-1;
 const dots=TUTORIAL_STEPS.map((_,i)=>`<span class="tutorial-dot ${i===tutorialStep?'active':i<tutorialStep?'passed':''}" aria-hidden="true"></span>`).join('');
 return `<div class="tutorial-backdrop" data-tutorial-backdrop="1"><section class="tutorial-dialog" role="dialog" aria-modal="true" aria-labelledby="tutorial-title" aria-describedby="tutorial-intro">
   <div class="tutorial-head"><span class="tutorial-system">◈ GUIA DE INICIALIZAÇÃO</span><button type="button" class="tutorial-close" data-tutorial="skip" aria-label="Fechar tutorial">✕</button></div>
   <div class="tutorial-progress-line"><span>PASSO ${tutorialStep+1} DE ${TUTORIAL_STEPS.length}</span><div class="tutorial-dots" aria-hidden="true">${dots}</div></div>
   <div class="tutorial-illustration" aria-hidden="true"><span>${item.icon}</span><small>${item.tag}</small></div>
   <h2 id="tutorial-title">${item.title}</h2><p class="tutorial-lead" id="tutorial-intro">${item.lead}</p>
   <div class="tutorial-example"><span class="tutorial-example-label">NA PRÁTICA</span><p>${item.example}</p></div>
   <p class="tutorial-tip">✧ ${item.tip}</p>
   <div class="tutorial-actions">
     ${tutorialStep>0?'<button type="button" class="btn btn-alt tutorial-back" data-tutorial="back">← Voltar</button>':'<button type="button" class="tutorial-skip" data-tutorial="skip">Pular tutorial</button>'}
     <button type="button" class="btn btn-primary tutorial-next" data-tutorial="${last?'play':'next'}">${last?'Começar minha primeira missão ✓':'Próximo passo →'}</button>
   </div>
   ${tutorialStep>0?'<button type="button" class="tutorial-skip tutorial-skip-bottom" data-tutorial="skip">Pular tutorial</button>':''}
 </section></div>`;
}
function drawTutorial(){
 const root=document.getElementById('tutorial-root');if(!root)return;
 root.innerHTML=tutorialMarkup();
 const target=root.querySelector('[data-tutorial="next"], [data-tutorial="play"]');
 if(target)target.focus({preventScroll:true});
}
function openTutorial(){
 const root=document.getElementById('tutorial-root');if(!root||tutorialOpen)return;
 tutorialReturnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
 tutorialStep=0;tutorialOpen=true;
 document.body.classList.add('tutorial-active');
 document.getElementById('app').inert=true;
 drawTutorial();
}
function closeTutorial(startMission=false){
 const root=document.getElementById('tutorial-root');if(!root||!tutorialOpen)return;
 tutorialOpen=false;root.replaceChildren();
 document.body.classList.remove('tutorial-active');document.getElementById('app').inert=false;
 try{localStorage.setItem(TUTORIAL_KEY,'seen');}catch(e){}
 if(startMission){coachActive=true;view='missoes';taskFilter='essencias';render();window.scrollTo({top:0,behavior:'instant'});
  const highlighted=document.querySelector('.intro-highlight .task-check');
  if(highlighted){document.querySelector('.coach-banner')?.scrollIntoView({behavior:'instant',block:'start'});highlighted.focus({preventScroll:true});}
 }else if(tutorialReturnFocus?.isConnected){tutorialReturnFocus.focus({preventScroll:true});}
 tutorialReturnFocus=null;
}
function handleTutorialAction(action){
 if(action==='open'){openTutorial();return;}
 if(!tutorialOpen)return;
 if(action==='skip'){closeTutorial(false);return;}
 if(action==='back'){tutorialStep=Math.max(0,tutorialStep-1);drawTutorial();return;}
 if(action==='next'){tutorialStep=Math.min(TUTORIAL_STEPS.length-1,tutorialStep+1);drawTutorial();return;}
 if(action==='play'){closeTutorial(true);}
}
function sidebarItem(id,glyph,label){return `<button class="nav-btn ${view===id?'active':''}" data-page="${id}" aria-current="${view===id?'page':'false'}"><span class="nav-glyph">${glyph}</span>${label}</button>`;}
function nav(){return [ ['inicio','⌂','Visão geral'],['missoes','✦','Missões'],['batalha','⚔','Batalha'],['cronicas','☾','Crônicas'],['personagem','♛','Personagem'] ];}
function shell(content,stats){const [a,b,c,d,e]=nav();const today=todayKey();return `
 <aside class="sidebar"><div class="brand"><div class="brand-mark">✧</div><div><div class="brand-title">CRÔNICAS<br>DO LIMIAR</div><div class="brand-sub">neon life rpg</div></div></div>
 <div><div class="side-section">SEU TERMINAL</div><div class="nav-list">${nav().map(x=>sidebarItem(...x)).join('')}</div><button type="button" class="tutorial-sidebar-link" data-tutorial="open"><span aria-hidden="true">?</span> Como jogar</button></div>
 <div class="sidebar-footer"><span class="mini-pill">✦ JOGO LOCAL</span><div style="margin-top:11px;font:700 13px var(--font-head)">Registro real, fantasia simbólica.</div><small>Sem punição por descansar ou deixar de registrar. Seus dados pertencem a você e ficam neste navegador.</small></div></aside>
 <div class="main"><header class="topbar"><div><div class="eyebrow">✦ SESSÃO ATIVA</div><div class="topdate">${escapeHTML(formatDate(today))}</div></div><div class="top-actions"><button type="button" class="tutorial-top-button" data-tutorial="open" aria-label="Abrir tutorial de como jogar"><span aria-hidden="true">?</span> Como jogar</button><span class="top-chip top-chip-money">◈ ${stats.coins} moedas</span><span class="level-badge">NÍVEL ${stats.level}</span><button class="avatar-button" data-page="personagem" aria-label="Abrir personagem">${CLASSES[state.player.class].glyph}</button></div></header><main id="game-main">${content}</main><footer class="footer">Crônicas do Limiar // Neon · RPG de vida real · Publicável por link · Dados locais no navegador · Nenhum dia é uma derrota. <button type="button" class="footer-feedback" data-feedback="open">Dar feedback sobre o jogo</button></footer></div>
 <nav class="mobile-nav" aria-label="Navegação principal">${nav().map(x=>`<button class="${view===x[0]?'active':''}" data-page="${x[0]}" aria-label="${x[2]}"><span>${x[1]}</span>${x[2].split(' ')[0]}</button>`).join('')}</nav>`;}
function heading(title,subtitle,right=''){return `<div class="page-heading"><div><div class="eyebrow">✦ SEU TERMINAL</div><h1>${title}</h1><p>${subtitle}</p></div>${right}</div>`;}
function section(title,sub,right=''){return `<div class="section-head"><div><div class="eyebrow">✧ PROTOCOLO LIMIAR</div><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>${right}</div>`;}
function progress(percent,cls=''){return `<div class="progress-track"><div class="progress-fill ${cls}" style="width:${Math.min(100,Math.max(0,percent))}%"></div></div>`;}
function currentStage(){const s=countRecords();if(s.level>=8)return 'Cidade Expandida';if(s.level>=5)return 'Interferências e Escolhas';if(s.level>=3)return 'Circuitos em Movimento';return 'Login no Limiar';}
function taskShort(t,d){const done=!!d.completed[t.id];const starter=TASKS.find(x=>x.cat==='essencias'&&!d.completed[x.id]);const spotlight=coachActive&&!done&&t.id===starter?.id;return `<div class="task-item ${done?'done':''} ${spotlight?'intro-highlight':''}"><button class="task-check ${done?'checked':''}" data-task="${escapeHTML(t.id)}" aria-label="${done?'Desmarcar':'Concluir'}: ${escapeHTML(t.name)}" aria-pressed="${done}">${done?'✓':''}</button><div class="task-content"><strong>${escapeHTML(t.name)}</strong><p>${escapeHTML(t.desc)}</p></div><div class="task-xp">+${t.xp} XP</div></div>`;}
function questRow(id,q,d,week=false){const ready=week?daysThisWeek()>=4:q.check(d);const claimed=ready&&(week?currentWeek().weeklyClaimed:d.claimed.includes(id));return `<div class="quest-row"><div class="quest-symbol">${q.glyph}</div><div class="quest-info"><strong>${q.name}</strong><span>${q.desc} · +${q.xp} XP, +${q.coins} ouro</span></div>${claimed?`<span class="quest-done">✓ Resgatada</span>`:`<button class="btn btn-small ${ready?'btn-primary':'btn-alt'} quest-button" data-quest="${week?'weekly':id}" ${ready?'':'disabled'}>${ready?'Resgatar':'Pendente'}</button>`}</div>`;}
function home(stats){const d=currentDay();const tasks=getAllTasks();const n=Object.keys(d.completed).length;const completions=tasks.filter(t=>!d.completed[t.id]).slice(0,5);const recentQuest=Object.entries(QUESTS).slice(0,2);const archetype=CLASSES[state.player.class];return `
 <section class="hero"><div class="hero-content"><div class="mini-pill">✦ CAPÍTULO ATUAL · ${escapeHTML(currentStage().toUpperCase())}</div><h1>Sua rotina.<br><span>Seu universo.</span></h1><p>Um life RPG cyberpunk para qualquer pessoa. Ações comuns viram XP. O descanso conta. O trabalho conta. A busca por trabalho também conta.</p><div class="hero-links"><button class="btn btn-primary" data-page="missoes">✦ Registrar ação do dia</button><button class="btn btn-alt" data-quick="open">Primeiros passos</button><button class="btn btn-alt" data-page="batalha">⚔ Enfrentar o chefe</button></div></div></section>
 <div class="stats-grid"><div class="stat-card" data-symbol="✦"><div class="stat-label">Experiência total</div><div class="stat-val">${stats.xp.toLocaleString('pt-BR')} <span style="font-size:12px;color:var(--gold)">XP</span></div><div class="stat-foot">+${stats.todayXP} hoje</div></div><div class="stat-card" data-symbol="♛"><div class="stat-label">Nível de herói</div><div class="stat-val">${stats.level}</div><div class="stat-foot">${getRank(stats.level)}</div></div><div class="stat-card" data-symbol="☼"><div class="stat-label">Ações de hoje</div><div class="stat-val">${n}</div><div class="stat-foot">Conquistas da vida real</div></div><div class="stat-card money-card" data-symbol="◈"><div class="stat-label">Tesouro</div><div class="stat-val money-value">${stats.coins}</div><div class="stat-foot">Moedas de fantasia</div></div></div>
 ${section('Seu progresso','Evolução consistente, sem pressa e sem culpa')}<div class="grid-two"><div class="panel"><div class="panel-top"><h3>${archetype.glyph} ${archetype.title}</h3><span class="level-badge">NÍVEL ${stats.level}</span></div>${progress(stats.levelData.ratio)}<div class="progress-txt"><span>${stats.levelData.progress} / ${stats.levelData.next} XP para subir de nível</span><span>${stats.levelData.ratio}%</span></div><div class="split-wrap"><div><div class="eyebrow">HOJE</div><div style="font:700 27px var(--font-head);margin:7px 0">${n} <span style="font:500 11px var(--font-body);color:var(--muted)">ações registradas</span></div></div><button class="btn btn-alt btn-small" data-page="personagem">Ver atributos →</button></div><div class="feature-note small-mt">Seu personagem melhora conforme você realiza ações de diferentes áreas. Não há sequência obrigatória, perda de XP por ausência ou meta mínima para ser um bom dia.</div></div>
 <div class="panel"><div class="panel-top"><h3>✦ Protocolos do dia</h3><span class="panel-sub">3 desafios</span></div><div class="quest-list">${recentQuest.map(([id,q])=>questRow(id,q,d)).join('')}</div><button class="text-action small-mt" data-page="missoes">Ver todas as missões →</button></div></div>
 ${section('Missões do cotidiano','Sugestões reais para o seu dia',`<button class="text-action" data-page="missoes">Ver todas →</button>`)}<div class="grid-two"><div class="panel">${completions.length?completions.map(t=>taskShort(t,d)).join(''):`<div class="empty-state"><span>✦</span>Você já registrou todas as missões disponíveis para hoje.</div>`}</div><div class="panel"><div class="panel-top"><h3>☽ Log da jornada</h3><span class="panel-sub">Narrativa viva</span></div><div class="ambient-art"><span>Cada escolha deixa um rastro no grid.</span></div><p class="panel-p">Aqui, a rotina não é banal. Ela é matéria-prima de evolução. Pequenos gestos, pausas conscientes e projetos de futuro entram na mesma história.</p><button class="btn btn-alt btn-small" data-page="cronicas">Ler minha crônica</button></div></div>`;}
function missions(stats){const d=currentDay(),tasks=getAllTasks();const group=taskFilter==='todos'?Object.keys(CATEGORIES):[taskFilter];const done=Object.keys(d.completed).length;return `${heading('Central de Missões','Marque apenas o que realmente aconteceu. A rotina comum é parte da aventura.',`<span class="level-badge">HOJE · ${done} AÇÕES</span>`)}
 <div class="grid-two"><div class="panel"><div class="panel-top"><h3>✦ Protocolos do dia</h3><span class="panel-sub">Recompensas extras</span></div><div class="quest-list">${Object.entries(QUESTS).map(([id,q])=>questRow(id,q,d)).join('')}</div><div class="strong-mt"><h3>☽ Sprint semanal</h3><div class="quest-list">${questRow('weekly',WEEK_QUEST,d,true)}</div></div></div><div class="journal-card"><div class="eyebrow">✦ BALANÇO DO DIA</div><div style="font:700 38px var(--font-head);margin:8px 0">${stats.todayXP} XP</div><p class="subtle">De ${done} ações e desafios já resgatados.</p>${progress(Math.min(100,done/7*100),'mint')}<p class="mini-note">A marca de 7 ações é só um marcador visual, nunca uma obrigação.</p><div class="callout">Pequenos avanços também contam. Um dia de descanso pode ser uma etapa essencial da campanha.</div></div></div>
 ${section('Registro de ações','Ações genéricas, abertas ao público e concluídas uma vez por dia')}${coachActive?`<section class="coach-banner" aria-label="Ajuda para sua primeira missão"><div class="coach-icon" aria-hidden="true">✓</div><div><strong>Vamos fazer sua primeira missão?</strong><p>1. Escolha algo que <b>você já fez hoje</b>. 2. Toque no quadradinho ao lado da ação. 3. Veja o XP aparecer! Se nada desta lista aconteceu, faça quando quiser, sem pressa.</p></div><button type="button" class="btn btn-alt btn-small" data-coach-dismiss="1">Entendi</button></section>`:''}<div class="task-filters"><button class="filter-btn ${taskFilter==='todos'?'on':''}" data-filter="todos">Todas (${tasks.length})</button>${Object.entries(CATEGORIES).map(([k,v])=>`<button class="filter-btn ${taskFilter===k?'on':''}" data-filter="${k}">${v.icon} ${v.label}</button>`).join('')}</div>
 ${group.map(cat=>{const selected=tasks.filter(t=>t.cat===cat);if(!selected.length)return '';return `<div class="task-category"><div class="category-title">${CATEGORIES[cat].icon} ${CATEGORIES[cat].label}<span>${selected.filter(t=>d.completed[t.id]).length} de ${selected.length}</span></div><div class="panel" style="padding:4px 18px">${selected.map(t=>taskShort(t,d)).join('')}</div></div>`;}).join('')}
 ${section('Criar missão personalizada','Adicione algo que faça parte da sua rotina de verdade')}<div class="panel"><form id="custom-form"><div class="form-row"><div class="form-group"><label class="input-label" for="custom-name">Nome da ação</label><input class="input" id="custom-name" maxlength="65" required placeholder="Ex.: revisar o portfólio"></div><div class="form-group"><label class="input-label" for="custom-cat">Área da vida</label><select id="custom-cat" class="select">${Object.entries(CATEGORIES).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}</select></div><div class="form-group"><label class="input-label" for="custom-diff">Intensidade</label><select id="custom-diff" class="select"><option value="10">Leve · 10 XP</option><option value="16" selected>Moderada · 16 XP</option><option value="22">Profunda · 22 XP</option></select></div></div><button class="btn btn-primary" type="submit">✦ Criar missão</button><p class="mini-note">Máximo de 25 missões próprias. Cada missão concede XP uma vez por dia.</p></form>${state.custom.length?`<div class="subheading">MINHAS MISSÕES</div><div class="quest-list">${state.custom.map(t=>`<div class="quest-row"><div class="quest-info"><strong>${escapeHTML(t.name)}</strong><span>${CATEGORIES[t.cat]?.label||'Pessoal'} · +${Number(t.xp)} XP</span></div><button class="btn btn-small btn-danger" data-remove-custom="${escapeHTML(t.id)}">Excluir</button></div>`).join('')}</div>`:''}</div>
 ${section('Log pessoal','Um espaço opcional e local para registrar o que vale lembrar')}<div class="journal-card"><label class="input-label" for="day-journal">O que aconteceu hoje? O que você sentiu, aprendeu ou quer preservar?</label><textarea class="textarea" id="day-journal" placeholder="Nem toda evolução faz barulho. Algumas apenas reorganizam o sistema...">${escapeHTML(d.journal)}</textarea><div class="mini-note small-mt">Salvo automaticamente neste navegador. Não é enviado a nenhum servidor.</div></div>`;}
function battle(stats){const wk=weekKey(),w=currentWeek(),boss=bossFor(wk),today=todayKey();const attacks=w.attacks[today]||0;const can=stats.todayXP>=35&&attacks<2&&!w.defeated;return `${heading('Arena de Interferências','Um duelo simbólico, inspirado nos dados de vinte faces dos RPGs clássicos.',`<span class="level-badge">CHEFE SEMANAL</span>`)}
 <div class="grid-two"><div class="panel"><div class="battle-scene"><div class="boss-figure" aria-hidden="true">${boss.glyph}</div><div class="boss-name">${boss.name}</div><small>${boss.desc}</small></div><div class="strong-mt split-wrap"><h3>⚔ Integridade do chefe</h3><span class="nowrap">${Math.max(0,w.hp)} / ${w.max} PV</span></div>${progress(w.hp/w.max*100,'red')}<p class="subtle">Venceu? Ganhe +140 XP, +65 moedas e uma conquista. O chefe se renova a cada semana.</p><div class="split-wrap"><div><span class="tag">D20 + ${CLASSES[state.player.class].title}</span><span class="tag">${attacks}/2 turnos hoje</span></div>${w.defeated?`<span class="quest-done">✓ CHEFE VENCIDO</span>`:`<button class="btn btn-primary" data-attack="1" ${can?'':'disabled'}>⚔ Rolar D20 e atacar</button>`}</div>${stats.todayXP<35&&!w.defeated?`<div class="callout">Conquiste pelo menos 35 XP com as atividades de hoje para liberar a arena. Você tem ${stats.todayXP} XP hoje.</div>`:''}${attacks>=2&&!w.defeated?`<div class="callout">Seus dois turnos de hoje acabaram. A batalha pode continuar em outro dia desta semana.</div>`:''}<div class="feature-note strong-mt">O combate é uma metáfora dos obstáculos cotidianos. Dados baixos não reduzem seu nível, XP ou atributos. O importante acontece fora da arena.</div></div>
 <div class="panel"><div class="panel-top"><h3>☽ Crônica de combate</h3><span class="panel-sub">Semana de ${formatDate(wk,{day:'2-digit',month:'short'})}</span></div><div class="combat-log">${w.log.length?w.log.slice().reverse().slice(0,12).map(l=>`<div class="combat-item ${l.type==='win'?'win':l.type==='critical'?'critical':''}"><div class="split-wrap"><span>${escapeHTML(l.message)}</span>${l.roll?`<span class="dice-result" style="width:35px;height:35px;font-size:15px">${l.roll}</span>`:''}</div><div class="panel-sub small-mt">${escapeHTML(l.when||'')}</div></div>`).join(''):`<div class="empty-state"><span>⚔</span>A arena está silenciosa. Registre ações reais para conquistar turnos de combate.</div>`}</div><div class="strong-mt"><h3>Como funcionam os confrontos?</h3><p class="panel-p">Você lança um D20 e soma um bônus de atributo ligado à classe. Se superar a defesa do inimigo, causa dano. Um 20 natural é crítico. Um 1 natural erra. São até 2 ataques por dia, após ganhar 35 XP reais.</p></div></div></div>`;}
function chronicle(stats){const dates=[];for(let i=20;i>=0;i--){const dt=new Date();dt.setDate(dt.getDate()-i);dates.push(todayKey(dt));}const lastDays=dates.slice(-14).reverse();const unlocked=ACHIEVEMENTS.filter(a=>a.check(stats));return `${heading('Arquivo de Crônicas','Sua campanha é escrita pelas ações que você realmente vive.',`<span class="level-badge">${unlocked.length} / ${ACHIEVEMENTS.length} CONQUISTAS</span>`)}
 ${section('Capítulos da campanha','Novos trechos surgem conforme você sobe de nível')}<div class="grid-two"><div class="panel">${CHAPTERS.map(ch=>`<div class="chapter ${stats.level<ch.level?'locked':''}"><small>${stats.level<ch.level?`BLOQUEADO · NÍVEL ${ch.level}`:`DESBLOQUEADO · NÍVEL ${ch.level}`}</small><h3>${ch.title}</h3><p>${stats.level>=ch.level?ch.desc:'Continue vivendo a jornada para revelar este capítulo.'}</p></div>`).join('')}</div><div class="panel"><h3>✧ Últimas duas semanas</h3><p class="panel-sub">Dias sem registro não retiram nenhum ponto.</p><div class="calendar-grid">${lastDays.map(k=>{const o=state.days[k]?.completed||{};const n=Object.keys(o).length;return `<div class="calendar-day ${n?'active':''} ${k===todayKey()?'today':''}" title="${formatDate(k)}: ${n} ações"><div class="dayweek">${formatDate(k,{weekday:'short'}).replace('.','')}</div><div class="daynum">${Number(k.slice(-2))}</div><div class="dayxp">${n?n+' ações':'·'}</div></div>`;}).join('')}</div><div class="strong-mt"><div class="kpi-line"><span>Dias vividos com registros</span><strong>${stats.activeDays}</strong></div><div class="kpi-line"><span>Total de ações</span><strong>${stats.actions}</strong></div><div class="kpi-line"><span>Chefes vencidos</span><strong>${stats.bossWins}</strong></div><div class="kpi-line"><span>Maior número de ações em um dia</span><strong>${stats.maxDay}</strong></div></div><div class="strong-mt"><h3>Últimos registros</h3>${lastDays.slice(0,7).map(k=>`<div class="history-item"><span>${formatDate(k,{weekday:'short',day:'numeric',month:'short'})}</span><strong>${stats.daysXP[k]||0} XP</strong></div>`).join('')}</div></div></div>
 ${section('Conquistas & Insígnias','Marcos de evolução, sem competição com outras pessoas')}<div class="adventure-grid">${ACHIEVEMENTS.map(a=>{const ok=a.check(stats);return `<div class="achievement ${ok?'':'locked'}"><div class="ach-icon">${a.glyph}</div><div><strong>${a.name}${ok?' ✓':''}</strong><small>${a.desc}</small></div></div>`;}).join('')}</div>`;}
function profile(stats){const p=state.player;const classInfo=CLASSES[p.class];const unlocked=state.shop.unlocked||[];return `${heading('Perfil de Operador','Atributos evoluem com a vida cotidiana. Troque de classe quando quiser.',`<span class="level-badge">${getRank(stats.level).toUpperCase()}</span>`)}
 <div class="grid-two"><div class="panel"><div class="hero-profile"><div class="portrait" style="${state.shop.equipped==='estrela'?'box-shadow:0 0 0 4px #ad9af85c,0 0 28px #a99bfa88;':state.shop.equipped==='ferro'?'box-shadow:0 0 0 4px #b2585988,0 0 28px #dd858799;':state.shop.equipped==='portal'?'box-shadow:0 0 0 4px #e5b668aa,0 0 32px #f6d49799;':''}">${classInfo.glyph}</div><div><div class="profile-name">${escapeHTML(p.name)}</div><div class="profile-title">${classInfo.title} · ${getRank(stats.level)}</div><div class="small-mt"><span class="level-badge">NÍVEL ${stats.level}</span></div></div></div><div class="strong-mt">${progress(stats.levelData.ratio)}<div class="progress-txt"><span>${stats.levelData.progress}/${stats.levelData.next} XP</span><span>Próximo nível: ${stats.level+1}</span></div></div><div class="form-group"><label class="input-label" for="player-name">Nome do personagem</label><div class="form-row"><input class="input" id="player-name" maxlength="40" value="${escapeHTML(p.name)}"><button class="btn btn-primary" data-rename="1">Salvar nome</button></div></div><div class="feature-note">Seu personagem é uma leitura lúdica da vida real. Nenhum atributo mede seu valor pessoal, sua saúde ou sua dignidade.</div></div>
 <div class="panel"><h3>◇ Atributos</h3>${Object.entries(ATTRIBUTES).map(([k,a])=>`<div class="attribute"><div class="attribute-symbol">${a.icon}</div><div class="attribute-info"><strong>${a.label}</strong><p>${a.desc}</p></div><span class="attribute-value">${stats.stats[k]}</span></div>`).join('')}<p class="mini-note small-mt">Base de 8 pontos. Sua classe oferece +4 na especialidade. A cada 3 ações de um atributo, ele recebe +1.</p></div></div>
 ${section('Escolha seu arquétipo','Classes com leitura futurista para estilos diferentes de evolução')}<div class="class-list">${Object.entries(CLASSES).map(([k,c])=>`<button class="class-choice ${p.class===k?'selected':''}" data-class="${k}"><span>${c.glyph}</span><span><strong>${c.title} ${p.class===k?'✓':''}</strong><small>${c.desc}</small></span></button>`).join('')}</div>
 ${section('Mercado de Mods','Troque moedas fictícias por aparências, não por vantagem competitiva')}<div class="panel"><div class="split-wrap bottom-gap"><h3>◈ Seu tesouro</h3><span class="level-badge money-badge">${stats.coins} MOEDAS</span></div><div class="quest-list">${SHOP.map(it=>{const has=unlocked.includes(it.id),equip=state.shop.equipped===it.id;return `<div class="shop-item"><div class="shop-icon">${it.glyph}</div><div class="shop-text"><strong>${it.name}</strong><p>${it.desc}</p></div><button class="btn btn-small ${has?'btn-alt':'btn-primary money-btn'}" data-shop="${it.id}" ${equip||(!has&&stats.coins<it.price)?'disabled':''}>${equip?'Equipado':has?'Equipar':`${it.price} ◈`}</button></div>`;}).join('')}</div></div>
 ${section('Dados, Backup & Privacidade','Pronto para publicação estática e compartilhamento seguro')}<div class="panel"><p class="panel-p">O jogo funciona no navegador, sem conta, sem banco de dados e sem rastreadores. Para jogar em outro aparelho, exporte seu arquivo de progresso e importe-o lá. O link público serve o jogo para qualquer pessoa, mas os dados continuam locais em cada navegador.</p><div class="profile-actions"><button class="btn btn-primary" data-export="1">⇩ Exportar progresso</button><button class="btn btn-alt" data-import="1">⇧ Importar progresso</button><button class="btn btn-danger" data-reset="1">Apagar meus dados</button><input id="import-file" type="file" accept=".json,application/json" hidden></div><p class="mini-note small-mt">Não inclua dados sensíveis no diário se for compartilhar o arquivo de save. Se limpar os dados do navegador sem exportar um backup, o progresso poderá se perder. Para publicar com segurança, prefira hospedagem estática em HTTPS.</p></div>`;}
function render(){const t=todayKey();if(t!==lastDay){lastDay=t;taskFilter='todos';}const stats=countRecords();let content;
 switch(view){case 'missoes':content=missions(stats);break;case 'batalha':content=battle(stats);break;case 'cronicas':content=chronicle(stats);break;case 'personagem':content=profile(stats);break;default:content=home(stats);}
 document.getElementById('app').innerHTML=shell(content,stats);document.title=`Crônicas do Limiar // Neon | ${view==='inicio'?'RPG da Vida Real':view[0].toUpperCase()+view.slice(1)}`;
}
function toggleTask(id){const d=currentDay();const t=getAllTasks().find(x=>x.id===id);if(!t)return;if(d.completed[id]){delete d.completed[id];showToast('Registro desfeito. Tudo bem corrigir a rota.');}else{const total=Object.keys(d.completed).length;if(total>=35){showToast('Limite diário de registros alcançado.');return;}d.completed[id]={id:t.id,name:t.name,cat:t.cat,stat:t.stat,xp:t.xp,coins:toCoins(t.xp)};if(coachActive){coachActive=false;showToast(`✓ Primeira missão registrada! Você ganhou ${t.xp} XP.`);}else{showToast(`✦ ${t.name} · +${t.xp} XP`);}}save();render();}
function claimQuest(id){const d=currentDay();if(id==='weekly'){const w=currentWeek();if(w.weeklyClaimed||daysThisWeek()<4)return;w.weeklyClaimed=true;showToast(`✦ Ritual semanal concluído · +${WEEK_QUEST.xp} XP`);}else{const q=QUESTS[id];if(!q||d.claimed.includes(id)||!q.check(d))return;d.claimed.push(id);showToast(`✦ ${q.name} · +${q.xp} XP`);}save();render();}
function attack(){const stats=countRecords(),w=currentWeek(),today=todayKey();if(w.defeated||stats.todayXP<35||(w.attacks[today]||0)>=2)return;const n=(w.attacks[today]||0)+1;w.attacks[today]=n;const roll=1+Math.floor(Math.random()*20);const attr=CLASSES[state.player.class].buff;const bonus=Math.max(0,Math.floor((stats.stats[attr]-8)/3));const hit=roll!==1&&(roll===20||roll+bonus>=11);const critical=roll===20;const damage=hit?(critical?30+stats.level:8+Math.floor(roll/3)+Math.floor(stats.level/2)):0;w.hp=Math.max(0,w.hp-damage);let type=critical?'critical':hit?'hit':'miss';let msg=critical?`CRÍTICO! D20 = 20. Você causou ${damage} pontos de dano.`:hit?`D20 = ${roll} (+${bonus}). Você atingiu a sombra por ${damage} pontos.`:`D20 = ${roll} (+${bonus}). O chefe escapou, mas sua jornada continua.`;
 w.log.push({when:new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date()),roll,type,message:msg});if(w.hp<=0){w.defeated=true;w.log.push({when:'Chefe derrotado',type:'win',message:'O chefe foi vencido! +140 XP, +65 moedas e uma insígnia.'});showToast('⚔ Vitória! O chefe foi derrotado. +140 XP');}else{showToast(critical?'✦ ACERTO CRÍTICO!':hit?`⚔ Ataque: ${damage} de dano`:'O dado não ajudou desta vez. Sem perdas.');}save();render();}
function createCustom(){const name=document.getElementById('custom-name')?.value.trim().replace(/\s+/g,' ');const cat=document.getElementById('custom-cat')?.value;const xp=Number(document.getElementById('custom-diff')?.value);if(!name||name.length>65||!CATEGORIES[cat]||![10,16,22].includes(xp)){showToast('Revise os dados da missão.');return;}if(state.custom.length>=25){showToast('Limite de 25 missões próprias atingido.');return;}const statMap={essencias:'corpo',natureza:'corpo',oficio:'mente',arte:'arte',vinculos:'vinculos'};const id='custom-'+Date.now()+'-'+Math.random().toString(36).slice(2,6);state.custom.push({id,name,desc:'Missão personalizada criada por você.',xp,cat,stat:statMap[cat]});save();render();showToast('✦ Nova missão adicionada ao terminal.');}
function removeCustom(id){const task=state.custom.find(t=>t.id===id);if(!task)return;if(!confirm(`Excluir a missão "${task.name}"? O histórico já registrado será preservado.`))return;state.custom=state.custom.filter(t=>t.id!==id);save();render();showToast('Missão excluída. O histórico continua salvo.');}
function rename(){const name=document.getElementById('player-name')?.value.trim();if(!name||name.length>40){showToast('Digite um nome com até 40 caracteres.');return;}state.player.name=name;save();render();showToast('O personagem recebeu seu novo nome.');}
function shop(id){const item=SHOP.find(x=>x.id===id);if(!item)return;if(state.shop.unlocked.includes(id)){state.shop.equipped=id;showToast(`${item.name} equipado.`);}else{if(countRecords().coins<item.price)return;state.shop.spent+=item.price;state.shop.unlocked.push(id);state.shop.equipped=id;showToast(`Relíquia adquirida: ${item.name}.`);}save();render();}
function exportSave(){const payload=JSON.stringify({...state,exportedAt:new Date().toISOString(),app:'Cronicas do Limiar // Neon'},null,2);const blob=new Blob([payload],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`cronicas-do-limiar-neon-save-${todayKey()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('Backup do progresso preparado.');}
function importSave(file){if(!file||file.size>3*1024*1024){showToast('Arquivo inválido ou maior que 3 MB.');return;}const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(String(reader.result));if(parsed.version!==1||!parsed.days||typeof parsed.days!=='object'||Array.isArray(parsed.days))throw Error('invalid');if(!confirm('Importar o save substituirá todo o progresso atual deste navegador. Continuar?'))return;state=normalize(parsed);save();render();showToast('O save foi restaurado com sucesso.');}catch(e){showToast('O arquivo não é um save válido deste jogo.');}};reader.readAsText(file,'utf-8');}
function resetSave(){if(!confirm('Apagar TODO o progresso, diário e dados deste navegador? Esta ação não pode ser desfeita.'))return;if(!confirm('Última confirmação: você já exportou um backup, se precisar?'))return;localStorage.removeItem(STORAGE_KEY);state=normalize({});view='inicio';render();showToast('Um novo perfil foi iniciado.');}

document.addEventListener('click',ev=>{const button=ev.target.closest('button');if(!button)return;const a=button.dataset;
 if(a.quick){handleQuickStart(a.quick);return;}
 if(a.feedback){if(a.feedback==='open')openFeedback();else if(a.feedback==='close')closeFeedback();else if(a.feedback==='copy')copyFeedback();return;}
 if(a.tutorial){handleTutorialAction(a.tutorial);return;}
 if(a.coachDismiss){coachActive=false;render();return;}
 if(a.page){view=a.page;window.scrollTo({top:0,behavior:'instant'});render();return;}
 if(a.task){toggleTask(a.task);return;}
 if(a.quest){claimQuest(a.quest);return;}
 if(a.filter){taskFilter=a.filter;render();return;}
 if(a.attack){attack();return;}
 if(a.class){state.player.class=a.class;save();render();showToast(`Classe selecionada: ${CLASSES[a.class].title}`);return;}
 if(a.removeCustom){removeCustom(a.removeCustom);return;}
 if(a.rename){rename();return;}
 if(a.shop){shop(a.shop);return;}
 if(a.export){exportSave();return;}
 if(a.import){document.getElementById('import-file')?.click();return;}
 if(a.reset){resetSave();return;}
});
document.addEventListener('keydown',ev=>{
 if(quickStartOpen||feedbackOpen){
  if(ev.key==='Escape'){ev.preventDefault();if(quickStartOpen)closeQuickStart();else closeFeedback();return;}
  if(ev.key==='Tab'){const root=document.getElementById(quickStartOpen?'quickstart-root':'feedback-root');const fields=[...(root?.querySelectorAll('button,textarea')||[])].filter(x=>!x.disabled);if(fields.length){if(ev.shiftKey&&document.activeElement===fields[0]){ev.preventDefault();fields.at(-1).focus();}else if(!ev.shiftKey&&document.activeElement===fields.at(-1)){ev.preventDefault();fields[0].focus();}}}return;
 }
 if(!tutorialOpen)return;
 if(ev.key==='Escape'){ev.preventDefault();closeTutorial();return;}
 if(ev.key!=='Tab')return;
 const dialog=document.querySelector('.tutorial-dialog');if(!dialog)return;
 const options=[...dialog.querySelectorAll('button:not([disabled])')];if(!options.length)return;
 const first=options[0],last=options[options.length-1];
 if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
 else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
});
document.addEventListener('click',ev=>{
 if(tutorialOpen&&ev.target instanceof Element&&ev.target.matches('[data-tutorial-backdrop]'))closeTutorial();
});
document.addEventListener('submit',ev=>{if(ev.target.id==='custom-form'){ev.preventDefault();createCustom();}});
document.addEventListener('input',ev=>{if(ev.target.id==='day-journal'){currentDay().journal=ev.target.value.slice(0,6000);save();}});
document.addEventListener('change',ev=>{if(ev.target.id==='import-file')importSave(ev.target.files?.[0]);});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&todayKey()!==lastDay){render();}});
window.addEventListener('pageshow',()=>{if(todayKey()!==lastDay)render();});
currentDay();currentWeek();save();render();
try{if(countRecords().actions===0&&localStorage.getItem(QUICKSTART_KEY)!=='seen'&&localStorage.getItem(TUTORIAL_KEY)!=='seen')showQuickStart();}catch(e){if(countRecords().actions===0)showQuickStart();}
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});

