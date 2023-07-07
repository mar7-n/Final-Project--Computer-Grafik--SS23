import { PlaneGeometry } from '/vendor/geometries/PlaneGeometry.js';
import { MathUtils } from 'https://cdn.skypack.dev/three@0.132.2';
import { Reflector } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/objects/Reflector.js';

function createMirror(height, width) {

    const mirrorOptions = {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
    }

    const mirrorGeometry = new PlaneGeometry(width,height);

    const mirror = new Reflector(mirrorGeometry, mirrorOptions);
    mirror.position.set(0,7,0);

    mirror.rotation.x = MathUtils.degToRad(90);
    
    return mirror;
}

export {createMirror};