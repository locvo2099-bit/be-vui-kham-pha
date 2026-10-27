'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const shuffle = a => [...a].sort(() => Math.random() - .5);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const palette = {red:'#dc6550',yellow:'#e9bb5b',blue:'#6faabd',green:'#80b89a',orange:'#e99a5a'};
function wheels() { return '<circle cx="55" cy="111" r="19" fill="#435953"/><circle cx="55" cy="111" r="9" fill="#dbe4da"/><circle cx="181" cy="111" r="19" fill="#435953"/><circle cx="181" cy="111" r="9" fill="#dbe4da"/>'; }
function vehicle(type, color, noWheels=false) {
  let p='', w=noWheels?'':wheels(), c=color||'#dd7054';
  const win='<rect x="159" y="63" width="25" height="18" rx="5" fill="#d7f0ea"/>';
  if(type==='fire') p='<rect x="16" y="58" width="145" height="50" rx="10" fill="#df604d"/><path d="M153 55h39l25 25v28h-64z" fill="#df604d"/>'+win+'<rect x="25" y="70" width="95" height="7" rx="3" fill="#fff7e5"/><rect x="28" y="83" width="31" height="16" rx="3" fill="#f6d585"/><rect x="78" y="84" width="44" height="14" rx="3" fill="#f6d585"/><rect x="23" y="39" width="130" height="8" rx="4" fill="#f9f3df"/><path d="M35 40v12m24-12v12m24-12v12m24-12v12m24-12v12" stroke="#fff8e7" stroke-width="4"/><rect x="165" y="45" width="19" height="7" rx="3" fill="#efbe5c"/>';
  else if(type==='ambulance') p='<rect x="16" y="47" width="137" height="61" rx="12" fill="#fffdf5" stroke="#dfe6dc" stroke-width="3"/><path d="M151 58h40l25 25v25h-65z" fill="#faf9ef" stroke="#dfe6dc" stroke-width="3"/>'+win+'<rect x="18" y="88" width="195" height="9" fill="#e77260"/><rect x="76" y="56" width="13" height="31" rx="2" fill="#df6856"/><rect x="67" y="65" width="31" height="13" rx="2" fill="#df6856"/><rect x="89" y="38" width="25" height="8" rx="4" fill="#df6856"/>';
  else if(type==='excavator') { p='<rect x="20" y="96" width="135" height="30" rx="15" fill="#63756b"/><circle cx="48" cy="111" r="8" fill="#d6e0d4"/><circle cx="87" cy="111" r="8" fill="#d6e0d4"/><circle cx="126" cy="111" r="8" fill="#d6e0d4"/><rect x="39" y="65" width="111" height="33" rx="9" fill="#edb94d"/><path d="M102 34h39l13 31h-52z" fill="#e6ac40"/><path d="M110 40h24l8 19h-32z" fill="#d9f0e5"/><path d="M48 72L78 28h15L65 78z" fill="#e4a838"/><path d="M82 28l52-9 4 10-49 13z" fill="#edb94d"/><path d="M129 20l36 12-3 8-29-9z" fill="#e4a838"/><path d="M160 31l20 12-4 24-14-10z" fill="#d49433"/>';w=''; }
  else if(type==='dump') p='<path d="M18 51h118l-13 42H29z" fill="#eab454"/><path d="M23 60h103" stroke="#fbe2a6" stroke-width="5"/><rect x="26" y="91" width="120" height="17" rx="6" fill="#d99446"/><path d="M142 59h44l30 25v24h-74z" fill="#e5a54a"/>'+win;
  else if(type==='mixer') p='<rect x="23" y="86" width="130" height="22" rx="6" fill="#7c9c9b"/><ellipse cx="89" cy="63" rx="55" ry="31" fill="#f2d698" transform="rotate(-14 89 63)"/><path d="M65 39l40 49M87 35l38 45" stroke="#e99666" stroke-width="9"/><path d="M147 58h42l27 25v25h-69z" fill="#84b4ac"/>'+win;
  else if(type==='bus') p='<rect x="13" y="37" width="205" height="71" rx="16" fill="#eabb61"/><rect x="25" y="49" width="35" height="24" rx="5" fill="#e4f3ec"/><rect x="66" y="49" width="35" height="24" rx="5" fill="#e4f3ec"/><rect x="107" y="49" width="35" height="24" rx="5" fill="#e4f3ec"/><rect x="151" y="49" width="47" height="24" rx="5" fill="#e4f3ec"/><path d="M18 84h195" stroke="#fae3a5" stroke-width="5"/>';
  else if(type==='police') p='<path d="M19 78h28l23-31h75l32 31h30c8 0 13 6 13 13v17H19z" fill="#739db4"/><path d="M57 77l18-23h31v23zm58-23h27l24 23h-51z" fill="#e4f3ef"/><path d="M18 84h200v12H18z" fill="#f7f6e9"/><circle cx="128" cy="90" r="7" fill="#e6bd63"/><rect x="105" y="39" width="30" height="8" rx="4" fill="#d97564"/>';
  else if(type==='trash') p='<rect x="17" y="49" width="131" height="58" rx="13" fill="#84b695"/><path d="M149 58h38l28 25v25h-66z" fill="#6da586"/>'+win+'<rect x="39" y="61" width="72" height="33" rx="5" fill="#d5ecce"/><path d="M65 76h22m-6-7l7 7-7 7" fill="none" stroke="#7cab82" stroke-width="4"/>';
  else if(type==='tractor') {p='<rect x="49" y="75" width="155" height="31" rx="9" fill="#d77d5b"/><path d="M67 40h50l14 35H67z" fill="#d77d5b"/><rect x="74" y="47" width="36" height="22" rx="4" fill="#dcf0e8"/><rect x="158" y="66" width="34" height="11" rx="5" fill="#eab55e"/>';w=noWheels?'':'<circle cx="76" cy="107" r="28" fill="#435953"/><circle cx="76" cy="107" r="13" fill="#dbe4da"/><circle cx="182" cy="113" r="16" fill="#435953"/><circle cx="182" cy="113" r="7" fill="#dbe4da"/>'; }
  else if(type==='train') {p='<rect x="20" y="57" width="139" height="47" rx="10" fill="#739fb5"/><path d="M156 42h34l23 32v30h-57z" fill="#df795d"/><rect x="167" y="50" width="21" height="17" rx="4" fill="#e4f2e9"/><rect x="31" y="67" width="33" height="20" rx="4" fill="#e3f0e9"/><rect x="73" y="67" width="33" height="20" rx="4" fill="#e3f0e9"/><rect x="115" y="67" width="28" height="20" rx="4" fill="#e3f0e9"/>';w=noWheels?'':'<circle cx="52" cy="108" r="13" fill="#435953"/><circle cx="99" cy="108" r="13" fill="#435953"/><circle cx="179" cy="108" r="13" fill="#435953"/>'; }
  else if(type==='plane') {p='<path d="M20 77h76l-21-38h20l39 38h48l27-13h14l-13 22c-4 7-11 10-20 10h-58l-30 30H85l13-30H42c-13 0-20-7-22-19z" fill="#8db8c4"/><path d="M45 82h140" stroke="#eff6e9" stroke-width="5"/>';w='';}
  else if(type==='boat') {p='<path d="M23 89h190l-25 29H53z" fill="#789eb0"/><path d="M80 48h67v41H80z" fill="#f1d8a6"/><rect x="91" y="56" width="42" height="21" rx="4" fill="#d7eee9"/><path d="M106 48V32h25v16" fill="#dd8566"/><path d="M25 127c20-9 37 9 57 0s37 9 57 0 37 9 57 0" fill="none" stroke="#a6cfd4" stroke-width="5"/>';w='';}
  else {p='<path d="M18 80h29l25-33h69l32 33h32c8 0 14 6 14 14v14H18z" fill="'+c+'"/><path d="M59 78l19-24h29v24zm56-24h24l25 24h-49z" fill="#e2f3ed"/><rect x="32" y="84" width="15" height="7" rx="3" fill="#f9e6a1"/><rect x="192" y="84" width="15" height="7" rx="3" fill="#f9e6a1"/>'; }
  return '<svg viewBox="0 0 240 145" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+p+w+'</svg>';
}
const vehicles = [
  {id:'fire',name:'Xe cứu hỏa'}, {id:'ambulance',name:'Xe cứu thương'}, {id:'excavator',name:'Máy xúc'},
  {id:'dump',name:'Xe ben'}, {id:'mixer',name:'Xe trộn bê tông'}, {id:'bus',name:'Xe buýt'},
  {id:'police',name:'Xe cảnh sát'}, {id:'trash',name:'Xe thu gom rác'}, {id:'tractor',name:'Máy kéo'},
  {id:'car',name:'Ô tô con'}, {id:'train',name:'Tàu hỏa'}, {id:'plane',name:'Máy bay'}, {id:'boat',name:'Thuyền'}
];
const games = {
  explore:{title:'Gara xe của bé',desc:'Chạm để khám phá những chiếc xe.',icon:'🚒',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chạm vào từng chiếc xe để nghe tên nhé!',parent:'Cùng bé kể tên xe ngoài đường hoặc trong sách. Xe cứu hỏa giúp chữa cháy, xe cứu thương chở người cần chăm sóc.'},
  garage:{title:'Xe về đúng gara',desc:'Đưa xe về gara cùng màu.',icon:'🚗',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chạm vào xe, rồi chạm vào gara cùng màu nhé!',parent:'Dùng băng keo màu làm hai gara trên sàn và cho bé đưa xe đồ chơi về đúng chỗ.'},
  wheels:{title:'Lắp bánh cho xe',desc:'Giúp xe có đủ bánh nào!',icon:'🛞',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chọn bánh xe tròn, rồi chạm vào chỗ còn thiếu nhé!',parent:'Cùng bé quan sát bánh xe đồ chơi và chỉ cho bé thấy bánh xe có dạng hình tròn.'},
  shadow:{title:'Tìm bóng của xe',desc:'Ghép xe với hình bóng.',icon:'🚛',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chọn một chiếc xe, rồi tìm hình bóng giống chiếc xe đó nhé!',parent:'Đặt hai chiếc xe đồ chơi khác nhau cạnh nhau, cùng bé quan sát hình dáng của từng xe.'},
  drive:{title:'Xe tìm đường về nhà',desc:'Cùng xe đi đến từng điểm.',icon:'🛣️',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chạm vào những chấm màu theo thứ tự để đưa xe về nhà nhé!',parent:'Dùng băng keo giấy làm đường trên sàn để bé đẩy xe đi theo.'},
  vehiclecount:{title:'Bé đếm xe',desc:'Cùng đếm những chiếc xe.',icon:'🚙',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bố mẹ cùng bé đếm xe, rồi chọn số tương ứng nhé!',parent:'Xếp một đến ba chiếc xe đồ chơi. Chỉ vào từng xe và đếm chậm cùng bé.'},
  where:{title:'Xe đi ở đâu?',desc:'Đường, bầu trời hay mặt nước?',icon:'✈️',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Bé chọn phương tiện, rồi chọn nơi phương tiện đó di chuyển nhé!',parent:'Quan sát một chiếc ô tô hoặc máy bay trong sách và hỏi bé xe đi ở đâu.'},
  traffic:{title:'Đèn xanh đèn đỏ',desc:'Cùng xe đi và dừng lại.',icon:'🚦',cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:'Đèn xanh thì xe đi. Đèn đỏ thì mình dừng nhé!',parent:'Khi đi cùng bé, bố mẹ chỉ cho bé đèn giao thông. Luôn nắm tay và hướng dẫn bé khi qua đường.'},
  colors:{title:'Phân loại màu sắc',desc:'Những quả bóng về đúng rổ.',icon:'🎨',cat:'CÙNG KHÁM PHÁ',instruction:'Bé chọn quả bóng rồi chọn chiếc rổ cùng màu nhé!',parent:'Chọn đồ vật đủ lớn có hai màu, cùng bé phân loại vào hai chiếc hộp.'},
  shapes:{title:'Ghép hình vào ô',desc:'Tròn, vuông và tam giác.',icon:'🔺',cat:'CÙNG KHÁM PHÁ',instruction:'Bé chọn một hình, rồi tìm ô có hình giống như vậy nhé!',parent:'Cùng bé tìm hình tròn, hình vuông quanh nhà, ví dụ chiếc đĩa hoặc chiếc hộp.'},
  animals:{title:'Con vật quanh bé',desc:'Cùng nhận biết các bạn thú.',icon:'🐱',cat:'CÙNG KHÁM PHÁ',instruction:'Bé hãy tìm con vật được gọi tên nhé!',parent:'Xem sách tranh và hỏi bé con vật nào kêu meo meo, con nào kêu gâu gâu.'},
  count:{title:'Bé tập đếm',desc:'Đếm những quả táo xinh.',icon:'🍎',cat:'CÙNG KHÁM PHÁ',instruction:'Bố mẹ cùng bé đếm táo, rồi chọn số tương ứng nhé!',parent:'Cùng bé đếm một đến ba loại quả thật, chạm vào từng quả khi đếm.'},
  tidy:{title:'Sắp xếp đồ vật',desc:'Cất đồ vào đúng nơi.',icon:'🧺',cat:'CÙNG KHÁM PHÁ',instruction:'Bé chọn đồ vật rồi chọn nơi để đồ phù hợp nhé!',parent:'Bé có thể cùng bố mẹ cất sách lên kệ và đặt giày vào chỗ của mình.'},
  puzzle:{title:'Ghép tranh đơn giản',desc:'Ghép từng mảnh thành hình.',icon:'🧩',cat:'CÙNG KHÁM PHÁ',instruction:'Bé chọn mảnh tranh, rồi chạm vào ô có hình giống mảnh đó nhé!',parent:'Bắt đầu với tranh ghép hai miếng lớn; để bé tự xoay xở và hỗ trợ khi bé cần.'},
  size:{title:'Lớn và nhỏ',desc:'Cùng so sánh hai đồ vật.',icon:'🟠',cat:'CÙNG KHÁM PHÁ',instruction:'Bé hãy chọn quả bóng theo lời gợi ý nhé!',parent:'Đặt hai quả bóng có kích thước khác nhau cạnh nhau. Cùng bé nói “lớn” và “nhỏ”.'},
  plant:{title:'Chăm sóc cây',desc:'Cùng tưới nước cho cây.',icon:'🌱',cat:'CÙNG KHÁM PHÁ',instruction:'Bé chạm vào bình tưới để chăm sóc cây nhé!',parent:'Cho bé dùng bình nhỏ tưới một chậu cây thật. Bố mẹ ở cạnh và giúp bé lau nếu nước đổ.'}
};
const physical = [
  {icon:'🚗',title:'Gara xe trên sàn',text:'Dùng băng keo màu tạo hai chỗ đậu. Bé đưa xe về đúng gara.',tip:'CHUẨN BỊ: XE ĐỒ CHƠI, BĂNG KEO GIẤY'},
  {icon:'💧',title:'Bé tập rót nước',text:'Để bé rót một ít nước từ bình nhỏ sang cốc, trên một chiếc khay.',tip:'CHUẨN BỊ: BÌNH NHỰA, CỐC, KHĂN'},
  {icon:'📦',title:'Ghép nắp với hộp',text:'Đưa bé hai hoặc ba chiếc hộp nhựa và cùng tìm nắp phù hợp.',tip:'CHUẨN BỊ: HỘP VÀ NẮP ĐỦ LỚN'},
  {icon:'🍃',title:'Cùng chăm sóc cây',text:'Cho bé cầm bình nhỏ tưới cây và quan sát lá, thân, đất.',tip:'CHUẨN BỊ: CÂY VÀ BÌNH TƯỚI NHỎ'},
  {icon:'🧸',title:'Phân loại đồ vật',text:'Cùng bé chia đồ chơi lớn theo màu hoặc cất sách lên kệ.',tip:'CHUẨN BỊ: HAI HỘP, ĐỒ CHƠI LỚN'},
  {icon:'🧩',title:'Ghép tranh cùng con',text:'Bắt đầu từ tranh hai miếng có ô tô hoặc con vật bé thích.',tip:'CHUẨN BỊ: TRANH GHÉP MIẾNG LỚN'}
];
const stage=$('#game-stage'), layer=$('#game-layer');
let activeGame=null, level=1, selected=null, done=new Set(), task=null, messageText='', timerId=null, timerEnd=null;
const safeStorage={getItem(k){try{return localStorage.getItem(k)}catch(_){return null}},setItem(k,v){try{localStorage.setItem(k,v)}catch(_){}}};
const config={voice:safeStorage.getItem('bvVoice')!=='off',sound:safeStorage.getItem('bvSound')!=='off'};
let audioCtx=null;
function say(text) { if(!config.voice||!('speechSynthesis' in window)) return; try {speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang='vi-VN';u.rate=.86;u.pitch=1.05; const v=speechSynthesis.getVoices().find(x=>/^vi([_-]|$)/i.test(x.lang));if(v)u.voice=v;speechSynthesis.speak(u);}catch(_){} }
function tone(ok=true) { if(!config.sound)return; try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();let o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=ok?620:370;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.045,audioCtx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.16);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.17);}catch(_){} }
function vehicleSound(type){if(!config.sound)return;try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime;let emergency=['fire','ambulance','police'].includes(type);o.type=emergency?'sine':'triangle';o.frequency.setValueAtTime(emergency?400:150,t);o.frequency.linearRampToValueAtTime(emergency?520:190,t+.16);o.frequency.linearRampToValueAtTime(emergency?400:145,t+.34);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.025,t+.03);g.gain.linearRampToValueAtTime(.001,t+.36);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+.38);}catch(_){}}
function feedback(text,ok) {$('#feedback').textContent=text;if(ok!==undefined)tone(ok);}
function card(id,kind) {let g=games[id];if(kind==='side') return '<button class="side-card" type="button" data-game="'+id+'"><h3>'+esc(g.title)+'</h3><p>'+esc(g.desc)+'</p><span class="card-visual">'+g.icon+'</span><span class="mini-arrow">→</span></button>';return '<button class="general-card" type="button" data-game="'+id+'"><span class="game-icon">'+g.icon+'</span><h3>'+esc(g.title)+'</h3><p>'+esc(g.desc)+'</p><span class="arrow-bubble">→</span></button>'; }
function renderHome(){
 $('#hero-vehicle').innerHTML=vehicle('fire');
 $('#feature-vehicles').innerHTML='<div>'+vehicle('ambulance')+'</div><div class="small-car">'+vehicle('excavator')+'</div>';
 const vg=['garage','wheels','shadow','drive','vehiclecount','where','traffic'];
 $('#vehicle-games').innerHTML=vg.slice(0,4).map(x=>card(x,'side')).join('');
 $('.feature-layout').insertAdjacentHTML('afterend','<div class="side-games extra-grid">'+vg.slice(4).map(x=>card(x,'side')).join('')+'</div>');
 $('#vehicle-strip').innerHTML=vehicles.slice(0,5).map(v=>'<span class="strip-item">'+vehicle(v.id)+'<span>'+esc(v.name)+'</span></span>').join('');
 $('#general-games').innerHTML=['colors','shapes','animals','count','tidy','puzzle','size','plant'].map(x=>card(x,'general')).join('');
 $('#activities').innerHTML=physical.map(x=>'<article class="activity-card"><span class="activity-icon">'+x.icon+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.text)+'</p><small>'+esc(x.tip)+'</small></article>').join('')+'<div class="parent-safety">Lưu ý: Bố mẹ chơi cùng bé, chọn đồ vật lớn, tránh chi tiết nhỏ dễ gây hóc và quan sát bé khi chơi với nước.</div>';
}
function openGame(id) {
 if(!games[id])return;activeGame=id;level=1;layer.hidden=false;document.body.classList.add('modal-open');renderGame();$('#close-game').focus();
}
function closeGame(){layer.hidden=true;document.body.classList.remove('modal-open');if('speechSynthesis' in window)speechSynthesis.cancel();activeGame=null;task=null;}
function renderGame() {
 if(!activeGame)return; selected=null;done=new Set();task=null;let g=games[activeGame];
 $('#game-title').textContent=g.title;$('#game-category').textContent=g.cat;messageText=g.instruction;
 $('#game-instruction').textContent=messageText;$('#parent-inline').innerHTML='<strong>🌿 Chơi cùng bố mẹ:</strong> '+esc(g.parent);
 $$('.level').forEach(b=>b.classList.toggle('active',+b.dataset.level===level));
 feedback('Bé cứ từ từ nhé! ♥');
 const draw={explore:drawExplore,garage:drawGarage,wheels:drawWheels,shadow:drawShadow,drive:drawDrive,vehiclecount:()=>drawCount(true),where:drawWhere,traffic:drawTraffic,colors:drawColors,shapes:drawShapes,animals:drawAnimals,count:()=>drawCount(false),tidy:drawTidy,puzzle:drawPuzzle,size:drawSize,plant:drawPlant};
 draw[activeGame]();stage.scrollTop=0;
}
function renderExplore(){
 const list=vehicles,goal=level===2?vehicles[Math.floor(Math.random()*vehicles.length)]:null;
 task={type:'explore',target:goal?goal.id:null};
 messageText=goal?'Bé tìm '+goal.name.toLowerCase()+' nhé!':'Bé chạm vào từng chiếc xe để nghe tên nhé!';$('#game-instruction').textContent=messageText;
 stage.innerHTML='<p class="stage-intro">'+(goal?'Bé tìm '+goal.name.toLowerCase()+' nhé!':'Chạm vào một chiếc xe để khám phá cùng bé')+'</p><div class="explore-grid">'+list.map(v=>'<button class="explore-card" type="button" data-vehicle="'+v.id+'">'+vehicle(v.id)+'<span>'+esc(v.name)+'</span></button>').join('')+'</div><div class="explore-selected" id="explore-selected">'+vehicle('fire')+'<span>Xin chào xe cứu hỏa!</span></div>';
}
function drawExplore(){renderExplore();}
const colors=[{id:'red',name:'đỏ',c:palette.red},{id:'yellow',name:'vàng',c:palette.yellow},{id:'blue',name:'xanh dương',c:palette.blue}];
function shape(id,c,outline=false){return '<span class="shape '+id+(outline?' outline':'')+'" style="--shape-color:'+c+'"></span>';}
function matchGame(items,options={}) {
 task={type:'match',items, options};selected=null;
 stage.innerHTML='<div class="match-layout"><div><p class="stage-label">1. CHỌN MỘT HÌNH</p><div class="match-row sources">'+shuffle(items).map(x=>'<button class="item-tile" type="button" data-source="'+esc(x.id)+'" aria-label="'+esc(x.label)+'">'+x.source+'<span>'+esc(x.label)+'</span></button>').join('')+'</div></div><div><p class="stage-label">2. CHỌN CHỖ PHÙ HỢP</p><div class="match-row targets">'+(options.orderedTargets?items:shuffle(items)).map(x=>'<button class="target-tile" type="button" data-target="'+esc(x.id)+'" aria-label="'+esc(x.targetLabel||x.label)+'">'+x.target+'<span>'+esc(x.targetLabel||x.label)+'</span></button>').join('')+'</div></div></div>';
}
function drawGarage(){matchGame(colors.slice(0,level===1?2:3).map(x=>({id:x.id,label:'Xe '+x.name,source:vehicle('car',x.c),target:'<span class="garage-icon" style="--garage:'+x.c+'"></span>',targetLabel:'Gara '+x.name})));}
function drawColors(){matchGame(colors.slice(0,level===1?2:3).map(x=>({id:x.id,label:'Bóng '+x.name,source:shape('circle',x.c),target:'<span class="basket-icon" style="--basket:'+x.c+'"></span>',targetLabel:'Rổ '+x.name})));}
function drawShapes(){const x=[{id:'circle',name:'Hình tròn'},{id:'square',name:'Hình vuông'},{id:'triangle',name:'Hình tam giác'}].slice(0,level===1?2:3);matchGame(x.map(y=>({id:y.id,label:y.name,source:shape(y.id,'#e98a6d'),target:shape(y.id,'#c6d2c7',true),targetLabel:'Ô '+y.name.toLowerCase()})));}
function drawTidy(){const arr=[{id:'book',label:'Quyển sách',source:'<span class="big-emoji">📘</span>',target:'<span class="big-emoji">📚</span>',targetLabel:'Kệ sách'},{id:'shoes',label:'Đôi giày',source:'<span class="big-emoji">👟</span>',target:'<span class="big-emoji">👞</span>',targetLabel:'Chỗ để giày'},{id:'toy',label:'Đồ chơi',source:'<span class="big-emoji">🧸</span>',target:'<span class="big-emoji">🧺</span>',targetLabel:'Giỏ đồ chơi'}];matchGame(arr.slice(0,level===1?2:3));}
function drawShadow(){const arr=level===1?[vehicles[0],vehicles[2]]:[vehicles[0],vehicles[2],vehicles[5]];matchGame(arr.map(v=>({id:v.id,label:v.name,source:vehicle(v.id),target:'<span class="silhouette">'+vehicle(v.id)+'</span>',targetLabel:'Bóng '+v.name.toLowerCase()})));}
function drawWhere(){const arr=[{id:'road',label:'Ô tô',source:vehicle('car','#e28a64'),target:'<span class="big-emoji">🛣️</span>',targetLabel:'Đường bộ'},{id:'sky',label:'Máy bay',source:vehicle('plane'),target:'<span class="big-emoji">☁️</span>',targetLabel:'Bầu trời'},{id:'water',label:'Thuyền',source:vehicle('boat'),target:'<span class="big-emoji">🌊</span>',targetLabel:'Mặt nước'}];matchGame(arr.slice(0,level===1?2:3));}
function applyMatch(targetId, sourceId=selected) {
 if(!task||task.type!=='match'||!sourceId||done.has(targetId))return;
 let source=task.items.find(x=>x.id===sourceId),target=task.items.find(x=>x.id===targetId);if(!source||!target)return;
 if(sourceId===targetId){done.add(targetId);const src=$('[data-source="'+sourceId+'"]',stage),dst=$('[data-target="'+targetId+'"]',stage);if(src)src.classList.add('done');if(dst){dst.classList.add('done');dst.innerHTML=source.source+'<span>'+esc(target.targetLabel||target.label)+'</span>';} selected=null;$$('.item-tile',stage).forEach(x=>x.classList.remove('selected'));feedback(done.size===task.items.length?'Giỏi quá! Bé đã hoàn thành rồi! 🌟':'Đúng rồi! Mình cùng thử tiếp nhé! ♥',true);if(done.size===task.items.length)say('Bé giỏi quá!');}
 else{feedback('Mình thử một chỗ khác nhé!',false);let dst=$('[data-target="'+targetId+'"]',stage);if(dst){dst.classList.add('hint');setTimeout(()=>dst.classList.remove('hint'),650);}}
}


function drawWheels(){
 task={type:'wheels'};selected=null;const which=level===1?'fire':'ambulance';
 stage.innerHTML='<div class="wheel-game"><p class="stage-intro">Chọn bánh xe tròn rồi lắp vào hai vị trí còn thiếu</p><div class="wheel-board">'+vehicle(which,null,true)+'<button class="wheel-slot slot-one" data-wheel-target="1" aria-label="Vị trí bánh xe thứ nhất">＋</button><button class="wheel-slot slot-two" data-wheel-target="2" aria-label="Vị trí bánh xe thứ hai">＋</button></div><div class="match-row"><button class="item-tile wheel-source" data-wheel-source="round" type="button"><span class="wheel-shape">◉</span><span>Bánh xe tròn</span></button>'+(level===2?'<button class="item-tile wheel-source" data-wheel-source="square" type="button"><span class="square-wheel">■</span><span>Hình vuông</span></button>':'')+'</div></div>';
}
function wheelChoose(id){selected=id;$$('[data-wheel-source]',stage).forEach(b=>b.classList.toggle('selected',b.dataset.wheelSource===id));feedback('Bé chọn một vị trí còn thiếu nhé!');}
function wheelPut(id){if(!selected||done.has(id))return;if(selected!=='round'){feedback('Bánh xe tròn sẽ lăn được. Bé thử lại nhé!',false);return;}done.add(id);let b=$('[data-wheel-target="'+id+'"]',stage);b.textContent='◉';b.classList.add('filled');feedback(done.size===2?'Xe đã có đủ bánh rồi! 🌟':'Đúng rồi! Còn một bánh nữa nhé!',true);if(done.size===2)say('Xe đã có đủ bánh rồi!');}
function drawCount(isVehicle){
 const max=level===1?2:3,n=1+Math.floor(Math.random()*max),opts=shuffle(Array.from({length:max},(_,i)=>i+1));
 task={type:'choice',answer:String(n),complete:false,read:'Có '+n+(isVehicle?' chiếc xe.':' quả táo.')};
 const objects=isVehicle?Array.from({length:n},(_,i)=>'<span class="count-car">'+vehicle(['fire','ambulance','excavator'][i])+'</span>').join(''):Array(n).fill('🍎').join(' ');
 messageText='Bố mẹ cùng bé đếm: có bao nhiêu '+(isVehicle?'chiếc xe':'quả táo')+' nhỉ?';$('#game-instruction').textContent=messageText;
 stage.innerHTML='<div class="choice-area"><div class="question-visual '+(isVehicle?'count-cars':'')+'">'+objects+'</div><div class="match-row">'+opts.map(x=>'<button class="choice-tile" type="button" data-choice="'+x+'" aria-label="'+x+'">'+x+'</button>').join('')+'</div></div>';
}
function drawAnimals(){
 const arr=[{id:'cat',emoji:'🐱',name:'con mèo'},{id:'dog',emoji:'🐶',name:'con chó'},{id:'cow',emoji:'🐮',name:'con bò'},{id:'elephant',emoji:'🐘',name:'con voi'},{id:'duck',emoji:'🦆',name:'con vịt'},{id:'chicken',emoji:'🐔',name:'con gà'}],chosen=shuffle(arr).slice(0,level===1?2:3),answer=chosen[Math.floor(Math.random()*chosen.length)];
 task={type:'choice',answer:answer.id,complete:false,read:'Đây là '+answer.name+'.'};
 messageText='Bé tìm '+answer.name+' ở đâu nhé!';$('#game-instruction').textContent=messageText;
 stage.innerHTML='<div class="choice-area"><p class="question-prompt">Bé tìm <strong>'+answer.name+'</strong> nhé!</p><div class="match-row">'+chosen.map(a=>'<button class="choice-tile animal-choice" type="button" data-choice="'+a.id+'" aria-label="'+a.name+'"><span class="big-emoji">'+a.emoji+'</span><span class="animal-label">'+a.name+'</span></button>').join('')+'</div></div>';
}
function drawSize(){
 const larger=Math.random()<.5;task={type:'choice',answer:larger?'big':'small',complete:false,read:larger?'Đây là quả bóng lớn.':'Đây là quả bóng nhỏ.'};
 messageText='Bé chọn quả bóng '+(larger?'lớn':'nhỏ')+' nhé!';$('#game-instruction').textContent=messageText;
 let balls=[{id:'big',size:88},{id:'small',size:48}];if(level===2)balls.push({id:'medium',size:68});
 stage.innerHTML='<div class="choice-area"><p class="question-prompt">Quả bóng <strong>'+(larger?'lớn nhất':'nhỏ nhất')+'</strong> ở đâu?</p><div class="match-row size-row">'+shuffle(balls).map(b=>'<button class="choice-tile size-choice" data-choice="'+b.id+'" type="button" aria-label="Quả bóng '+(b.id==='big'?'lớn':b.id==='small'?'nhỏ':'vừa')+'"><span style="height:'+b.size+'px;width:'+b.size+'px;background:#e9916f;border-radius:50%;display:block"></span></button>').join('')+'</div></div>';
}
function choose(id,el){
 if(!task||task.type!=='choice'||task.complete)return;
 if(id===task.answer){task.complete=true;el.classList.add('chosen-good');feedback('Đúng rồi! Bé giỏi quá! 🌟',true);say(task.read);}
 else{el.classList.add('chosen-wrong');feedback('Mình thử chọn hình khác nhé!',false);setTimeout(()=>el.classList.remove('chosen-wrong'),600);}
}
function puzzlePiece(url,index,count,fade=false){
 const col=index%2,row=count===4?Math.floor(index/2):0;
 return '<span class="piece" style="background-image:url(&quot;'+url+'&quot;);background-size:200% '+(count===4?'200%':'100%')+';background-position:'+(col?'100%':'0%')+' '+(row?'100%':'0%')+';opacity:'+(fade?'.24':'1')+'"></span>';
}
function drawPuzzle(){
 const svg=vehicle(level===1?'fire':'excavator'),url='data:image/svg+xml,'+encodeURIComponent(svg),count=level===1?2:4;
 const items=Array.from({length:count},(_,i)=>({id:'p'+i,label:'Mảnh tranh '+(i+1),source:puzzlePiece(url,i,count),target:puzzlePiece(url,i,count,true),targetLabel:'Vị trí '+(i+1)}));
 matchGame(items,{orderedTargets:true});if(level===2){const targetGrid=$('.targets',stage);if(targetGrid)targetGrid.classList.add('puzzle-targets');}
}
function drawDrive(){
 const steps=level===1?3:5;
 task={type:'drive',step:0,steps};let dots='';
 for(let i=1;i<=steps;i++){const x=15+i*(68/steps);dots+='<button class="drive-dot" style="left:calc('+x+'% - 24px)" data-drive-step="'+i+'" type="button" aria-label="Điểm '+i+'">'+i+'</button>';}
 stage.innerHTML='<div class="drive-scene"><span class="drive-house">🏠</span><div class="drive-road"></div><div class="drive-car" id="drive-car" style="left:4%">'+vehicle('fire')+'</div>'+dots+'</div><p class="drive-help">Bé chạm lần lượt các điểm trên đường nhé.</p>';
}
function driveStep(n,el){
 if(!task||task.type!=='drive'||task.step>=task.steps)return;
 if(n!==task.step+1){feedback('Bé thử chọn điểm tiếp theo nhé!',false);return;}
 task.step=n;el.classList.add('done');$('#drive-car').style.left='calc('+(15+n*(68/task.steps))+'% - 45px)';
 feedback(n===task.steps?'Xe đã về nhà rồi! 🏠':'Xe đang đi, bé chọn điểm tiếp theo nhé!',true);if(n===task.steps)say('Xe đã về nhà rồi!');
}
function drawTraffic(){
 task={type:'traffic',signal:'green',step:0,total:level===1?3:5};
 stage.innerHTML='<div class="traffic-scene"><div class="traffic-light"><div class="lamp red"></div><div class="lamp green active"></div></div><div class="traffic-center"><div class="traffic-car">'+vehicle('fire')+'</div><div class="traffic-buttons"><button type="button" data-traffic="go">🚗 Xe đi</button><button type="button" data-traffic="stop" class="stop">✋ Dừng lại</button></div></div></div>';
 $('#game-instruction').textContent='Đèn xanh: chạm “Xe đi”. Đèn đỏ: chạm “Dừng lại”.';
}
function trafficAction(a){
 if(!task||task.type!=='traffic'||task.step>=task.total)return;const expected=task.signal==='green'?'go':'stop';
 if(a!==expected){feedback(task.signal==='green'?'Đèn xanh rồi, bé cho xe đi nhé!':'Đèn đỏ rồi, mình dừng lại nhé!',false);return;}
 task.step++;if(task.step===task.total){feedback('Bé đã giúp xe đi và dừng đúng rồi! 🌟',true);say('Bé làm tốt lắm!');return;}
 task.signal=task.signal==='green'?'red':'green';$('.lamp.red',stage).classList.toggle('active',task.signal==='red');$('.lamp.green',stage).classList.toggle('active',task.signal==='green');
 feedback(task.signal==='red'?'Đèn đỏ rồi, mình làm gì nhỉ?':'Đèn xanh rồi, mình làm gì nhỉ?',true);
}
function drawPlant(){
 const goal=level===1?2:3;task={type:'plant',step:0,goal};
 stage.innerHTML='<div class="choice-area"><div class="plant-visual" id="plant-visual">🪴</div><p class="question-prompt" id="plant-prompt">Cây khát nước rồi!</p><button class="button primary water-button" type="button" data-water>💧 Tưới nước cho cây</button></div>';
}
function waterPlant(){if(!task||task.type!=='plant'||task.step>=task.goal)return;task.step++;$('#plant-visual').textContent=task.step===task.goal?'🌻':'🌱';$('#plant-prompt').textContent=task.step===task.goal?'Cây đã nở hoa rồi!':'Cây đang lớn lên!';feedback(task.step===task.goal?'Bé chăm cây thật tốt! 🌼':'Bé tưới thêm một chút nhé!',true);}
function updateSettings(){$('#voice-toggle').setAttribute('aria-checked',String(config.voice));$('#sound-toggle').setAttribute('aria-checked',String(config.sound));}
function setTimer(minutes){
 if(timerId)clearInterval(timerId);timerId=null;timerEnd=null;
 $$('.timer-options button').forEach(b=>b.classList.toggle('active',Number(b.dataset.minutes)===minutes));
 if(!minutes){$('#timer-status').textContent='Chưa bật nhắc nghỉ.';return;}
 timerEnd=Date.now()+minutes*60000;
 const tick=()=>{const remain=Math.max(0,Math.ceil((timerEnd-Date.now())/1000)),m=Math.floor(remain/60),s=remain%60;$('#timer-status').textContent='Còn '+m+':'+String(s).padStart(2,'0')+' trước khi nhắc nghỉ.';if(!remain){clearInterval(timerId);timerId=null;timerEnd=null;$('#settings-layer').hidden=true;$('#rest-layer').hidden=false;$('#timer-status').textContent='Đã đến giờ nghỉ.';tone();}};
 tick();timerId=setInterval(tick,1000);
}
let dragging=null;
document.addEventListener('pointerdown',e=>{
 const source=e.target.closest('[data-source],[data-wheel-source]');
 if(!source || !layer.contains(source) || source.classList.contains('done'))return;
 dragging={node:source,x:e.clientX,y:e.clientY,moved:false};
});
document.addEventListener('pointermove',e=>{if(dragging&&Math.hypot(e.clientX-dragging.x,e.clientY-dragging.y)>8)dragging.moved=true;});
document.addEventListener('pointerup',e=>{
 if(!dragging)return;const d=dragging;dragging=null;if(!d.moved)return;
 const under=document.elementFromPoint(e.clientX,e.clientY);
 if(d.node.dataset.source){const target=under&&under.closest('[data-target]');if(target){selected=d.node.dataset.source;applyMatch(target.dataset.target,selected);}}
 if(d.node.dataset.wheelSource){const target=under&&under.closest('[data-wheel-target]');if(target){wheelChoose(d.node.dataset.wheelSource);wheelPut(target.dataset.wheelTarget);}}
});
document.addEventListener('pointercancel',()=>{dragging=null;});
document.addEventListener('click',e=>{
 const launcher=e.target.closest('[data-game]');if(launcher){openGame(launcher.dataset.game);say(messageText);return;}
 if(e.target.closest('.settings-open')){$('#settings-layer').hidden=false;updateSettings();return;}
 if(e.target.closest('#close-settings')||e.target.closest('#settings-done')){$('#settings-layer').hidden=true;return;}
 if(e.target.closest('#rest-close')){$('#rest-layer').hidden=true;return;}
 if(e.target.closest('#voice-toggle')){config.voice=!config.voice;safeStorage.setItem('bvVoice',config.voice?'on':'off');if(!config.voice&&'speechSynthesis'in window)speechSynthesis.cancel();updateSettings();return;}
 if(e.target.closest('#sound-toggle')){config.sound=!config.sound;safeStorage.setItem('bvSound',config.sound?'on':'off');updateSettings();return;}
 const timer=e.target.closest('[data-minutes]');if(timer){setTimer(+timer.dataset.minutes);return;}
 if(e.target.closest('#close-game')){closeGame();return;}
 if(e.target.closest('#restart-game')){renderGame();say(messageText);return;}
 if(e.target.closest('#repeat-instruction')){say(messageText);if(!config.voice)feedback('Giọng đọc đang tắt. Bố mẹ có thể bật trong phần cài đặt.');return;}
 const lev=e.target.closest('[data-level]');if(lev){level=+lev.dataset.level;renderGame();say(messageText);return;}
 const v=e.target.closest('[data-vehicle]');if(v){const car=vehicles.find(x=>x.id===v.dataset.vehicle);$('#explore-selected').innerHTML=vehicle(car.id)+'<span>Đây là '+esc(car.name.toLowerCase())+'!</span>';if(task&&task.type==='explore'&&task.target){if(car.id===task.target){feedback('Đúng rồi! Đây là '+car.name.toLowerCase()+' 🌟',true);say('Đúng rồi! Đây là '+car.name.toLowerCase()+'.');}else{feedback('Mình tìm chiếc xe được gợi ý nhé!',false);say('Đây là '+car.name.toLowerCase()+'.');}}else{feedback('Bé vừa khám phá '+car.name.toLowerCase()+' ♥');vehicleSound(car.id);say('Đây là '+car.name.toLowerCase()+'.');}return;}
 const src=e.target.closest('[data-source]');if(src&&!src.classList.contains('done')){selected=src.dataset.source;$$('[data-source]',stage).forEach(b=>b.classList.toggle('selected',b===src));feedback('Bé chọn chỗ phù hợp nhé!');return;}
 const dst=e.target.closest('[data-target]');if(dst){applyMatch(dst.dataset.target);return;}
 const ws=e.target.closest('[data-wheel-source]');if(ws){wheelChoose(ws.dataset.wheelSource);return;}
 const wt=e.target.closest('[data-wheel-target]');if(wt){wheelPut(wt.dataset.wheelTarget);return;}
 const choice=e.target.closest('[data-choice]');if(choice){choose(choice.dataset.choice,choice);return;}
 const point=e.target.closest('[data-drive-step]');if(point){driveStep(+point.dataset.driveStep,point);return;}
 const traffic=e.target.closest('[data-traffic]');if(traffic){trafficAction(traffic.dataset.traffic);return;}
 if(e.target.closest('[data-water]')){waterPlant();return;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#rest-layer').hidden)$('#rest-layer').hidden=true;else if(!$('#settings-layer').hidden)$('#settings-layer').hidden=true;else if(!layer.hidden)closeGame();}});
renderHome();updateSettings();setTimer(0);

