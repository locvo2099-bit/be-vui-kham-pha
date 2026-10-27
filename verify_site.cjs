'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Elem{
 constructor(name){this.name=name;this.innerHTML='';this.textContent='';this.hidden=false;this.dataset={};this.style={};this.attrs={};this.insertions=[];this.classList={add(){},remove(){},toggle(){},contains(){return false}}}
 insertAdjacentHTML(position,html){this.insertions.push(html)}
 querySelector(s){return element(s)}
 querySelectorAll(s){return queryAll(s)}
 setAttribute(k,v){this.attrs[k]=v}
 focus(){}
 contains(){return true}
}
const nodes=new Map(),listeners={};const element=s=>{if(!nodes.has(s))nodes.set(s,new Elem(s));return nodes.get(s)};
const levels=[new Elem('level1'),new Elem('level2')];levels[0].dataset.level='1';levels[1].dataset.level='2';
const timers=[0,10,15,20].map(n=>{const x=new Elem('timer'+n);x.dataset.minutes=String(n);return x});
function queryAll(s){if(s==='.level')return levels;if(s==='.timer-options button')return timers;return []}
const document={querySelector:element,querySelectorAll:queryAll,body:new Elem('body'),addEventListener:(t,f)=>(listeners[t]??=[]).push(f),elementFromPoint:()=>null};
const localStorage={getItem(){return null},setItem(){}};
const context=vm.createContext({document,window:{},localStorage,console,setTimeout,clearTimeout,setInterval,clearInterval,Math,Date,Set,Number,String,encodeURIComponent,Image:class {set src(value){this.url=value}}});
const run=s=>vm.runInContext(s,context);run(fs.readFileSync('dist/app.js','utf8'));run(fs.readFileSync('dist/world.js','utf8'));if(fs.existsSync('dist/visuals.js'))run(fs.readFileSync('dist/visuals.js','utf8')); 
assert.equal(run('vehicles.length'),40,'Must contain 40 vehicles');
assert.equal(run('new Set(vehicles.map(x=>x.id)).size'),40,'Vehicle identifiers should be unique');
assert.equal(run('Object.keys(games).length'),22,'Keep 16 old games and add six activities');
assert.equal(element('#vehicles .section-top').insertions.length,1,'Add the category cards');
const cat=element('#vehicles .section-top').insertions[0];assert.equal((cat.match(/data-open-world=/g)||[]).length,7);assert.equal((cat.match(/class="adventure-card /g)||[]).length,6);
for(const x of run('vehicles.map(x=>x.id)')){let v=run(`vehicle(${JSON.stringify(x)})`);assert(v.includes('<svg')&&v.includes('</svg>'),`vehicle ${x} renders`);assert(v.includes('<image'),`vehicle ${x} has artwork`)}
function click(selector,dataset={}){const target={dataset,disabled:false,closest(s){return s===selector?this:null}};const event={target,clientX:0,clientY:0};for(const fn of listeners.click)fn(event)}
const groups=['rescue','works','street','rail','sky','water','farm'];let visited=new Set();
for(const group of groups){click('[data-open-world]',{openWorld:group});let stage=element('#game-stage').innerHTML;assert(stage.includes('data-world-group'),`tabs in ${group}`);for(let i=0;i<8;i++){stage=element('#game-stage').innerHTML;const found=[...stage.matchAll(/data-vehicle="([^"]+)"/g)].map(m=>m[1]);assert(found.length>=1&&found.length<=3,`At most three tiles in ${group}`);found.forEach(x=>visited.add(x));if(stage.includes('data-world-page="1" disabled'))break;click('[data-world-page]',{worldPage:'1'})}}
assert.equal(visited.size,40,'All vehicles reachable by category and page');
for(const id of Object.keys(run('games'))){run(`openGame(${JSON.stringify(id)})`);assert(element('#game-stage').innerHTML.length>100,`level 1 draws ${id}`);run('level=2; renderGame()');assert(element('#game-stage').innerHTML.length>100,`level 2 draws ${id}`)}
for(const id of ['fireAdventure','digAdventure','trainAdventure','flightAdventure','ferryAdventure','washAdventure']){run(`openGame(${JSON.stringify(id)})`);for(let i=0;i<2;i++){assert(element('#game-stage').innerHTML.includes('data-adventure-next'),`${id} step ${i}`);click('[data-adventure-next]')};assert(element('#game-stage').innerHTML.includes('Mình làm được rồi!'),`${id} completes at level 1`);click('[data-adventure-replay]');assert(element('#game-stage').innerHTML.includes('data-adventure-next'),`${id} replays`);run('level=2;renderGame()');for(let i=0;i<3;i++){assert(element('#game-stage').innerHTML.includes('data-adventure-next'),`${id} level 2 step ${i}`);click('[data-adventure-next]')};assert(element('#game-stage').innerHTML.includes('Mình làm được rồi!'),`${id} completes at level 2`)}
console.log('PASS: 40 vehicles reachable; 7 categories; 22 games render at both levels; all six new activities complete and replay.');


for(const levelNumber of [1,2]){
 run("level="+levelNumber);
 for(const id of ['garage','colors','shapes','shadow','where','puzzle','tidy']){
  run("openGame("+JSON.stringify(id)+");level="+levelNumber+";renderGame()");
  const itemIds=run('task.items.map(x=>x.id)');
  if(itemIds.length>1){
   run("selected="+JSON.stringify(itemIds[0])+";applyMatch("+JSON.stringify(itemIds[1])+")");
   assert.equal(run('done.size'),0,id+' rejects wrong match');
  }
  for(const item of itemIds)run("selected="+JSON.stringify(item)+";applyMatch("+JSON.stringify(item)+")");
  assert.equal(run('done.size'),itemIds.length,id+' completes at level '+levelNumber);
  if(id==='puzzle')assert(element('#game-stage').innerHTML.includes('./puzzle-'+(levelNumber===1?'fire':'excavator')+'.webp'),'Puzzle uses a same-site raster image');
 }
 run("openGame('wheels');level="+levelNumber+";renderGame()");
 assert(element('#game-stage').innerHTML.includes(levelNumber===1?'toy-firebody':'toy-ambulancebody'),'Wheel game shows vehicle without wheels');
 run("wheelChoose('square');wheelPut('1')");assert.equal(run('done.size'),0,'Square wheel rejected');
 run("wheelChoose('round');wheelPut('1');wheelPut('1')");assert.equal(run('done.size'),1,'Same wheel slot counted once');
 run("wheelPut('2')");assert.equal(run('done.size'),2,'Two round wheels finish');
}
for(const key of ['#voice-toggle','#sound-toggle']){click(key);assert.equal(element(key).attrs['aria-checked'],'false');click(key);assert.equal(element(key).attrs['aria-checked'],'true');}
for(const m of [10,15,20]){click('[data-minutes]',{minutes:String(m)});assert(run('timerEnd > Date.now()'),'Rest timer starts');click('[data-minutes]',{minutes:'0'});assert.equal(run('timerEnd'),null);}
console.log('PASS: correct/wrong matches, 2/4-piece puzzles, color garages, both wheel games, sound/voice toggles and rest timers.');
