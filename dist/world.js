/* Bé Vui Khám Phá: thế giới phương tiện */
(() => {
'use strict';
const groups = [
  {id:'rescue',name:'Cứu hộ',short:'Cứu hộ',icon:'fire',color:'#fce4dc'},
  {id:'works',name:'Công trường',short:'Công trường',icon:'excavator',color:'#fff0ca'},
  {id:'street',name:'Đường phố',short:'Đường phố',icon:'bus',color:'#e4f3e2'},
  {id:'rail',name:'Đường sắt',short:'Đường sắt',icon:'train',color:'#e2eef9'},
  {id:'sky',name:'Bầu trời',short:'Bầu trời',icon:'plane',color:'#e7e8fb'},
  {id:'water',name:'Mặt nước',short:'Mặt nước',icon:'boat',color:'#dbf3f3'},
  {id:'farm',name:'Nông trại',short:'Nông trại',icon:'tractor',color:'#f4ecd6'}
];
const initialGroups={fire:'rescue',ambulance:'rescue',police:'rescue',excavator:'works',dump:'works',mixer:'works',bus:'street',trash:'street',car:'street',train:'rail',plane:'sky',boat:'water',tractor:'farm'};
vehicles.forEach(v=>{v.group=initialGroups[v.id]});
const extra=[
 ['tow','Xe cứu hộ','rescue'],['fireladder','Xe thang cứu hỏa','rescue'],
 ['dozer','Máy ủi','works'],['loader','Máy xúc lật','works'],['crane','Xe cẩu','works'],['roller','Xe lu','works'],['forklift','Xe nâng','works'],
 ['taxi','Xe taxi','street'],['truck','Xe tải chở hàng','street'],['van','Xe giao hàng','street'],['carrier','Xe chở ô tô','street'],['sweeper','Xe quét đường','street'],['watertruck','Xe tưới nước','street'],
 ['highspeed','Tàu cao tốc','rail'],['metro','Tàu điện','rail'],['steam','Tàu hơi nước','rail'],['freight','Tàu chở hàng','rail'],
 ['helicopter','Trực thăng','sky'],['cargoplane','Máy bay chở hàng','sky'],['propplane','Máy bay cánh quạt','sky'],['seaplane','Thủy phi cơ','sky'],
 ['ferry','Phà chở xe','water'],['tug','Tàu kéo','water'],['fishing','Thuyền đánh cá','water'],['sail','Thuyền buồm','water'],['submarine','Tàu ngầm','water'],
 ['combine','Máy gặt','farm']
].map(([id,name,group])=>({id,name,group}));
vehicles.push(...extra);
const plainVehicle=vehicle;
const svg=parts=>'<svg viewBox="0 0 240 145" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+parts+'</svg>';
const tyre=(x,y,r=18)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#384b51"/><circle cx="'+x+'" cy="'+y+'" r="'+Math.round(r*.53)+'" fill="#bcd2cf"/><circle cx="'+(x-3)+'" cy="'+(y-4)+'" r="3" fill="#edf9f4"/>';
const glass='<rect x="159" y="61" width="27" height="19" rx="5" fill="#d8f1f3"/>';
const truckbody=(color='#8db7ac',box='#f1c97d')=>'<rect x="22" y="47" width="127" height="59" rx="11" fill="'+box+'"/><path d="M148 57h42l27 27v23h-69z" fill="'+color+'"/>'+glass+'<rect x="21" y="100" width="196" height="9" rx="4" fill="#78938d"/>';
const wh=()=>tyre(57,109)+tyre(181,109);
const oldAdd=(id,color,added='',replace=[])=>{let s=plainVehicle(id,color);replace.forEach(([a,b])=>{s=s.split(a).join(b)});return s.replace('</svg>',added+'</svg>')};
function customVehicle(id,color,noWheels){
 switch(id){
 case 'tow': return svg('<path d="M24 93h116V66h45l29 22v20H24z" fill="#e99f50"/>'+glass+'<path d="M35 88l50-47h20l25 46" fill="none" stroke="#d17c42" stroke-width="11"/><path d="M94 45h43v37m0 0q0 11 9 9" fill="none" stroke="#718487" stroke-width="5"/>'+(noWheels?'':wh()));
 case 'fireladder': return oldAdd('fire',null,'<path d="M40 42L117 12l45 12" fill="none" stroke="#fff7e8" stroke-width="8"/><path d="M51 37l5 10m20-19l5 11m20-19l5 12m16-8l-4 10" stroke="#ca7158" stroke-width="3"/>');
 case 'dozer': return oldAdd('excavator',null,'<path d="M160 87h33l5-27h12l-5 43h-45z" fill="#d29b4a"/><path d="M166 98h38" stroke="#ffe5a1" stroke-width="5"/>');
 case 'loader': return svg('<rect x="22" y="78" width="124" height="28" rx="10" fill="#e5ac4c"/><path d="M56 42h58l19 36H56z" fill="#eab65c"/><path d="M64 49h42l12 23H64z" fill="#d9f0ee"/><path d="M127 75l40-20 10 9-37 28" fill="#d99c3f"/><path d="M170 55l33 8 9 24-36-3z" fill="#c88439"/>'+(noWheels?'':tyre(54,110,21)+tyre(127,110,21)));
 case 'crane': return svg(truckbody('#e7a454','#ffd590')+'<path d="M70 49l64-36 10 8-57 41z" fill="#e2a84f"/><path d="M137 18h48v55q0 10-8 10" fill="none" stroke="#748682" stroke-width="5"/>'+(noWheels?'':wh()));
 case 'roller': return svg('<rect x="23" y="82" width="169" height="25" rx="10" fill="#e8af50"/><path d="M58 40h59l17 42H58z" fill="#e6b450"/><path d="M66 47h43l11 27H66z" fill="#dcefee"/><circle cx="165" cy="108" r="26" fill="#8a9c98"/><circle cx="165" cy="108" r="18" fill="#c9d7cf"/>'+tyre(49,108,18));
 case 'forklift': return svg('<rect x="26" y="73" width="99" height="34" rx="9" fill="#e0a457"/><path d="M49 39h55v34H49z" fill="#f0c474"/><path d="M57 47h39v20H57z" fill="#d5efed"/><path d="M137 29v79h54v-8h-43V29z" fill="#697f7c"/><rect x="150" y="72" width="38" height="29" rx="4" fill="#d5a974"/>'+(noWheels?'':tyre(52,111)+tyre(112,111,15)));
 case 'taxi': return oldAdd('car','#edbf58','<rect x="96" y="35" width="39" height="12" rx="4" fill="#f4db8b"/><path d="M102 41h26" stroke="#bf8844" stroke-width="3"/>');
 case 'truck': return svg(truckbody('#8db5bd','#d5b090')+(noWheels?'':wh())+'<path d="M39 61h91M39 75h91M39 88h91" stroke="#f8e1c7" stroke-width="4"/>');
 case 'van': return svg(truckbody('#80b4ad','#e6ead7')+(noWheels?'':wh())+'<path d="M65 60h37v25H65z" fill="#b1d1c7"/><path d="M66 60l18 14 18-14" fill="none" stroke="#fffdf0" stroke-width="4"/>');
 case 'carrier': return svg('<rect x="22" y="93" width="139" height="13" rx="4" fill="#779fa5"/><path d="M159 61h32l25 23v22h-57z" fill="#cf8b75"/>'+glass+'<path d="M41 74h18l12-16h39l16 16h14v15H41z" fill="#7fb4b5"/><circle cx="66" cy="89" r="7" fill="#52685f"/><circle cx="119" cy="89" r="7" fill="#52685f"/>'+(noWheels?'':wh()));
 case 'sweeper': return svg(truckbody('#7eb5b1','#a6d0bd')+'<circle cx="83" cy="112" r="20" fill="#d9aa6a"/><path d="M66 117l34-7M68 123l29-7" stroke="#f5dab3" stroke-width="4"/>'+(noWheels?'':tyre(52,109,15)+tyre(183,109,17)));
 case 'watertruck': return svg('<ellipse cx="84" cy="76" rx="62" ry="32" fill="#99c8d1"/><path d="M146 59h43l26 26v22h-69z" fill="#77aeb9"/>'+glass+'<path d="M24 109q-7 9-3 13m14-13q-6 10-2 13m14-13q-5 10-1 13" fill="none" stroke="#83c9e0" stroke-width="5"/>'+(noWheels?'':wh()));
 case 'highspeed': return svg('<path d="M18 88Q23 42 77 42h87q39 0 56 38v25H18z" fill="#e7eeed"/><path d="M28 73q12-24 47-24h91q20 0 34 24z" fill="#a7d4dd"/><path d="M20 91h192" stroke="#e08b7c" stroke-width="8"/>'+tyre(62,109,11)+tyre(176,109,11));
 case 'metro': return oldAdd('train',null,'<path d="M28 94h159" stroke="#f5efbe" stroke-width="7"/>',[["#739fb5","#7ab8a8"],["#df795d","#62a698"]]);
 case 'steam': return svg('<rect x="25" y="65" width="141" height="40" rx="18" fill="#4f8794"/><path d="M157 39h45v67h-45z" fill="#d97a5f"/><rect x="165" y="48" width="24" height="18" rx="4" fill="#d8f0ed"/><rect x="56" y="42" width="16" height="24" rx="4" fill="#526f70"/><path d="M62 39q-10-11 2-17m8 13q12-9 2-15" fill="none" stroke="#d6ddce" stroke-width="8" stroke-linecap="round"/>'+tyre(54,109,15)+tyre(104,109,18)+tyre(180,109,15));
 case 'freight': return svg('<rect x="18" y="55" width="61" height="46" rx="4" fill="#d99874"/><rect x="83" y="55" width="61" height="46" rx="4" fill="#dfbd7d"/><path d="M149 49h39l27 26v26h-66z" fill="#78a5b6"/>'+glass+tyre(45,108,12)+tyre(115,108,12)+tyre(181,108,12));
 case 'helicopter': return svg('<path d="M53 79q4-34 49-34h40q34 0 45 31l25 5v11h-28q-13 17-42 17H99q-45 0-46-30z" fill="#e79e75"/><path d="M94 52h40v23H82q2-15 12-23z" fill="#d9f1f1"/><path d="M125 45V29M77 27h96M76 117h95m-78-8l-6 8m65-8l6 8" stroke="#70868a" stroke-width="6" stroke-linecap="round"/><path d="M206 69v29m-13-14h27" stroke="#78928d" stroke-width="5"/>');
 case 'cargoplane': return oldAdd('plane',null,'<rect x="111" y="75" width="31" height="16" rx="3" fill="#ddaa72"/><path d="M118 75v16m13-16v16" stroke="#f8e1b0" stroke-width="3"/>',[["#8db8c4","#b4adcb"]]);
 case 'propplane': return oldAdd('plane',null,'<path d="M211 62v45m-15-23h29" stroke="#789291" stroke-width="5" stroke-linecap="round"/><circle cx="211" cy="84" r="4" fill="#df9768"/>',[["#8db8c4","#e2aa72"]]);
 case 'seaplane': return oldAdd('plane',null,'<path d="M72 108l-5 11h59l6-11m16 0l-5 11h43l6-11" fill="#9bb5b9" stroke="#789ba3" stroke-width="4"/>',[["#8db8c4","#9dc2d0"]]);
 case 'ferry': return svg('<path d="M18 90h198l-23 28H45z" fill="#78a9b8"/><rect x="53" y="60" width="109" height="30" rx="7" fill="#f3dfb8"/><path d="M60 58h29l8-13h30l13 13h10v18H60z" fill="#e19279"/><path d="M95 49h25l9 9H90z" fill="#d8f1ee"/><circle cx="83" cy="76" r="6" fill="#4f777b"/><circle cx="132" cy="76" r="6" fill="#4f777b"/><path d="M30 129q15-6 30 0t30 0t30 0t30 0t30 0" fill="none" stroke="#a7d8dd" stroke-width="5"/>');
 case 'tug': return svg('<path d="M28 90h181l-24 28H57z" fill="#d78066"/><path d="M80 47h64v43H80z" fill="#eed9b5"/><rect x="88" y="55" width="46" height="20" rx="4" fill="#cfe8e6"/><rect x="105" y="29" width="16" height="18" fill="#69858a"/><circle cx="58" cy="95" r="8" fill="#587578"/><circle cx="173" cy="95" r="8" fill="#587578"/>');
 case 'fishing': return svg('<path d="M22 91h197l-28 25H54z" fill="#86aaaf"/><path d="M64 55h52v36H64z" fill="#f4dfbd"/><rect x="72" y="62" width="33" height="18" rx="3" fill="#d7eeec"/><path d="M135 91V31l49 51h-49" fill="none" stroke="#997c61" stroke-width="4"/><path d="M152 48q23 14 32 34" fill="none" stroke="#d5c2a7" stroke-width="3"/>');
 case 'sail': return svg('<path d="M27 97h181l-29 24H58z" fill="#d98d70"/><path d="M111 24v73" stroke="#987862" stroke-width="5"/><path d="M105 31L60 91h45z" fill="#fff5db"/><path d="M118 35l42 56h-42z" fill="#f5d991"/>');
 case 'submarine': return svg('<path d="M27 88q0-31 41-31h105q32 0 39 31-7 27-39 27H68q-41 0-41-27z" fill="#e2b75c"/><path d="M95 57V40h40v17" fill="#d2a148"/><path d="M123 40V26h25" fill="none" stroke="#7d9893" stroke-width="6"/><circle cx="75" cy="85" r="12" fill="#d6efed"/><circle cx="112" cy="85" r="12" fill="#d6efed"/><circle cx="149" cy="85" r="12" fill="#d6efed"/><path d="M209 76l15-10v42l-15-10" fill="#d8a64f"/>');
 case 'combine': return svg('<rect x="50" y="69" width="137" height="38" rx="9" fill="#d9ab55"/><path d="M91 36h55l15 33H91z" fill="#e5b964"/><path d="M99 43h39l9 20H99z" fill="#d9f0e7"/><path d="M180 80h31v21h-31" fill="#bc965e"/><path d="M186 77v28m11-28v28m11-28v28" stroke="#f7d990" stroke-width="4"/>'+tyre(80,108,24)+tyre(158,110,16));
 default: return plainVehicle(id,color,noWheels);
 }
}
function lighter(hex,amount){const h=hex.slice(1);if(h.length!==6)return hex;let p=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16));return '#'+p.map(v=>Math.max(0,Math.min(255,Math.round(v+(255-v)*amount))).toString(16).padStart(2,'0')).join('')}
vehicle=function(type,color,noWheels=false){
 let picture=customVehicle(type,color,noWheels);
 const id=('toy'+type+(color||'').replace(/[^a-z0-9]/gi,'')).replace(/[^a-z0-9]/gi,''), colors=[...new Set((picture.match(/fill="#[a-f0-9]{6}"/gi)||[]).map(x=>x.slice(6,-1)))];
 const defs=colors.map((c,i)=>'<linearGradient id="'+id+'g'+i+'" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="'+lighter(c,.28)+'"/><stop offset=".57" stop-color="'+c+'"/><stop offset="1" stop-color="'+lighter(c,-.17)+'"/></linearGradient>').join('');
 colors.forEach((c,i)=>{picture=picture.split('fill="'+c+'"').join('fill="url(#'+id+'g'+i+')"')});
 picture=picture.replace(/<svg([^>]*)>/,'<svg$1><defs>'+defs+'</defs><ellipse cx="120" cy="130" rx="83" ry="8" fill="#405c54" opacity=".12"/>');
 return picture;
};
const adventures={
 fireAdventure:{title:'Trạm cứu hỏa',desc:'Cùng xe cứu hỏa giúp đỡ mọi người.',icon:'fire',scene:'fire',parent:'Cùng bé quan sát xe cứu hỏa trong sách và nói về công việc của các chú lính cứu hỏa.',steps:[['Chạm xe cứu hỏa để xe lên đường nhé!','Xe cứu hỏa','fire'],['Chạm vòi nước để dập lửa nhé!','Vòi nước','hose'],['Chạm xe để về trạm nhé!','Xe cứu hỏa','fire']]},
 digAdventure:{title:'Công trường tí hon',desc:'Máy xúc múc đất lên xe ben.',icon:'excavator',scene:'dig',parent:'Dùng thìa lớn và cát sạch hoặc đồ chơi phù hợp để cùng bé xúc, đổ dưới sự quan sát của bố mẹ.',steps:[['Chạm máy xúc để xúc đất nhé!','Máy xúc','excavator'],['Chạm xe ben để nhận đất nhé!','Xe ben','dump'],['Chạm xe ben để chở đất đi nhé!','Xe ben','dump']]},
 trainAdventure:{title:'Đoàn tàu lăn bánh',desc:'Nối toa và cùng tàu đi chơi.',icon:'train',scene:'train',parent:'Dùng những khối đồ chơi lớn xếp nối nhau thành đoàn tàu, cùng bé nói “đầu tàu” và “toa tàu”.',steps:[['Chạm vào toa để nối tàu nhé!','Toa tàu','wagon'],['Chạm đầu tàu để tàu lăn bánh nhé!','Đầu tàu','train'],['Chạm nhà ga để tàu dừng lại nhé!','Nhà ga','station']]},
 flightAdventure:{title:'Máy bay cất cánh',desc:'Cùng máy bay bay qua bầu trời.',icon:'plane',scene:'flight',parent:'Cùng bé quan sát máy bay trong sách hoặc trên bầu trời và làm động tác dang tay như cánh máy bay.',steps:[['Chạm máy bay để cất cánh nhé!','Máy bay','plane'],['Chạm đám mây để máy bay bay qua nhé!','Đám mây','cloud'],['Chạm sân bay để máy bay hạ cánh nhé!','Sân bay','station']]},
 ferryAdventure:{title:'Phà qua sông',desc:'Đưa chiếc ô tô cùng qua sông.',icon:'ferry',scene:'ferry',parent:'Dùng một chiếc hộp làm phà và đặt xe đồ chơi lớn lên trên, cùng bé đẩy phà qua một tấm khăn xanh.',steps:[['Chạm ô tô để xe lên phà nhé!','Ô tô','car'],['Chạm chiếc phà để qua sông nhé!','Phà chở xe','ferry'],['Chạm bến để phà cập bờ nhé!','Bến phà','station']]},
 washAdventure:{title:'Tiệm rửa xe',desc:'Cùng làm chiếc xe sạch bóng.',icon:'car',scene:'wash',parent:'Cho bé lau xe đồ chơi lớn bằng khăn ẩm; bố mẹ ở cạnh để cùng chơi và lau nước.',steps:[['Chạm bọt xà phòng để rửa xe nhé!','Bọt xà phòng','soap'],['Chạm vòi nước để rửa sạch bọt nhé!','Vòi nước','hose'],['Chạm chiếc xe sạch để hoàn thành nhé!','Ô tô','car']]}
};
Object.entries(adventures).forEach(([id,x])=>{games[id]={title:x.title,desc:x.desc,cat:'THẾ GIỚI PHƯƠNG TIỆN',instruction:x.steps[0][0],parent:x.parent,icon:'🚗'}});
let selectedGroup='rescue',page=0,adventureStep=0;
const groupMap=Object.fromEntries(groups.map(g=>[g.id,g]));
const prevRender=renderGame;
function adventureObject(object){
 if(['wagon','hose','soap'].includes(object))return vehicle('prop_'+object);
 if(['fire','excavator','dump','train','plane','car','ferry'].includes(object))return vehicle(object);
 if(object==='wagon')return '<svg viewBox="0 0 240 145" aria-hidden="true"><rect x="28" y="48" width="173" height="58" rx="14" fill="#86b8c9"/><rect x="43" y="60" width="34" height="22" rx="5" fill="#e0f3ec"/><rect x="91" y="60" width="34" height="22" rx="5" fill="#e0f3ec"/><rect x="139" y="60" width="34" height="22" rx="5" fill="#e0f3ec"/>'+tyre(62,109,15)+tyre(169,109,15)+'</svg>';
 if(object==='hose')return '<svg viewBox="0 0 240 145" aria-hidden="true"><path d="M28 102q37-8 64-46l26 18q-17 43-67 50z" fill="#e8bd78"/><path d="M98 57l18-21 19 13-17 25z" fill="#86a8a6"/><path d="M140 43q20-14 30-27m-23 38q32-8 51-8m-49 22q27 5 43 18" fill="none" stroke="#78c9e5" stroke-width="12" stroke-linecap="round"/></svg>';
 if(object==='soap')return '<svg viewBox="0 0 240 145" aria-hidden="true"><circle cx="80" cy="68" r="35" fill="#e1f5ff" stroke="#9ed9e7" stroke-width="5"/><circle cx="128" cy="47" r="28" fill="#e8fbff" stroke="#a8dfe8" stroke-width="5"/><circle cx="153" cy="96" r="31" fill="#dcf3ff" stroke="#9fd3e5" stroke-width="5"/><circle cx="72" cy="58" r="8" fill="#fff" opacity=".85"/></svg>';
 if(object==='cloud')return '<svg viewBox="0 0 240 145" aria-hidden="true"><path d="M45 101q-20 0-20-20t22-20q4-28 37-28 22 0 32 19 20-16 41-2 13 8 13 23 30-3 31 15 0 13-23 13z" fill="#fffdf1" stroke="#d9e8e7" stroke-width="5"/></svg>';
 return '<svg viewBox="0 0 240 145" aria-hidden="true"><path d="M39 65l81-42 81 42v58H39z" fill="#eed3a6"/><path d="M28 65l92-49 92 49" fill="none" stroke="#d49375" stroke-width="12" stroke-linejoin="round"/><rect x="91" y="77" width="58" height="46" rx="6" fill="#95b5ad"/><rect x="48" y="76" width="30" height="25" rx="4" fill="#eaf4eb"/><rect x="163" y="76" width="30" height="25" rx="4" fill="#eaf4eb"/></svg>';
}
function drawAdventure(){
 const a=adventures[activeGame],total=level===1?2:3,complete=adventureStep>=total;
 const step=a.steps[Math.min(adventureStep,total-1)];
 task={type:'adventure'};messageText=complete?'Mình đã hoàn thành rồi! Bé có thể chơi lại nhé.':step[0];
 $('#game-title').textContent=a.title;$('#game-category').textContent='THẾ GIỚI PHƯƠNG TIỆN';$('#game-instruction').textContent=messageText;
 $('#parent-inline').innerHTML='<strong>🌿 Chơi cùng bố mẹ:</strong> '+esc(a.parent);
 $$('.level').forEach(b=>b.classList.toggle('active',+b.dataset.level===level));
 const background='<span class="scene-cloud c1"></span><span class="scene-cloud c2"></span><span class="scene-hill h1"></span><span class="scene-hill h2"></span><span class="scene-ground"></span><span class="scene-building">'+adventureObject('station')+'</span>';
 let companion='';
 if(a.scene==='train') companion='<span class="scene-companion train-companion">'+(adventureStep===0?vehicle('train'):adventureObject('wagon'))+'</span>';
 else if(a.scene==='ferry') companion='<span class="scene-companion ferry-companion">'+(adventureStep===0?vehicle('ferry'):vehicle('car'))+'</span>';
 else if(adventureStep>0||a.scene==='wash') companion='<span class="scene-companion">'+vehicle(a.icon)+'</span>';
 let effects='';
 if(a.scene==='fire'&&adventureStep>=2) effects='<span class="scene-effect water-effect">💦</span>';
 if(a.scene==='dig'&&adventureStep>=2) effects='<span class="scene-secondary dump-loaded">'+vehicle('dump')+'<i>● ● ●</i></span>';
 if(a.scene==='train'&&adventureStep>=2) effects='<span class="scene-secondary train-moving">'+vehicle('train')+'</span>';
 if(a.scene==='flight'&&adventureStep>=2) effects='<span class="scene-effect flight-effect">☁️</span>';
 if(a.scene==='ferry'&&adventureStep>=2) effects='<span class="scene-secondary ferry-moving">'+vehicle('ferry')+'</span>';
 if(a.scene==='wash'&&adventureStep===1) effects='<span class="scene-effect bubble-effect">🫧</span>';
 if(a.scene==='wash'&&adventureStep>=2) effects='<span class="scene-effect shine-effect">✨</span>';
 const action=complete?'<div class="adventure-complete"><span>✨</span><strong>Mình làm được rồi!</strong><button type="button" data-adventure-replay>Chơi lại nhé ↻</button></div>':'<button type="button" class="adventure-object" data-adventure-next aria-label="'+esc(step[1])+'">'+adventureObject(step[2])+'<span>Chạm vào đây</span></button>';
 stage.innerHTML='<div class="adventure-scene scene-'+a.scene+' step-'+adventureStep+'">'+background+companion+effects+'<span class="scene-deco">'+(a.scene==='fire'?(adventureStep===1?'🔥':'💧'):a.scene==='dig'?'⛰️':a.scene==='train'?'🌳':a.scene==='flight'?'☁️':a.scene==='ferry'?'🌊':'🫧')+'</span>'+action+'</div><p class="adventure-hint">'+esc(messageText)+'</p>';
 feedback(complete?'Bé làm được rồi! 🌟':'Bé cứ từ từ nhé! ♥');
}
renderGame=function(){if(!adventures[activeGame])return prevRender();adventureStep=0;drawAdventure()};
renderExplore=function(){
 const collection=vehicles.filter(v=>v.group===selectedGroup),pages=Math.max(1,Math.ceil(collection.length/3));page=Math.max(0,Math.min(page,pages-1));
 const list=collection.slice(page*3,page*3+3),goal=level===2?list[Math.floor(Math.random()*list.length)]:null;
 task={type:'explore',target:goal?goal.id:null};
 messageText=goal?'Bé tìm '+goal.name.toLowerCase()+' nhé!':'Bé chạm vào từng phương tiện để nghe tên nhé!';$('#game-instruction').textContent=messageText;
 stage.innerHTML='<div class="world-tabs" role="group" aria-label="Chọn thế giới phương tiện">'+groups.map(g=>'<button type="button" data-world-group="'+g.id+'" class="'+(g.id===selectedGroup?'active':'')+'">'+esc(g.short)+'</button>').join('')+'</div><p class="stage-intro">'+esc(goal?messageText:'Chạm vào một bạn xe để cùng khám phá nhé!')+'</p><div class="explore-grid world-explore">'+list.map(v=>'<button class="explore-card" type="button" data-vehicle="'+v.id+'">'+vehicle(v.id)+'<span>'+esc(v.name)+'</span></button>').join('')+'</div><div class="world-pagination"><button type="button" data-world-page="-1" '+(page===0?'disabled':'')+' aria-label="Trang trước">←</button><span>'+esc(groupMap[selectedGroup].name)+' · '+(page+1)+' / '+pages+'</span><button type="button" data-world-page="1" '+(page===pages-1?'disabled':'')+' aria-label="Trang tiếp">→</button></div><div class="explore-selected" id="explore-selected">'+vehicle(list[0].id)+'<span>Xin chào '+esc(list[0].name.toLowerCase())+'!</span></div>';
};
function buildWorld(){
 const section=$('#vehicles .section-top');
 const categoryMarkup='<div class="world-intro"><div><span class="world-kicker">CHỌN MỘT THẾ GIỚI</span><h3>Hôm nay mình đi đâu?</h3></div><p>Mỗi thế giới có những người bạn thật thú vị</p></div><div class="world-categories">'+groups.map(g=>'<button type="button" class="world-category" data-open-world="'+g.id+'" style="--world-color:'+g.color+'"><span class="world-toy">'+vehicle(g.icon)+'</span><strong>'+esc(g.name)+'</strong><small>'+vehicles.filter(v=>v.group===g.id).length+' phương tiện <span>→</span></small></button>').join('')+'</div>';
 const cards='<div class="adventure-header"><div><span class="world-kicker">CÙNG NHAU KHÁM PHÁ</span><h3>Những chuyến đi nhỏ</h3></div><p>Chạm và chơi cùng những người bạn có bánh xe</p></div><div class="adventure-grid">'+Object.entries(adventures).map(([id,a],i)=>'<button type="button" class="adventure-card adventure-card-'+i+'" data-game="'+id+'"><span class="adventure-image">'+vehicle(a.icon)+'</span><span class="adventure-copy"><strong>'+esc(a.title)+'</strong><small>'+esc(a.desc)+'</small><span class="adventure-play">Chơi ngay <b>→</b></span></span></button>').join('')+'</div><div class="world-divider"><span>THÊM NHIỀU TRÒ CHƠI VỚI XE</span></div>';
 section.insertAdjacentHTML('afterend',categoryMarkup+cards);
 $('#hero-vehicle').innerHTML=vehicle('fire');
 $('#feature-vehicles').innerHTML='<div>'+vehicle('ambulance')+'</div><div class="small-car">'+vehicle('excavator')+'</div>';
 $('#vehicle-strip').innerHTML=vehicles.slice(0,5).map(v=>'<span class="strip-item">'+vehicle(v.id)+'<span>'+esc(v.name)+'</span></span>').join('');
 const hero=$('.hero-art');
 if(hero){hero.classList.add('toy-hero');hero.innerHTML='<img src="./hero-world.webp" alt="" onerror="this.style.display=\'none\'"><span class="hero-sticker">🚗 &nbsp; Một thế giới thật vui!</span>'}
 const feature=$('.feature-copy p');if(feature)feature.textContent='Khám phá 40 phương tiện trong 7 thế giới, chạm để nghe tên nhé!';
}
document.addEventListener('click',e=>{
 const open=e.target.closest('[data-open-world]');if(open){selectedGroup=open.dataset.openWorld;page=0;openGame('explore');say(messageText);return}
 const group=e.target.closest('[data-world-group]');if(group){selectedGroup=group.dataset.worldGroup;page=0;renderExplore();say(messageText);return}
 const pg=e.target.closest('[data-world-page]');if(pg&&!pg.disabled){page+=Number(pg.dataset.worldPage);renderExplore();say(messageText);return}
 if(e.target.closest('[data-adventure-next]')){adventureStep++;tone(true);drawAdventure();say(messageText);return}
 if(e.target.closest('[data-adventure-replay]')){adventureStep=0;drawAdventure();say(messageText);return}
});
buildWorld();
})();
