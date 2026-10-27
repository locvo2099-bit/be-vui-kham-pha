/* Original 3D toy illustrations, shared by the garage and games. */
(() => {
'use strict';
const sheetData=[{"width":1536,"height":1024,"cells":[[58,1,409,255],[562,17,415,239],[1069,28,425,228],[40,256,400,256],[565,256,417,256],[1071,256,445,256],[24,515,439,229],[556,512,422,232],[1062,515,464,229],[13,744,472,267],[570,744,433,268],[1080,744,447,268]]},{"width":1536,"height":1024,"cells":[[39,10,426,246],[532,20,476,236],[1038,13,475,243],[22,256,457,244],[524,256,450,244],[1026,256,486,244],[21,504,472,236],[514,500,492,235],[1040,500,472,250],[22,740,487,273],[517,735,507,280],[1024,750,503,267]]},{"width":1536,"height":1024,"cells":[[29,34,494,216],[535,43,473,198],[1046,38,455,212],[42,253,423,247],[510,284,530,216],[1067,250,440,250],[23,511,459,239],[520,500,528,242],[1092,526,406,224],[41,750,481,251],[557,750,450,247],[1043,750,463,247]]},{"width":1536,"height":1024,"cells":[[84,4,412,306],[574,5,401,304],[1114,0,337,310],[87,310,367,262],[563,311,412,263],[1083,310,370,259],[82,577,370,218],[572,577,390,218],[1089,577,373,218],[58,795,450,227],[546,795,478,223],[1024,795,454,224]]}];
const sprites={
 fire:[0,0],ambulance:[0,1],police:[0,2],tow:[0,3],fireladder:[0,4],excavator:[0,5],dump:[0,6],mixer:[0,7],dozer:[0,8],loader:[0,9],crane:[0,10],roller:[0,11],
 forklift:[1,0],bus:[1,1],trash:[1,2],car:[1,3],taxi:[1,4],truck:[1,5],van:[1,6],carrier:[1,7],sweeper:[1,8],watertruck:[1,9],tractor:[1,10],combine:[1,11],
 train:[2,0],highspeed:[2,1],metro:[2,2],steam:[2,3],freight:[2,4],plane:[2,5],helicopter:[2,6],cargoplane:[2,7],propplane:[2,8],seaplane:[2,9],boat:[2,10],ferry:[2,11],
 tug:[3,0],fishing:[3,1],sail:[3,2],submarine:[3,3],firebody:[3,4],ambulancebody:[3,5],redcar:[3,6],yellowcar:[3,7],bluecar:[3,8],prop_wagon:[3,9],prop_hose:[3,10],prop_soap:[3,11]
};
const oldVehicle=vehicle;
function spriteId(type,color,noWheels){
 if(noWheels&&type==='fire')return 'firebody';
 if(noWheels&&type==='ambulance')return 'ambulancebody';
 if(type==='car'&&color){const c=color.toLowerCase();if(['#e9bb5b','#edbf58'].includes(c))return 'yellowcar';if(['#6faabd','#719fbb'].includes(c))return 'bluecar';return 'redcar';}
 return type;
}
vehicle=function(type,color,noWheels=false){
 const id=spriteId(type,color,noWheels),found=sprites[id];
 if(!found)return oldVehicle(type,color,noWheels);
 const s=sheetData[found[0]],b=s.cells[found[1]],href='./toys-3d-'+(found[0]+1)+'.webp';
 return '<svg class="toy-visual toy-'+id+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="'+b.join(' ')+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><image x="0" y="0" width="'+s.width+'" height="'+s.height+'" href="'+href+'" xlink:href="'+href+'"/></svg>';
};
drawPuzzle=function(){
 const count=level===1?2:4,url='./puzzle-'+(level===1?'fire':'excavator')+'.webp';
 const items=Array.from({length:count},(_,i)=>({id:'p'+i,label:'Mảnh tranh '+(i+1),source:puzzlePiece(url,i,count),target:puzzlePiece(url,i,count,true),targetLabel:'Vị trí '+(i+1)}));
 matchGame(items,{orderedTargets:true});if(level===2){const grid=$('.targets',stage);if(grid)grid.classList.add('puzzle-targets');}
};
const oldDrawWheels=drawWheels;
drawWheels=function(){
 oldDrawWheels();
 const id=level===1?'firebody':'ambulancebody',b=sheetData[3].cells[sprites[id][1]],board=$('.wheel-board',stage);
 board.classList.add('toy-wheel-board');board.style.aspectRatio=b[2]+' / '+b[3];
 const holes=level===1?[[732,535,31],[924,527,27]]:[[1230,541,32],[1406,535,28]];
 holes.forEach((h,i)=>{const el=$('[data-wheel-target="'+(i+1)+'"]',stage);el.style.left=((h[0]-b[0])/b[2]*100)+'%';el.style.top=((h[1]-b[1])/b[3]*100)+'%';el.style.width=(h[2]*2/b[2]*100)+'%';});
};
const worldIcons={rescue:'fire',works:'excavator',street:'bus',rail:'train',sky:'plane',water:'boat',farm:'tractor'};
const adventureIcons={fireAdventure:'fire',digAdventure:'excavator',trainAdventure:'train',flightAdventure:'plane',ferryAdventure:'ferry',washAdventure:'car'};
document.querySelectorAll('[data-open-world]').forEach(b=>{const el=b.querySelector('.world-toy');if(el)el.innerHTML=vehicle(worldIcons[b.dataset.openWorld]);});
document.querySelectorAll('.adventure-card[data-game]').forEach(b=>{const el=b.querySelector('.adventure-image');if(el)el.innerHTML=vehicle(adventureIcons[b.dataset.game]);});
const feature=$('#feature-vehicles');if(feature)feature.innerHTML='<div>'+vehicle('ambulance')+'</div><div class="small-car">'+vehicle('excavator')+'</div>';
const strip=$('#vehicle-strip');if(strip)strip.innerHTML=vehicles.slice(0,5).map(v=>'<span class="strip-item">'+vehicle(v.id)+'<span>'+esc(v.name)+'</span></span>').join('');
const cardIcons={garage:'redcar',wheels:'firebody',shadow:'dump',drive:'fire',vehiclecount:'bus',where:'plane',traffic:'car',puzzle:'fire'};
document.querySelectorAll('.side-card[data-game],.general-card[data-game]').forEach(b=>{
 const id=cardIcons[b.dataset.game];if(!id)return;
 const el=b.querySelector('.card-visual,.game-icon');if(el){el.classList.add('toy-card-icon');el.innerHTML=vehicle(id);}
});
/* Warm the atlases after the page has rendered; all art remains on this site. */
const preload=()=>[1,2,3,4].forEach(n=>{const image=new Image();image.src='./toys-3d-'+n+'.webp';});
if('requestIdleCallback' in window)window.requestIdleCallback(preload,{timeout:2500});else setTimeout(preload,600);
})();
