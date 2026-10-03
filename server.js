const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const path=require('path');
const app=express(); const server=http.createServer(app); const io=new Server(server);
app.use(express.static(path.join(__dirname,'public')));
const films=[
['The Dark Knight',2008,9.0,100,'جريمة • دراما','نادر','rare','https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'],
['Inception',2010,8.8,92,'خيال علمي • إثارة','مميز','special','https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'],
['Interstellar',2014,8.7,88,'خيال علمي • دراما','مميز','special','https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'],
['The Godfather',1972,9.2,120,'جريمة • دراما','أسطوري','legendary','https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'],
['Fight Club',1999,8.8,84,'دراما • إثارة','مميز','special','https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'],
['Forrest Gump',1994,8.8,90,'دراما • رومانسية','نادر','rare','https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'],
['Gladiator',2000,8.5,78,'ملحمي • أكشن','عادي','common','https://image.tmdb.org/t/p/w500/ty8TnY2K0rQxazBM5J7x5Jw9b1L.jpg'],
['The Matrix',1999,8.7,86,'خيال علمي • أكشن','نادر','rare','https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg']
].map(x=>({name:x[0],year:x[1],rating:x[2],baseValue:x[3],genre:x[4],rarity:x[5],rarityClass:x[6],img:x[7]}));
// إضافة أكثر من 100 فيلم إضافي
const extraTitles = [
'Pulp Fiction','The Shawshank Redemption','The Lord of the Rings: The Return of the King',
'The Lord of the Rings: The Fellowship of the Ring','The Lord of the Rings: The Two Towers',
'The Dark Knight Rises','The Prestige','Django Unchained','The Departed','Whiplash',
'Parasite','Joker','Avengers: Endgame','Avengers: Infinity War','Iron Man',
'Captain America: The Winter Soldier','Guardians of the Galaxy','Thor: Ragnarok',
'Spider-Man: No Way Home','Spider-Man: Into the Spider-Verse','Logan','Deadpool',
'Deadpool 2','Black Panther','Doctor Strange','The Batman','Batman Begins',
'Man of Steel','Wonder Woman','Aquaman','Mission: Impossible - Fallout',
'Mission: Impossible - Dead Reckoning','Top Gun: Maverick','John Wick',
'John Wick: Chapter 2','John Wick: Chapter 3','John Wick: Chapter 4',
'Mad Max: Fury Road','Furiosa','The Revenant','Dune','Dune: Part Two',
'Blade Runner 2049','Arrival','Alien','Aliens','Terminator 2: Judgment Day',
'Terminator','Jurassic Park','Jurassic World','Jaws','Titanic',
'Avatar','Avatar: The Way of Water','The Wolf of Wall Street','Goodfellas',
'Casino','Scarface','Heat','Se7en','Zodiac','Gone Girl','Prisoners',
'No Country for Old Men','There Will Be Blood','The Green Mile',
'Saving Private Ryan','Schindler’s List','Gladiator II','Braveheart',
'300','Troy','Kingdom of Heaven','The Last Samurai','Apocalypto',
'Pirates of the Caribbean: The Curse of the Black Pearl','Pirates of the Caribbean: Dead Man’s Chest',
'The Hunger Games','Harry Potter and the Philosopher’s Stone',
'Harry Potter and the Deathly Hallows: Part 2','Fantastic Beasts',
'The Lion King','Toy Story','Toy Story 3','Up','WALL-E','Coco',
'Finding Nemo','Ratatouille','Inside Out','Inside Out 2','Shrek',
'Shrek 2','Kung Fu Panda','How to Train Your Dragon','The Incredibles',
'The Incredibles 2','Monsters, Inc.','Spider-Man','Spider-Man 2',
'Spider-Man 3','The Amazing Spider-Man','The Amazing Spider-Man 2',
'The Sixth Sense','A Beautiful Mind','The Social Network','Oppenheimer',
'Barbie','La La Land','The Truman Show','Eternal Sunshine of the Spotless Mind',
'The Grand Budapest Hotel','Her','Drive','Nightcrawler','Black Swan',
'The Silence of the Lambs','American Psycho','Memento','Oldboy',
'City of God','Amélie','Cinema Paradiso','The Pianist','1917',
'All Quiet on the Western Front','Ford v Ferrari','Moneyball','Rocky',
'Creed','Warrior','The Fighter','The Karate Kid','The Blind Side'
];

extraTitles.forEach((name,i)=>{
  const year=1980+(i%45);
  const rating=Math.round((7.2+(i%18)*0.1)*10)/10;
  const baseValue=40+((i*10)%91)*10;
  const fame=70+(i%31);
  const awards=i%9;
  films.push({
    id:'extra-'+i,
    name,
    year,
    rating,
    baseValue,
    genre:'فيلم',
    rarity:rating>=8.5?'نادر':rating>=8?'مميز':'عادي',
    rarityClass:rating>=8.5?'rare':rating>=8?'special':'common',
    img:''
  });
});

// إعطاء ID ثابت للأفلام الأصلية أيضًا
films.forEach((f,i)=>{
  if(!f.id) f.id='film-'+i;
});
const cinema={'The Dark Knight':{fame:99,awards:3,awardText:'فاز بأوسكار + 8 ترشيحات'},'Inception':{fame:97,awards:5,awardText:'4 أوسكارات + 8 ترشيحات'},'Interstellar':{fame:96,awards:1,awardText:'أوسكار + 5 ترشيحات'},'The Godfather':{fame:100,awards:6,awardText:'3 أوسكارات + 7 ترشيحات'},'Fight Club':{fame:94,awards:0,awardText:'ترشيحات وجوائز نقدية دون أوسكار'},'Forrest Gump':{fame:99,awards:8,awardText:'6 أوسكارات + 13 ترشيحًا'},'Gladiator':{fame:98,awards:6,awardText:'5 أوسكارات + 12 ترشيحًا'},'The Matrix':{fame:99,awards:5,awardText:'4 أوسكارات + جوائز تقنية متعددة'}};
const rooms=new Map(); function code(){let s;do{s='MZ'+Math.floor(1000+Math.random()*9000)}while(rooms.has(s));return s}
function pub(r){return {phase:r.phase,players:r.players.map(p=>({id:p.id,name:p.name,balance:p.balance,spent:p.spent,bids:p.bids||0,films:p.films,active:p.active,selectedFilmId:p.selectedFilmId})),round:r.round,rounds:r.rounds,film:r.film?{...r.film,value:undefined}:null,highest:r.highest,leader:r.leader,current:r.current,turnEndsAt:r.turnEndsAt,history:r.history,selectionTurnId:r.selectionTurnId,finalRanked:r.finalRanked}};
function broadcast(r){io.to(r.room).emit('state',pub(r));}
function getR(s){return rooms.get(s.room)}
function startAuction(r){
if(r.round>=r.rounds){
  r.phase='selection';
  r.selectionTurnId=r.players.find(p=>p.films.length)?.id||null;
  r.players.forEach(p=>p.selectedFilmId=null);
  r.turnEndsAt=null;
  broadcast(r);
  return;
}
const f={...r.pool[r.round++]};
f.value=Math.max(30,Math.round(f.baseValue*(0.82+Math.random()*0.36)/10)*10);
r.film=f;
r.highest=0;
r.leader=-1;
r.players.forEach(p=>p.active=true);

/* Fair rotation: every new film starts with the next player, regardless of who won the previous film. */
let starter=-1;
if(r.nextStarterId){
  starter=r.players.findIndex(p=>p.id===r.nextStarterId);
}
if(starter<0) starter=(r.startIndex||0)%r.players.length;
r.current=starter;
r.startIndex=(starter+1)%r.players.length;
r.nextStarterId=r.players[r.startIndex]?.id||r.players[0]?.id||null;

r.turnEndsAt=Date.now()+15000;
broadcast(r);
setTimeout(()=>turnTimeout(r.room),15050)
}
function nextActive(r,from){for(let k=1;k<=r.players.length;k++){const i=(from+k)%r.players.length;if(r.players[i].active&&i!==r.leader)return i}return -1}
function turnTimeout(room){const r=rooms.get(room);if(!r||r.phase!=='auction'||Date.now()<r.turnEndsAt-100)return;if(r.leader===r.current||!r.players[r.current].active)return actionWithdraw(r,r.players[r.current].id);actionWithdraw(r,r.players[r.current].id)}
function restartTimer(r){r.turnEndsAt=Date.now()+15000;const room=r.room;setTimeout(()=>turnTimeout(room),15050);}
function actionWithdraw(r,id){const i=r.players.findIndex(p=>p.id===id);if(i<0||r.phase!=='auction'||i!==r.current||i===r.leader||!r.players[i].active)return;r.players[i].active=false;const others=r.players.filter((p,j)=>p.active&&j!==r.leader).length;if(others===0){if(r.leader>=0)sell(r);else noSale(r);return}r.current=nextActive(r,i);if(r.current<0){if(r.leader>=0)sell(r);else noSale(r);return}restartTimer(r);broadcast(r)}
function sell(r){
  const p=r.players[r.leader],paid=r.highest;
  p.balance-=paid;
  p.spent+=paid;
  p.films.push({...r.film,price:paid,saving:r.film.value-paid});
  r.history.push({film:r.film.name,player:p.name,price:paid});

  // الانتقال مباشرة للفيلم التالي بدون شاشة تقييم أو انتظار.
  r.pendingDeal=null;
  r.phase='auction';
  startAuction(r);
}
function noSale(r){
  r.history.push({film:r.film.name,player:'لم يُبع',price:0});

  // الانتقال مباشرة للفيلم التالي بدون شاشة تقييم أو انتظار.
  r.pendingDeal=null;
  r.phase='auction';
  startAuction(r);
}
function finalScore(f){const c=cinema[f.name]||{fame:50,awards:0};return c.fame*.45+(f.rating/10*100)*.35+Math.min(c.awards*5,25)*.2*4}
function makeFinal(r){const valid=r.players.filter(p=>p.films.some(f=>f.id===p.selectedFilmId));r.finalRanked=valid.map(p=>{const f=p.films.find(x=>x.id===p.selectedFilmId);const c=cinema[f.name]||{fame:50,awards:0,awardText:'بيانات محدودة'};return {player:p.name,film:f,fame:c.fame,awards:c.awards,awardText:c.awardText,total:finalScore(f)}}).sort((a,b)=>b.total-a.total);r.phase='final';broadcast(r)}
io.on('connection',socket=>{socket.on('createRoom',d=>{const r={room:code(),phase:'lobby',hostId:socket.id,budget:Math.max(20,+d.budget||500),playerCount:Math.min(6,Math.max(2,+d.playerCount||4)),rounds:Math.min(films.length,Math.max(1,+d.rounds||8)),players:[{id:socket.id,name:String(d.name||'لاعب').slice(0,20),balance:0,spent:0,bids:0,films:[],active:true}],pool:[],round:0,history:[],startIndex:0,nextStarterId:null};r.players[0].balance=r.budget;rooms.set(r.room,r);socket.join(r.room);socket.emit('roomCreated',{room:r.room,state:pub(r)})});
socket.on('joinRoom',d=>{const r=rooms.get(String(d.room||'').toUpperCase());if(!r)return socket.emit('errorMsg','الغرفة غير موجودة.');if(r.phase!=='lobby')return socket.emit('errorMsg','اللعبة بدأت بالفعل.');if(r.players.length>=r.playerCount)return socket.emit('errorMsg','الغرفة ممتلئة.');r.players.push({id:socket.id,name:String(d.name||'لاعب').slice(0,20),balance:r.budget,spent:0,bids:0,films:[],active:true});socket.join(r.room);socket.emit('joined',{room:r.room,state:pub(r)});broadcast(r)});
socket.on('startGame',d=>{const r=getR(d);if(!r||socket.id!==r.hostId||r.phase!=='lobby')return;if(r.players.length<2)return socket.emit('errorMsg','يجب دخول لاعبين على الأقل.');r.pool=films.slice().sort(()=>Math.random()-.5).slice(0,r.rounds);r.phase='auction';r.round=0;startAuction(r)});
socket.on('bid',d=>{const r=getR(d);if(!r||r.phase!=='auction'||r.players[r.current]?.id!==socket.id||r.current===r.leader)return;const v=+d.value;if(!Number.isInteger(v)||v<10||v>500||v%10!==0)return socket.emit('errorMsg','المزايدة يجب أن تكون من 10 إلى 500 وبمضاعفات 10.');const p=r.players[r.current],np=r.highest+v;if(np>p.balance)return socket.emit('errorMsg','لا يمكنك تجاوز محفظتك.');r.leader=r.current;r.highest=np;r.players[r.current].bids=(r.players[r.current].bids||0)+1;r.current=nextActive(r,r.current);if(r.current<0)sell(r);else restartTimer(r),broadcast(r)});
socket.on('withdraw',d=>{const r=getR(d);if(r)actionWithdraw(r,socket.id)});
socket.on('selectFilm',d=>{const r=getR(d);if(!r||r.phase!=='selection'||r.selectionTurnId!==socket.id)return;const p=r.players.find(x=>x.id===socket.id);const f=p?.films?.[+d.index];if(!f)return;p.selectedFilmId=f.id||`${p.id}-${d.index}-${f.name}`;r.selectionTurnId=r.players.find(x=>x.films.length&&!x.selectedFilmId)?.id||null;if(!r.selectionTurnId)makeFinal(r);else broadcast(r)});
socket.on('disconnect',()=>{for(const r of rooms.values()){const i=r.players.findIndex(p=>p.id===socket.id);if(i>=0&&r.phase!=='final'){const name=r.players[i].name;if(r.nextStarterId===socket.id)r.nextStarterId=null;r.players.splice(i,1);if(r.players.length<2){r.phase='lobby'}if(r.hostId===socket.id&&r.players[0])r.hostId=r.players[0].id;broadcast(r);io.to(r.room).emit('disconnectedPlayer',name);}}});});
const PORT=process.env.PORT||3000;server.listen(PORT,'0.0.0.0',()=>console.log(`Mazad Online running on http://localhost:${PORT}`));