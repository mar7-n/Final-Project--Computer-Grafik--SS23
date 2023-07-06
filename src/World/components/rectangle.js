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

  return rectangle;
}

export { createRectangle };
