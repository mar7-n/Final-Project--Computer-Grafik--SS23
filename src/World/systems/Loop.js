import { Clock } from 'https://cdn.skypack.dev/three@0.132.2';

const clock = new Clock();

// Define variables for mouse movement tracking
let isMouseDown = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
let deltaMove = {
  x: 0,
  y: 0
};

// Add event listeners for mouse movement
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

// Function to handle mouse movement
function handleMouseMove(event) {
  if (!isMouseDown) return;

  deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y
  };

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

// Function to handle mouse button down event
function handleMouseDown(event) {
  isMouseDown = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

// Function to handle mouse button up event
function handleMouseUp() {
  isMouseDown = false;
}

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta, elapsedTime, deltaMove);
    }

    deltaMove = {
      x: 0,
      y: 0
    };
  }
}

export { Loop };
