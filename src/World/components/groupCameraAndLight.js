import { Group, MathUtils } from 'https://cdn.skypack.dev/three@0.132.2';

function createGroupCamera(target, camera) {
    const group = new Group();

    let breathDirection = 1;

    group.position.set(0, 3.5, 15);

    group.tick = (delta, elapsedTime, deltaMove) => {
        var angleInRadian = elapsedTime*10 / 180 * Math.PI;
        group.position.x = 5 * Math.cos(angleInRadian);
        group.position.z = 5 * Math.sin(angleInRadian);

        if(camera.position.y > 0.05) breathDirection = -1;
        if(camera.position.y < -0.05) breathDirection = 1;
        camera.position.y += breathDirection * delta/8;
    
        const rotationSpeed = 0.5;
    
        group.rotation.y -= MathUtils.degToRad(deltaMove.x) * rotationSpeed;
        var newValuesCamRotation = camera.rotation.x - MathUtils.degToRad(deltaMove.y) * rotationSpeed/5;
        if(newValuesCamRotation  > -Math.PI/3 && newValuesCamRotation < Math.PI/3) {
            target.position.y -= deltaMove.y * rotationSpeed/10;
            camera.rotation.x = newValuesCamRotation;
        }

    };

    return group;
}

export { createGroupCamera };