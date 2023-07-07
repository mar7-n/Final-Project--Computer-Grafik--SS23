import { loadObject } from './components/models/models.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/flashlights.js';
import { createScene } from './components/scene.js';
import { createGroupCamera } from './components/groupCameraAndLight.js';
import { createGroupCoffin } from './components/groupCoffin.js';
import { createTarget } from './components/target.js';
import { createCylinder } from './components/cylinder.js';
import { createPointLights } from './components/pointlight.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRectangle } from './components/rectangle.js';
import { TextureLoader } from '../../vendor/loaders/TextureLoader.js'
import { Color } from 'https://cdn.skypack.dev/three@0.132.2';

let camera;
let renderer;
let scene;
let loop;
let wall_long = 20;
let wall_short = 7;
let wall_depth = 0.5;
let window_length = 3;
let space = 2;
let light;
let target;
let groupCameraAndLight;
let groupCoffin;
let cylinderUnderCoffin;
let stoneUnderCoffin;
let moonLight;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    
    light = createLights(50, 1, Math.PI/10);
    target = createTarget();
    light.target = target;
    groupCameraAndLight = createGroupCamera(target, camera);

    moonLight = createPointLights();

    var textureLoader = new TextureLoader();
    var stoneWall = textureLoader.load('/assets/images/xboibes_8K_Albedo.jpg');
    var marmol = textureLoader.load('/assets/images/black-gold-marble-texture.jpg');
    var egyptianLetters = textureLoader.load('/assets/images/360_F_444806827_qItmWKBVDs3aHFlATYMuWZZZCx0VVxUH.jpg');
    var egyptianImage = textureLoader.load('/assets/images/19713.jpg');
    var egyptianImage2 = textureLoader.load('/assets/images/ancient-egypt-hieroglyphics-on-wall-700-194914080.jpg');
    var egyptianImage2_long = textureLoader.load('/assets/images/WhatsApp Image 2023-07-07 at 14.38.11.jpeg');

    groupCoffin = createGroupCoffin();
    cylinderUnderCoffin = createCylinder(2, 2, 1, 100,marmol);
    stoneUnderCoffin = createRectangle(4,2.5,1.5,[0,0.5,0],marmol);
    container.append(renderer.domElement);

    // x->length | y-> width | z-> depth
    const floor = createRectangle(wall_long,wall_depth,wall_long,[0,0,0],stoneWall);
    const roof = createRectangle(wall_long,wall_depth,wall_long,[0,wall_short+wall_depth,0],stoneWall);
    const wall_right_l = createRectangle(wall_depth,wall_short,wall_long-window_length-space,[wall_long/2+wall_depth/2,wall_short/2+wall_depth/2,(-window_length-space)/2],stoneWall);
    const wall_right_l_symbols = createRectangle(wall_depth,window_length+0.5,wall_long-window_length-space,[wall_long/2+wall_depth/2-0.3,wall_short/2+wall_depth/2+0.2,(-window_length-space)/2-0.3],egyptianImage2_long);
    const wall_right_r = createRectangle(wall_depth,wall_short,space,[wall_long/2+wall_depth/2,wall_short/2+wall_depth/2,wall_long/2-space/2],stoneWall);
    const wall_right_r_symbols = createRectangle(wall_depth,window_length+0.5,space,[wall_long/2+wall_depth/2-0.3,wall_short/2+wall_depth/2+0.2,wall_long/2-space/2+0.3],egyptianImage2);
    const wall_right_d = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[wall_long/2+wall_depth/2,(wall_short-window_length)/4+wall_depth/2,wall_long/2-space-window_length/2],stoneWall);
    const wall_right_u = createRectangle(wall_depth,(wall_short-4)/2,window_length,[wall_long/2+wall_depth/2,wall_short+wall_depth/2-(wall_short-window_length)/4+0.5,wall_long/2-space-window_length/2],stoneWall);
    const wall_left_r = createRectangle(wall_depth,wall_short,wall_long-window_length-space,[-wall_long/2-wall_depth/2,wall_short/2+wall_depth/2,(window_length+space)/2],stoneWall);
    const wall_left_r_symbols = createRectangle(wall_depth,window_length+0.5,wall_long-window_length-space,[-wall_long/2-wall_depth/2+0.3,wall_short/2+wall_depth/2+0.2,(window_length+space)/2+0.3],egyptianImage2_long);
    const wall_left_l = createRectangle(wall_depth,wall_short,space,[-wall_long/2-wall_depth/2,wall_short/2+wall_depth/2,-wall_long/2+space/2],stoneWall);
    const wall_left_l_symbols = createRectangle(wall_depth,window_length+0.5,space,[-wall_long/2-wall_depth/2+0.3,wall_short/2+wall_depth/2+0.2,-wall_long/2+space/2-0.3],egyptianImage2);
    const wall_left_d = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[-wall_long/2-wall_depth/2,(wall_short-window_length)/4+wall_depth/2,-wall_long/2+space+window_length/2],stoneWall);
    const wall_left_u = createRectangle(wall_depth,(wall_short-4)/2,window_length,[-wall_long/2-wall_depth/2,wall_short+wall_depth/2-(wall_short-window_length)/4+0.5,-wall_long/2+space+window_length/2],stoneWall);
    const wall_behind = createRectangle(wall_long,wall_short,wall_depth,[0,wall_short/2+wall_depth/2,-wall_long/2-wall_depth/2],stoneWall);
    const wall_behind_symbols = createRectangle(wall_long,window_length+0.5,wall_depth,[0,wall_short/2+wall_depth/2+0.2,-wall_long/2-wall_depth/2+0.3],egyptianImage2_long);
    const wall_front = createRectangle(wall_long,wall_short,wall_depth,[0,wall_short/2+wall_depth/2,wall_long/2+wall_depth/2],stoneWall);
    const wall_front_symbols = createRectangle(wall_long,window_length+0.5,wall_depth,[0,wall_short/2+wall_depth/2+0.2,wall_long/2+wall_depth/2-0.3],egyptianImage2_long);

    groupCameraAndLight.add(camera, light, target);

    loop.updatables.push(groupCameraAndLight);
    loop.updatables.push(groupCoffin);
    loop.updatables.push(moonLight);

    scene.add(floor);
    scene.add(wall_right_l);
    scene.add(wall_right_l_symbols);
    scene.add(wall_right_r);
    scene.add(wall_right_r_symbols)
    scene.add(wall_right_d);
    scene.add(wall_right_u);
    scene.add(wall_left_r);
    scene.add(wall_left_r_symbols);
    scene.add(wall_left_l);
    scene.add(wall_left_l_symbols);
    scene.add(wall_left_d);
    scene.add(wall_left_u);
    scene.add(wall_behind);
    scene.add(wall_behind_symbols);
    scene.add(wall_front);
    scene.add(wall_front_symbols);
    scene.add(roof);
    scene.add(moonLight);

    scene.add(groupCameraAndLight);

    scene.background = new Color( 0x000011 );

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { coffin, window1, window2, tree1, tree2} = await loadObject();
    groupCoffin.add(coffin, cylinderUnderCoffin, stoneUnderCoffin);
    scene.add(groupCoffin);
    scene.add(window1, window2);
    scene.add(tree1, tree2);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
