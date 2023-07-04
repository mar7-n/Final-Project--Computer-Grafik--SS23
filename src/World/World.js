import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRectangle } from './components/rectangle.js';

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
    const wall_right = createRectangle(wall_long,wall_long,wall_depth);
    //wall_right.position.x = wall_long;
    //wall_right.rotation.y = MathUtils.degToRad(90);

    const light = createLights(20, 0, 0, 5, 1, Math.PI/10);

    //loop.updatables.push(floor);

    scene.add(floor, light);
    scene.add(wall_right, light);

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
