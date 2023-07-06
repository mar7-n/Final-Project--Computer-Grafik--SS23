import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';
import * as BufferGeometryUtils from "../../../vendor/BufferGeometryUtils.js";

function createRectangle(length, width, depth, position, angle) {
  var rectangle;
  /*if (additional_object != 0) {
    var geometry = new BoxBufferGeometry(length, width, depth);
    var additional_object_geometry = new BoxBufferGeometry(additional_object,additional_object,depth);
    var mergedGeometry = BufferGeometryUtils.mergeGeometries([geometry, additional_object_geometry]);
    var material = new MeshStandardMaterial({ color: 'brown' });
    var additional_object_material = new MeshStandardMaterial({ color: 0x000000 });
    var additional_object_mesh = new Mesh(additional_object_geometry,additional_object_material);
    rectangle = new Mesh(mergedGeometry,material);
    rectangle.add(additional_object_mesh);
  }
  else {*/
  var geometry = new BoxBufferGeometry(length, width, depth);
  var material = new MeshStandardMaterial({ color: 'brown' });
  rectangle = new Mesh(geometry, material);
  //}

  rectangle.position.set(position[0],position[1],position[2]);
  //rectangle.rotation.set(MathUtils.degToRad(angle[0]),MathUtils.degToRad(angle[1]),MathUtils.degToRad(angle[2]));

  return rectangle;
}

export { createRectangle };
