import { Group, MathUtils } from 'https://cdn.skypack.dev/three@0.132.2';

function createGroupCoffin() {
    const group = new Group();

    group.tick = (delta, elapsedTime, deltaMove) => {
        group.rotation.y += delta*0.1;
    };

    return group;
}

export { createGroupCoffin };