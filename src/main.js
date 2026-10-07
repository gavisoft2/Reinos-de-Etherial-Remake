import {LumenScene} from "./scenes/LumenScene.js";
import {ClassSelectScene} from "./scenes/ClassSelectScene.js";
const tg=window.Telegram?.WebApp; if(tg){tg.ready();tg.expand();}
new Phaser.Game({type:Phaser.AUTO,parent:"game",width:720,height:1280,backgroundColor:"#101b13",antialias:true,pixelArt:false,render:{transparent:false,antialias:true},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{debug:false}},scene:[ClassSelectScene,LumenScene]});