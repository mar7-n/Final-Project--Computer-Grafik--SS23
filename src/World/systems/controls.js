import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

function createControls(thing, canvas) {
  const controls = new OrbitControls(thing, canvas);

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true;

  controls.enableDamping = true; // Enable smooth camera movements
  controls.dampingFactor = 0.05; // Adjust damping factor for the desired effect
  controls.enablePan = false; // Disable panning (left and right movement)
  controls.minPolarAngle = Math.PI / 4; // Set the minimum polar angle (elevation)
  controls.maxPolarAngle = Math.PI; // Set the maximum polar angle (elevation)

  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
