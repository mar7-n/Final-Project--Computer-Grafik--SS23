import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { MathUtils } from 'https://cdn.skypack.dev/three@0.132.2';

import { setupModel } from './setupModel.js';

async function loadObject() {
  const loader = new GLTFLoader();

  const [ coffinData , window1Data, window2Data] = await Promise.all([
    loader.loadAsync('/assets/models/anthropoid_coffin_of_noub.glb'),
    loader.loadAsync('/assets/models/broken_window_03.glb'),
    loader.loadAsync('/assets/models/broken_window_06.glb'),
  ]);

  const coffin = setupModel(coffinData);
  coffin.position.set(-0.8, 4.1, -1);
  coffin.scale.set(0.3, 0.3, 0.3);

  const window1 = setupModel(window1Data);
  window1.position.set(-10.2, 4, -6.45);
  window1.rotation.z = MathUtils.degToRad(90);
  window1.scale.set(2, 2.5, 2);

  const window2 = setupModel(window2Data);
  window2.position.set(10.2, 4, 6.5);
  window2.rotation.z = MathUtils.degToRad(90);
  window2.scale.set(2, 2.5, 2);

  return  { coffin, window1, window2};
}

export { loadObject };
