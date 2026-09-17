const pages=[...document.querySelectorAll(".page")],count=document.getElementById("count"),bar=document.getElementById("bar"),cele=document.getElementById("celebration");let idx=0,locked=false;
function paperEverywhere(){pages.forEach(p=>{let layer=p.querySelector(".paper-layer");for(let i=0;i<10;i++){let x=document.createElement("span");x.className="paper";x.style.left=Math.random()*100+"%";x.style.top=Math.random()*100+"%";x.style.setProperty("--r",(Math.random()*80-40)+"deg");x.style.animationDelay=(-Math.random()*9)+"s";layer.appendChild(x)}})}paperEverywhere();
function celebration(){for(let i=0;i<85;i++){let e=document.createElement("span");e.className="confetti"+(Math.random()>.7?" round":"");let c=["#ff4f9c","#ffd77b","#a574ff","#61dcff","#fff4dc"];e.style.background=c[i%5];e.style.left="50vw";e.style.top="50vh";e.style.setProperty("--x",(Math.random()*125-62)+"vw");e.style.setProperty("--y",(Math.random()*120-35)+"vh");e.style.animationDelay=Math.random()*.25+"s";cele.appendChild(e);setTimeout(()=>e.remove(),3600)}for(let i=0;i<28;i++){let r=document.createElement("span");r.className="ribbon";r.style.setProperty("--r",i*(360/28)+"deg");cele.appendChild(r);setTimeout(()=>r.remove(),1900)}}
const letter=["Happy 22nd Birthday, Dinesh.","We may not have spent a huge amount of time together, but somehow the little time we had became genuinely precious to me.","I started with the completely wrong idea about you. And I'm actually glad that friendship gave me the chance to discover the person behind that first impression.","RACGVP brought its share of stress and chaos, but somewhere inside all of that, it gave me something I wouldn't trade — a friend I want to keep for a very long time.","So today, I don't just wish you a happy birthday. I wish you a year full of good people, big moments, peace, laughter and memories that stay.","Happy Birthday, bro. Here's to everything still ahead."];function typeLetter(){let box=document.getElementById("letterText");box.innerHTML="";letter.forEach((t,n)=>{let p=document.createElement("p");box.appendChild(p);let k=0;setTimeout(function go(){if(k<t.length){p.textContent+=t[k++];setTimeout(go,15+Math.random()*20)}},n*850)})}
function show(n){if(locked)return;locked=true;pages[idx].classList.remove("active");pages[idx].classList.add("exit");setTimeout(()=>pages[idx].classList.remove("exit"),1000);idx=n;pages[idx].classList.add("active");count.textContent=String(idx+1).padStart(2,"0");bar.style.width=((idx+1)/5*100)+"%";celebration();if(idx===1)typeLetter();setTimeout(()=>locked=false,650)}
document.querySelectorAll(".next").forEach(b=>b.onclick=()=>show((idx+1)%5));document.querySelector(".restart").onclick=()=>show(0);
let sx=0,sy=0;addEventListener("touchstart",e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY},{passive:true});addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy))show((idx+(dx<0?1:4))%5)},{passive:true});addEventListener("keydown",e=>{if(["ArrowRight","Enter"," "].includes(e.key))show((idx+1)%5);if(e.key==="ArrowLeft")show((idx+4)%5)});
const cv=document.getElementById("particles"),ctx=cv.getContext("2d");let stars=[];function resize(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:innerWidth<700?65:120},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.2,v:.05+Math.random()*.2}))}function anim(){ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{s.y-=s.v;if(s.y<0)s.y=innerHeight;ctx.fillStyle="rgba(214,250,236,.55)";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill()});requestAnimationFrame(anim)}addEventListener("resize",resize);resize();anim();celebration();
/* PHOTO REEL: each photo enters the frame, stays, then glides away before the next arrives */
(function(){
 const reel=document.querySelector(".slideshow");
 if(!reel) return;
 const slides=[...reel.querySelectorAll(".slide")];
 const dots=[...reel.querySelectorAll(".slide-dots i")];
 let n=0;
 function nextPhoto(){
   const current=slides[n];
   const next=(n+1)%slides.length;
   current.classList.remove("active");
   current.classList.add("leaving");
   slides[next].classList.remove("leaving","waiting");
   slides[next].classList.add("active");
   slides.forEach((s,k)=>{if(k!==n && k!==next)s.classList.add("waiting")});
   dots.forEach((d,k)=>d.classList.toggle("on",k===next));
   setTimeout(()=>current.classList.remove("leaving"),1000);
   n=next;
 }
 setInterval(nextPhoto,3200);
})();
