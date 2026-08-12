'use strict';

const SAVE_KEY='shenjiang-night-case-v2';
const META_KEY='shenjiang-night-case-meta-v1';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const SCENES={
  newsroom:{title:'申江晚报夜班编辑室',short:'报馆',chapter:'第一现场之外的第一现场',image:'assets/images/scene_newsroom.png',ambience:'rain',minStage:1,note:'夜班编辑室 · 终版前'},
  study:{title:'顾宅书房',short:'顾宅',chapter:'被摆成“自尽”的房间',image:'assets/images/study_gun_glass.jpg',ambience:'rain',minStage:1,note:'顾宅书桌 · 巡捕到场后复原'},
  switchboard:{title:'霞飞路电话总机室',short:'电话局',chapter:'线路只记录接通，不替人作证',image:'assets/images/scene_switchboard.png',ambience:'rain',minStage:2,note:'霞飞路总机室 · 手工转接'},
  darkroom:{title:'唐慎照相馆暗房',short:'暗房',chapter:'底片能固定一瞬，却不会自己解释',image:'assets/images/scene_darkroom.png',ambience:'rain',minStage:2,note:'唐慎照相馆 · 当夜冲洗'},
  interviews:{title:'补充采访席',short:'补录',chapter:'第二份口供必须由证据逼出来',image:'assets/images/interview_fang.jpg',ambience:'rain',minStage:3,note:'报馆侧室 · 凌晨补录'},
  finale:{title:'记者桌 · 终稿',short:'终稿',chapter:'把责任拆开，再决定怎样写',image:'assets/images/scene_newsroom.png',ambience:'rain',minStage:4,note:'《申江晚报》记者桌 · 天亮前'}
};

const PEOPLE={
  gu:{name:'顾曼青',img:'assets/images/interview_gu.jpg',role:'顾文洲之妹。与兄长长期因家产与债务争执。',moment:'她补录后没有立刻离开，只把一张旧电影票压在桌上。那是兄妹少年时第一次自己买票看的电影。她说：“我恨过他很久，可我没想让那一下变成他的最后一晚。”'},
  fang:{name:'方正礼',img:'assets/images/interview_fang.jpg',role:'《申江晚报》夜班编辑。00:32付印签条由他签字。',moment:'方正礼钱包里一直夹着十年前第一篇署名报道的剪报，纸已经磨得发白。他不是不相信新闻；恰恰因为太相信“版面决定现实”，才一步步把自己放到了事实前面。'},
  su:{name:'苏婉',img:'assets/images/interview_su.jpg',role:'舞厅歌女。流言把她推成“最后见过死者的人”。',moment:'苏婉要求记者删掉舞厅后台其他姑娘的姓名：“她们今晚还得唱，明天还得活。”她并不怕自己的名字见报，只是不愿别人替她一起付流言的账。'},
  li:{name:'黎月白',img:'assets/images/interview_li.jpg',role:'电话总机接线员。负责00:27那条外线的手工转接。',moment:'黎月白随身带一本小册子，记的不是秘密，而是每次断线、误接和被骂的时刻。她说总机员最怕的不是听见不该听的，而是“明明接对了线，最后却没人相信你”。'},
  luo:{name:'罗敬安',img:null,role:'当夜校对。00:27在编辑室3号分机接起匿名外线。',moment:'罗敬安不是核心嫌疑人。他承认自己当时只顾赶版，没有追问消息来源；“方编辑说来源他担，我就把铅字留下了。”这份疏忽被写进内部复盘，但没有被包装成凶案责任。'}
};

const EVIDENCE={
  E01:{title:'终校样',scene:'newsroom',type:'news',sound:'paper',summary:'角栏“顾文洲自尽”已成版，终校时间00:32。',facsimile:'申江晚报　夜班终校\n角栏：华康洋行经理顾文洲昨夜于寓所自尽\n终校：00:32',body:'终校样右下角标注“00:32”。这张纸只能证明：报馆在00:32前已经接受并排印了“自尽”这一说法，不能反过来证明死因。'},
  E02:{title:'付印签条',scene:'newsroom',type:'slip',sound:'typewriter',summary:'00:32，方正礼回到编辑台后签字允许短讯付印。',facsimile:'角栏短讯已核，可付印。\n签：方正礼　00:32',body:'签条把“谁让这条消息进入版面”固定下来。结合E17可知，方正礼是在00:31重新签入报馆后立即完成确认。'},
  E03:{title:'巡捕到场簿',scene:'study',type:'ledger',sound:'paper',summary:'法租界巡捕房登记：00:57抵达顾宅。',facsimile:'霞飞路巡查记录\n00:57　抵顾宅　顾文洲案',body:'这是警方第一次到场的记录，而不是死亡发生时刻。它与E01的价值在于比较两个机构首次形成记录的先后。'},
  E04:{title:'现场复原笔记',scene:'study',type:'sketch',sound:'paper',summary:'枪、酒杯、遗书与椅位互相“配合”，但抽屉和擦痕显示有人整理过。',facsimile:'桌面：枪 / 半杯酒 / 遗书\n椅脚擦痕与现位不合\n右侧抽屉开启，纸屑被翻动',body:'新版不再使用现代黄色证物牌或标准尸体轮廓作为主视觉。调查重点放回书桌、椅脚擦痕、抽屉和物件位置这些能被1930年代调查者实际记录的内容。'},
  E05:{title:'许医生出诊笺',scene:'study',type:'medical',sound:'paper',summary:'23:05，顾文洲仍能回应，医生明确写“不宜独处”。',facsimile:'许成章医师出诊笺\n23:05离宅\n后脑受创，意识混乱，仍能回应。建议送院观察，不宜独处。',body:'它把“顾曼青推搡之后，顾文洲并未立刻死亡”固定下来，也为后续救治窗口提供起点。'},
  E06:{title:'公用电话计次簿',scene:'switchboard',type:'ledger',sound:'phone',summary:'00:27，霞飞路公用电话亭拨向《申江晚报》总机。',facsimile:'市话外线计次\n00:27　霞飞路公用电话亭 → 申江晚报',body:'计次簿只记录线路和时刻，不记录拨号人姓名。新版把这个“证明边界”直接做成电话接线谜题的一部分。'},
  E07:{title:'总机转接簿',scene:'switchboard',type:'ledger',sound:'paper',summary:'00:27，外线经报馆总机转入编辑室3号分机，由罗敬安接听。',facsimile:'00:27　外线 → 申江晚报总机 → 编辑室3号\n接听：罗敬安',body:'这条记录解决了旧版空间矛盾：方正礼此时并不在编辑室接电话。线路终点是罗敬安所在的3号分机；拨号人仍需其他材料确认。'},
  E08:{title:'舞厅后台合照',scene:'darkroom',type:'photo',sound:'camera',summary:'22:24，苏婉仍在舞厅后台。',facsimile:'底片 12-A\n背景：第二场演出牌 / 挂钟约22:24',body:'照片把苏婉固定在22:24的舞厅后台。它能削弱“她整夜都跟着顾文洲”的流言，却不能独自证明她之后每一分钟的位置。'},
  E09:{title:'顾宅门厅底片',scene:'darkroom',type:'photo',sound:'camera',summary:'23:41，顾宅门厅拍到与方正礼衣着体态一致的男子。',facsimile:'底片 19-C\n门厅时钟：23:41\n深色马甲 / 细领带 / 右手公文夹',body:'底片将方正礼与顾宅联系起来，但“像方正礼”仍只是影像比对。它必须和离岗簿、口供与其他材料一起使用。'},
  E10:{title:'暗房冲印登记',scene:'darkroom',type:'ledger',sound:'paper',summary:'23:58，19-C卷已开始冲洗，排除翌日补拍。',facsimile:'唐慎照相馆冲洗簿\n23:58　收 19-C 卷　即洗',body:'底片边号与E09一致。这个时间使“第二天为了栽赃再补拍一张”的解释站不住。'},
  E11:{title:'遗书草稿碎片',scene:'study',type:'note',sound:'paper',summary:'草稿出现“可付、不必改”等编辑台惯用语。',facsimile:'……照旧。可付。\n末段不必改……',body:'措辞与方正礼的编辑便笺高度相似，但它不是笔迹鉴定，也不足以单独定人。它的作用是给补录提供追问方向。'},
  E12:{title:'顾曼青补录',scene:'interviews',type:'statement',sound:'paper',summary:'她承认23点前后推搡哥哥，后脑撞到桌角。',facsimile:'补充口供 · 顾曼青\n“我推了他。他撞到桌角。医生来时，他还会应我。”',body:'顾曼青承认造成了最初伤害，也承认自己因恐惧离开。她没有伪造后续现场，也没有参与匿名报讯。'},
  E13:{title:'黎月白补录',scene:'interviews',type:'statement',sound:'phone',summary:'她确认00:27来电者在转接前说出方正礼惯用的编辑口令，但只愿作“高度相似”判断。',facsimile:'补录 · 黎月白\n“来电人说：老罗，照昨晚说的排。声音像方编辑。\n我只能说像，不能凭这一耳朵写死姓名。”',body:'黎月白的证词不再制造“方正礼同时在编辑室和电话亭”的矛盾。她听到的是外线来电者，编辑室3号分机由罗敬安接起；真正身份最后由E15自认闭合。'},
  E14:{title:'苏婉补录',scene:'interviews',type:'statement',sound:'paper',summary:'她21:40前已与顾文洲分开，并代转一封准备交报馆公开的材料。',facsimile:'补录 · 苏婉\n“顾先生让我把信给方编辑。若第二天他不露面，就请报馆公开。”',body:'这解释了方正礼为什么急于去顾宅寻找材料，也让苏婉从“艳情流言功能”变成案件信息链上的主动见证人。'},
  E15:{title:'方正礼第二份口供',scene:'interviews',type:'statement',sound:'paper',summary:'他承认23:41后进入顾宅、见顾仍有气息却未求救；00:27从公用电话亭报讯，00:31回报馆。',facsimile:'第二份口供 · 方正礼\n23:41后入顾宅；未呼救；整理桌面与遗书。\n00:27公用电话亭致电报馆；00:31返编辑部；00:32签付印。',body:'这份口供把旧版最薄弱的空间逻辑彻底闭合：方正礼先在顾宅处理现场，随后从公用电话亭把“自尽”消息送进报馆，00:31回到编辑部，00:32亲自签付印。'},
  E16:{title:'“新闻协调费”收条',scene:'study',type:'receipt',sound:'paper',summary:'顾文洲保险柜保存着支付给方正礼的500元收条。',facsimile:'华康洋行\n新闻协调费　伍佰圆\n收讫：方正礼',body:'收条提供方正礼想取回材料的动机，但“有动机”本身仍不是他实施每一步行为的证明。'},
  E17:{title:'夜班离岗簿',scene:'newsroom',type:'ledger',sound:'paper',summary:'方正礼23:26签出，00:31重新签入；罗敬安记下他返岗时袖口湿透。',facsimile:'夜班出入簿\n方正礼　23:26 出\n方正礼　00:31 入\n旁注：雨大，方袖口尽湿。罗敬安',body:'新版把回报馆时间从旧版的00:18改为00:31，与23:41顾宅、00:27公用电话、00:32付印签条形成连续可行的路径。'},
  E18:{title:'法医复核意见',scene:'study',type:'medical',sound:'paper',summary:'最初撞击并非即刻致命；23:05至午夜前后仍存在明确救治机会。',facsimile:'复核意见\n后脑撞击导致进行性颅内出血。\n23:05仍有反应；若及时送院，存在显著救治机会。',body:'它要求终局把“造成最初伤害”和“看见伤者仍不求救”拆成两段责任，而不是用一个“凶手”标签吞掉全过程。'}
};

const HINTS={
  1:['第一幕只比较两个机构第一次形成记录的时间，不要先猜谁杀人。','把E01终校样与E03巡捕到场簿并排看：一个是00:32，一个是00:57。','关键异常：报馆在巡捕到场前已经把“自尽”当成结论排版。'],
  2:['先把00:27电话的线路接对，再重排时间线；线路和身份是两个问题。','公用电话亭 → 报馆总机 → 编辑室3号；E07说明接听人是罗敬安。','时间顺序：22:24舞厅 → 23:05医生 → 23:41门厅 → 00:27电话 → 00:57巡捕。'],
  3:['补录不是“点一下就招供”。先收集能推翻第一份说法的材料，再选择真正击中矛盾的问题。','方正礼的关键材料包括E09、E11、E13、E14、E16、E17；他必须最后问。','E18决定终局不能把顾曼青的推搡直接等同于全部死亡责任。'],
  4:['把四段行为分别判定：最初伤害、延误救助、伪造现场、提前送讯。','E12对应最初伤害；E15与E18共同解释后面三段。','责任链：顾曼青=最初伤害；方正礼=延误救助、伪造现场、提前送讯。']
};

const FILMS={
  intro:[
    {img:'assets/images/scene_newsroom.png',k:'1936年10月17日 · 雨夜',t:'00:32，一则“顾文洲自尽”的短讯已经排进《申江晚报》角栏。',s:'typewriter'},
    {img:'assets/images/study_gun_glass.jpg',k:'霞飞路 · 顾宅',t:'巡捕房的到场簿却写着00:57。报纸先于巡捕得到的究竟是事实，还是一个被人安排好的结论？',s:'paper'}
  ],
  stage2:[{img:'assets/images/scene_switchboard.png',k:'第二幕 · 电话与时间',t:'不要急着给电话另一端写上姓名。先把线路接对，再问谁有时间走完这条路。',s:'phone'}],
  stage3:[{img:'assets/images/scene_darkroom.png',k:'第三幕 · 第二份口供',t:'照片、医生笺与线路记录已经固定了大半个夜晚。现在，把材料放回说话的人面前。',s:'camera'}],
  stage4:[{img:'assets/images/interview_fang.jpg',k:'方正礼 · 第二份口供',t:'“00:27那通电话，是我在霞飞路口打的。回报馆时已经00:31，我只来得及签那张付印条。”',s:'paper'}],
  ending:[{img:'assets/images/scene_newsroom.png',k:'天亮前 · 终稿付印',t:'这一次，版面上的结论不是别人提前替你写好的。',s:'typewriter'}]
};

const AUDIO={rain:'assets/audio/rain_room.wav',typewriter:'assets/audio/typewriter.wav',phone:'assets/audio/phone_ring.wav',camera:'assets/audio/camera_shutter.wav',paper:'assets/audio/paper.wav',stamp:'assets/audio/stamp.wav'};
const TIMELINE_ORDER=['su','doctor','fang','phone','police'];
const ROUTE_ORDER=['booth','switch','desk3'];
const INTERVIEW_REQ={
  gu:['E04','E05'],
  li:['E06','E07'],
  su:['E08','E10'],
  fang:['E09','E11','E13','E14','E16','E17']
};
const INTERVIEW_CORRECT={gu:'doctor',li:'boundary',su:'photo',fang:'path'};
const REVIEW_VARIANTS={
  phone:{title:'复核任务 · 电话身份',question:'不依赖方正礼自白，哪组材料最能证明他“有时间从顾宅离开、在00:27从外面报讯并于00:31回报馆”？',options:[['E06 + E17','E06说明电话亭时刻，E17给出离岗/返岗窗口。','correct'],['E01 + E03','只能证明死讯提前。',''],['E08 + E10','只能固定苏婉与底片。','']]},
  alibi:{title:'复核任务 · 流言排除',question:'哪组材料最能把“苏婉整夜跟着顾文洲”的流言压回事实边界？',options:[['E08 + E14','照片固定22:24位置，补录说明21:40前已分开及代转材料。','correct'],['E02 + E11','与苏婉的不在场无关。',''],['E06 + E07','只说明电话线路。','']]},
  window:{title:'复核任务 · 救治窗口',question:'哪组材料共同支持“最初撞击并非即刻致命，后续不求救具有独立意义”？',options:[['E05 + E18','医生当夜观察与法医复核相互支撑。','correct'],['E01 + E02','只涉及报馆付印。',''],['E09 + E10','只证明底片时刻与真实性。','']]}
};

function freshState(expert=false){
  const variants=Object.keys(REVIEW_VARIANTS);
  return {stage:1,scene:'newsroom',expert,sound:true,evidence:[],facts:[],interviews:{gu:false,li:false,su:false,fang:false},solved:{anomaly:false,route:false,timeline:false,final:false,review:false},hintUse:{1:0,2:0,3:0,4:0},timelinePick:[],routePick:[],ending:null,completedOnce:false,shuffleSeed:Math.floor(Math.random()*999999),reviewVariant:expert?variants[Math.floor(Math.random()*variants.length)]:'phone'};
}
let state=freshState(false);

function getMeta(){try{return Object.assign({expertUnlocked:false,endings:[]},JSON.parse(localStorage.getItem(META_KEY)||'{}'))}catch{return {expertUnlocked:false,endings:[]}}}
function setMeta(meta){localStorage.setItem(META_KEY,JSON.stringify(meta))}
function expertAvailable(){return getMeta().expertUnlocked===true}
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state));refreshBoot()}
function migrateState(v){
  const n=Object.assign(freshState(!!v?.expert),v||{});
  n.interviews=Object.assign({gu:false,li:false,su:false,fang:false},v?.interviews||{});
  n.solved=Object.assign({anomaly:false,route:false,timeline:false,final:false,review:false},v?.solved||{});
  n.hintUse=Object.assign({1:0,2:0,3:0,4:0},v?.hintUse||{});
  n.timelinePick=Array.isArray(v?.timelinePick)?v.timelinePick.filter(x=>TIMELINE_ORDER.includes(x)):[];
  n.routePick=Array.isArray(v?.routePick)?v.routePick.filter(x=>ROUTE_ORDER.includes(x)):[];
  n.facts=(Array.isArray(v?.facts)?v.facts:[]).map(f=>String(f).replace('00:18才重新签入','00:31重新签入').replace('00:18重新签入','00:31重新签入'));
  if(!Object.keys(REVIEW_VARIANTS).includes(n.reviewVariant))n.reviewVariant='phone';
  return n;
}
function load(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return false;state=migrateState(JSON.parse(raw));return true}catch{return false}}
function has(id){return state.evidence.includes(id)}
function addFact(text){if(!state.facts.includes(text))state.facts.push(text)}
function addEvidence(id,show=true){if(!EVIDENCE[id])return;if(!has(id)){state.evidence.push(id);addFactIfReady(id);save()}if(show)openEvidence(id);render()}

function refreshBoot(){
  const c=$('#continueGame');if(c)c.disabled=!localStorage.getItem(SAVE_KEY);
  const e=$('#expertGame');if(e)e.classList.toggle('hidden',!expertAvailable());
  const m=getMeta();const a=$('#archiveMeta');if(a)a.textContent=`报道档案 ${new Set(m.endings||[]).size}/3`;
}
function start(expert=false){state=freshState(expert);save();$('#boot').classList.add('hidden');$('#game').classList.remove('hidden');render();playFilm(FILMS.intro)}
function continueGame(){if(load()){$('#boot').classList.add('hidden');$('#game').classList.remove('hidden');render();switchAmbience()}}
function resetGame(){if(confirm('确定清空《申江夜案》的本地调查进度吗？已解锁的复核模式与结局档案会保留。')){localStorage.removeItem(SAVE_KEY);state=freshState(false);refreshBoot()}}
function unlocked(scene){return state.stage>=SCENES[scene].minStage}
function stageName(){return ['','第一幕 · 死讯先到','第二幕 · 电话与时间','第三幕 · 第二份口供','终幕 · 责任与报道'][state.stage]}
function objective(){
  if(state.expert){const r=REVIEW_VARIANTS[state.reviewVariant];return state.stage<4?`独立复核：不显示步骤提示。终局追加“${r.title.replace('复核任务 · ','')}”。`:'独立复核：先闭合责任链，再完成随机复核任务。'}
  if(state.stage===1)return '核对报馆与巡捕房最早记录，指出一个不依赖嫌疑人身份就能成立的异常。';
  if(state.stage===2)return state.solved.route?'电话线路已接通。继续按原始时刻重建22:24—00:57时间线。':'先在电话总机室把00:27外线的真实路径接通；记住“线路”和“身份”不是一回事。';
  if(state.stage===3)return '返回报馆和顾宅补收新材料，再用证据选择真正能击中矛盾的追问。方正礼应当最后补录。';
  return '把四段行为分别归责；独立复核还需完成一项随机交叉验证。';
}
function sceneDesc(id){return {
  newsroom:'这里不是中立的“任务大厅”，而是一张正在赶印的版面。终校样、签条、出入簿会互相留下时间上的毛边。',
  study:'主视觉改用书桌近景，不再把现代黄色证物牌和标准尸体轮廓当作年代符号。真正有用的是桌面、抽屉、医生笺与保险柜里的纸。',
  switchboard:'每一通电话都要经过人手插线。你可以证明它从哪里来、转到哪里，却不能让线路替你认出一个人。',
  darkroom:'底片最擅长固定“某一刻有人在某处”，不擅长解释前因后果。冲洗簿决定这张照片能否被信任。',
  interviews:'人物不再是四个“点一下就吐证据”的按钮。每次补录都要选择一条真正能击中旧口供漏洞的追问。',
  finale:'记者的最后工作不是给所有人贴一个“凶手”标签，而是把行为、因果和报道边界分别写清。'}[id]}

function render(){
  $('#bagCount').textContent=state.evidence.length;
  $('#soundBtn').textContent=`声音：${state.sound?'开':'关'}`;
  $('#hintBtn').classList.toggle('hidden',state.expert);
  $('#objective').textContent=objective();
  $('#stageProgress').innerHTML=`${stageName()}${state.expert?'<span class="expert-badge">复核</span>':''}<br>原始材料 ${state.evidence.length}/18 · 补录 ${Object.values(state.interviews).filter(Boolean).length}/4${state.expert?`<br>随机复核：${REVIEW_VARIANTS[state.reviewVariant].title.replace('复核任务 · ','')}`:''}`;
  renderNav();renderPeople();renderFacts();renderScene();switchAmbience();
}
function renderNav(){
  const order=['newsroom','study','switchboard','darkroom','interviews','finale'];
  $('#sceneNav').innerHTML=order.map(id=>`<button class="nav-btn ${state.scene===id?'active':''} ${unlocked(id)?'':'locked'}" data-scene="${id}" ${unlocked(id)?'':'disabled'}>${SCENES[id].short}</button>`).join('');
  $$('[data-scene]').forEach(b=>b.onclick=()=>{state.scene=b.dataset.scene;save();render()});
}
function renderPeople(){
  const order=['gu','fang','su','li','luo'];
  $('#peoplePanel').innerHTML=order.map(id=>{const p=PEOPLE[id];const done=id==='luo'?has('E07'):!!state.interviews[id];return `<div class="person-card">${p.img?`<img src="${p.img}" alt="${p.name}">`:`<div class="person-placeholder">罗</div>`}<div><div class="name">${p.name}</div><div class="role">${p.role}</div></div>${done?`<button data-moment="${id}">查看记者旁记</button>`:''}</div>`}).join('');
  $$('[data-moment]').forEach(b=>b.onclick=()=>openMoment(b.dataset.moment));
}
function renderFacts(){$('#factPanel').innerHTML=state.facts.length?state.facts.slice(-9).map(f=>`<div class="fact">${f}</div>`).join(''):'还没有足够确定、可以写进报道的事实。'}
function renderScene(){
  const s=SCENES[state.scene];
  let body=`<div class="scene-header"><div class="scene-photo"><img src="${s.image}" alt="${s.title}"><div class="photo-note">${s.note}</div></div><div class="scene-copy"><div class="chapter">${s.chapter}</div><div class="eyebrow">${stageName()}</div><h3>${s.title}</h3><p>${sceneDesc(state.scene)}</p>${sceneNotice()}</div></div>`;
  if(state.scene==='interviews')body+=renderInterviews();
  else if(state.scene==='finale')body+=renderFinale();
  else body+=renderEvidenceFiles(state.scene)+renderPuzzle(state.scene);
  $('#sceneContent').innerHTML=body;bindScene();
}
function sceneNotice(){
  if(state.stage===1)return '<div class="notice">先做时间核验。任何可疑物件都不能越过“它实际能证明什么”的边界。</div>';
  if(state.stage===2)return '<div class="notice">这一幕有两种操作：接线路、排时间。完成它们后才进入人物补录。</div>';
  if(state.stage===3)return '<div class="notice">补录需要正确材料，也需要正确问题。问错不会扣分，但人物只会重复旧说法。</div>';
  return '<div class="notice">终局要求拆开责任；独立复核模式还会随机抽查一条证据链。</div>';
}
function sceneCards(scene){
  let ids=Object.entries(EVIDENCE).filter(([,e])=>e.scene===scene).map(([id])=>id).filter(visibleEvidence);
  if(state.expert)ids=seededShuffle(ids,state.shuffleSeed+scene.length);
  return ids;
}
function seededShuffle(arr,seed){const a=[...arr];let x=seed||1;for(let i=a.length-1;i>0;i--){x=(x*9301+49297)%233280;const j=Math.floor((x/233280)*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function visibleEvidence(id){
  if(['E01','E02','E03','E04'].includes(id))return true;
  if(['E05','E06','E07','E08','E09','E10','E11'].includes(id))return state.stage>=2;
  if(['E16','E17','E18'].includes(id))return state.stage>=3;
  return false;
}
function renderEvidenceFiles(scene){
  const ids=sceneCards(scene);if(!ids.length)return '';
  return `<div class="case-files">${ids.map(id=>{const e=EVIDENCE[id];const label=state.expert&&!has(id)?'未编号材料':id;return `<article class="evidence-file" data-type="${e.type}"><div class="eid">${label} · ${SCENES[e.scene].short}</div><h4>${e.title}</h4><p>${e.summary}</p><button class="evidence-btn ${has(id)?'obtained':''}" data-evidence="${id}">${has(id)?'重新翻阅':'展开原件'}</button></article>`}).join('')}</div>`;
}

function renderPuzzle(scene){
  if(state.stage===1&&!state.solved.anomaly&&(scene==='newsroom'||scene==='study')&&has('E01')&&has('E03')){
    return `<section class="puzzle"><h4>夹报核验 · 第一处异常</h4><p>不猜人物。用一句话写出E01与E03之间能够直接成立的矛盾。</p><div class="compare-strip"><div class="choice-btn">终校样<br><strong>00:32</strong></div><div class="choice-btn">巡捕到场<br><strong>00:57</strong></div><div class="choice-btn">先判断记录先后<br><strong>再谈身份</strong></div></div><div class="answer-row"><input id="anomalyInput" class="answer-input" placeholder="例如：报馆……而巡捕……"><button class="action-btn" data-action="check-anomaly">写入便笺</button></div></section>`;
  }
  if(state.stage===2&&scene==='switchboard'&&!state.solved.route&&has('E06')&&has('E07'))return renderRoutePuzzle();
  if(state.stage===2&&state.solved.route&&!state.solved.timeline&&['switchboard','darkroom'].includes(scene)&&['E05','E08','E09','E10'].every(has))return renderTimelinePuzzle();
  return '';
}
function renderRoutePuzzle(){
  const chosen=state.routePick.map(id=>routeLabel(id)).join(' → ')||'尚未接线';
  return `<section class="puzzle"><h4>手工接线 · 00:27外线</h4><p>按真实线路依次选择“来源—中继—终点”。故意放入一个看似合理但不属于线路记录的干扰项。</p><div class="wire-board"><div class="wire-column"><h5>来源</h5>${wire('booth','霞飞路公用电话亭')}${wire('mansion','顾宅电话')}</div><div class="wire-column"><h5>中继</h5>${wire('switch','《申江晚报》总机')}${wire('police','巡捕房值班台')}</div><div class="wire-column"><h5>终点</h5>${wire('desk3','编辑室3号分机')}${wire('fang','方正礼本人')}</div></div><div class="wire-path">当前线路：${chosen}</div><div class="answer-row"><button class="action-btn" data-action="check-route">核对线路</button><button class="action-btn" data-action="reset-route">拔线重接</button></div></section>`;
}
function wire(id,label){return `<button class="wire-node ${state.routePick.includes(id)?'selected':''}" data-wire="${id}">${label}</button>`}
function routeLabel(id){return {booth:'霞飞路公用电话亭',mansion:'顾宅电话',switch:'报馆总机',police:'巡捕房值班台',desk3:'编辑室3号分机',fang:'方正礼本人'}[id]||id}
function renderTimelinePuzzle(){
  const items={su:'22:24 · 苏婉仍在舞厅后台',doctor:'23:05 · 许医生离开顾宅，顾仍有回应',fang:'23:41 · 顾宅门厅出现方正礼身影',phone:'00:27 · 公用电话亭拨向报馆',police:'00:57 · 巡捕抵达顾宅'};
  return `<section class="puzzle"><h4>排片时间线 · 22:24—00:57</h4><p>像整理暗房底片一样，依次点击事件。选错可以撤回，不再用五个下拉框机械编号。</p><div class="timeline-board"><div class="timeline-pool">${Object.entries(items).map(([id,t])=>`<button class="timeline-choice ${state.timelinePick.includes(id)?'used':''}" data-time="${id}" ${state.timelinePick.includes(id)?'disabled':''}>${t}</button>`).join('')}</div><div class="timeline-result"><strong>记者手写顺序</strong><ol>${state.timelinePick.map(id=>`<li>${items[id]}</li>`).join('')}</ol></div></div><div class="answer-row"><button class="action-btn" data-action="check-timeline">核对时间线</button><button class="action-btn" data-action="undo-time">撤回一步</button><button class="action-btn" data-action="reset-time">全部重排</button></div></section>`;
}

function renderInterviews(){
  const order=['gu','li','su','fang'];
  const copy={gu:'先让她面对“医生离开时顾文洲仍能回应”这一点。',li:'先确认她能证明线路到哪里，再问她到底听见什么。',su:'先用照片压住流言，再问那封交给报馆的材料。',fang:'把门厅底片、语言习惯、两份补录、收条与新离岗簿一起放到桌上。'};
  return `<div class="interview-grid">${order.map(id=>{const p=PEOPLE[id],ok=canInterview(id),done=state.interviews[id];return `<article class="interview-card"><div class="interview-photo"><img src="${p.img}" alt="${p.name}"><span>补充采访 · ${p.name}</span></div><h4>${p.name}${done?' · 已补录':''}</h4><p>${copy[id]}</p><div class="footer-note">所需材料：${INTERVIEW_REQ[id].join(' / ')}</div>${done?'<div class="interview-status">第二份口供已归档，可在关系人栏查看记者旁记。</div>':`<button class="interview-btn" data-interview="${id}" ${ok?'':'disabled'}>${ok?'开始追问':'材料不足'}</button>`}</article>`}).join('')}</div>${renderInterviewAdvance()}`;
}
function canInterview(id){return INTERVIEW_REQ[id].every(has)&&!state.interviews[id]}
function renderInterviewAdvance(){const all=Object.values(state.interviews).every(Boolean);return all&&has('E18')?'<section class="puzzle"><h4>补录闭合</h4><p>四份第二口供与法医复核已经能互相校验。可以进入记者终稿桌。</p><button class="action-btn" data-action="to-finale">进入终稿</button></section>':''}
function startInterview(id){
  if(!canInterview(id))return;
  const q={
    gu:[['family','“你和哥哥是不是一直关系很差？”'],['doctor','“许医生23:05离开时写他仍能回应。你离开书房前到底发生了什么？”'],['money','“你欠了哥哥多少钱？”']],
    li:[['voice','“你是不是百分之百确定来电就是方正礼？”'],['boundary','“E06与E07只证明线路。请把你亲耳听到的部分和你不能确定的部分分开说。”'],['fear','“方正礼是不是威胁过你？”']],
    su:[['rumor','“大家都说你是最后见到顾文洲的人，对吗？”'],['photo','“E08把你固定在22:24后台。你21:40前与顾文洲分开后，还替他做过什么？”'],['romance','“你和顾文洲究竟是什么关系？”']],
    fang:[['motive','“500元收条是不是说明你一定杀了他？”'],['path','“23:41你在顾宅，00:27外线来自公用电话亭，00:31你才返岗。请把这50分钟完整说一遍。”'],['note','“遗书里有编辑口吻，所以是你写的？”']]
  }[id];
  openModal(`<div class="doc-head"><h3>${PEOPLE[id].name} · 补充采访</h3><div class="doc-meta">不要诱导人物承认记者已经假定的结论。</div></div><div class="doc-body"><p>选择一条真正由现有材料支撑、同时尊重证据边界的问题。</p><div class="question-list">${q.map(([v,t])=>`<button class="question-btn" data-interview-choice="${id}|${v}">${t}</button>`).join('')}</div></div>`);
  bindModalActions();
}
function answerInterview(id,choice){
  if(choice!==INTERVIEW_CORRECT[id]){
    const text={gu:'顾曼青只重复家产争执，关键时间仍未被问到。',li:'黎月白拒绝把“像”说成“确定”，这个回答反而提醒你问题越过了证据边界。',su:'苏婉说：“如果你只想写舞厅传闻，那这不是补录。”',fang:'方正礼抓住你推论过度的地方，只说“那不是证明”。'}[id];
    openModal(`<div class="doc-head"><h3>追问没有击中矛盾</h3></div><div class="doc-body"><p>${text}</p><button class="action-btn" data-retry-interview="${id}">换一个问题</button></div>`);bindModalActions();return;
  }
  const map={gu:'E12',li:'E13',su:'E14',fang:'E15'};
  state.interviews[id]=true;if(!has(map[id]))state.evidence.push(map[id]);addFact(`${PEOPLE[id].name}的第二份口供已归档。`);save();closeModal();render();
  const films={gu:[{img:'assets/images/interview_gu.jpg',k:'顾曼青 · 补录',t:'“我推了他。可医生来的时候，他明明还会应我。”',s:'paper'}],li:[{img:'assets/images/interview_li.jpg',k:'黎月白 · 补录',t:'“声音像方编辑。但我只能把我听见的说清，不能替线路写姓名。”',s:'phone'}],su:[{img:'assets/images/interview_su.jpg',k:'苏婉 · 补录',t:'“他让我把材料交给方编辑。那不是情书，是他给自己留的一条后路。”',s:'paper'}],fang:FILMS.stage4}[id];
  playFilm(films);
}
function openMoment(id){const p=PEOPLE[id];openModal(`<div class="doc-head"><h3>${p.name} · 记者旁记</h3><div class="doc-meta">不直接作为责任判定证据</div></div><div class="doc-body"><p>${p.moment}</p><p class="footer-note">人物片段用于补足性格和处境，不自动改变证据链。</p></div>`)}

function renderFinale(){
  if(!state.solved.final)return `<section class="puzzle"><h4>责任链 · 不用一个“凶手”吞掉全过程</h4><p>分别选择四段行为的主要责任人。E12、E15、E18必须能够同时成立。</p><div class="final-grid">${finalItem('fin1','最初伤害')}${finalItem('fin2','延误救助')}${finalItem('fin3','伪造“自尽”现场')}${finalItem('fin4','00:27提前送讯')}</div><button class="action-btn" data-action="check-final">提交责任链</button></section>`;
  if(state.expert&&!state.solved.review)return renderExpertReview();
  const meta=getMeta();const endings=new Set(meta.endings||[]);
  return `<div class="notice"><strong>责任链已成立。</strong>报道选择不会改变事实，但会改变你怎样处理公众知情权、隐私与程序。</div><div class="report-options"><div class="report"><h4>《号外》</h4><p>把家产争执、舞厅传闻和全部姓名一起推上头版，以最大轰动逼迫重查。</p><button class="action-btn" data-ending="sensational">付印${endings.has('sensational')?' · 已见':''}</button></div><div class="report best"><h4>《第二版》</h4><p>写清四段责任链与报馆失守，同时删除与责任无关的私生活，对边缘人物作必要匿名。</p><button class="action-btn" data-ending="best">付印${endings.has('best')?' · 已见':''}</button></div><div class="report"><h4>《压稿》</h4><p>把完整材料交巡捕房，报纸仅刊“案件重新调查中”，把程序放在公开之前。</p><button class="action-btn" data-ending="suppress">付印${endings.has('suppress')?' · 已见':''}</button></div></div><div class="archive-progress">报道档案：${endings.size}/3。不同终稿均保留同一案件事实，但会补全不同的记者伦理后果。</div>`;
}
function finalItem(id,label){return `<div class="final-item"><strong>${label}</strong><select id="${id}"><option value="">选择责任人</option><option>顾曼青</option><option>方正礼</option><option>苏婉</option><option>黎月白</option><option>罗敬安</option></select></div>`}
function renderExpertReview(){
  const r=REVIEW_VARIANTS[state.reviewVariant];return `<section class="puzzle"><h4>${r.title}</h4><p>${r.question}</p><div class="question-list">${r.options.map(([label,desc,flag])=>`<button class="question-btn" data-review-answer="${flag==='correct'?'1':'0'}"><strong>${label}</strong><br><span>${desc}</span></button>`).join('')}</div></section>`;
}

function bindScene(){
  $$('[data-evidence]').forEach(b=>b.onclick=()=>addEvidence(b.dataset.evidence,true));
  $$('[data-action]').forEach(b=>b.onclick=()=>handleAction(b.dataset.action));
  $$('[data-interview]').forEach(b=>b.onclick=()=>startInterview(b.dataset.interview));
  $$('[data-ending]').forEach(b=>b.onclick=()=>ending(b.dataset.ending));
  $$('[data-wire]').forEach(b=>b.onclick=()=>chooseWire(b.dataset.wire));
  $$('[data-time]').forEach(b=>b.onclick=()=>chooseTime(b.dataset.time));
  $$('[data-review-answer]').forEach(b=>b.onclick=()=>checkReview(b.dataset.reviewAnswer==='1'));
}
function bindModalActions(){
  $$('[data-interview-choice]').forEach(b=>b.onclick=()=>{const [id,c]=b.dataset.interviewChoice.split('|');answerInterview(id,c)});
  $$('[data-retry-interview]').forEach(b=>b.onclick=()=>startInterview(b.dataset.retryInterview));
}
function chooseWire(id){if(state.routePick.length>=3||state.routePick.includes(id))return;state.routePick.push(id);save();render()}
function chooseTime(id){if(state.timelinePick.includes(id)||state.timelinePick.length>=5)return;state.timelinePick.push(id);save();render()}
function validateRoute(arr){return arr.join('|')===ROUTE_ORDER.join('|')}
function validateTimeline(arr){return arr.join('|')===TIMELINE_ORDER.join('|')}
function isAnomalyAnswer(v){const s=String(v||'').replace(/\s/g,'');return (/报馆|报纸/.test(s))&&(/巡捕|警方/.test(s))&&(/早|先|提前|之前/.test(s))}
function validateFinal(v){return v.join('|')==='顾曼青|方正礼|方正礼|方正礼'}
function handleAction(a){
  if(a==='check-anomaly')return checkAnomaly();
  if(a==='check-route')return checkRoute();
  if(a==='reset-route'){state.routePick=[];save();return render()}
  if(a==='check-timeline')return checkTimeline();
  if(a==='undo-time'){state.timelinePick.pop();save();return render()}
  if(a==='reset-time'){state.timelinePick=[];save();return render()}
  if(a==='to-finale'){state.stage=4;state.scene='finale';save();render();playFilm(FILMS.stage4);return}
  if(a==='check-final')return checkFinal();
}
function checkAnomaly(){const v=$('#anomalyInput')?.value||'';if(!isAnomalyAnswer(v))return openModal('<div class="doc-head"><h3>便笺还不能成立</h3></div><div class="doc-body"><p>答案需要同时写出两个记录方与明确先后关系。只写“时间不对”仍然过宽。</p></div>');state.solved.anomaly=true;state.stage=2;addFact('00:32报馆已排出“自尽”，早于巡捕00:57第一次到场。');save();render();playFilm(FILMS.stage2)}
function checkRoute(){if(!validateRoute(state.routePick))return openModal('<div class="doc-head"><h3>线路没有接通</h3></div><div class="doc-body"><p>回到E06与E07：来源是公用电话亭，中继是报馆总机，终点是编辑室3号分机。注意“方正礼本人”不是线路节点。</p></div>');state.solved.route=true;addFact('00:27外线：公用电话亭 → 报馆总机 → 编辑室3号；接听人为罗敬安，线路本身不证明拨号人。');save();render();playSfx('phone')}
function checkTimeline(){if(!validateTimeline(state.timelinePick))return openModal('<div class="doc-head"><h3>时间线仍有冲突</h3></div><div class="doc-body"><p>至少一张“底片”放错位置。回看每份材料的具体时刻，不要用“午夜前后”代替分钟。</p></div>');state.solved.timeline=true;state.stage=3;state.scene='interviews';addFact('22:24—00:57关键事件已连续重建。');save();render();playFilm(FILMS.stage3)}
function checkFinal(){const v=[$('#fin1')?.value,$('#fin2')?.value,$('#fin3')?.value,$('#fin4')?.value];if(!validateFinal(v))return openModal('<div class="doc-head"><h3>责任链尚未闭合</h3></div><div class="doc-body"><p>最初伤害与后续不求救、伪造现场、提前送讯不是同一段行为。请让E12、E15、E18同时成立。</p></div>');state.solved.final=true;addFact('责任链：顾曼青造成最初伤害；方正礼延误救助、伪造现场，并在00:27从公用电话亭提前送讯。');save();render();playSfx('stamp')}
function checkReview(ok){if(!ok)return openModal('<div class="doc-head"><h3>复核未通过</h3></div><div class="doc-body"><p>这组材料没有直接覆盖题目要求的两个事实边界。独立复核不看“最可疑”，只看“最能互相验证”。</p></div>');state.solved.review=true;addFact(`独立复核通过：${REVIEW_VARIANTS[state.reviewVariant].title.replace('复核任务 · ','')}。`);save();render();playSfx('stamp')}
function addFactIfReady(id){const map={E01:'00:32时，报馆终校样已经出现顾文洲死讯。',E03:'巡捕房00:57才第一次抵达顾宅。',E05:'23:05时顾文洲仍能回应。',E08:'22:24时苏婉仍在舞厅后台。',E09:'23:41顾宅门厅出现与方正礼衣着体态一致的男子。',E17:'方正礼23:26离岗、00:31返岗，能够覆盖顾宅与00:27公用电话的路径。',E18:'最初撞击并非即刻致命，存在独立救治窗口。'};if(map[id])addFact(map[id])}

function openEvidence(id){const e=EVIDENCE[id];playSfx(e.sound);openModal(`<div class="doc-head"><h3>${id} · ${e.title}</h3><div class="doc-meta">原始材料 / ${SCENES[e.scene].title}</div></div><div class="doc-body"><div class="doc-facsimile">${e.facsimile.replace(/\n/g,'<br>')}<br><br><span class="doc-stamp">复核原件</span></div><p>${e.body}</p><p class="footer-note">记者注：原始材料记录事实，不自动生成推论；每份材料都保留自己的证明边界。</p></div>`)}
function openModal(html){$('#modalBody').innerHTML=html;$('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
function bag(){const list=state.evidence.length?state.evidence.map(id=>`<div class="evidence-row"><strong>${id} · ${EVIDENCE[id].title}</strong><div>${EVIDENCE[id].summary}</div></div>`).join(''):'<p>案件袋为空。</p>';openModal(`<div class="doc-head"><h3>记者案件袋</h3><div class="doc-meta">${state.evidence.length}/18 · 已取得材料</div></div><div class="evidence-list">${list}</div>`)}
function hint(){if(state.expert)return;const arr=HINTS[state.stage];let i=Math.min(state.hintUse[state.stage]||0,arr.length-1);openModal(`<div class="doc-head"><h3>程序提示 ${i+1}/3</h3></div><div class="doc-body"><p>${arr[i]}</p><p class="footer-note">提示会逐级变具体，可反复打开案件袋回看材料。</p></div>`);state.hintUse[state.stage]=Math.min(2,i+1);save()}

function ending(type){
  const data={
    sensational:{title:'结局 · 号外',text:'你把所有姓名与私人关系一起推上头版。巡捕房迅速重查，报纸销量暴涨；但苏婉和顾曼青的生活也被永久钉在最耸动的叙事里。你公开了事实，也把事实之外的东西一起卖掉了。'},
    best:{title:'最佳结局 · 第二版',text:'你写清顾曼青造成最初伤害、方正礼延误救助并伪造现场，以及他00:27从公用电话亭提前送讯、00:31返岗、00:32签付印的完整链条。同时删去与责任无关的私生活，并在文末写明报馆自身的核验失守。'},
    suppress:{title:'结局 · 压稿',text:'你先把材料交给巡捕房，报纸只留“案件重新调查中”。程序得到最大尊重，但公众暂时看不到一条提前写好的死讯怎样差点替代事实。几周后，内部整改开始，却没有头版记住它。'}
  }[type];
  state.ending=type;state.completedOnce=true;save();const meta=getMeta();meta.expertUnlocked=true;meta.endings=[...new Set([...(meta.endings||[]),type])];setMeta(meta);refreshBoot();
  playFilm([...FILMS.ending],()=>openModal(`<div class="ending"><div class="edition">申江晚报 · ${type==='best'?'第二版':type==='sensational'?'号外':'暂缓稿'}</div><h3>${data.title}</h3><p>${data.text}</p><p><strong>独立复核已解锁。</strong>复核模式会隐藏程序提示、打乱同场景材料顺序，并在终局随机抽取“电话身份 / 流言排除 / 救治窗口”中的一项交叉验证。</p><p>报道档案：${new Set(meta.endings).size}/3。</p></div>`));
}

function switchAmbience(){if(!state.sound)return;const a=$('#ambience');const src=AUDIO[SCENES[state.scene].ambience]||AUDIO.rain;if(!a.src.endsWith(src)){a.src=src;a.volume=.16;a.play().catch(()=>{})}else if(a.paused)a.play().catch(()=>{})}
function playSfx(kind){if(!state.sound)return;const src=AUDIO[kind];if(!src)return;const s=$('#sfx');s.src=src;s.volume=.32;s.play().catch(()=>{})}
function toggleSound(){state.sound=!state.sound;save();if(!state.sound){$('#ambience').pause();$('#sfx').pause()}render()}
function playFilm(frames,cb){if(!frames||!frames.length){cb?.();return}let i=0;const overlay=$('#cinematic');const show=()=>{const f=frames[i],im=$('#filmImage');im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=f.img;$('#filmKicker').textContent=f.k;$('#filmText').textContent=f.t;$('#filmNext').textContent=i===frames.length-1?'进入':'继续';if(f.s)playSfx(f.s)};$('#filmNext').onclick=()=>{i++;if(i>=frames.length){overlay.classList.add('hidden');cb?.();switchAmbience();return}show()};show();overlay.classList.remove('hidden')}

function attach(){
  $('#newGame').onclick=()=>start(false);$('#continueGame').onclick=continueGame;$('#expertGame').onclick=()=>start(true);$('#resetGame').onclick=resetGame;
  $('#modalClose').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
  $('#bagBtn').onclick=bag;$('#hintBtn').onclick=hint;$('#soundBtn').onclick=toggleSound;$('#saveBtn').onclick=()=>{save();openModal('<div class="doc-head"><h3>已落笔存档</h3></div><div class="doc-body"><p>当前调查进度已经写入本机浏览器。</p></div>')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#cinematic').classList.add('hidden')}if(e.key.toLowerCase()==='h'&&!state.expert)hint();if(e.key.toLowerCase()==='m')toggleSound()});
}

async function checkImages(){const imgs=[...new Set([...Object.values(SCENES).map(x=>x.image),...Object.values(PEOPLE).map(x=>x.img).filter(Boolean),...Object.values(FILMS).flat().map(x=>x.img)])];return Promise.all(imgs.map(src=>new Promise(res=>{const im=new Image();im.onload=()=>res({src,ok:true});im.onerror=()=>res({src,ok:false});im.src=src})))}
async function runQA(){
  const errors=[];const original=state;
  try{
    if(Object.keys(EVIDENCE).length!==18)errors.push('evidence-count');
    if(!isAnomalyAnswer('报馆比巡捕更早形成了自尽记录'))errors.push('anomaly-validator');
    if(isAnomalyAnswer('时间不对'))errors.push('anomaly-too-loose');
    if(!validateRoute(['booth','switch','desk3']))errors.push('route-validator');
    if(validateRoute(['booth','switch','fang']))errors.push('route-identity-boundary');
    if(!validateTimeline(['su','doctor','fang','phone','police']))errors.push('timeline-validator');
    if(!validateFinal(['顾曼青','方正礼','方正礼','方正礼']))errors.push('final-validator');
    state=freshState(false);state.sound=false;state.evidence=['E01','E03'];state.scene='newsroom';render();if(!document.querySelector('[data-action="check-anomaly"]'))errors.push('stage1-render');
    state.solved.anomaly=true;state.stage=2;state.scene='switchboard';state.evidence=['E01','E03','E05','E06','E07','E08','E09','E10','E11'];render();if(!document.querySelector('[data-action="check-route"]'))errors.push('route-render');
    state.solved.route=true;state.routePick=[...ROUTE_ORDER];render();if(!document.querySelector('[data-action="check-timeline"]'))errors.push('timeline-render');
    state.solved.timeline=true;state.stage=3;state.scene='interviews';state.evidence=[...Object.keys(EVIDENCE).filter(id=>!['E12','E13','E14','E15'].includes(id))];render();if(!canInterview('gu')||!canInterview('li')||!canInterview('su'))errors.push('interview-prereq-basic');
    state.interviews={gu:true,li:true,su:true,fang:false};state.evidence.push('E12','E13','E14');if(!canInterview('fang'))errors.push('interview-prereq-fang');
    state.interviews.fang=true;state.evidence.push('E15');state.stage=4;state.scene='finale';state.solved.final=true;state.expert=true;state.solved.review=false;render();if(!document.querySelector('[data-review-answer]'))errors.push('expert-review-render');
    const imageResults=await checkImages();for(const r of imageResults)if(!r.ok)errors.push('image:'+r.src);
    const html=document.body.innerHTML;if(/undefined|null\.title/.test(html))errors.push('undefined-render');
  }catch(e){errors.push('exception:'+e.message)}finally{state=original}
  const d=document.createElement('div');d.className='qa-result';d.id='qaResult';d.textContent=errors.length?'QA_FAIL '+errors.join(' | '):'QA_PASS';document.body.appendChild(d);document.body.dataset.qa=errors.length?'FAIL':'PASS';return errors;
}

(function init(){attach();refreshBoot();if(new URLSearchParams(location.search).get('qa')==='1'){$('#boot').classList.add('hidden');$('#game').classList.remove('hidden');runQA()}})();
