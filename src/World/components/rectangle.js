import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createRectangle(length, width, depth) {
  const geometry = new BoxBufferGeometry(length, width, depth);
  const material = new MeshStandardMaterial({ color: 'brown' });
  const rectangle = new Mesh(geometry, material);

  //const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  /*rectangle.tick = (delta) => {
    // increase the cube's rotation each frame
    rectangle.rotation.z += radiansPerSecond * delta;
    rectangle.rotation.x += radiansPerSecond * delta;
    rectangle.rotation.y += radiansPerSecond * delta;
  };*/

  return rectangle;
}

export { createRectangle };
