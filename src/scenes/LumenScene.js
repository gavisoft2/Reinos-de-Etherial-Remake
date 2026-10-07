export class LumenScene extends Phaser.Scene {
 constructor(){super("Lumen")}
 preload(){
  const A="assets/buildings/lumen_final/";
  this.load.svg("new_templo",A+"templo.svg");
  this.load.svg("new_posada",A+"posada.svg");
  this.load.svg("new_mercado",A+"mercado.svg");
  this.load.svg("new_herreria",A+"herreria.svg");
  this.load.svg("new_gremio",A+"gremio.svg");
 }
 create(){
  // LUMEN V19 — capital completa: murallas, distritos, jardines, canales y detalles urbanos.
  const W=720,H=1780;
  this.physics.world.setBounds(0,0,W,H);
  this.cameras.main.setBounds(0,0,W,H);
  this.cameras.main.setBackgroundColor("#18211b");

  const world=this.add.graphics();
  world.fillStyle(0x26362b,1);world.fillRect(0,0,W,H);
  // barrios laterales
  world.fillStyle(0x33483a,1);world.fillRect(0,0,214,H);world.fillRect(506,0,214,H);
  // avenida principal de piedra
  world.fillStyle(0x716b60,1);world.fillRoundedRect(232,-20,256,H+40,30);
  world.lineStyle(5,0xb79b64,.7);world.strokeRoundedRect(232,-20,256,H+40,30);
  // calles transversales
  [[445,150],[990,150],[1275,115]].forEach(r=>{world.fillStyle(0x68645b,1);world.fillRoundedRect(65,r[0],590,r[1],24);world.lineStyle(3,0x9e895f,.5);world.strokeRoundedRect(65,r[0],590,r[1],24);});
  // plaza monumental
  world.fillStyle(0x8b8271,1);world.fillCircle(360,720,220);
  world.lineStyle(10,0xb99c63,.9);world.strokeCircle(360,720,220);
  world.lineStyle(3,0xd0bb8a,.55);world.strokeCircle(360,720,184);
  // mosaico radial
  world.lineStyle(3,0xa88d59,.45);
  for(let i=0;i<8;i++){const a=i*Math.PI/4;world.lineBetween(360+82*Math.cos(a),720+82*Math.sin(a),360+178*Math.cos(a),720+178*Math.sin(a));}
  // jardines y patios
  [[55,255,150,145],[515,255,150,145],[45,1115,160,125],[515,1115,160,125]].forEach(r=>{world.fillStyle(0x405744,.9);world.fillRoundedRect(...r,22);world.lineStyle(3,0x8b805e,.5);world.strokeRoundedRect(...r,22);});

  this.add.image(360,190,"new_templo").setDisplaySize(350,255).setDepth(10);
  this.add.image(145,505,"new_posada").setDisplaySize(250,195).setDepth(20);
  this.add.image(575,505,"new_mercado").setDisplaySize(250,195).setDepth(20);
  this.add.image(145,1050,"new_herreria").setDisplaySize(250,195).setDepth(20);
  this.add.image(575,1050,"new_gremio").setDisplaySize(250,195).setDepth(20);

  // fuente/monumento provisional NUEVO, construido sin assets antiguos
  const plaza=this.add.graphics().setDepth(25);
  plaza.fillStyle(0x415f67,1);plaza.fillCircle(360,720,82);
  plaza.lineStyle(10,0xc2a76e,1);plaza.strokeCircle(360,720,82);
  plaza.fillStyle(0x98a7a6,1);plaza.fillCircle(360,720,37);
  plaza.fillStyle(0xd0bd88,1);plaza.fillTriangle(360,635,330,716,390,716);
  plaza.fillStyle(0xe0cf9d,1);plaza.fillCircle(360,654,13);

  // acceso sur monumental
  const gate=this.add.graphics().setDepth(18);
  gate.fillStyle(0x5f5c54,1);gate.fillRoundedRect(205,1390,95,185,18);gate.fillRoundedRect(420,1390,95,185,18);
  gate.fillStyle(0x777267,1);gate.fillRoundedRect(180,1360,145,62,14);gate.fillRoundedRect(395,1360,145,62,14);
  gate.lineStyle(5,0xb89a61,.85);gate.strokeRoundedRect(180,1360,145,62,14);gate.strokeRoundedRect(395,1360,145,62,14);
  gate.fillStyle(0x222c25,1);gate.fillRoundedRect(300,1425,120,170,42);
  this.add.text(360,1342,"PUERTA SUR",{fontFamily:"Georgia",fontSize:"20px",color:"#ead7a3",stroke:"#111914",strokeThickness:5}).setOrigin(.5).setDepth(30);

  // iluminación ambiental nueva
  [[245,420],[475,420],[245,930],[475,930],[260,1260],[460,1260]].forEach(([x,y])=>{
    const glow=this.add.circle(x,y,26,0xffd98b,.10).setDepth(30);
    this.add.rectangle(x,y+18,5,42,0x332d25,1).setDepth(31);
    this.add.circle(x,y,7,0xffd98b,.9).setDepth(32);
  });

  this.add.text(360,1640,"LUMEN",{fontFamily:"Georgia",fontSize:"36px",color:"#ead8a8",stroke:"#111914",strokeThickness:6}).setOrigin(.5).setDepth(40);
  this.add.text(360,1682,"Capital de Etherial",{fontFamily:"Georgia",fontSize:"15px",color:"#c9c3a5"}).setOrigin(.5).setDepth(40);

  const detail=this.add.graphics().setDepth(6);
  detail.lineStyle(2,0x4e4a43,.42);
  for(let y=310;y<1330;y+=42) detail.lineBetween(250,y,470,y);
  for(let y=330;y<1330;y+=84){detail.lineBetween(250,y,470,y+20);detail.lineBetween(470,y,250,y+20);}
  detail.fillStyle(0x4c6769,.8);detail.fillRoundedRect(70,690,105,210,22);detail.fillRoundedRect(545,690,105,210,22);
  detail.lineStyle(4,0x9b8b68,.7);detail.strokeRoundedRect(70,690,105,210,22);detail.strokeRoundedRect(545,690,105,210,22);
  for(let i=0;i<5;i++){detail.fillStyle(0x817b70,1);detail.fillRoundedRect(270+i*10,265+i*14,180-i*20,12,4);}
  [[165,735],[555,735],[165,850],[555,850],[285,1185],[435,1185]].forEach(([x,y])=>{this.add.rectangle(x,y,62,10,0x6b4c31,1).setDepth(35);this.add.rectangle(x-24,y+13,5,22,0x33271f,1).setDepth(34);this.add.rectangle(x+24,y+13,5,22,0x33271f,1).setDepth(34);});
  [[245,350],[475,350],[245,1125],[475,1125]].forEach(([x,y],i)=>{this.add.rectangle(x,y,5,74,0x41372b,1).setDepth(36);const flag=this.add.graphics().setDepth(37);flag.fillStyle(i%2?0x274f72:0x315d7c,1);flag.fillTriangle(x+3,y-35,x+43,y-25,x+3,y+8);flag.lineStyle(2,0xc6a55f,1);flag.lineBetween(x+4,y-34,x+4,y+8);});
  const label=(x,y,t)=>this.add.text(x,y,t,{fontFamily:"Georgia",fontSize:"12px",color:"#dfcfaa",stroke:"#172019",strokeThickness:3}).setOrigin(.5).setDepth(45);
  label(145,390,"POSADA");label(575,390,"MERCADO");label(145,940,"HERRERÍA");label(575,940,"GREMIO");label(360,70,"TEMPLO DE LUMEN");
  // Muralla perimetral y torres
  const walls=this.add.graphics().setDepth(8);
  walls.fillStyle(0x55564f,1);walls.fillRect(0,0,34,H);walls.fillRect(W-34,0,34,H);
  walls.lineStyle(4,0x9a8b68,.75);walls.lineBetween(34,0,34,H);walls.lineBetween(W-34,0,W-34,H);
  [120,620,1120,1580].forEach(y=>{walls.fillStyle(0x696a61,1);walls.fillRoundedRect(2,y,62,82,12);walls.fillRoundedRect(656,y,62,82,12);walls.lineStyle(3,0xb39a67,.7);walls.strokeRoundedRect(2,y,62,82,12);walls.strokeRoundedRect(656,y,62,82,12);});

  // Callejones secundarios conectando los distritos
  const alleys=this.add.graphics().setDepth(5);
  [[34,335,205,62],[481,335,205,62],[34,870,205,62],[481,870,205,62],[34,1215,205,58],[481,1215,205,58]].forEach(r=>{alleys.fillStyle(0x625f56,1);alleys.fillRoundedRect(...r,16);alleys.lineStyle(2,0x92805d,.5);alleys.strokeRoundedRect(...r,16);});

  // Canales decorativos y pequeños puentes de piedra
  const water=this.add.graphics().setDepth(7);
  water.fillStyle(0x31545c,.95);water.fillRoundedRect(72,610,82,310,24);water.fillRoundedRect(566,610,82,310,24);
  water.lineStyle(4,0x718b86,.7);water.strokeRoundedRect(72,610,82,310,24);water.strokeRoundedRect(566,610,82,310,24);
  [[113,675],[113,835],[607,675],[607,835]].forEach(([x,y])=>{water.fillStyle(0x82796a,1);water.fillRoundedRect(x-53,y-13,106,26,8);water.lineStyle(2,0xb59a67,.7);water.strokeRoundedRect(x-53,y-13,106,26,8);});

  // Jardines de la plaza y vegetación limpia generada para esta versión
  const garden=this.add.graphics().setDepth(16);
  [[110,300],[610,300],[110,1160],[610,1160]].forEach(([x,y])=>{garden.fillStyle(0x274f36,1);garden.fillCircle(x,y,42);garden.fillStyle(0x3f7048,1);garden.fillCircle(x-17,y-8,24);garden.fillCircle(x+17,y-5,25);garden.fillStyle(0x755b3d,1);garden.fillRect(x-5,y+26,10,34);});
  [[195,650],[525,650],[195,790],[525,790]].forEach(([x,y])=>{garden.fillStyle(0x395c3f,1);garden.fillRoundedRect(x-28,y-18,56,36,16);garden.fillStyle(0xc8a85d,.9);garden.fillCircle(x-12,y-3,3);garden.fillCircle(x+9,y+5,3);garden.fillCircle(x+18,y-6,3);});

  // Puestos comerciales nuevos integrados al distrito del mercado
  const stalls=this.add.graphics().setDepth(28);
  [[525,585],[600,585],[525,625],[600,625]].forEach(([x,y],i)=>{stalls.fillStyle(0x60472f,1);stalls.fillRoundedRect(x-28,y-12,56,28,5);stalls.fillStyle(i%2?0x315b78:0x8a6237,1);stalls.fillTriangle(x-32,y-14,x+32,y-14,x,y-38);stalls.lineStyle(2,0xd0ad67,.7);stalls.lineBetween(x-30,y-14,x+30,y-14);});

  // Braseros y luz cálida alrededor de la plaza
  [[278,610],[442,610],[278,830],[442,830],[330,1190],[390,1190]].forEach(([x,y])=>{this.add.circle(x,y,22,0xffb75c,.08).setDepth(39);this.add.rectangle(x,y+12,12,20,0x44362a,1).setDepth(40);this.add.circle(x,y,6,0xffc56a,.95).setDepth(41);});

  // Identidad de distritos
  label(112,104,"BARRIO DEL TEMPLO");label(608,104,"JARDINES REALES");
  label(112,1310,"FORJA Y ARTESANOS");label(608,1310,"DISTRITO DEL GREMIO");
  this.add.text(360,1565,"AVENIDA REAL",{fontFamily:"Georgia",fontSize:"13px",color:"#c9b788",stroke:"#172019",strokeThickness:3}).setOrigin(.5).setDepth(45);

  // Sombra suave de borde para dar profundidad al recinto amurallado
  this.add.rectangle(360,20,650,24,0x0c120f,.35).setDepth(9);
  this.add.rectangle(360,1758,650,24,0x0c120f,.35).setDepth(9);

  this.cameras.main.scrollY=260;
 }
 addObstacle(x,y,w,h){const z=this.obstacles.create(x,y,null).setVisible(false);z.body.setSize(w,h);z.refreshBody();return z}
 makeHud(){
  this.add.rectangle(360,52,700,84,0x080d0a,.82).setScrollFactor(0).setDepth(5000).setStrokeStyle(2,0xb79251,.7);
  this.levelText=this.add.text(28,22,"Gabriel · Nv.1",{fontFamily:"Georgia",fontSize:"17px",color:"#f4dfad"}).setScrollFactor(0).setDepth(5001);
  this.hpBar=this.add.rectangle(30,52,260,12,0x9e342e).setOrigin(0,.5).setScrollFactor(0).setDepth(5001);this.add.rectangle(30,72,205,9,0x326f9e).setOrigin(0,.5).setScrollFactor(0).setDepth(5001);this.xpText=this.add.text(275,67,"EXP 0/100",{fontFamily:"Georgia",fontSize:"11px",color:"#e7cf91"}).setScrollFactor(0).setDepth(5001);
  [["ui_tienda",430],["ui_inventario",500],["ui_habilidades",570],["ui_misiones",640]].forEach(a=>{const icon=this.add.image(a[1],52,a[0]).setDisplaySize(46,38).setScrollFactor(0).setDepth(5001).setInteractive();if(a[0]==="ui_inventario")icon.on("pointerdown",()=>this.toggleInventory());if(a[0]==="ui_tienda")icon.on("pointerdown",()=>this.toggleShop());});
  this.statsText=this.add.text(275,84,"ATQ 15 · DEF 2",{fontFamily:"Georgia",fontSize:"10px",color:"#d8c79c"}).setScrollFactor(0).setDepth(5001);this.invText=this.add.text(350,43,"Gel 0",{fontFamily:"Georgia",fontSize:"11px",color:"#9fe3ae"}).setScrollFactor(0).setDepth(5001);this.goldText=this.add.text(350,22,"Oro 0",{fontFamily:"Georgia",fontSize:"13px",color:"#f5d47a"}).setScrollFactor(0).setDepth(5001);this.add.image(640,145,"lumen_map").setDisplaySize(118,78).setScrollFactor(0).setDepth(5000).setAlpha(.95);
  this.questText=this.add.text(20,112,"EL INICIO DE UNA LEYENDA\nHabla con Aldric  0/1",{fontFamily:"Georgia",fontSize:"13px",color:"#f0dfb7",backgroundColor:"#080d0acc",padding:{x:9,y:7}}).setScrollFactor(0).setDepth(5001);
 }
 spawnOrcs(){
  this.orcs=this.physics.add.group();[[75,1420],[180,1650],[300,1510],[420,1710],[550,1570],[650,1430]].forEach(p=>{const e=this.orcs.create(p[0],p[1],"enemy_orc").setScale(.76).setDepth(p[1]);e.hp=165;e.maxHp=165;e.lastHit=0;e.hpBg=this.add.rectangle(p[0],p[1]-58,78,8,0x1b1512,.9).setDepth(p[1]+1);e.hpBar=this.add.rectangle(p[0]-38,p[1]-58,76,6,0xa82f29).setOrigin(0,.5).setDepth(p[1]+2);});
 }
 attackOrc(){
  if(!this.orcs)return false;let t=null,b=255;this.orcs.getChildren().forEach(e=>{if(e.active){const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,e.x,e.y);if(d<b){b=d;t=e}}});if(!t)return false;if(!this.attackReady)return true;this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);const crit=Phaser.Math.Between(1,100)<=12,dmg=Math.floor((this.attackPower+Phaser.Math.Between(2,7))*(crit?1.75:1));const a=this.add.image(this.player.x,this.player.y-18,"gabriel_attack_01").setDisplaySize(30,38).setDepth(9000);this.tweens.add({targets:a,x:t.x,y:t.y,duration:180,onComplete:()=>{a.destroy();if(!t.active)return;t.hp-=dmg;t.hpBar.width=76*Math.max(0,t.hp/t.maxHp);this.showCombatText(t.x,t.y-78,"-"+dmg,crit?"#ffe16b":"#ffd38a");if(t.hp<=0){const rx=t.x,ry=t.y;t.disableBody(true,true);t.hpBg.destroy();t.hpBar.destroy();this.respawnOrc(rx,ry);if(this.orcsKilled<6)this.orcsKilled++;this.gainXp(120);this.gold+=Phaser.Math.Between(28,42);this.goldText?.setText("Oro "+this.gold);if(Phaser.Math.Between(1,100)<=42)this.spawnGearDrop(rx,ry);this.questText.setText("LA AMENAZA ORCA\nDerrota Orcos  "+this.orcsKilled+"/6"+(this.orcsKilled>=6?" ✓":""));if(this.orcsKilled===6)this.showDialogue("La avanzada orca ha sido destruida. Regresa con Aldric.");}}});return true;
 }
 respawnOrc(x,y){this.time.delayedCall(12500,()=>{if(!this.orcs)return;const e=this.orcs.create(x,y,"enemy_orc").setScale(.76).setDepth(y);e.hp=165;e.maxHp=165;e.lastHit=0;e.hpBg=this.add.rectangle(x,y-58,78,8,0x1b1512,.9).setDepth(y+1);e.hpBar=this.add.rectangle(x-38,y-58,76,6,0xa82f29).setOrigin(0,.5).setDepth(y+2);});}
 spawnSkeletons(){
  this.skeletons=this.physics.add.group();[[80,1435],[205,1580],[355,1495],[505,1690],[635,1450]].forEach(p=>{const e=this.skeletons.create(p[0],p[1],"enemy_skeleton").setScale(.72).setDepth(p[1]);e.hp=115;e.maxHp=115;e.lastHit=0;e.hpBg=this.add.rectangle(p[0],p[1]-54,72,7,0x1b1512,.85).setDepth(p[1]+1);e.hpBar=this.add.rectangle(p[0]-35,p[1]-54,70,5,0xb63c35).setOrigin(0,.5).setDepth(p[1]+2);});
 }
 attackSkeleton(){
  if(!this.skeletons)return false;let t=null,b=245;this.skeletons.getChildren().forEach(e=>{if(e.active){const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,e.x,e.y);if(d<b){b=d;t=e}}});if(!t)return false;if(!this.attackReady)return true;this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);const crit=Phaser.Math.Between(1,100)<=12,dmg=Math.floor((this.attackPower+Phaser.Math.Between(1,6))*(crit?1.75:1));const a=this.add.image(this.player.x,this.player.y-18,"gabriel_attack_01").setDisplaySize(30,38).setDepth(9000);this.tweens.add({targets:a,x:t.x,y:t.y,duration:180,onComplete:()=>{a.destroy();if(!t.active)return;t.hp-=dmg;t.hpBar.width=70*Math.max(0,t.hp/t.maxHp);this.showCombatText(t.x,t.y-74,"-"+dmg,crit?"#ffe16b":"#ffd38a");if(t.hp<=0){const rx=t.x,ry=t.y;t.disableBody(true,true);t.hpBg.destroy();t.hpBar.destroy();this.respawnSkeleton(rx,ry);if(this.skeletonsKilled<5)this.skeletonsKilled++;this.gainXp(85);this.gold+=Phaser.Math.Between(18,28);this.goldText?.setText("Oro "+this.gold);if(Phaser.Math.Between(1,100)<=35)this.spawnGearDrop(rx,ry);this.questText.setText("LOS MUERTOS CAMINAN\nDerrota Esqueletos  "+this.skeletonsKilled+"/5"+(this.skeletonsKilled>=5?" ✓":""));if(this.skeletonsKilled===5)this.showDialogue("La energía oscura se debilita. Regresa con Aldric.");}}});return true;
 }
 respawnSkeleton(x,y){this.time.delayedCall(10000,()=>{if(!this.skeletons)return;const e=this.skeletons.create(x,y,"enemy_skeleton").setScale(.72).setDepth(y);e.hp=115;e.maxHp=115;e.lastHit=0;e.hpBg=this.add.rectangle(x,y-54,72,7,0x1b1512,.85).setDepth(y+1);e.hpBar=this.add.rectangle(x-35,y-54,70,5,0xb63c35).setOrigin(0,.5).setDepth(y+2);});}
 spawnGoblins(){
  this.goblins=this.physics.add.group();[[95,1450],[240,1680],[475,1605],[625,1470]].forEach(p=>{const g=this.goblins.create(p[0],p[1],"enemy_goblin").setScale(.7).setDepth(p[1]);g.hp=80;g.maxHp=80;g.lastHit=0;g.hpBg=this.add.rectangle(p[0],p[1]-52,68,7,0x1b1512,.85).setDepth(p[1]+1);g.hpBar=this.add.rectangle(p[0]-33,p[1]-52,66,5,0xb63c35).setOrigin(0,.5).setDepth(p[1]+2);});
 }
 attackGoblin(){
  if(!this.goblins)return false;let t=null,b=235;this.goblins.getChildren().forEach(g=>{if(g.active){const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,g.x,g.y);if(d<b){b=d;t=g}}});if(!t)return false;if(!this.attackReady)return true;
  this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);const crit=Phaser.Math.Between(1,100)<=12,dmg=Math.floor((this.attackPower+Phaser.Math.Between(0,5))*(crit?1.75:1));const a=this.add.image(this.player.x,this.player.y-18,"gabriel_attack_01").setDisplaySize(30,38).setDepth(9000);
  this.tweens.add({targets:a,x:t.x,y:t.y,duration:180,onComplete:()=>{a.destroy();if(!t.active)return;t.hp-=dmg;t.hpBar.width=66*Math.max(0,t.hp/t.maxHp);this.showCombatText(t.x,t.y-72,"-"+dmg,crit?"#ffe16b":"#ffd38a");if(t.hp<=0){const rx=t.x,ry=t.y;t.disableBody(true,true);t.hpBg.destroy();t.hpBar.destroy();this.respawnEnemy("goblin",rx,ry,8500);if(this.goblinsKilled<4)this.goblinsKilled++;this.gainXp(60);this.gold+=Phaser.Math.Between(12,20);this.goldText?.setText("Oro "+this.gold);if(Phaser.Math.Between(1,100)<=28)this.spawnGearDrop(t.x,t.y);this.questText.setText("SAQUEADORES VERDES\nDerrota Goblins  "+Math.min(4,this.goblinsKilled)+"/4"+(this.goblinsKilled>=4?" ✓":""));if(this.goblinsKilled===4)this.showDialogue("Los saqueadores han caído. Regresa con Aldric.");}}});return true;
 }
 spawnWolves(){
  this.wolves=this.physics.add.group();[[120,1510],[355,1640],[590,1535]].forEach(p=>{const w=this.wolves.create(p[0],p[1],"enemy_wolf").setScale(.72).setDepth(p[1]);w.hp=55;w.maxHp=55;w.lastHit=0;w.hpBg=this.add.rectangle(p[0],p[1]-50,64,7,0x1b1512,.85).setDepth(p[1]+1);w.hpBar=this.add.rectangle(p[0]-31,p[1]-50,62,5,0xb63c35).setOrigin(0,.5).setDepth(p[1]+2);});
 }
 attackWolf(){
  if(!this.wolves)return false;let t=null,b=225;this.wolves.getChildren().forEach(w=>{if(w.active){const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,w.x,w.y);if(d<b){b=d;t=w}}});if(!t)return false;
  if(!this.attackReady)return true;this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);const crit=Phaser.Math.Between(1,100)<=12,dmg=Math.floor((this.attackPower+Phaser.Math.Between(0,5))*(crit?1.75:1));this.fireArrowWolf(t,dmg);return true;
 }
 fireArrowWolf(t,dmg){const a=this.add.image(this.player.x,this.player.y-18,"gabriel_attack_01").setDisplaySize(30,38).setDepth(9000);this.tweens.add({targets:a,x:t.x,y:t.y,duration:180,onComplete:()=>{a.destroy();if(!t.active)return;t.hp-=dmg;t.hpBar.width=62*Math.max(0,t.hp/t.maxHp);this.showCombatText(t.x,t.y-70,"-"+dmg,"#ffd38a");if(t.hp<=0){const rx=t.x,ry=t.y;t.disableBody(true,true);t.hpBg.destroy();t.hpBar.destroy();this.respawnEnemy("wolf",rx,ry,7000);if(this.wolvesKilled<3)this.wolvesKilled++;this.gainXp(40);this.gold+=Phaser.Math.Between(8,14);this.goldText?.setText("Oro "+this.gold);this.questText.setText("PELIGRO EN EL BOSQUE\nDerrota Lobos  "+Math.min(3,this.wolvesKilled)+"/3"+(this.wolvesKilled>=3?" ✓":""));if(this.wolvesKilled===3)this.showDialogue("Objetivo cumplido. Regresa con Aldric.");}}});}
 respawnEnemy(kind,x,y,delay=6500){
  this.time.delayedCall(delay,()=>{
   if(kind==="slime"&&this.slimes){const s=this.slimes.create(x,y,"enemy_slime").setScale(.72).setDepth(y);s.hp=30;s.maxHp=30;s.homeX=x;s.homeY=y;s.lastHit=0;s.setImmovable(false);s.hpBg=this.add.rectangle(x,y-48,58,7,0x1b1512,.85).setDepth(y+1);s.hpBar=this.add.rectangle(x-28,y-48,56,5,0xb63c35,1).setOrigin(0,.5).setDepth(y+2);}
   if(kind==="wolf"&&this.wolves){const w=this.wolves.create(x,y,"enemy_wolf").setScale(.72).setDepth(y);w.hp=55;w.maxHp=55;w.lastHit=0;w.hpBg=this.add.rectangle(x,y-50,64,7,0x1b1512,.85).setDepth(y+1);w.hpBar=this.add.rectangle(x-31,y-50,62,5,0xb63c35).setOrigin(0,.5).setDepth(y+2);}
   if(kind==="goblin"&&this.goblins){const g=this.goblins.create(x,y,"enemy_goblin").setScale(.7).setDepth(y);g.hp=80;g.maxHp=80;g.lastHit=0;g.hpBg=this.add.rectangle(x,y-52,68,7,0x1b1512,.85).setDepth(y+1);g.hpBar=this.add.rectangle(x-33,y-52,66,5,0xb63c35).setOrigin(0,.5).setDepth(y+2);}
  });
 }
 spawnSlimes(){
  this.slimes=this.physics.add.group();
  [[170,1480],[365,1560],[555,1460]].forEach((p,i)=>{
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
 showCombatText(x,y,msg,color="#ffffff"){const t=this.add.text(x,y,msg,{fontFamily:"Georgia",fontSize:"15px",color,stroke:"#201008",strokeThickness:3}).setOrigin(.5).setDepth(9000);this.tweens.add({targets:t,y:y-24,alpha:0,duration:700,onComplete:()=>t.destroy()});}
 damageSlime(target,dmg){
  target.hp-=dmg;this.tweens.add({targets:target,alpha:.35,duration:80,yoyo:true});target.hpBar.width=56*Math.max(0,target.hp/target.maxHp);
  const hit=this.add.text(target.x,target.y-72,"-"+dmg,{fontFamily:"Georgia",fontSize:"18px",color:"#ffd38a",stroke:"#401510",strokeThickness:3}).setOrigin(.5).setDepth(8000);
  this.tweens.add({targets:hit,y:hit.y-28,alpha:0,duration:650,onComplete:()=>hit.destroy()});if(target.hp<=0)this.killSlime(target);
 }
 attackNearest(){if(this.fifthQuest&&this.attackOrc())return;if(this.fourthQuest&&this.attackSkeleton())return;if(this.thirdQuest&&this.attackGoblin())return;if(this.secondQuest&&this.attackWolf())return;
  if(!this.slimes)return;let target=null,best=210;
  this.slimes.getChildren().forEach(s=>{if(!s.active)return;const d=Phaser.Math.Distance.Between(this.player.x,this.player.y,s.x,s.y);if(d<best){best=d;target=s}});
  if(!target){this.showDialogue("No hay enemigos dentro del alcance.");return}
  if(!this.attackReady)return;this.attackReady=false;this.time.delayedCall(480,()=>this.attackReady=true);
  const crit=Phaser.Math.Between(1,100)<=12;const dmg=Math.floor((this.attackPower+Phaser.Math.Between(0,5))*(crit?1.75:1));this.fireArrow(target,dmg);if(crit)this.showCombatText(target.x,target.y-88,"¡CRÍTICO!","#ffe16b");
 }
 killSlime(s){
  s.disableBody(true,true);s.hpBg.destroy();s.hpBar.destroy();if(this.slimesKilled<3)this.slimesKilled++;this.gainXp(25);this.gold+=Phaser.Math.Between(4,9);if(Phaser.Math.Between(1,100)<=65){this.spawnLootDrop(s.x,s.y);if(Phaser.Math.Between(1,100)<=18)this.spawnGearDrop(s.x+18,s.y);}
  this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();
  if(this.slimeQuest){this.questText.setText("PRIMERA CACERÍA\\nDerrota Slimes  "+Math.min(this.slimesKilled,3)+"/3"+(this.slimesKilled>=3?" ✓":""));if(this.slimesKilled===3){this.showDialogue("Misión completada: Primera Cacería. Regresa con Aldric.");this.questText.setText("PRIMERA CACERÍA\nRegresa con Aldric");}}
 }
 gainXp(amount){
  this.xp+=amount;
  while(this.xp>=this.xpNeed){this.xp-=this.xpNeed;this.level++;this.xpNeed=Math.floor(this.xpNeed*1.35);this.maxHp+=15;this.playerHp=this.maxHp;this.hpBar.width=260;this.levelText?.setText("Gabriel · Nv."+this.level);this.showDialogue("¡Nivel "+this.level+" alcanzado! HP máximo +15");}
  this.xpText?.setText("EXP "+this.xp+"/"+this.xpNeed);
 }
 rollGear(){
  const r=Phaser.Math.Between(1,100),rarity=r<=2?"Legendario":r<=8?"Épico":r<=23?"Raro":r<=48?"Poco común":"Común";
  const mult={"Común":1,"Poco común":1.25,"Raro":1.6,"Épico":2.05,"Legendario":2.7}[rarity];
  const weapon=Phaser.Math.Between(0,1)===0;
  return weapon?{id:"bow_"+Date.now()+Math.random(),name:rarity==="Común"?"Arco de Cazador":"Arco "+rarity+" de Lumen",type:"Arma",rarity,icon:"🏹",attack:Math.round(17*mult),equipped:false}:{id:"armor_"+Date.now()+Math.random(),name:rarity==="Común"?"Armadura de Cazador":"Armadura "+rarity+" de Lumen",type:"Armadura",rarity,icon:"🛡️",defense:Math.round(3*mult),equipped:false};
 }
 spawnGearDrop(x,y){
  const item=this.rollGear(),drop=this.add.text(x,y-10,item.icon,{fontSize:"25px",stroke:"#111",strokeThickness:4}).setOrigin(.5).setDepth(y+10).setInteractive();
  drop.setTint(this.rarityColor(item.rarity));this.tweens.add({targets:drop,y:y-24,duration:550,yoyo:true,repeat:-1});
  const collect=()=>{if(!drop.active)return;if(this.getInventoryUsed()>=this.inventorySlots){this.showDialogue("Inventario lleno. Necesitas desbloquear otro espacio.");return}this.inventoryItems.push(item);this.gearDrops++;this.showCombatText(drop.x,drop.y-25,item.rarity+" · "+item.name,this.rarityCss(item.rarity));drop.destroy();this.updateInventoryHud();};
  drop.on("pointerdown",collect);this.time.addEvent({delay:300,repeat:32,callback:()=>{if(drop.active&&Phaser.Math.Distance.Between(this.player.x,this.player.y,drop.x,drop.y)<55)collect()}});this.time.delayedCall(12000,()=>{if(drop.active)drop.destroy()});
 }
 rarityCss(r){return {"Común":"#d0d0d0","Poco común":"#72d98a","Raro":"#6faaf2","Épico":"#bd7df2","Legendario":"#ffc653"}[r]||"#ffffff";}
 spawnLootDrop(x,y){
  const drop=this.physics.add.image(x,y,"loot_gel").setDisplaySize(28,28).setDepth(y+5).setInteractive();
  this.tweens.add({targets:drop,y:y-10,duration:500,yoyo:true,repeat:-1});
  const collect=()=>{if(!drop.active)return;this.inventory.slimeGel++;this.spawnLootText(drop.x,drop.y,"Gel de Slime +1");drop.destroy();this.updateInventoryHud();};
  drop.on("pointerdown",collect);
  this.time.addEvent({delay:250,repeat:39,callback:()=>{if(drop.active&&Phaser.Math.Distance.Between(this.player.x,this.player.y,drop.x,drop.y)<55)collect()}});
  this.time.delayedCall(10000,()=>{if(drop.active)drop.destroy()});
 }
 spawnLootText(x,y,msg){const t=this.add.text(x,y-30,msg,{fontFamily:"Georgia",fontSize:"13px",color:"#8ff0a4",stroke:"#102014",strokeThickness:3}).setOrigin(.5).setDepth(8500);this.tweens.add({targets:t,y:y-70,alpha:0,duration:1200,onComplete:()=>t.destroy()});}
 updateInventoryHud(){this.syncInventoryItems();this.invText?.setText("Gel "+this.inventory.slimeGel);this.inventoryDetail?.setText("MATERIALES\\nGel de Slime: "+this.inventory.slimeGel+"\\n\\nCONSUMIBLES\\nPoción menor: "+this.potions);const used=this.getInventoryUsed();this.slotText?.setText("Mochila: "+used+" / "+this.inventorySlots+" espacios");this.slotPriceText?.setText(this.inventorySlots>=this.maxInventorySlots?"Mochila al máximo":"Siguiente espacio: "+this.getNextSlotPrice()+" Oro");}
 seedInventory(){
  this.inventoryItems=[
   {id:"bow1",name:"Arco del Aprendiz",type:"Arma",rarity:"Común",icon:"🏹",attack:15,equipped:true},
   {id:"armor1",name:"Cuero de Lumen",type:"Armadura",rarity:"Común",icon:"🛡️",defense:2,equipped:true},
   {id:"potion",name:"Poción menor",type:"Consumible",rarity:"Común",icon:"🧪",qty:this.potions},
   {id:"gel",name:"Gel de Slime",type:"Material",rarity:"Común",icon:"🟢",qty:this.inventory.slimeGel}
  ];this.renderSlots();
 }
 saveProgress(){
  try{localStorage.setItem(this.saveKey,JSON.stringify({level:this.level,xp:this.xp,xpNeed:this.xpNeed,gold:this.gold,playerHp:this.playerHp,maxHp:this.maxHp,potions:this.potions,inventorySlots:this.inventorySlots,slimeGel:this.inventory.slimeGel,questDone:this.questDone,questRewardClaimed:this.questRewardClaimed,secondQuest:this.secondQuest,secondRewardClaimed:this.secondRewardClaimed,wolvesKilled:this.wolvesKilled,thirdQuest:this.thirdQuest,thirdRewardClaimed:this.thirdRewardClaimed,goblinsKilled:this.goblinsKilled,fourthQuest:this.fourthQuest,fourthRewardClaimed:this.fourthRewardClaimed,skeletonsKilled:this.skeletonsKilled,fifthQuest:this.fifthQuest,orcsKilled:this.orcsKilled,items:this.inventoryItems.filter(i=>!["potion","gel"].includes(i.id))}));}catch(e){}
 }
 loadProgress(){
  try{const d=JSON.parse(localStorage.getItem(this.saveKey)||"null");if(!d)return;["level","xp","xpNeed","gold","playerHp","maxHp","potions","inventorySlots","questDone","questRewardClaimed","secondQuest","secondRewardClaimed","wolvesKilled","thirdQuest","thirdRewardClaimed","goblinsKilled","fourthQuest","fourthRewardClaimed","skeletonsKilled","fifthQuest","orcsKilled"].forEach(k=>{if(d[k]!==undefined)this[k]=d[k]});if(d.slimeGel!==undefined)this.inventory.slimeGel=d.slimeGel;if(Array.isArray(d.items)){const basics=this.inventoryItems.filter(i=>["potion","gel"].includes(i.id));this.inventoryItems=[...d.items,...basics];}
   const w=this.inventoryItems.find(i=>i.type==="Arma"&&i.equipped),a=this.inventoryItems.find(i=>i.type==="Armadura"&&i.equipped);this.attackPower=w?.attack||15;this.defense=a?.defense||2;
   this.levelText?.setText("Gabriel · Nv."+this.level);this.xpText?.setText("EXP "+this.xp+"/"+this.xpNeed);this.goldText?.setText("Oro "+this.gold);this.hpBar.width=260*this.playerHp/this.maxHp;this.statsText?.setText("ATQ "+this.attackPower+" · DEF "+this.defense);this.updateInventoryHud();this.renderSlots();this.restoreQuestState();
  }catch(e){}
 }
 restoreQuestState(){
  if(this.fifthQuest){this.questText.setText("LA AMENAZA ORCA\\nDerrota Orcos  "+Math.min(6,this.orcsKilled)+"/6");this.spawnOrcs();this.questMarker?.setText("…");}
  else if(this.fourthQuest){this.questText.setText("LOS MUERTOS CAMINAN\\nDerrota Esqueletos  "+Math.min(5,this.skeletonsKilled)+"/5");this.spawnSkeletons();this.questMarker?.setText("…");}
  else if(this.thirdQuest){this.questText.setText("SAQUEADORES VERDES\nDerrota Goblins  "+Math.min(4,this.goblinsKilled)+"/4");this.spawnGoblins();this.questMarker?.setText("…");}
  else if(this.secondQuest){this.questText.setText("PELIGRO EN EL BOSQUE\nDerrota Lobos  "+Math.min(3,this.wolvesKilled)+"/3");this.spawnWolves();this.questMarker?.setText("…");}
  else if(this.questDone){this.questText.setText("PRIMERA CACERÍA\nDerrota Slimes  "+Math.min(3,this.slimesKilled)+"/3");this.questMarker?.setText("…");}
 }
 handlePlayerDeath(){
  if(this.respawnProtection)return;this.deathCount++;this.playerHp=this.maxHp;this.hpBar.width=260;this.player.setVelocity(0);this.player.setPosition(360,1180);this.respawnProtection=true;this.player.setAlpha(.55);
  this.showDialogue("Has caído. Los guardias te han llevado a la Puerta Sur de Lumen.");
  this.time.delayedCall(3000,()=>{this.respawnProtection=false;this.player.setAlpha(1);});
 }
 makeZoneHud(){
  this.zoneHud=this.add.container(360,112).setScrollFactor(0).setDepth(6100);
  const bg=this.add.rectangle(0,0,250,32,0x101510,.78).setStrokeStyle(1,0x88754c,.8);
  this.zoneHudText=this.add.text(0,0,"🏰 Lumen · Zona segura",{fontFamily:"Georgia",fontSize:"12px",color:"#e9ddb9"}).setOrigin(.5);
  this.zoneHud.add([bg,this.zoneHudText]);
 }
 updateZoneState(){
  const hunt=this.player.y>1260;if(hunt===this.inHuntZone)return;this.inHuntZone=hunt;this.safeZone=!hunt;this.zoneName=hunt?"Praderas de Lumen":"Lumen";
  this.zoneHudText?.setText(hunt?"⚔ Praderas de Lumen · Cacería":"🏰 Lumen · Zona segura");
  this.showDialogue(hunt?"Has salido de las murallas. Los monstruos pueden atacarte.":"Has regresado a Lumen. Los enemigos no pueden atacarte aquí.");
 }
 makeShop(){
  this.shopPanel=this.add.container(360,620).setScrollFactor(0).setDepth(9600).setVisible(false);
  const bg=this.add.rectangle(0,0,610,700,0x0b100d,.98).setStrokeStyle(3,0xb89552,.9);
  const title=this.add.text(-270,-315,"TIENDA DE MIRA",{fontFamily:"Georgia",fontSize:"23px",color:"#f1d79a"});
  const close=this.add.text(255,-315,"✕",{fontSize:"24px",color:"#fff"}).setInteractive();
  const info=this.add.text(-250,-260,"Suministros de Lumen",{fontFamily:"Georgia",fontSize:"15px",color:"#cdbb91"});
  const potionBtn=this.add.rectangle(0,-160,440,72,0x304b38,.96).setStrokeStyle(2,0x83b68c).setInteractive();
  const potionTxt=this.add.text(-190,-177,"🧪 Poción menor",{fontFamily:"Georgia",fontSize:"17px",color:"#e9f1df"});
  const potionPrice=this.add.text(190,-177,"25 Oro",{fontFamily:"Georgia",fontSize:"15px",color:"#f2cf78"}).setOrigin(1,0);
  const desc=this.add.text(-190,-150,"Restaura 35 HP",{fontFamily:"Georgia",fontSize:"12px",color:"#aebcae"});
  potionBtn.on("pointerdown",()=>this.buyPotion());
  const bag=this.add.rectangle(0,-60,440,72,0x5b4729,.96).setStrokeStyle(2,0xc2a05b).setInteractive();
  const bagTxt=this.add.text(-190,-77,"🎒 Ampliar mochila +1",{fontFamily:"Georgia",fontSize:"17px",color:"#f5e6bb"});
  this.shopBagPrice=this.add.text(190,-77,this.getNextSlotPrice()+" Oro",{fontFamily:"Georgia",fontSize:"15px",color:"#f2cf78"}).setOrigin(1,0);
  bag.on("pointerdown",()=>{this.buyInventorySlot();this.shopBagPrice.setText(this.inventorySlots>=this.maxInventorySlots?"MAX":this.getNextSlotPrice()+" Oro")});
  close.on("pointerdown",()=>this.toggleShop(false));
  this.shopPanel.add([bg,title,close,info,potionBtn,potionTxt,potionPrice,desc,bag,bagTxt,this.shopBagPrice]);
 }
 toggleShop(force){this.shopOpen=force??!this.shopOpen;this.shopPanel.setVisible(this.shopOpen);}
 buyPotion(){if(this.gold<25){this.showDialogue("Necesitas 25 Oro para comprar una Poción menor.");return}if(this.getInventoryUsed()>=this.inventorySlots&&this.potions===0){this.showDialogue("Inventario lleno.");return}this.gold-=25;this.potions++;this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();this.showDialogue("Compraste una Poción menor.");this.saveProgress();}
 makeInventory(){
  this.inventoryPanel=this.add.container(360,620).setScrollFactor(0).setDepth(9500).setVisible(false);
  const bg=this.add.rectangle(0,0,610,700,0x0b100d,.97).setStrokeStyle(3,0xb89552,.9);
  const title=this.add.text(-270,-315,"INVENTARIO",{fontFamily:"Georgia",fontSize:"24px",color:"#f1d79a"});
  const close=this.add.text(255,-315,"✕",{fontSize:"24px",color:"#ffffff"}).setInteractive();
  const eq=this.add.text(-255,-255,"EQUIPO\n🏹 Arco del Aprendiz  +15 ATQ\n🛡 Cuero de Lumen  +2 DEF",{fontFamily:"Georgia",fontSize:"17px",color:"#e7d6ad",lineSpacing:12});
  this.inventoryDetail=this.add.text(-255,-120,"MATERIALES\nGel de Slime: 0\n\nCONSUMIBLES\nPoción menor: 1",{fontFamily:"Georgia",fontSize:"17px",color:"#b9e5c2",lineSpacing:12});
  this.slotText=this.add.text(-255,40,"Mochila: 0 / 20 espacios",{fontFamily:"Georgia",fontSize:"17px",color:"#f0d38b"});
  this.slotPriceText=this.add.text(-255,78,"Siguiente espacio: 100 Oro",{fontFamily:"Georgia",fontSize:"14px",color:"#d8c79c"});
  const unlock=this.add.rectangle(0,125,330,52,0x604b28,.95).setStrokeStyle(2,0xc9a85f).setInteractive();
  const unlockText=this.add.text(0,125,"Desbloquear +1 espacio",{fontFamily:"Georgia",fontSize:"16px",color:"#fff0c2"}).setOrigin(.5);
  unlock.on("pointerdown",()=>this.buyInventorySlot());
  const potion=this.add.rectangle(0,205,330,60,0x31533c,.95).setStrokeStyle(2,0x91c99e).setInteractive();
  const potionText=this.add.text(0,205,"Usar Poción (+35 HP)",{fontFamily:"Georgia",fontSize:"17px",color:"#f2e8c9"}).setOrigin(.5);
  potion.on("pointerdown",()=>this.usePotion());close.on("pointerdown",()=>this.toggleInventory(false));
  this.slotLayer=this.add.container(-255,270);this.inventoryPanel.add([bg,title,close,eq,this.inventoryDetail,this.slotText,this.slotPriceText,unlock,unlockText,potion,potionText,this.slotLayer]);this.updateInventoryHud();
  this.input.keyboard?.on("keydown-I",()=>this.toggleInventory());
 }
 renderSlots(){
  if(!this.slotLayer)return;this.slotLayer.removeAll(true);const cols=5,size=48,gap=7;
  for(let i=0;i<this.inventorySlots;i++){const x=(i%cols)*(size+gap),y=Math.floor(i/cols)*(size+gap);const box=this.add.rectangle(x,y,size,size,0x182019,.96).setStrokeStyle(1,i<20?0x776544:0x9b7b3d,.9).setOrigin(0);
   const item=this.inventoryItems?.[i];this.slotLayer.add(box);if(item){box.setInteractive();box.on("pointerdown",()=>this.inspectItem(item));const t=this.add.text(x+size/2,y+size/2,item.icon,{fontSize:"22px"}).setOrigin(.5);this.slotLayer.add(t);if(item.qty>1){const q=this.add.text(x+size-4,y+size-4,String(item.qty),{fontSize:"11px",color:"#ffffff",stroke:"#000000",strokeThickness:3}).setOrigin(1);this.slotLayer.add(q);}}
  }
 }
 inspectItem(item){
  const stat=item.attack?"ATQ +"+item.attack:item.defense?"DEF +"+item.defense:item.type;
  this.itemInfo?.destroy();this.itemInfo=this.add.container(0,-25).setDepth(9700);
  const bg=this.add.rectangle(0,0,430,190,0x101711,.98).setStrokeStyle(2,this.rarityColor(item.rarity));
  const tx=this.add.text(-190,-70,item.icon+"  "+item.name+"\n"+item.rarity+" · "+item.type+"\n"+stat,{fontFamily:"Georgia",fontSize:"16px",color:"#f4e4b9",lineSpacing:8});
  const action=this.add.rectangle(-80,62,190,42,0x4f6038,.95).setStrokeStyle(1,0xd1b66c).setInteractive();
  const sell=this.add.rectangle(135,62,150,42,0x5b3928,.95).setStrokeStyle(1,0xc18b5b).setInteractive();
  const at=this.add.text(-80,62,item.type==="Arma"||item.type==="Armadura"?(item.equipped?"Equipado":"Equipar"):"Cerrar",{fontFamily:"Georgia",fontSize:"15px",color:"#fff1c4"}).setOrigin(.5);
  const sellPrice=this.itemSellPrice(item);const st=this.add.text(135,62,"Vender "+sellPrice+" Oro",{fontFamily:"Georgia",fontSize:"13px",color:"#ffe0ad"}).setOrigin(.5);
  action.on("pointerdown",()=>{if((item.type==="Arma"||item.type==="Armadura")&&!item.equipped)this.equipItem(item);this.itemInfo.destroy();this.itemInfo=null});
  sell.on("pointerdown",()=>this.sellItem(item));
  this.itemInfo.add([bg,tx,action,at,sell,st]);this.inventoryPanel.add(this.itemInfo);
 }
 itemSellPrice(item){if(item.equipped)return 0;const base=item.type==="Arma"?35:item.type==="Armadura"?30:item.type==="Material"?3:8;const m={"Común":1,"Poco común":2,"Raro":5,"Épico":12,"Legendario":30}[item.rarity]||1;return Math.floor(base*m);}
 sellItem(item){
  if(item.equipped){this.showDialogue("No puedes vender un objeto equipado.");return}
  const price=this.itemSellPrice(item);if(price<=0)return;
  if(item.id==="gel"){if(this.inventory.slimeGel<=0)return;this.inventory.slimeGel--;item.qty=this.inventory.slimeGel;}
  else if(item.id==="potion"){if(this.potions<=0)return;this.potions--;item.qty=this.potions;}
  else {const i=this.inventoryItems.indexOf(item);if(i>=0)this.inventoryItems.splice(i,1);}
  this.gold+=price;this.goldText?.setText("Oro "+this.gold);this.itemInfo?.destroy();this.itemInfo=null;this.updateInventoryHud();this.showDialogue("Objeto vendido por "+price+" Oro.");this.saveProgress();
 }
 rarityColor(r){return {"Común":0x9b9b9b,"Poco común":0x5bbd72,"Raro":0x5597e6,"Épico":0xa56be8,"Legendario":0xe8a83c}[r]||0x9b9b9b;}
 equipItem(item){
  this.inventoryItems.forEach(i=>{if(i.type===item.type)i.equipped=false});item.equipped=true;
  const w=this.inventoryItems.find(i=>i.type==="Arma"&&i.equipped),a=this.inventoryItems.find(i=>i.type==="Armadura"&&i.equipped);
  this.attackPower=w?.attack||0;this.defense=a?.defense||0;this.statsText?.setText("ATQ "+this.attackPower+" · DEF "+this.defense);this.renderSlots();
 }
 syncInventoryItems(){if(!this.inventoryItems?.length)return;const p=this.inventoryItems.find(i=>i.id==="potion"),g=this.inventoryItems.find(i=>i.id==="gel");if(p)p.qty=this.potions;if(g)g.qty=this.inventory.slimeGel;this.renderSlots();}
 getInventoryUsed(){return this.inventoryItems.filter(i=>i.id!=="potion"&&i.id!=="gel").length+(this.potions>0?1:0)+(this.inventory.slimeGel>0?1:0);}
 getNextSlotPrice(){const unlocked=this.inventorySlots-20;return Math.floor(this.baseSlotPrice*Math.pow(1.18,unlocked));}
 buyInventorySlot(){
  if(this.inventorySlots>=this.maxInventorySlots){this.showDialogue("Tu mochila ya alcanzó el máximo de "+this.maxInventorySlots+" espacios.");return}
  const price=this.getNextSlotPrice();if(this.gold<price){this.showDialogue("Necesitas "+price+" Oro para desbloquear el siguiente espacio.");return}
  this.gold-=price;this.inventorySlots++;this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();this.renderSlots();this.showDialogue("Espacio desbloqueado. Tu mochila ahora tiene "+this.inventorySlots+" espacios.");this.saveProgress();
 }
 toggleInventory(force){this.inventoryOpen=force??!this.inventoryOpen;this.inventoryPanel.setVisible(this.inventoryOpen);}
 usePotion(){if(this.potions<=0||this.playerHp>=this.maxHp)return;this.potions--;this.playerHp=Math.min(this.maxHp,this.playerHp+35);this.hpBar.width=260*this.playerHp/this.maxHp;this.updateInventoryHud();this.showDialogue("Has usado una Poción menor. +35 HP");}
 makeInteractButton(){
  this.interactBtn=this.add.circle(500,1180,34,0x6a552b,.88).setStrokeStyle(3,0xe1c77d,.85).setScrollFactor(0).setDepth(6000).setInteractive();
  this.add.text(500,1180,"💬",{fontSize:"23px"}).setOrigin(.5).setScrollFactor(0).setDepth(6001);
  this.interactBtn.on("pointerdown",()=>this.tryInteract());
 }
 tryInteract(){
  const a=this.npcTargets[0],d=Phaser.Math.Distance.Between(this.player.x,this.player.y,a.x,a.y);
  if(d>115){this.showDialogue("Acércate a Aldric para hablar con él.");return}
  if(this.questDone&&this.slimesKilled>=3&&!this.questRewardClaimed){
   this.questRewardClaimed=true;this.gold+=75;this.potions+=2;this.gainXp(50);this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();
   this.questText.setText("PRIMERA CACERÍA  ✓\nRecompensa recibida");
   this.showDialogue("Aldric: Buen trabajo, Gabriel. Recompensa: 75 Oro, 50 EXP y 2 Pociones.");
   return;
  }
  if(this.fourthQuest&&this.skeletonsKilled>=5&&!this.fourthRewardClaimed){
   this.fourthRewardClaimed=true;this.gold+=260;this.gainXp(220);this.potions+=3;this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();this.questText.setText("LOS MUERTOS CAMINAN  ✓\nRecompensa recibida");this.showDialogue("Aldric: Has limpiado las ruinas. Recompensa: 260 Oro, 220 EXP y 3 Pociones.");this.time.delayedCall(4300,()=>this.questMarker?.setText("!"));this.saveProgress();return;
  }
  if(this.fourthRewardClaimed&&!this.fifthQuest){
   this.fifthQuest=true;this.questMarker?.setText("…");this.questText.setText("LA AMENAZA ORCA\nDerrota Orcos  0/6");this.spawnOrcs();this.showDialogue("Aldric: Una avanzada orca cruza las praderas. Derrota 6 Orcos antes de que alcancen las murallas.");this.saveProgress();return;
  }
  if(this.thirdQuest&&this.goblinsKilled>=4&&!this.thirdRewardClaimed){
   this.thirdRewardClaimed=true;this.gold+=180;this.gainXp(140);this.potions+=2;this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();this.questText.setText("SAQUEADORES VERDES  ✓\nRecompensa recibida");this.showDialogue("Aldric: Las caravanas vuelven a estar seguras. Recompensa: 180 Oro, 140 EXP y 2 Pociones.");this.time.delayedCall(4300,()=>this.questMarker?.setText("!"));this.saveProgress();return;
  }
  if(this.thirdRewardClaimed&&!this.fourthQuest){
   this.fourthQuest=true;this.questMarker?.setText("…");this.questText.setText("LOS MUERTOS CAMINAN\nDerrota Esqueletos  0/5");this.spawnSkeletons();this.showDialogue("Aldric: Algo oscuro despierta en las ruinas del sur. Destruye 5 Esqueletos y descubre qué ocurre.");this.saveProgress();return;
  }
  if(this.secondQuest&&this.wolvesKilled>=3&&!this.secondRewardClaimed){
   this.secondRewardClaimed=true;this.gold+=120;this.gainXp(90);this.potions+=2;this.goldText?.setText("Oro "+this.gold);this.updateInventoryHud();this.questText.setText("PELIGRO EN EL BOSQUE  ✓\nRecompensa recibida");this.showDialogue("Aldric: Lumen está más segura. Recompensa: 120 Oro, 90 EXP y 2 Pociones.");this.time.delayedCall(4300,()=>this.questMarker?.setText("!"));return;
  }
  if(this.secondRewardClaimed&&!this.thirdQuest){
   this.thirdQuest=true;this.questMarker?.setText("…");this.questText.setText("SAQUEADORES VERDES\nDerrota Goblins  0/4");this.spawnGoblins();this.showDialogue("Aldric: Exploradores vieron Goblins saqueando caravanas. Elimina 4 antes de que lleguen a Lumen.");return;
  }
  if(this.questRewardClaimed&&!this.secondQuest){
   this.secondQuest=true;this.questMarker?.setText("…");this.questText.setText("PELIGRO EN EL BOSQUE\nDerrota Lobos  0/3");this.spawnWolves();this.showDialogue("Aldric: Los lobos se acercan a Lumen. Derrota 3 Lobos Salvajes al sur.");return;
  }
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
 update(){}

}