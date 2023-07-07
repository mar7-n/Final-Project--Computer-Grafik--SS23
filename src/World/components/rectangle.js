import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createRectangle(length, width, depth, position, texture) {
  var rectangle;
  
  var geometry = new BoxBufferGeometry(length, width, depth);
  var material = new MeshStandardMaterial({ map: texture });
  rectangle = new Mesh(geometry, material);

  rectangle.receiveShadow = true;
  rectangle.castShadow = true;

  rectangle.position.set(position[0],position[1],position[2]);

  return rectangle;
}

export { createRectangle };
