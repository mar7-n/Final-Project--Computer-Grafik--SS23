import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRectangle } from './components/rectangle.js';
import { MathUtils } from 'https://cdn.skypack.dev/three@0.132.2';

let camera;
let renderer;
let scene;
let loop;
let wall_long = 10;
let wall_depth = 0.5;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const floor = createRectangle(wall_long,wall_long,wall_depth);
    floor.rotation.x = MathUtils.degToRad(90);

    const wall_right = createRectangle(wall_long,wall_long,wall_depth);
    wall_right.position.set(wall_long/2-wall_depth/2,wall_long/2,0);
    wall_right.rotation.y = MathUtils.degToRad(90);

    const wall_left = createRectangle(wall_long,wall_long,wall_depth);
    wall_left.position.set(-wall_long/2+wall_depth/2,wall_long/2,0);
    wall_left.rotation.y = MathUtils.degToRad(90);

    const wall_behind = createRectangle(wall_long,wall_long,wall_depth);
    wall_behind.position.set(0,wall_long/2,-wall_long/2+wall_depth/2);

    const light = createLights(50, 0, 2, 10, 1, Math.PI/2);

    //loop.updatables.push(floor);

    scene.add(floor, light);
    scene.add(wall_right, light);
    scene.add(wall_left, light);
    scene.add(wall_behind, light);

    const resizer = new Resizer(container, camera, renderer);
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
