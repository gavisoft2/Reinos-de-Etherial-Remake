export class LumenScene extends Phaser.Scene {
 constructor(){super("Lumen")}
 preload(){
  const A="assets/";
  ["idle_01","idle_02","walk_01","walk_02","walk_03","walk_04","attack_01","attack_02","attack_03","skill_01","skill_02","skill_03"].forEach(n=>this.load.image("gabriel_"+n,A+"characters/gabriel_archer/"+n+".png"));
  [["aldric","aldric"],["mira","mira"],["borin","borin"],["guardia","guardia"]].forEach(a=>this.load.image("npc_"+a[0],A+"npcs/"+a[1]+".png"));
  [["posada","posada"],["mercado","mercado"],["herreria","herreria"],["gremio","gremio"],["templo","templo"]].forEach(a=>this.load.image("b_"+a[0],A+"buildings/lumen/"+a[1]+".png"));
  ["arbol_01","arbol_02","arbol_03","farol","banco","puesto","bandera","estatua_fuente"].forEach(n=>this.load.image("p_"+n,A+"props/"+n+".png"));
  ["suelo_01","suelo_02","suelo_03","suelo_04","hierba"].forEach(n=>this.load.image("t_"+n,A+"tiles/"+n+".png"));
  this.load.image("lumen_map",A+"maps/lumen_master.png");
  ["inventario","tienda","habilidades","misiones","mapa","configuracion"].forEach(n=>this.load.image("ui_"+n,A+"ui/icons/"+n+".png"));
  this.load.image("enemy_slime",A+"enemies/slime.png");
 }
 create(){
  // Limpia el fondo gris/cuadriculado heredado del sprite sheet.
  const transparentKeys=[
   "gabriel_idle_01","gabriel_idle_02","gabriel_walk_01","gabriel_walk_02","gabriel_walk_03","gabriel_walk_04","gabriel_attack_01","gabriel_attack_02","gabriel_attack_03","gabriel_skill_01","gabriel_skill_02","gabriel_skill_03",
   "npc_aldric","npc_mira","npc_borin","npc_guardia",
   "b_posada","b_mercado","b_herreria","b_gremio","b_templo",
   "p_arbol_01","p_arbol_02","p_arbol_03","p_farol","p_banco","p_puesto","p_bandera","p_estatua_fuente","enemy_slime"
  ];
  transparentKeys.forEach(k=>this.removeSheetBackground(k));
  this.physics.world.setBounds(0,0,720,1280); this.obstacles=this.physics.add.staticGroup();
  // Base continua: elimina el efecto de mosaico/cuadricula del suelo.
  this.add.rectangle(360,640,720,1280,0x3f4938,1).setDepth(-30);
  this.add.image(360,640,"lumen_map").setDisplaySize(720,1280).setAlpha(.16).setDepth(-29);
  for(let y=0;y<1280;y+=72)for(let x=0;x<720;x+=78){
   const tile=this.add.image(x+39,y+36,"t_"+(["suelo_01","suelo_02","suelo_03","suelo_04"][(x/78+y/72)%4|0])).setDisplaySize(86,80).setAlpha(.38).setDepth(-28);
   tile.setBlendMode(Phaser.BlendModes.SOFT_LIGHT);
  }
  this.add.image(360,455,"p_estatua_fuente").setScale(2.7).setDepth(455); this.addObstacle(360,470,150,70);
  [["b_posada",130,300],["b_mercado",590,300],["b_herreria",135,690],["b_gremio",585,690],["b_templo",360,190]].forEach(a=>{this.add.image(a[1],a[2],a[0]).setScale(1.42).setDepth(a[2]);this.addObstacle(a[1],a[2]+45,175,78)});
  [[45,390,"p_arbol_01"],[675,390,"p_arbol_02"],[50,780,"p_arbol_03"],[670,780,"p_arbol_01"],[65,940,"p_arbol_02"],[655,940,"p_arbol_03"]].forEach(a=>{this.add.image(a[0]+5,a[1]+13,a[2]).setTint(0x000000).setAlpha(.18).setScale(1.15,.42).setDepth(a[1]-2);this.add.image(a[0],a[1],a[2]).setScale(1.25).setDepth(a[1])});
  [["npc_mira",150,555,"Mira"],["npc_guardia",275,570,"Guardia"],["npc_aldric",560,555,"Aldric"],["npc_borin",155,845,"Borin"]].forEach(a=>{this.add.image(a[1],a[2],a[0]).setScale(.62).setDepth(a[2]);this.add.text(a[1],a[2]+62,a[3],{fontFamily:"Georgia",fontSize:"13px",color:"#fff2c7",stroke:"#000",strokeThickness:4}).setOrigin(.5).setDepth(a[2]+2)});
  this.playerShadow=this.add.ellipse(360,798,55,20,0x000000,.28).setDepth(798);
  this.player=this.physics.add.sprite(360,760,"gabriel_idle_01").setScale(1.05).setDepth(900);this.player.body.setSize(34,38).setOffset(24,62);this.player.setCollideWorldBounds(true);this.physics.add.collider(this.player,this.obstacles);
  this.playerName=this.add.text(360,830,"Gabriel · Arquero",{fontFamily:"Georgia",fontSize:"15px",color:"#fff1c4",stroke:"#000",strokeThickness:4}).setOrigin(.5).setDepth(901);
  this.anims.create({key:"gabriel_idle",frames:["gabriel_idle_01","gabriel_idle_02"].map(key=>({key})),frameRate:3,repeat:-1});
  this.anims.create({key:"gabriel_walk",frames:["gabriel_walk_01","gabriel_walk_02","gabriel_walk_03","gabriel_walk_04"].map(key=>({key})),frameRate:8,repeat:-1});
  this.player.play("gabriel_idle");this.move={x:0,y:0};this.questDone=false;this.slimeQuest=false;this.slimesKilled=0;this.level=1;this.xp=0;this.xpNeed=100;this.gold=0;this.playerHp=100;this.maxHp=100;this.attackReady=true;this.inventory={slimeGel:0};this.npcTargets=[];this.spawnSlimes();
  this.npcTargets.push({name:"Aldric",x:560,y:555,r:88});
  this.makeHud();this.makeControls();this.makeInteractButton();
 }
 removeSheetBackground(key){
  const tex=this.textures.get(key), src=tex?.getSourceImage(); if(!src) return;
  const w=src.width,h=src.height,cv=document.createElement("canvas");cv.width=w;cv.height=h;
  const ctx=cv.getContext("2d",{willReadFrequently:true});ctx.drawImage(src,0,0);
  const img=ctx.getImageData(0,0,w,h),d=img.data,seen=new Uint8Array(w*h),q=[];
  const bg=i=>{const r=d[i*4],g=d[i*4+1],b=d[i*4+2],a=d[i*4+3];const mx=Math.max(r,g,b),mn=Math.min(r,g,b);return a<245 || (mx-mn<18 && mx<125 && mn>28)};
  const push=(x,y)=>{if(x<0||y<0||x>=w||y>=h)return;const n=y*w+x;if(seen[n]||!bg(n))return;seen[n]=1;q.push(n)};
  for(let x=0;x<w;x++){push(x,0);push(x,h-1)}for(let y=0;y<h;y++){push(0,y);push(w-1,y)}
  for(let p=0;p<q.length;p++){const n=q[p],x=n%w,y=(n/w)|0;d[n*4+3]=0;push(x-1,y);push(x+1,y);push(x,y-1);push(x,y+1)}
  ctx.putImageData(img,0,0);this.textures.remove(key);this.textures.addCanvas(key,cv);
 }
 addObstacle(x,y,w,h){const z=this.obstacles.create(x,y,null).setVisible(false);z.body.setSize(w,h);z.refreshBody();return z}
 makeHud(){
  this.add.rectangle(360,52,700,84,0x080d0a,.82).setScrollFactor(0).setDepth(5000).setStrokeStyle(2,0xb79251,.7);
  this.levelText=this.add.text(28,22,"Gabriel · Nv.1",{fontFamily:"Georgia",fontSize:"17px",color:"#f4dfad"}).setScrollFactor(0).setDepth(5001);
  this.hpBar=this.add.rectangle(30,52,260,12,0x9e342e).setOrigin(0,.5).setScrollFactor(0).setDepth(5001);this.add.rectangle(30,72,205,9,0x326f9e).setOrigin(0,.5).setScrollFactor(0).setDepth(5001);this.xpText=this.add.text(275,67,"EXP 0/100",{fontFamily:"Georgia",fontSize:"11px",color:"#e7cf91"}).setScrollFactor(0).setDepth(5001);
  [["ui_tienda",430],["ui_inventario",500],["ui_habilidades",570],["ui_misiones",640]].forEach(a=>this.add.image(a[1],52,a[0]).setDisplaySize(46,38).setScrollFactor(0).setDepth(5001));
  this.invText=this.add.text(350,43,"Gel 0",{fontFamily:"Georgia",fontSize:"11px",color:"#9fe3ae"}).setScrollFactor(0).setDepth(5001);this.goldText=this.add.text(350,22,"Oro 0",{fontFamily:"Georgia",fontSize:"13px",color:"#f5d47a"}).setScrollFactor(0).setDepth(5001);this.add.image(640,145,"lumen_map").setDisplaySize(118,78).setScrollFactor(0).setDepth(5000).setAlpha(.95);
  this.questText=this.add.text(20,112,"EL INICIO DE UNA LEYENDA\nHabla con Aldric  0/1",{fontFamily:"Georgia",fontSize:"13px",color:"#f0dfb7",backgroundColor:"#080d0acc",padding:{x:9,y:7}}).setScrollFactor(0).setDepth(5001);
 }
 spawnSlimes(){
  this.slimes=this.physics.add.group();
  [[190,980],[360,1040],[545,955]].forEach((p,i)=>{
   const s=this.slimes.create(p[0],p[1],"enemy_slime").setScale(.72).setDepth(p[1]);s.hp=30;s.maxHp=30;s.homeX=p[0];s.homeY=p[1];s.lastHit=0;s.setImmovable(false);
   s.hpBg=this.add.rectangle(p[0],p[1]-48,58,7,0x1b1512,.85).setDepth(p[1]+1);
   s.hpBar=this.add.rectangle(p[0]-28,p[1]-48,56,5,0xb63c35,1).setOrigin(0,.5).setDepth(p[1]+2);
  });
 }
 fireArrow(target,dmg){
  const arrow=this.add.image(this.player.x,this.player.y-18,"gabriel_attack_01").setDisplaySize(30,38).setDepth(9000);
  const angle=Phaser.Math.Angle.Between(arrow.x,arrow.y,target.x,target.y);arrow.setRotation(angle+Math.PI/2);
  this.tweens.add({targets:arrow,x:target.x,y:target.y,duration:180,onComplete:()=>{arrow.destroy();if(target.active)this.damageSlime(target,dmg)}});
 }
 damageSlime(target,dmg){
  target.hp-=dmg;this.tweens.add({targets:target,alpha:.35,duration:80,yoyo:true});target.hpBar.width=56*Math.max(0,target.hp/target.maxHp);
  const hit=this.add.text(target.x,target.y-72,"-"+dmg,{fontFamily:"Georgia",fontSize:"18px",color:"#ffd38a",stroke:"#401510",strokeThickness:3}).setOrigin(.5).setDepth(8000);
  this.tweens.add({targets:hit,y:hit.y-28,alpha:0,duration:650,onComplete:()=>hit.destroy()});if(target.hp<=0)this.killSlime(target);
 }
 attackNearest(){
  if(!this.slimes)return;let target=null,best=210;
  this.slimes.getChildren().forEach(s=>{if(!s.active)return;const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,s.x,s.y);if(d<best){best=d;target=s}});
  if(!target){this.showDialogue("No hay enemigos dentro del alcance.");return}
  if(!this.attackReady)return;this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);
  const dmg=12+Phaser.Math.Between(0,6);this.fireArrow(target,dmg);
 }
 killSlime(s){
  s.disableBody(true,true);s.hpBg.destroy();s.hpBar.destroy();this.slimesKilled++;this.gainXp(25);this.gold+=Phaser.Math.Between(4,9);if(Phaser.Math.Between(1,100)<=65){this.inventory.slimeGel++;this.spawnLootText(s.x,s.y,"Gel de Slime +1");}
  this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();
  if(this.slimeQuest){this.questText.setText("PRIMERA CACERÍA\\nDerrota Slimes  "+Math.min(this.slimesKilled,3)+"/3"+(this.slimesKilled>=3?" ✓":""));if(this.slimesKilled===3)this.showDialogue("Misión completada: Primera Cacería. +75 EXP");}
 }
 gainXp(amount){
  this.xp+=amount;
  while(this.xp>=this.xpNeed){this.xp-=this.xpNeed;this.level++;this.xpNeed=Math.floor(this.xpNeed*1.35);this.maxHp+=15;this.playerHp=this.maxHp;this.hpBar.width=260;this.levelText?.setText("Gabriel · Nv."+this.level);this.showDialogue("¡Nivel "+this.level+" alcanzado! HP máximo +15");}
  this.xpText?.setText("EXP "+this.xp+"/"+this.xpNeed);
 }
 spawnLootText(x,y,msg){const t=this.add.text(x,y-30,msg,{fontFamily:"Georgia",fontSize:"13px",color:"#8ff0a4",stroke:"#102014",strokeThickness:3}).setOrigin(.5).setDepth(8500);this.tweens.add({targets:t,y:y-70,alpha:0,duration:1200,onComplete:()=>t.destroy()});}
 updateInventoryHud(){this.invText?.setText("Gel "+this.inventory.slimeGel);}
 makeInteractButton(){
  this.interactBtn=this.add.circle(500,1180,34,0x6a552b,.88).setStrokeStyle(3,0xe1c77d,.85).setScrollFactor(0).setDepth(6000).setInteractive();
  this.add.text(500,1180,"💬",{fontSize:"23px"}).setOrigin(.5).setScrollFactor(0).setDepth(6001);
  this.interactBtn.on("pointerdown",()=>this.tryInteract());
 }
 tryInteract(){
  const a=this.npcTargets[0],d=Phaser.Math.Distance.Between(this.player.x,this.player.y,a.x,a.y);
  if(d>115){this.showDialogue("Acércate a Aldric para hablar con él.");return}
  if(!this.questDone){
   this.questDone=true;this.questText.setText("EL INICIO DE UNA LEYENDA\nHabla con Aldric  1/1 ✓");
   this.showDialogue("Aldric: Bienvenido a Lumen, Gabriel. La ciudad necesita arqueros capaces. Ve hacia la salida sur y derrota 3 Slimes.");
  }else this.showDialogue("Aldric: El camino al sur conduce a las praderas. Mantén tu arco preparado.");
 }
 showDialogue(msg){
  if(this.dialogueBox)this.dialogueBox.destroy();if(this.dialogueText)this.dialogueText.destroy();
  this.dialogueBox=this.add.rectangle(360,960,650,118,0x090d0b,.92).setStrokeStyle(2,0xc5a45d,.9).setScrollFactor(0).setDepth(7000);
  this.dialogueText=this.add.text(60,925,msg,{fontFamily:"Georgia",fontSize:"16px",color:"#f4e4b9",wordWrap:{width:595},lineSpacing:5}).setScrollFactor(0).setDepth(7001);
  this.time.delayedCall(4200,()=>{this.dialogueBox?.destroy();this.dialogueText?.destroy();this.dialogueBox=null;this.dialogueText=null});
 }
 makeControls(){
  const base=this.add.circle(110,1160,72,0x08100b,.55).setStrokeStyle(3,0xb99b64,.6).setInteractive().setScrollFactor(0).setDepth(6000), knob=this.add.circle(110,1160,30,0x65736a,.8).setScrollFactor(0).setDepth(6001);
  const reset=()=>{this.move.x=this.move.y=0;knob.setPosition(110,1160)};base.on("pointermove",p=>{if(!p.isDown)return;let dx=p.x-110,dy=p.y-1160,d=Math.hypot(dx,dy)||1,m=Math.min(48,d);dx=dx/d*m;dy=dy/d*m;knob.setPosition(110+dx,1160+dy);this.move={x:dx/48,y:dy/48}});base.on("pointerup",reset);base.on("pointerout",reset);
  [["gabriel_attack_01",610,1160],["gabriel_skill_01",520,1080],["gabriel_skill_02",600,1050],["gabriel_skill_03",675,1090]].forEach((a,i)=>{const b=this.add.circle(a[1],a[2],i?34:52,i?0x234c34:0x64251f,.9).setStrokeStyle(3,0xd1aa63,.8).setInteractive().setScrollFactor(0).setDepth(6000);this.add.image(a[1],a[2],a[0]).setDisplaySize(i?46:66,i?54:76).setScrollFactor(0).setDepth(6001);b.on("pointerdown",()=>{this.player.setTexture(a[0]);if(i===0)this.attackNearest()});b.on("pointerup",()=>this.player.play("gabriel_idle"))});
 }
 update(){
  if(!this.player)return;
  const now=this.time.now;this.slimes?.getChildren().forEach(s=>{if(!s.active)return;const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,s.x,s.y);
   if(d<175&&d>55)this.physics.moveToObject(s,this.player,32);else s.setVelocity(0);
   if(d<62&&now-s.lastHit>1200){s.lastHit=now;this.playerHp=Math.max(0,this.playerHp-5);this.hpBar.width=260*this.playerHp/this.maxHp;if(this.playerHp<=0){this.playerHp=this.maxHp;this.hpBar.width=260;this.player.setPosition(360,760);this.showDialogue("Has caído en combate. Regresas a la plaza de Lumen.");}}
  });
  const moving=Math.abs(this.move.x)+Math.abs(this.move.y)>.08;this.player.setVelocity(this.move.x*170,this.move.y*170);if(moving){if(this.player.anims.currentAnim?.key!=="gabriel_walk")this.player.play("gabriel_walk");if(this.move.x<-.05)this.player.setFlipX(true);if(this.move.x>.05)this.player.setFlipX(false)}else if(this.player.anims.currentAnim?.key!=="gabriel_idle")this.player.play("gabriel_idle");this.slimes?.getChildren().forEach(s=>{if(s.active){s.setDepth(s.y);s.hpBg?.setPosition(s.x,s.y-48).setDepth(s.y+1);s.hpBar?.setPosition(s.x-28,s.y-48).setDepth(s.y+2)}});this.player.setDepth(this.player.y+100);this.playerShadow.setPosition(this.player.x,this.player.y+38).setDepth(this.player.y-1);this.playerName.setPosition(this.player.x,this.player.y+70).setDepth(this.player.y+102);
 }
}