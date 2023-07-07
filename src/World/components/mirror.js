import { PlaneGeometry } from '/vendor/geometries/PlaneGeometry.js';

import { Reflector } from '/vendor/Reflector.js';

import { WebGLRenderTarget, MeshBasicMaterial, Mesh } from 'https://cdn.skypack.dev/three@0.132.2';

function createMirror(height, width) {


    /*var mirrorGeometry = new PlaneGeometry(width, height);

    var mirrorRenderTarget = new WebGLRenderTarget(width, height);
    mirrorRenderTarget.texture.generateMipmaps = false;

    // Create the mirror material with the reflection texture
    var mirrorMaterial = new MeshBasicMaterial( { color: 0xffffff, envMap: } );

    var mirror = new Mesh(mirrorGeometry,mirrorMaterial);

    mirror.position.set(0,4,0);

    return mirror;*/

    const mirrorOptions = {
        clipBias: 0.000,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        //color: 0x808080,
        multisample: 4,
    }

    const mirrorGeometry = new PlaneGeometry(width,height);

    const mirror = new Reflector(mirrorGeometry,mirrorOptions);
    mirror.position.set(0,4,0);
    return mirror;
}

export {createMirror};