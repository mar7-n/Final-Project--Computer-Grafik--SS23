import {
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createCylinder(radiusTop, radiusBottom, height, radialSegments) {
  const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const material = new MeshStandardMaterial({ color: 'brown' });

  const cylinder = new Mesh(geometry, material);

  return cylinder;
}

export { createCylinder };
