var k=Object.defineProperty;var M=(s,t,i)=>t in s?k(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var T=(s,t,i)=>(M(s,typeof t!="symbol"?t+"":t,i),i);const A=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const S of h.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&l(S)}).observe(document,{childList:!0,subtree:!0});function i(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerpolicy&&(h.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?h.credentials="include":o.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(o){if(o.ep)return;o.ep=!0;const h=i(o);fetch(o.href,h)}};A();class b{constructor(t){this.ctx=t,this.width=window.innerWidth,this.height=window.innerHeight*.2,this.position={x:0,y:window.innerHeight-this.height}}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height)}update(){this.width=window.innerWidth,this.height=window.innerHeight*.2,this.position.y=window.innerHeight-this.height,this.draw()}}class P{constructor(t,i){this.type="Player",this.ground=i,this.ctx=t,this.width=50,this.height=50,this.position={x:100,y:i.position.y-this.height},this.velocity={x:0,y:1},this.gravity=.5,this.colliding=!1,this.preventJump=!1,this.travelled=0,this.gameOver=!1}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);const t=new f(this.ctx,this);this.colliding||t.draw()}update(){this.position.y<window.innerHeight*.2&&this.velocity.y<0&&(this.velocity.y=30,this.preventJump=!0),this.velocity.y===0&&(this.preventJump=!1),this.position.y+=this.velocity.y,this.position.x+=this.velocity.x,this.travelled+=this.velocity.x,this.position.y+this.height+this.velocity.y<=this.ground.position.y?this.velocity.y+=this.gravity:this.velocity.y=0,this.draw()}}const m=class{constructor(t,i){this.ctx=t,this.container=i,this.radius=i.type==="Enemy"&&window.innerWidth>1020?10:5,this.position={x:i.type==="Enemy"?i.position.x-(i.parallelSideB-i.parallelSideT)+i.width/2:i.velocity.x>=0?i.position.x+i.width*.75:i.position.x+i.width*.25,y:i.type==="Enemy"?i.position.y+i.height*.7:i.position.y+i.height*.25}}draw(){m.counter+=.001,this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.position.x,this.position.y,this.radius,0,360),this.ctx.fill(),this.ctx.closePath(),this.ctx.fillStyle="black",this.ctx.beginPath(),this.container.type==="Enemy"?this.ctx.arc(this.position.x+Math.sin(m.counter)*4.5,this.position.y+this.radius/2,this.radius/2,0,360):this.ctx.arc(this.position.x+this.radius*25/100,this.position.y-this.radius/2,this.radius/2,0,360),this.ctx.fill(),this.ctx.closePath()}};let f=m;T(f,"counter",0);const d=(s=0,t=1,i=!1)=>i?Math.floor(Math.random()*(t-s)+s):Math.random()*(t-s)+s,I=()=>"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class O{constructor(t,i,l){this.ctx=t,this.gun=i,this.player=l,this.position={x:i.position.x,y:i.position.y},this.length=8,this.velocity={x:5,y:20},this.shot=!1,this.a=this.player.position.x,this.b=this.gun.position.x}shotThePlayer(){this.position.x+this.length>=this.player.position.x&&this.position.x<=this.player.position.x+this.player.width&&this.position.y+this.length>=this.player.position.y&&this.position.y<=this.player.position.y+this.player.height&&(this.player.gameOver=!0)}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(this.position.x,this.position.y,this.length,this.length)}update(){this.position.y+=this.velocity.y;const t=(this.position.y-this.gun.position.y)*100/(this.player.ground.position.y-this.gun.position.y);this.position.x=(this.a-this.b)*t/100+this.b,this.draw(),this.shotThePlayer()}}class F{constructor(t,i,l){this.ctx=t,this.enemy=i,this.player=l,this.position={x:i.position.x-(this.enemy.parallelSideB-this.enemy.parallelSideT)+this.enemy.width/2,y:this.enemy.position.y+this.enemy.height-1},this.id=null,this.bullets=[]}shoot(){}revoke(){this.id&&(window.clearInterval(this.id),this.id=null),this.bullets=[]}draw(){this.ctx.beginPath(),this.ctx.moveTo(this.enemy.position.x-(this.enemy.parallelSideB-this.enemy.parallelSideT)+this.enemy.width/2,this.enemy.position.y+this.enemy.height-5),this.ctx.strokeStyle="black",this.ctx.lineTo(this.position.x,this.position.y),this.ctx.lineWidth=window.innerWidth>1020?10:6,this.ctx.stroke(),this.ctx.closePath(),this.bullets.forEach(t=>{t.update()}),this.id||(this.id=window.setInterval(()=>{this.player.gameOver&&window.clearInterval(this.id),this.bullets.push(new O(this.ctx,this,this.player))},300))}update(){let t=this.player.position.x+this.player.width;t<this.enemy.position.x-(this.enemy.parallelSideB-this.enemy.parallelSideT)?t=this.enemy.position.x-20:t>this.enemy.position.x+this.enemy.width-(this.enemy.parallelSideB-this.enemy.parallelSideT)&&(t=this.enemy.position.x+this.enemy.parallelSideB-20),this.position={x:t,y:this.enemy.position.y+this.enemy.height+50},this.bullets[0]&&this.bullets[0].position.y>=window.innerHeight&&this.bullets.shift(),this.draw()}}class q{constructor(t,i){this.ctx=t,this.scatterLength=200,this.position={x:i.position.x-(i.parallelSideB-i.parallelSideT)-this.scatterLength,y:i.position.y+i.height},this.enemy=i,this.height=window.innerHeight*.75,this.width=this.scatterLength*2+i.width}draw(){const t=this.ctx.createLinearGradient(this.position.x+this.enemy.width/2,this.position.y,this.position.x+this.enemy.width/2,this.height);t.addColorStop(0,"#EAE22A"),t.addColorStop(1,"#DFDFDF00"),this.ctx.fillStyle=t,this.ctx.beginPath(),this.ctx.moveTo(this.position.x,this.position.y+this.height),this.ctx.lineTo(this.position.x+this.width,this.position.y+this.height),this.ctx.lineTo(this.enemy.position.x+this.enemy.parallelSideB,this.position.y),this.ctx.lineTo(this.enemy.position.x-(this.enemy.parallelSideB-this.enemy.parallelSideT),this.position.y),this.ctx.fill(),this.ctx.closePath()}update(){this.position={x:this.enemy.position.x-(this.enemy.parallelSideB-this.enemy.parallelSideT)-this.scatterLength,y:this.enemy.position.y+this.enemy.height},this.height=window.innerHeight*.75,this.width=this.scatterLength*2+this.enemy.width,this.draw()}}class W{constructor(t,i,l){this.type="Enemy",this.ctx=t,this.player=i,this.distanceTravelled=0,this.prevVelocity=1,this.parallelSideT=window.innerWidth*.04,this.parallelSideB=window.innerWidth*.06,this.diagonalSide=window.innerWidth*.035,this.width=this.parallelSideB+(this.parallelSideB-this.parallelSideT),this.height=this.diagonalSide,this.position={x:l||d(window.innerWidth,window.innerWidth*2),y:d(window.innerHeight*.1-this.height,window.innerHeight*.2-this.height)},this.velocity=d(1,3),this.distance=d(window.innerWidth*.5,window.innerWidth*1.5,!0),this.torch=new q(this.ctx,this),this.gun=new F(t,this,i),this.playerFound=!1}draw(){this.ctx.fillStyle="black",this.ctx.beginPath(),this.ctx.moveTo(this.position.x,this.position.y),this.ctx.lineTo(this.position.x+this.parallelSideT,this.position.y),this.ctx.lineTo(this.position.x+this.parallelSideB,this.position.y+this.diagonalSide),this.ctx.lineTo(this.position.x-(this.parallelSideB-this.parallelSideT),this.position.y+this.diagonalSide),this.ctx.fill(),this.ctx.closePath(),new f(this.ctx,this).draw(),this.torch.update(),this.findPlayer()}shoot(){this.gun.update(),this.velocity=0}findPlayer(){this.player.position.x>=this.torch.position.x&&this.player.position.x<=this.torch.position.x+this.torch.width&&!this.player.colliding?(this.playerFound=!0,this.shoot()):this.playerFound&&(this.playerFound=!1,this.velocity=this.prevVelocity,this.gun.revoke())}update(){this.position.x+=this.velocity,this.distanceTravelled+=this.velocity,(this.distanceTravelled>this.distance||this.distanceTravelled<-this.distance)&&(this.velocity=-this.velocity,this.prevVelocity=this.velocity),this.draw()}}class u{constructor(t,i,l=null){this.ctx=t;const o=d(80,600);this.width=o-o%10,this.height=d(window.innerHeight*.07,window.innerHeight*.16),this.initialX=l,this.ground=i;const h=d(window.innerWidth,window.innerWidth*1.7,!0);this.position={x:l===null?h-h%10:l,y:i.position.y-this.height},this.playerColliding={x:!1,y:!1}}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height)}update(){this.position.y=this.ground.position.y-this.height+.5,this.draw()}}class g{constructor(t,i){this.ctx=t,this.platform=i,this.difference=d(window.innerWidth*.2,window.innerWidth),this.position={x:i.position.x+this.difference,y:d(window.innerHeight*.1,window.innerHeight*.2)}}draw(){this.ctx.beginPath(),this.ctx.arc(this.position.x,this.position.y,30,Math.PI*.5,Math.PI*1.5),this.ctx.arc(this.position.x+40,this.position.y-30,40,Math.PI*1,Math.PI*1.8),this.ctx.arc(this.position.x+85,this.position.y-26,30,Math.PI*1.37,Math.PI*1.91),this.ctx.arc(this.position.x+120,this.position.y+5,40,Math.PI*1.5,Math.PI*.2),this.ctx.moveTo(this.position.x,this.position.y),this.ctx.lineTo(this.position.x,this.position.y+60),this.ctx.fillStyle="#000000bb",this.ctx.fill(),this.ctx.closePath()}update(){this.position.x=this.platform.position.x+this.difference,this.draw()}}const y=document.getElementById("canvas"),R=document.querySelector(".btnContainer"),E=document.querySelector(".leftBtn"),C=document.querySelector(".rightBtn"),X=document.querySelector(".upBtn"),n=y.getContext("2d");y.width=window.innerWidth;y.height=window.innerHeight;window.addEventListener("resize",()=>{y.width=window.innerWidth,y.height=window.innerHeight,H()});const a={right:{pressed:!1},left:{pressed:!1}};let v=0,c=new b(n),e=new P(n,c),p=[d(window.innerWidth*.5-40,window.innerWidth),d(window.innerWidth*.5-40,window.innerWidth),d(window.innerWidth*.5-40,window.innerWidth)],r=[],x=[],w;const H=()=>{e.position.y=c.position.y-e.height,I()||R.classList.add("hide")},L=()=>{v=0,c=new b(n),e=new P(n,c),p=[d(window.innerWidth*.5-40,window.innerWidth),d(window.innerWidth*.5-40,window.innerWidth),d(window.innerWidth*.5-40,window.innerWidth)],r=[new u(n,c,p[0]-p[0]%10),new u(n,c,p[1]-p[1]%10),new u(n,c,p[2]-p[2]%10),new u(n,c,p[2]-p[2]%10)],x=[new W(n,e,window.innerWidth*.6),new W(n,e,window.innerWidth)],w=[new g(n,r[0]),new g(n,r[1]),new g(n,r[3])]},D=()=>{let s=Math.floor(v/1e3).toString(),t=4-s.length,i="";if(t>0)for(let l=0;l<t;l++)i+="0";i+=s,n.fillStyle="black",n.textAlign="left",n.font="12px Arcade",n.fillText("score",window.innerWidth*.88,window.innerHeight*.25),n.font="18px Arcade",n.fillText(i,window.innerWidth*.88-10,window.innerHeight*.25+25)},B=()=>{if(requestAnimationFrame(B),window.innerHeight>window.innerWidth){n.font="18px Arcade",n.fillStyle="black",n.textAlign="center",n.fillText("Rotate your device",window.innerWidth*.5,window.innerHeight*.35),n.fillText("to landscape",window.innerWidth*.5,window.innerHeight*.4);return}if(e.gameOver)n.font="50px Arcade",n.fillStyle="black",n.textAlign="center",n.fillText("Game Over!",window.innerWidth*.5,window.innerHeight*.35),n.font="25px Arcade",n.fillText("Click to restart",window.innerWidth*.5,window.innerHeight*.45);else{let s=null,t=null;if(n.clearRect(0,0,window.innerWidth,window.innerHeight),v<=e.travelled&&(v=e.travelled),w.forEach(i=>{i.update()}),x.forEach(i=>{i.update()}),r.forEach((i,l)=>{i.update(),i.playerColliding={x:!1,y:!1},a.right.pressed&&e.position.x<window.innerWidth*50/100?t!==0&&(t=10,e.colliding=!1,i.playerColliding.x=!1):a.left.pressed&&e.position.x>100?t!==0&&(e.colliding=!1,i.playerColliding.x=!1,t=-10):(t=0,a.right.pressed?e.position.x+e.width===i.position.x&&e.position.y+e.height>=i.position.y?(s=0,e.colliding=!0,i.playerColliding.x=!0):s!==0&&(s=-10):a.left.pressed&&(e.position.x<=i.position.x+i.width&&e.position.x>=i.position.x&&e.position.y+e.height>=i.position.y?(s=0,e.colliding=!0,i.playerColliding.x=!0):s!==0&&(s=10))),e.position.y+e.height<=i.position.y&&e.position.y+e.height+e.velocity.y>=i.position.y&&e.position.x+e.width>i.position.x&&e.position.x<i.position.x+i.width?(e.velocity.y=0,i.playerColliding.y=!0):(e.position.x+e.width===i.position.x&&e.position.y>=i.position.y||e.position.x===i.position.x+i.width&&e.position.y>=i.position.y)&&(e.colliding=!0,i.playerColliding.x=!0),e.position.x+e.width===i.position.x&&a.right.pressed&&e.position.y+e.height>=i.position.y&&(t=0,e.colliding=!0,i.playerColliding.x=!0),e.position.x<=i.position.x+i.width&&e.position.x>=i.position.x&&e.position.y+e.height>=i.position.y&&a.left.pressed&&(t=0,e.colliding=!0,i.playerColliding.x=!0);let o=r.length;for(let h=l-3;h<l+3;h++)if(!(l===h||h<0||h>o-1)&&(r[h].playerColliding.x&&i.playerColliding.y||r[h].playerColliding.y&&i.playerColliding.x)){e.colliding=!0;break}}),t!==null&&(e.velocity.x=t),s!==null&&s!==0&&(x.forEach(i=>{i.position.x+=s}),r.forEach(i=>{i.position.x+=s}),e.travelled-=s),e.velocity.y!==0&&(e.colliding=!1),c.update(),e.update(),r[0].position.x<-window.innerWidth*1.5&&r.shift(),x[0].position.x<-window.innerWidth*1.5&&x.shift(),a.right.pressed&&r[r.length-1].position.x<window.innerWidth*.5){for(let i=0;i<d(4,6,!0);i++)r.push(new u(n,c));for(let i=0;i<2;i++)x.push(new W(n,e));w.push(new g(n,r[r.length-2])),w.push(new g(n,r[r.length-1]))}w.length>0&&w[0].position.x<-window.innerWidth*1.5&&w.shift(),D()}document.fullscreenElement||(n.font="12px Arcade",n.textAlign="center",n.fillStyle="white",n.fillText("Double click to enter fullscreen",window.innerWidth*.5,window.innerHeight*.9))};window.addEventListener("keydown",({key:s})=>{switch(s=s.toLowerCase(),s){case"a":a.left.pressed=!0;break;case"d":a.right.pressed=!0;break;case"w":e.preventJump||(e.velocity.y=-15);break}});window.addEventListener("keyup",({key:s})=>{switch(s=s.toLowerCase(),s){case"a":a.left.pressed=!1;case"d":a.right.pressed=!1;break}});y.addEventListener("click",()=>{e.gameOver&&L()});y.addEventListener("dblclick",()=>{document.body.requestFullscreen()});E.addEventListener("touchstart",()=>{a.left.pressed=!0});C.addEventListener("touchstart",()=>{a.right.pressed=!0});X.addEventListener("touchstart",()=>{e.preventJump||(e.velocity.y=-15)});E.addEventListener("touchend",()=>{a.left.pressed=!1});C.addEventListener("touchend",()=>{a.right.pressed=!1});L();H();B();
