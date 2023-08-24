import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three';

const width = 800;
const height = 600;

const scene = new Scene();
const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);

let renderer: WebGLRenderer;
scene.add(cube);
camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
};

const resize = () => {
    renderer.setSize(width, height)
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

export default function createMap(el: HTMLCanvasElement) {
    renderer = new WebGLRenderer({ antialias: true, canvas: el });
    resize();
    animate();
}
