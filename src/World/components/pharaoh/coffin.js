import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadObject() {
  const loader = new GLTFLoader();

  const [ coffinData ,] = await Promise.all([
    loader.loadAsync('/assets/models/anthropoid_coffin_of_noub.glb'),
  ]);

  const coffin = setupModel(coffinData);
  coffin.position.set(-0.75, 3, -1);
  coffin.scale.set(0.25, 0.25, 0.25);


  return  { coffin, };
}

export { loadObject };
