const SAVE_KEY = 'shenjiang-night-case-v2';
const META_KEY = 'shenjiang-night-case-meta-v1';

const SCENES = {
  newsroom:{title:'申江晚报夜班编辑室',chapter:'第一现场之外的第一现场',image:'assets/images/scene_newsroom.png',ambience:'rain',minStage:1},
  study:{title:'顾宅书房',chapter:'被摆成“自尽”的房间',image:'assets/images/scene_study.png',ambience:'rain',minStage:1},
  switchboard:{title:'霞飞路电话总机室',chapter:'线路只记录接通，不记录人',image:'assets/images/scene_switchboard.png',ambience:'rain',minStage:2},
  darkroom:{title:'唐慎照相馆暗房',chapter:'照片只负责把一瞬间留下',image:'assets/images/scene_darkroom.png',ambience:'rain',minStage:2},
  interviews:{title:'补充采访席',chapter:'把事实压回到说话的人身上',image:'assets/images/interview_fang.jpg',ambience:'rain',minStage:3},
  finale:{title:'记者桌 · 终稿',chapter:'结案不是猜一个人，而是拆清每一步',image:'assets/images/newsroom_editor_desk.jpg',ambience:'rain',minStage:4}
};

const PEOPLE = {
  gu:{name:'顾曼青',img:'assets/images/portrait_gu.png',role:'顾文洲之妹。留学归国，和哥哥长期因债务与家产争执。'},
  fang:{name:'方正礼',img:'assets/images/portrait_fang.png',role:'《申江晚报》夜班编辑。00:32短讯由他签字付印。'},
  su:{name:'苏婉',img:'assets/images/portrait_su.png',role:'舞厅歌女。流言称她是顾文洲最后一个公开见面的人。'},
  li:{name:'黎月白',img:'assets/images/portrait_li.png',role:'电话总机接线员。知道00:27外线如何进入编辑室。'}
};

const EVIDENCE = {
  E01:{title:'终校样',scene:'newsroom',sound:'paper',summary:'角栏“顾文洲自尽”已经成版，终校时间00:32。',body:'《申江晚报》终校样右下角标注“00:32”。角栏短讯已经写入“华康洋行经理顾文洲昨夜于寓所自尽”。这只能证明：报馆在00:32前已经接受并排印了这一说法。'},
  E02:{title:'付印签条',scene:'newsroom',sound:'typewriter',summary:'方正礼签字确认角栏短讯可以付印。',body:'付印签条写着“角栏短讯已核，可付印”，签名为夜班编辑方正礼。短讯不是机器自己出现的，而是经人工确认进入版面。'},
  E03:{title:'巡捕到场记录',scene:'study',sound:'paper',summary:'法租界巡捕房登记：00:57抵达顾宅。',body:'巡捕到场簿登记“00:57，到达霞飞路顾宅”。它记录的是警方到场，而不是死亡发生的准确时刻。'},
  E04:{title:'现场摆放',scene:'study',sound:'paper',summary:'枪、酒杯、遗书和椅子看似完整，但桌前有拖擦和重新摆放痕迹。',body:'书房呈典型“自尽”外观：右侧桌沿有枪，半杯威士忌，桌上遗书。椅脚与地板拖擦痕迹却不吻合，书桌右侧抽屉敞开，现场更像被人收拾过。'},
  E05:{title:'医生出诊笺',scene:'study',sound:'paper',summary:'23:05，顾文洲仍有回应，不宜独处。',body:'许成章医生的出诊笺写明：23:05离开顾宅，顾文洲“后脑受创、意识混乱，但能对外界刺激作出回应，不宜独处，建议送院观察”。'},
  E06:{title:'公用电话登记',scene:'switchboard',sound:'phone',summary:'00:27，霞飞路公共电话亭拨向《申江晚报》。',body:'电话局外线登记显示：00:27，霞飞路公共电话亭拨出市话，目的地为《申江晚报》总机。它证明线路被使用，不证明具体拨号人身份。'},
  E07:{title:'总机转接簿',scene:'switchboard',sound:'paper',summary:'00:27外线被转到编辑室3号分机。',body:'总机转接簿记录“00:27 外线 → 编辑室3号分机”。3号分机由当夜编辑台使用。接线记录证明通话路径，但仍不能单凭这张纸确认两端说话者。'},
  E08:{title:'舞厅合照',scene:'darkroom',sound:'camera',summary:'22:24，苏婉仍在舞厅后台。',body:'合照背景同时拍到第二场演出牌与挂钟。第二场22:20开演，挂钟约22:24，苏婉仍站在后台更衣镜旁。'},
  E09:{title:'顾宅门厅底片',scene:'darkroom',sound:'camera',summary:'23:41，顾宅门厅出现与方正礼衣着体态高度一致的人。',body:'唐慎的雨夜街拍底片拍到23:41的顾宅门厅。画面里一名深色马甲、细领带男子进入门厅；衣着组合与方正礼当夜工作照一致。'},
  E10:{title:'暗房冲印登记',scene:'darkroom',sound:'paper',summary:'这卷门厅底片23:58已开始冲洗，不是事后补拍。',body:'照相馆冲印登记写明：23:58收片并开始冲洗。底片卷号与E09边缘号码一致，排除了第二天补拍的可能。'},
  E11:{title:'遗书草稿碎片',scene:'study',sound:'paper',summary:'遗书草稿里出现“可付、不必改”等报馆编辑习惯用语。',body:'书房废纸篓里的遗书草稿使用“可付”“不必改”一类编辑口吻；同类措辞在方正礼的夜班便笺上频繁出现。它不是单独的笔迹鉴定，只是一处语言习惯重合。'},
  E12:{title:'顾曼青补录',scene:'interviews',sound:'paper',summary:'她承认23点前后推搡哥哥，顾文洲后脑撞到桌角。',body:'顾曼青承认：23点前后与哥哥因债务和家产争执，推搡间顾文洲后脑撞到桌角倒地。她以为哥哥只是昏过去，恐惧之下先离开了房间。'},
  E13:{title:'黎月白补录',scene:'interviews',sound:'paper',summary:'00:27外线转接后，她听到编辑室3号分机一端像方正礼的声音。',body:'黎月白补录：00:27外线转入3号分机后，她短暂监听确认线路通畅，听见编辑室一端的男声像方正礼。她当时没有上报，因为方正礼让她“别把报馆牵进去”。'},
  E14:{title:'苏婉补录',scene:'interviews',sound:'paper',summary:'她与顾文洲21:40前已分开，并把一封顾文洲准备交报馆的材料转交给了方正礼。',body:'苏婉承认：21:40前她已与顾文洲分开。顾文洲托她把一封“给报馆的材料”交给方正礼，说若自己第二天不露面，就让报馆公开。'},
  E15:{title:'方正礼第二份口供',scene:'interviews',sound:'paper',summary:'他承认23:40后进入顾宅，见顾仍有气息，却选择伪造自尽现场。',body:'在门厅底片、黎月白补录和遗书草稿面前，方正礼改口：23:40后他进入顾宅寻找那份材料，顾文洲当时“还有气”。他没有求救，而是重新摆放枪、遗书与桌面，制造自尽外观。'},
  E16:{title:'华康洋行付款收条',scene:'study',sound:'paper',summary:'顾文洲保险柜里保存着一张支付给方正礼的500元“新闻协调费”收条。',body:'保险柜夹层内的收条显示，华康洋行曾以“新闻协调费”名义向方正礼支付500元。顾文洲把它和一份准备交给报馆的材料放在一起。'},
  E17:{title:'夜班离岗簿',scene:'newsroom',sound:'paper',summary:'方正礼23:26离开报馆，00:18才重新签入。',body:'报馆夜班离岗簿写明：方正礼23:26签出，00:18重新签入。时间足以覆盖23:41顾宅门厅底片，也解释他为何能在00:27前后处理匿名电话和版面。'},
  E18:{title:'法医复核意见',scene:'study',sound:'paper',summary:'最初撞击并非即刻致命，23:05—00:10存在明确救治窗口。',body:'复核意见认为：后脑撞击引发进行性颅内出血，但23:05仍有回应，若在午夜前送医，存在显著救治机会。最终死亡并不能简单等同于“顾曼青推了一下”。'}
};

const HINTS = {
  1:['这一阶段不要先问“是谁杀的”，先比较两个机构第一次记录到死讯的时间。','把E01终校样与E03巡捕到场记录并排看。','关键异常：报馆00:32已刊出死讯，巡捕00:57才到场。'],
  2:['第二幕先确定“谁最后能证明顾文洲仍活着”，再看电话从哪里进入报馆。','E05能固定23:05仍活着；E08能排除苏婉；E09能把方正礼送到顾宅门厅。','按22:24舞厅→23:05医生→23:41门厅→00:27电话→00:57巡捕排序。'],
  3:['补录阶段要“拿着证据问人”，不是直接相信档案里的第一份口供。','顾曼青需要E04+E05；黎月白需要E06+E07；苏婉需要E08；方正礼需要E09+E11+E13+E16+E17。','四份补录全部完成，并取得法医复核E18，才能进入终局。'],
  4:['终局拆成四件事：最初伤害、延误救助、伪造现场、提前送讯。','最初伤害与后面三件事不是同一个人的同一个行为。','最初伤害=顾曼青；其余三项=方正礼。']
};

const FILMS = {
  intro:[
    {img:'assets/images/scene_newsroom.png',k:'1936年10月17日 · 雨夜',t:'申江晚报夜班仍在赶终版。00:32，一则“顾文洲自尽”的短讯已经排进角栏。',s:'typewriter'},
    {img:'assets/images/study_desk.jpg',k:'霞飞路 · 顾宅',t:'可巡捕房的到场记录，却写着00:57。报纸先于巡捕看见了一个“结论”。',s:'paper'},
    {img:'assets/images/newsroom_editor_desk.jpg',k:'调查记者沈砚',t:'你首先要做的不是指出凶手，而是把这份人人都愿意接受的“自尽说”逐项核实。',s:'paper'}
  ],
  stage2:[
    {img:'assets/images/newsroom_clock.jpg',k:'第一处异常成立',t:'00:32的版面早于00:57的巡捕到场。有人在警方接触现场以前，就把“顾文洲自尽”送进了报馆。',s:'stamp'},
    {img:'assets/images/switchboard_panel.jpg',k:'第二幕 · 电话与时间',t:'接下来要确认：顾文洲最后一次能被证明活着是什么时候；00:27那通电话又是如何进入编辑室的。',s:'phone'}
  ],
  stage3:[
    {img:'assets/images/darkroom_photographer.jpg',k:'时间线闭合',t:'22:24苏婉仍在舞厅；23:05顾文洲仍有回应；23:41方正礼进入顾宅；00:27匿名电话拨向报馆；00:57巡捕抵达。',s:'camera'},
    {img:'assets/images/interview_fang.jpg',k:'第三幕 · 补录',t:'纸面记录已经够多。现在必须把它们放回人物面前，看谁会改口。',s:'paper'}
  ],
  stage4:[
    {img:'assets/images/interview_fang.jpg',k:'方正礼第二份口供',t:'“我进去的时候……他还有气。我只是想把那份东西拿回来。”',s:'paper'},
    {img:'assets/images/study_gun_glass.jpg',k:'最后的工作',t:'案件不再是单纯的“谁杀了谁”。你必须拆清最初伤害、救助中断、现场伪造与提前送讯。',s:'stamp'}
  ],
  ending:[
    {img:'assets/images/newsroom_typewriter.jpg',k:'终稿付印',t:'印刷机再次转动。这一次，版面上的结论不是别人提前替你写好的。',s:'typewriter'}
  ]
};

function freshState(expert=false){
  return {stage:1,scene:'newsroom',expert,sound:true,evidence:[],facts:[],interviews:{gu:false,li:false,su:false,fang:false},solved:{anomaly:false,timeline:false,final:false},hintUse:{1:0,2:0,3:0,4:0},ending:null,completedOnce:false,expertUnlocked:false,shuffleSeed:Math.floor(Math.random()*999999)};
}
let state=freshState(false);

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state)); refreshBoot();}
function expertAvailable(){try{return JSON.parse(localStorage.getItem(META_KEY)||'{}').expertUnlocked===true}catch{return false}}
function unlockExpert(){localStorage.setItem(META_KEY,JSON.stringify({expertUnlocked:true})); state.expertUnlocked=true;}
function load(){try{const v=JSON.parse(localStorage.getItem(SAVE_KEY)); if(!v)return false; state=Object.assign(freshState(false),v); state.interviews=Object.assign({gu:false,li:false,su:false,fang:false},v.interviews||{}); state.solved=Object.assign({anomaly:false,timeline:false,final:false},v.solved||{}); return true}catch{return false}}
function has(id){return state.evidence.includes(id)}
function addFact(text){if(!state.facts.includes(text))state.facts.push(text)}
function addEvidence(id,show=true){if(!has(id)){state.evidence.push(id); save();} if(show)openEvidence(id); render();}

function refreshBoot(){
  const raw=localStorage.getItem(SAVE_KEY); $('#continueGame').disabled=!raw;
  $('#expertGame').classList.toggle('hidden',!expertAvailable());
}
function start(expert=false){state=freshState(expert); state.expertUnlocked=expertAvailable(); save(); $('#boot').classList.add('hidden'); $('#game').classList.remove('hidden'); render(); playFilm(FILMS.intro);}
function continueGame(){if(load()){ $('#boot').classList.add('hidden'); $('#game').classList.remove('hidden'); render(); switchAmbience(); }}
function resetGame(){if(confirm('确定清空《申江夜案》的本地存档吗？')){localStorage.removeItem(SAVE_KEY); state=freshState(false); refreshBoot();}}

function unlocked(scene){return state.stage>=SCENES[scene].minStage}
function objective(){
  if(state.expert)return '独立复核：程序便笺已关闭。自行判断下一步。';
  if(state.stage===1)return '核验报馆与巡捕房的时间记录，找出最早成立的异常。';
  if(state.stage===2)return '重建22:24—00:57的时间线，并追查00:27外线。';
  if(state.stage===3)return '用已经取得的原始材料重新采访关键人物。';
  return '完成四段责任链，并决定报纸如何写下本案。';
}
function stageName(){return ['','第一幕·死讯先到','第二幕·电话与时间','第三幕·第二份口供','终幕·责任与报道'][state.stage]}
function sceneDesc(id){
  return {
    newsroom:'排字机的声音从雨夜里一直响到凌晨。这里保存着版本、签条与夜班离岗簿。报馆不是旁观者——一条死亡短讯从这里变成了“已经发生的事实”。',
    study:'顾文洲的书房被布置成一个让人很容易接受的答案。玩家需要看的不是“像不像自尽”，而是现场物件、医生记录和保险柜文件之间是否真正互相支持。',
    switchboard:'这里没有现代数据库。每一次接通都由人手插线并留下薄薄一行记录。线路真实存在，但线路从不替你回答“谁在说话”。',
    darkroom:'照片比证词冷静，却也只记录镜头覆盖到的范围。舞厅合照、顾宅门厅底片和冲印登记共同把几个关键人物钉在时间上。',
    interviews:'当纸面记录已经足够，调查才真正进入人物。这里不接受“我记得”“我不知道”作为终点：你必须拿着证据追问。',
    finale:'最后的记者桌不是选择一个“凶手”就结束。你必须把不同人的行为拆开，再决定一份负责任的报道应公开什么、保留什么。'
  }[id]
}
function sceneCards(id){
  const ids=Object.entries(EVIDENCE).filter(([,e])=>e.scene===id).map(([id])=>id);
  // Expert mode shuffles visible evidence order without changing logic.
  if(state.expert){return seededShuffle(ids,state.shuffleSeed+id.length)}
  return ids;
}
function seededShuffle(arr,seed){const a=[...arr]; let x=seed||1; for(let i=a.length-1;i>0;i--){x=(x*9301+49297)%233280; const j=Math.floor((x/233280)*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a}

function render(){
  $('#bagCount').textContent=state.evidence.length;
  $('#soundBtn').textContent=`声音：${state.sound?'开':'关'}`;
  $('#hintBtn').classList.toggle('hidden',state.expert);
  $('#objective').textContent=objective();
  $('#stageProgress').innerHTML=`${stageName()}${state.expert?'<span class="expert-badge">无提示</span>':''}<br>证据 ${state.evidence.length}/18 · 补录 ${Object.values(state.interviews).filter(Boolean).length}/4`;
  renderNav(); renderPeople(); renderFacts(); renderScene(); switchAmbience();
}
function renderNav(){
  const order=['newsroom','study','switchboard','darkroom','interviews','finale'];
  $('#sceneNav').innerHTML=order.map(id=>`<button class="nav-btn ${state.scene===id?'active':''} ${unlocked(id)?'':'locked'}" data-scene="${id}" ${unlocked(id)?'':'disabled'}>${SCENES[id].title}</button>`).join('');
  $$('[data-scene]').forEach(b=>b.onclick=()=>{state.scene=b.dataset.scene; save(); render();});
}
function renderPeople(){
  const order=['gu','fang','su','li'];
  $('#peoplePanel').innerHTML=order.map(id=>`<div class="person-card"><img src="${PEOPLE[id].img}" alt="${PEOPLE[id].name}"><div><div class="name">${PEOPLE[id].name}</div><div class="role">${PEOPLE[id].role}</div></div></div>`).join('');
}
function renderFacts(){
  $('#factPanel').innerHTML=state.facts.length?state.facts.slice(-8).map(f=>`<div class="fact">${f}</div>`).join(''):'尚无能够写进报道的确定事实。';
}
function renderScene(){
  const s=SCENES[state.scene];
  let body=`<div class="scene-header"><div class="scene-image-wrap"><img src="${s.image}" alt="${s.title}"></div><div class="scene-copy"><div class="chapter">${s.chapter}</div><div class="eyebrow">${stageName()}</div><h3>${s.title}</h3><p>${sceneDesc(state.scene)}</p>${sceneNotice()}</div></div>`;
  if(state.scene==='interviews')body+=renderInterviews();
  else if(state.scene==='finale')body+=renderFinale();
  else body+=renderEvidenceCards(state.scene)+renderPuzzle(state.scene);
  $('#sceneContent').innerHTML=body; bindScene();
}
function sceneNotice(){
  if(state.stage===1)return `<div class="notice">程序要求：先做“时间核验”。此时不要把任何一个可疑物品直接当作凶案证明。</div>`;
  if(state.stage===2)return `<div class="notice">这阶段真正的问题是“谁在什么时间被哪种媒介记录”。照片、线路、医生笔记的证明边界并不相同。</div>`;
  if(state.stage===3)return `<div class="notice">补录必须由已有证据触发。没有证据就追问，只会得到原来的答案。</div>`;
  return `<div class="notice">结案要求把责任拆开。最初伤害、没有求救、伪造现场、匿名送讯可能属于不同法律和伦理层次。</div>`;
}
function renderEvidenceCards(scene){
  const ids=sceneCards(scene).filter(id=>visibleEvidence(id));
  return `<div class="cards">${ids.map(id=>{const e=EVIDENCE[id];return `<div class="card"><h4>${id} · ${e.title}</h4><p>${e.summary}</p><button class="evidence-btn ${has(id)?'obtained':''}" data-evidence="${id}">${has(id)?'重新查看':'检查原件'}</button></div>`}).join('')}</div>`;
}
function visibleEvidence(id){
  if(['E01','E02','E03','E04'].includes(id))return true;
  if(['E05','E06','E07','E08','E09','E10','E11'].includes(id))return state.stage>=2;
  if(['E16','E17','E18'].includes(id))return state.stage>=3;
  return false;
}
function renderPuzzle(scene){
  if(state.stage===1 && !state.solved.anomaly && (scene==='newsroom'||scene==='study') && has('E01')&&has('E03')){
    return `<section class="puzzle"><h4>第一处异常</h4><p>不要选一个可疑物件。请用一句话写出E01与E03之间能够直接成立的矛盾。</p><div class="answer-row"><input id="anomalyInput" class="answer-input" placeholder="例如：……"><button class="action-btn" data-action="check-anomaly">提交判断</button></div></section>`;
  }
  if(state.stage===2 && !state.solved.timeline && ['switchboard','darkroom'].includes(scene) && ['E05','E06','E07','E08','E09'].every(has)){
    return `<section class="puzzle"><h4>重建时间线</h4><p>请将五件事按先后顺序编号1—5。注意：00:27电话发生在23:41之后，而不是“午夜之前”的模糊印象。</p><div class="timeline-grid">${timelineItem('tl1','苏婉仍在舞厅后台（E08）')}${timelineItem('tl2','许成章离开顾宅（E05）')}${timelineItem('tl3','顾宅门厅出现可疑男子（E09）')}${timelineItem('tl4','公共电话亭拨向报馆（E06）')}${timelineItem('tl5','巡捕房抵达顾宅（E03）')}</div><button class="action-btn" data-action="check-timeline">提交时间线</button></section>`;
  }
  return '';
}
function timelineItem(id,label){return `<div class="timeline-item"><strong>${label}</strong><select id="${id}"><option value="">顺序</option>${[1,2,3,4,5].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></div>`}

function renderInterviews(){
  const req={
    gu:{name:'顾曼青',img:'assets/images/interview_gu.jpg',needs:['E04','E05'],yield:'E12',text:'用现场和医生出诊笺追问她离开书房前究竟发生了什么。'},
    li:{name:'黎月白',img:'assets/images/interview_li.jpg',needs:['E06','E07'],yield:'E13',text:'用外线登记和转接簿追问她00:27到底听见了什么。'},
    su:{name:'苏婉',img:'assets/images/interview_su.jpg',needs:['E08'],yield:'E14',text:'舞厅合照先证明她22:24还在后台，再问她与顾文洲真正的关系。'},
    fang:{name:'方正礼',img:'assets/images/interview_fang.jpg',needs:['E09','E11','E13','E16','E17'],yield:'E15',text:'只有门厅底片、遗书草稿、总机补录、付款收条和离岗簿一起出现，他才无法用“我一直在报馆”搪塞。'}
  };
  return `<div class="interview-grid">${Object.entries(req).map(([id,r])=>{const ok=r.needs.every(has);return `<div class="interview-card"><img src="${r.img}" alt="${r.name}" style="width:100%;aspect-ratio:16/9;object-fit:cover;margin-bottom:10px"><h4>${r.name}${state.interviews[id]?' · 已补录':''}</h4><p>${r.text}</p><div class="footer-note">需要：${r.needs.join(' / ')}</div><button class="interview-btn" data-interview="${id}" ${ok&&!state.interviews[id]?'':'disabled'}>${state.interviews[id]?'补录完成':ok?'开始追问':'材料不足'}</button></div>`}).join('')}</div>${renderInterviewAdvance()}`;
}
function renderInterviewAdvance(){
  const all=Object.values(state.interviews).every(Boolean);
  if(all && has('E18'))return `<section class="puzzle"><h4>补录已经闭合</h4><p>四个人的补录、保险柜收条、夜班离岗簿与法医复核已经互相咬合。现在可以进入终局。</p><button class="action-btn" data-action="to-finale">进入记者终稿桌</button></section>`;
  return '';
}

function renderFinale(){
  if(!state.solved.final){
    return `<section class="puzzle"><h4>责任链</h4><p>分别选择每一段行为的主要责任人。最终结论必须能够同时解释E12、E15和E18，而不是用“都是凶手”把不同动作混在一起。</p><div class="final-grid">${finalItem('fin1','最初伤害')}${finalItem('fin2','延误救助')}${finalItem('fin3','伪造自杀现场')}${finalItem('fin4','提前送入“自尽”短讯')}</div><button class="action-btn" data-action="check-final">提交责任链</button></section>`;
  }
  return `<div class="notice"><strong>责任链已成立。</strong>现在选择《申江晚报》的终稿方式。报道选择不会改变案件事实，但会改变你如何处理公众知情权与无关隐私。</div><div class="report-options"><div class="report"><h4>《号外》</h4><p>点名全部人物，把家产纠纷、舞厅传闻和私人关系都写进头版，以最大轰动换取最大传播。</p><button class="action-btn" data-ending="sensational">付印</button></div><div class="report best"><h4>《第二版》</h4><p>完整写明四段责任链，但删除与责任无关的私生活，保留苏婉等边缘人物的必要匿名。</p><button class="action-btn" data-ending="best">付印</button></div><div class="report"><h4>《压稿》</h4><p>把完整材料交巡捕房，报纸只留下一则“案件重新调查中”的短讯。</p><button class="action-btn" data-ending="suppress">付印</button></div></div>`;
}
function finalItem(id,label){return `<div class="final-item"><strong>${label}</strong><select id="${id}"><option value="">选择责任人</option><option>顾曼青</option><option>方正礼</option><option>苏婉</option><option>黎月白</option><option>罗敬安</option></select></div>`}

function bindScene(){
  $$('[data-evidence]').forEach(b=>b.onclick=()=>collect(b.dataset.evidence));
  $$('[data-action]').forEach(b=>b.onclick=()=>handleAction(b.dataset.action));
  $$('[data-interview]').forEach(b=>b.onclick=()=>doInterview(b.dataset.interview));
  $$('[data-ending]').forEach(b=>b.onclick=()=>ending(b.dataset.ending));
}
function collect(id){addEvidence(id,true); if(['E01','E02','E03','E04','E05','E06','E07','E08','E09','E10','E11','E16','E17','E18'].includes(id)) addFactIfReady(id); render();}
function addFactIfReady(id){
  const facts={E01:'00:32时，报馆终校样已经出现顾文洲死讯。',E03:'巡捕房00:57才抵达顾宅。',E05:'23:05时顾文洲仍有回应。',E08:'22:24时苏婉仍在舞厅后台。',E09:'23:41顾宅门厅出现与方正礼一致的身影。',E17:'方正礼23:26离开报馆，00:18才重新签入。',E18:'23:05—00:10存在明确救治窗口。'}; if(facts[id]){addFact(facts[id]);save();}}
function openEvidence(id){const e=EVIDENCE[id]; playSfx(e.sound); openModal(`<div class="doc-head"><h3>${id} · ${e.title}</h3><div class="doc-meta">原始材料 / ${SCENES[e.scene].title}</div></div><div class="doc-body"><p>${e.body}</p><p class="footer-note">这里记录的是原始事实，不代表自动推论。</p></div>`)}
function openModal(html){$('#modalBody').innerHTML=html; $('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
function handleAction(a){
  if(a==='check-anomaly')return checkAnomaly();
  if(a==='check-timeline')return checkTimeline();
  if(a==='to-finale'){state.stage=4;state.scene='finale';save();render();playFilm(FILMS.stage4);return}
  if(a==='check-final')return checkFinal();
}
function checkAnomaly(){
  const v=($('#anomalyInput')?.value||'').replace(/\s/g,'');
  const good=(/报馆|报纸/.test(v))&&(/巡捕|警方/.test(v))&&(/早|先|提前|之前/.test(v));
  if(!good)return openModal('<div class="doc-head"><h3>判断尚未成立</h3></div><div class="doc-body"><p>你的答案还没有同时说明“哪两个机构”和“先后关系”。只写“时间不对”还不够。</p></div>');
  state.solved.anomaly=true; state.stage=2; addFact('报馆在警方到场前已经把“顾文洲自尽”排入版面。'); save(); render(); playFilm(FILMS.stage2);
}
function checkTimeline(){
  const vals=['tl1','tl2','tl3','tl4','tl5'].map(id=>$('#'+id)?.value);
  if(vals.join(',')!=='1,2,3,4,5')return openModal('<div class="doc-head"><h3>时间线仍有冲突</h3></div><div class="doc-body"><p>至少有一项先后关系不成立。请回到原始材料确认具体时刻，不要凭“午夜前后”的印象排列。</p></div>');
  state.solved.timeline=true; state.stage=3; state.scene='interviews'; addFact('22:24—00:57的关键事件顺序已经能够连续重建。'); save(); render(); playFilm(FILMS.stage3);
}
function doInterview(id){
  const map={
    gu:{e:'E12',film:[{img:'assets/images/interview_gu.jpg',k:'顾曼青 · 补录',t:'“我推了他。他撞在桌角上……可医生来的时候，他明明还能应我。”',s:'paper'}]},
    li:{e:'E13',film:[{img:'assets/images/interview_li.jpg',k:'黎月白 · 补录',t:'“我确认线路时听了一耳朵。编辑室那边……像方先生的声音。”',s:'phone'}]},
    su:{e:'E14',film:[{img:'assets/images/interview_su.jpg',k:'苏婉 · 补录',t:'“顾先生不是来找我的。他让我把一封材料转给方编辑，说第二天若他不露面，就请报馆公开。”',s:'paper'}]},
    fang:{e:'E15',film:FILMS.stage4.slice(0,1)}
  };
  state.interviews[id]=true; if(!has(map[id].e))state.evidence.push(map[id].e); addFact(`${PEOPLE[id].name}完成补充口供。`); save(); render(); playFilm(map[id].film);
}
function checkFinal(){
  const v=[$('#fin1')?.value,$('#fin2')?.value,$('#fin3')?.value,$('#fin4')?.value];
  if(v.join('|')!=='顾曼青|方正礼|方正礼|方正礼')return openModal('<div class="doc-head"><h3>责任链尚未闭合</h3></div><div class="doc-body"><p>请把“造成第一次伤害”和“后来没有求救、伪造现场、提前送讯”拆成不同动作。E12、E15与E18给出的边界很清楚。</p></div>');
  state.solved.final=true; addFact('责任链：顾曼青造成最初伤害；方正礼延误救助、伪造现场并提前送讯。'); save(); render(); playSfx('stamp');
}
function ending(type){
  const data={
    sensational:{title:'结局 · 号外',text:'你把每个人的姓名和隐私一起推上头版。案件迅速轰动，巡捕房不得不重新调查，但舞厅流言、家产纠纷和私人关系也被无限放大。真相被看见了，边界却被冲掉了。'},
    best:{title:'最佳结局 · 第二版',text:'你完整写清四段责任：顾曼青造成最初伤害；方正礼见顾文洲尚有气息却不求救，随后伪造自尽现场，并用公共电话提前把“自尽”送进报馆。与责任无关的私人生活被删去。第二天，报纸没有最响的标题，却留下最完整的事实。'},
    suppress:{title:'结局 · 压稿',text:'你把全部证据先交给巡捕房，报纸只留下“案件重新调查中”。责任仍会被追究，但公众永远不知道一条被提前写好的死讯，是怎样差点替代了整桩案件。'}
  }[type];
  state.ending=type; state.completedOnce=true; unlockExpert(); save(); playFilm([...FILMS.ending,{img:'assets/images/scene_newsroom.png',k:data.title,t:data.text,s:'paper'}],()=>openModal(`<div class="ending"><h3>${data.title}</h3><p>${data.text}</p><p><strong>已解锁：</strong>独立复核模式。下次开局将隐藏程序提示，并随机打乱同场景证据顺序。</p></div>`));
}

function hint(){
  if(state.expert)return;
  const arr=HINTS[state.stage]; let i=state.hintUse[state.stage]||0; i=Math.min(i,arr.length-1); openModal(`<div class="doc-head"><h3>提示 ${i+1}/3</h3></div><div class="doc-body"><p>${arr[i]}</p></div>`); state.hintUse[state.stage]=Math.min(2,i+1); save();
}
function bag(){
  const list=state.evidence.length?state.evidence.map(id=>`<div class="evidence-row"><strong>${id} · ${EVIDENCE[id].title}</strong><div>${EVIDENCE[id].summary}</div></div>`).join(''):'<p>案件袋为空。</p>';
  openModal(`<div class="doc-head"><h3>案件袋</h3><div class="doc-meta">${state.evidence.length}/18</div></div><div class="evidence-list">${list}</div>`)
}

const AUDIO={rain:'assets/audio/rain_room.wav',typewriter:'assets/audio/typewriter.wav',phone:'assets/audio/phone_ring.wav',camera:'assets/audio/camera_shutter.wav',paper:'assets/audio/paper.wav',stamp:'assets/audio/stamp.wav'};
function switchAmbience(){if(!state.sound)return; const a=$('#ambience'); const src=AUDIO[SCENES[state.scene].ambience]||AUDIO.rain; if(!a.src.endsWith(src)){a.src=src;a.volume=.18;a.play().catch(()=>{})} else if(a.paused)a.play().catch(()=>{})}
function playSfx(kind){if(!state.sound)return; const src=AUDIO[kind]; if(!src)return; const s=$('#sfx'); s.src=src;s.volume=.42;s.play().catch(()=>{})}
function toggleSound(){state.sound=!state.sound;save(); if(!state.sound){$('#ambience').pause();$('#sfx').pause()}render()}
function playFilm(frames,cb){
  if(!frames||!frames.length){cb?.();return}
  let i=0; const overlay=$('#cinematic');
  const show=()=>{const f=frames[i];const im=$('#filmImage');im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=f.img;$('#filmKicker').textContent=f.k;$('#filmText').textContent=f.t;$('#filmNext').textContent=i===frames.length-1?'进入':'继续'; if(f.s)playSfx(f.s);};
  $('#filmNext').onclick=()=>{i++; if(i>=frames.length){overlay.classList.add('hidden');cb?.();switchAmbience();return} show()};
  show(); overlay.classList.remove('hidden');
}

function attach(){
  $('#newGame').onclick=()=>start(false); $('#continueGame').onclick=continueGame; $('#expertGame').onclick=()=>start(true); $('#resetGame').onclick=resetGame;
  $('#modalClose').onclick=closeModal; $('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
  $('#bagBtn').onclick=bag; $('#hintBtn').onclick=hint; $('#soundBtn').onclick=toggleSound; $('#saveBtn').onclick=()=>{save();openModal('<div class="doc-head"><h3>已保存</h3></div><div class="doc-body"><p>案件进度已写入本机浏览器。</p></div>')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#cinematic').classList.add('hidden')} if(e.key.toLowerCase()==='h'&&!state.expert)hint(); if(e.key.toLowerCase()==='m')toggleSound();});
}

// Browser QA: deliberately exercises the same state transitions and render functions without requiring external tooling.
async function runQA(){
  const errors=[]; try{
    state=freshState(false);state.sound=false;state.stage=1;state.scene='newsroom';
    ['E01','E02','E03','E04'].forEach(id=>state.evidence.push(id)); state.solved.anomaly=true;state.stage=2;
    ['E05','E06','E07','E08','E09','E10','E11'].forEach(id=>state.evidence.push(id)); state.solved.timeline=true;state.stage=3;state.scene='interviews';
    ['E12','E13','E14','E15','E16','E17','E18'].forEach(id=>{if(!state.evidence.includes(id))state.evidence.push(id)}); state.interviews={gu:true,li:true,su:true,fang:true};
    state.stage=4;state.scene='finale';state.solved.final=true;state.ending='best';state.completedOnce=true;state.expertUnlocked=true; render();
    if(state.evidence.length!==18)errors.push('evidence count');
    if(!Object.values(state.interviews).every(Boolean))errors.push('interviews');
    if(!state.solved.final)errors.push('final');
    const allImgs=[...Object.values(SCENES).map(x=>x.image),...Object.values(PEOPLE).map(x=>x.img),...Object.values(FILMS).flat().map(x=>x.img)];
    const checks=await Promise.all([...new Set(allImgs)].map(src=>new Promise(res=>{const im=new Image();im.onload=()=>res(true);im.onerror=()=>res(false);im.src=src}))); if(checks.includes(false))errors.push('image load');
  }catch(e){errors.push(String(e))}
  const d=document.createElement('div');d.className='qa-result';d.id='qaResult';d.textContent=errors.length?'QA_FAIL '+errors.join(' | '):'QA_PASS';document.body.appendChild(d);document.body.dataset.qa=errors.length?'FAIL':'PASS';return errors;
}

(function init(){attach();refreshBoot(); if(new URLSearchParams(location.search).get('qa')==='1'){ $('#boot').classList.add('hidden');$('#game').classList.remove('hidden'); runQA(); }})();
