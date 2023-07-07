import { loadObject } from './components/pharaoh/coffin.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createMeshGroup } from './components/groupCameraAndLight.js';
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
let wall_length = 10;
let wall_depth = 0.5;
let window_length = 1;
let light;
let target;
let group;
let cylinder;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    light = createLights(50, 1, Math.PI/10);
    target = createTarget();
    light.target = target;
    camera.lookAt = target;
    group = createMeshGroup(target, camera);
    container.append(renderer.domElement);
    cylinder = createCylinder(2, 2, 1, 100);

    const floor = createRectangle(wall_length,wall_length,wall_depth,[0,0,0],[90,0,0],0);
    const roof = createRectangle(wall_length,wall_length,wall_depth,[0,wall_length+wall_depth,0],[90,0,0],0);
    const wall_right = createRectangle(wall_length,wall_length,wall_depth,[wall_length/2+wall_depth/2,wall_length/2+wall_depth/2,0],[0,90,0],window_length);
    const wall_left = createRectangle(wall_length,wall_length,wall_depth,[-wall_length/2-wall_depth/2,wall_length/2+wall_depth/2,0],[0,90,0],window_length);
    const wall_behind = createRectangle(wall_length,wall_length,wall_depth,[0,wall_length/2+wall_depth/2,-wall_length/2-wall_depth/2],[0,0,0],0);
    //const wall_front = createRectangle(wall_length,wall_length,wall_depth,[0,wall_length/2+wall_depth/2,wall_length/2+wall_depth/2],[0,0,0]);
    //const window_left = createRectangle(window_length,window_length,wall_depth,[-wall_length/2-wall_depth/2,wall_length/2,0],[0,90,0]);


    group.add(camera, light, target);

    loop.updatables.push(group);

    scene.add(floor);
    scene.add(wall_right);
    scene.add(wall_left);
    scene.add(wall_behind);
    scene.add(cylinder);
    scene.add(group);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { coffin } = await loadObject();
    scene.add(coffin);
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
