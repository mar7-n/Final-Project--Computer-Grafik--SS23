import { loadObject } from './components/models/models.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createGroupCamera } from './components/groupCameraAndLight.js';
import { createGroupCoffin } from './components/groupCoffin.js';
import { createTarget } from './components/target.js';
import { createCylinder } from './components/cylinder.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRectangle } from './components/rectangle.js';

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

    groupCoffin = createGroupCoffin();
    cylinderUnderCoffin = createCylinder(2, 2, 1, 100);
    stoneUnderCoffin = createRectangle(4,2.5,1.5,[0,0.5,0]);
    container.append(renderer.domElement);


    // x->length | y-> width | z-> depth
    const floor = createRectangle(wall_long,wall_depth,wall_long,[0,0,0]);
    const roof = createRectangle(wall_long,wall_depth,wall_long,[0,wall_short+wall_depth,0]);
    const wall_right_l = createRectangle(wall_depth,wall_short,wall_long-window_length-space,[wall_long/2+wall_depth/2,wall_short/2+wall_depth/2,(-window_length-space)/2]);
    const wall_right_r = createRectangle(wall_depth,wall_short,space,[wall_long/2+wall_depth/2,wall_short/2+wall_depth/2,wall_long/2-space/2]);
    const wall_right_d = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[wall_long/2+wall_depth/2,(wall_short-window_length)/4+wall_depth/2,wall_long/2-space-window_length/2]);
    const wall_right_u = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[wall_long/2+wall_depth/2,wall_short+wall_depth/2-(wall_short-window_length)/4,wall_long/2-space-window_length/2]);
    //const wall_right_l = createRectangle(wall_length,wall_length,wall_depth,[wall_length/2+wall_depth/2,wall_length/2+wall_depth/2,0],[0,90,0]);
    //const wall_right_l = createRectangle(wall_length,wall_length,wall_depth,[wall_length/2+wall_depth/2,wall_length/2+wall_depth/2,0],[0,90,0]);
    const wall_left_r = createRectangle(wall_depth,wall_short,wall_long-window_length-space,[-wall_long/2-wall_depth/2,wall_short/2+wall_depth/2,(window_length+space)/2]);
    const wall_left_l = createRectangle(wall_depth,wall_short,space,[-wall_long/2-wall_depth/2,wall_short/2+wall_depth/2,-wall_long/2+space/2]);
    const wall_left_d = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[-wall_long/2-wall_depth/2,(wall_short-window_length)/4+wall_depth/2,-wall_long/2+space+window_length/2]);
    const wall_left_u = createRectangle(wall_depth,(wall_short-window_length)/2,window_length,[-wall_long/2-wall_depth/2,wall_short+wall_depth/2-(wall_short-window_length)/4,-wall_long/2+space+window_length/2]);
    const wall_behind = createRectangle(wall_long,wall_short,wall_depth,[0,wall_short/2+wall_depth/2,-wall_long/2-wall_depth/2]);
    const wall_front = createRectangle(wall_long,wall_short,wall_depth,[0,wall_short/2+wall_depth/2,wall_long/2+wall_depth/2]);

    groupCameraAndLight.add(camera, light, target);

    loop.updatables.push(groupCameraAndLight);
    loop.updatables.push(groupCoffin);

    scene.add(floor);
    scene.add(wall_right_l);
    scene.add(wall_right_r);
    scene.add(wall_right_d);
    scene.add(wall_right_u);
    scene.add(wall_left_r);
    scene.add(wall_left_l);
    scene.add(wall_left_d);
    scene.add(wall_left_u);
    scene.add(wall_behind);
    scene.add(wall_front);
    scene.add(roof);

    scene.add(groupCameraAndLight);

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
