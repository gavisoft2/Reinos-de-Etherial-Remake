export class ClassSelectScene extends Phaser.Scene{
 constructor(){super("ClassSelect")}
 preload(){
  const A="assets/characters/";
  this.load.image("pick_archer",A+"gabriel_archer/idle_01.png");
  this.load.image("pick_warrior",A+"thoran_warrior/idle_01.png");
  this.load.image("pick_mage",A+"selene_mage/idle_01.png");
 }
 create(){
  this.add.rectangle(360,640,720,1280,0x111a14);
  this.add.text(360,105,"REINOS DE ETHERIAL",{fontFamily:"Georgia",fontSize:"36px",color:"#f0d49a",stroke:"#261d10",strokeThickness:6}).setOrigin(.5);
  this.add.text(360,155,"ELIGE TU CLASE",{fontFamily:"Georgia",fontSize:"19px",color:"#d7c7a0"}).setOrigin(.5);
  const data=[
   ["archer","pick_archer","GABRIEL","ARQUERO","Ataque a distancia · Críticos · Movilidad",300],
   ["warrior","pick_warrior","THORAN","GUERRERO","Gran resistencia · Defensa · Combate cercano",610],
   ["mage","pick_mage","SELENE","MAGO","Magia elemental · Área · Alto poder",920]
  ];
  data.forEach(([id,key,name,role,desc,y])=>{
   const card=this.add.rectangle(360,y,620,250,0x202b22,.94).setStrokeStyle(2,0xa98b54,.9).setInteractive({useHandCursor:true});
   this.add.image(205,y,key).setDisplaySize(150,190);
   this.add.text(320,y-65,name,{fontFamily:"Georgia",fontSize:"26px",color:"#f4ddb0"}).setOrigin(0,.5);
   this.add.text(320,y-28,role,{fontFamily:"Georgia",fontSize:"17px",color:"#d9b968"}).setOrigin(0,.5);
   this.add.text(320,y+15,desc,{fontFamily:"Georgia",fontSize:"13px",color:"#d8dfd2",wordWrap:{width:275}}).setOrigin(0,.5);
   this.add.text(320,y+70,"SELECCIONAR",{fontFamily:"Georgia",fontSize:"14px",color:"#fff0bd",backgroundColor:"#4b3820",padding:{x:16,y:8}}).setOrigin(0,.5);
   card.on("pointerdown",()=>{localStorage.setItem("etherial_class",id);this.scene.start("Lumen",{playerClass:id});});
  });
 }
}