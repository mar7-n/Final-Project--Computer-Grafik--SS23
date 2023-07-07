import {
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createCylinder(radiusTop, radiusBottom, height, radialSegments, texture) {
  const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const material = new MeshStandardMaterial({ map: texture });

  const cylinder = new Mesh(geometry, material);

  return cylinder;
}

export { createCylinder };
