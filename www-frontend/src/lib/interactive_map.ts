import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    HemisphereLight,
    Raycaster,
    Vector2,
    Vector3,
    Box3,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

type LocationData = [
    modelPath: string,
    // leftImageUrl: string,
    // description: string,
    // rightImageUrl: string,
    // funFacts: string[],
];
const modelMap = new Map<string, LocationData>();

//njcounties
modelMap.set("Middlesex County", ["/models/njcounties/counties/middlesex_monmouth/middlesex.glb"]);
modelMap.set("Monmouth County", ["/models/njcounties/counties/middlesex_monmouth/monmouth.glb"]);

//njmiddlesextowns
modelMap.set("Monmouth County", ["/models/njmiddlesextowns/middlesex_county/monmouth.glb"]);
modelMap.set("Carteret", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/carteret.glb"]);
modelMap.set("Edison Township", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/edison.glb"]);
modelMap.set("Highland Park", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/highland_park.glb"]);
modelMap.set("Metuchen", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/metuchen.glb"]);
modelMap.set("New Brunswick", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/new_brunswick.glb"]);
modelMap.set("Old Bridge Township", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/old_bridge.glb"]);
modelMap.set("Perth Amboy", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/perth_amboy.glb"]);
modelMap.set("Piscataway Township", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/piscataway.glb"]);
modelMap.set("Sayreville", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/sayreville.glb"]);
modelMap.set("South Amboy", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/south_amboy.glb"]);
modelMap.set("South Plainfield", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/south_plainfield.glb"]);
modelMap.set("Woodbridge Township", ["/models/njmiddlesextowns/middlesex_county/middlesex_cities/woodbridge.glb"]);

//njmonmouthtowns
modelMap.set("Aberdeen Township", ["/models/njmonmouthtowns/monmouth_county/monmouth/aberdeen.glb"]);
modelMap.set("Allenhurst", ["/models/njmonmouthtowns/monmouth_county/monmouth/allenhurst.glb"]);
modelMap.set("Asbury Park", ["/models/njmonmouthtowns/monmouth_county/monmouth/asbury_park.glb"]);
modelMap.set("Atlantic Highlands", ["/models/njmonmouthtowns/monmouth_county/monmouth/atlantic_highlands.glb"]);
modelMap.set("Bradley Beach", ["/models/njmonmouthtowns/monmouth_county/monmouth/bradley_beach.glb"]);
modelMap.set("Deal", ["/models/njmonmouthtowns/monmouth_county/monmouth/deal.glb"]);
modelMap.set("Fair Haven", ["/models/njmonmouthtowns/monmouth_county/monmouth/fair_haven.glb"]);
modelMap.set("Hazlet Township", ["/models/njmonmouthtowns/monmouth_county/monmouth/hazlet.glb"]);
modelMap.set("Highlands", ["/models/njmonmouthtowns/monmouth_county/monmouth/highlands.glb"]);
modelMap.set("Interlaken", ["/models/njmonmouthtowns/monmouth_county/monmouth/interlaken.glb"]);
modelMap.set("Keansburg", ["/models/njmonmouthtowns/monmouth_county/monmouth/keansburg.glb"]);
modelMap.set("Keyport", ["/models/njmonmouthtowns/monmouth_county/monmouth/keyport.glb"]);
modelMap.set("New Jersey", ["/models/njcounties/counties/nj.glb"]);
modelMap.set("Little Silver", ["/models/njmonmouthtowns/monmouth_county/monmouth/little_silver.glb"]);
modelMap.set("Loch Arbour", ["/models/njmonmouthtowns/monmouth_county/monmouth/loch_arbour.glb"]);
modelMap.set("Long Branch", ["/models/njmonmouthtowns/monmouth_county/monmouth/long_branch.glb"]);
modelMap.set("Matawan", ["/models/njmonmouthtowns/monmouth_county/monmouth/matawan.glb"]);
modelMap.set("Middletown Township", ["/models/njmonmouthtowns/monmouth_county/monmouth/middle_town.glb"]);
modelMap.set("Monmouth Beach", ["/models/njmonmouthtowns/monmouth_county/monmouth/monmouth_beach.glb"]);
modelMap.set("Neptune City", ["/models/njmonmouthtowns/monmouth_county/monmouth/neptune.glb"]);
modelMap.set("Neptune Township", ["/models/njmonmouthtowns/monmouth_county/monmouth/neptune_twp.glb"]);
modelMap.set("Oceanport", ["/models/njmonmouthtowns/monmouth_county/monmouth/oceanport.glb"]);
modelMap.set("Rumson", ["/models/njmonmouthtowns/monmouth_county/monmouth/rumson.glb"]);
modelMap.set("Sea Bright", ["/models/njmonmouthtowns/monmouth_county/monmouth/seabright.glb"]);
modelMap.set("Union Beach", ["/models/njmonmouthtowns/monmouth_county/monmouth/union_beach.glb"]);
modelMap.set("West Long Branch", ["/models/njmonmouthtowns/monmouth_county/monmouth/west_long_branch.glb"]);
modelMap.set("Middlesex County", ["/models/njmonmouthtowns/monmouth_county/middlesex.glb"]);

export const allCounties: string[] = [
    "Middlesex County",
    "Monmouth County",
];

export const extraRenderAllCounties: string[] = [
    "/models/njalltowns/town_maps/nj.glb",
];

export const allMiddlesexTowns: string[] = [
    "Carteret",
    "Edison Township",
    "Highland Park",
    "Metuchen",
    "New Brunswick",
    "Old Bridge Township",
    "Perth Amboy",
    "Piscataway Township",
    "Sayreville",
    "South Amboy",
    "South Plainfield",
    "Woodbridge Township",
    "Monmouth County"
];

export const extraRenderAllMiddlesexTowns: string[] = [
    "/models/njmiddlesextowns/middlesex_county/middlesex_cities/middlesex_river.glb",
    "/models/njalltowns/town_maps/nj.glb",
];

export const allMonmouthTowns: string[] = [
    "Aberdeen Township",
    "Allenhurst",
    "Asbury Park",
    "Atlantic Highlands",
    "Bradley Beach",
    "Deal",
    "Fair Haven",
    "Hazlet Township",
    "Highlands",
    "Interlaken",
    "Keansburg",
    "Keyport",
    "Little Silver",
    "Loch Arbour",
    "Long Branch",
    "Matawan",
    "Middletown Township",
    "Monmouth Beach",
    "Neptune City",
    "Neptune Township",
    "Oceanport",
    "Red Bank",
    "Rumson",
    "Sea Bright",
    "Union Beach",
    "West Long Branch",
    "Middlesex County"
];

export const extraRenderAllMonmouthTowns: string[] = [
    "/models/njmonmouthtowns/monmouth_county/monmouth/monmouth_river.glb",
    "/models/njalltowns/town_maps/nj.glb",
]

const __allTowns: string[] = [
    "Carteret",
    "Edison Township",
    "Highland Park",
    "Metuchen",
    "New Brunswick",
    "Perth Amboy",
    "Piscataway Township",
    "Sayreville",
    "South Amboy",
    "South Plainfield",
    "Woodbridge Township",
    "Aberdeen Township",
    "Allenhurst",
    "Asbury Park",
    "Alantic Highlands",
    "Bradley Beach",
    "Deal",
    "Fair Haven",
    "Hazlet Township",
    "Highlands",
    "Interlaken",
    "Keansburg",
    "Keyport",
    "Little Silver",
    "Loch Arbour",
    "Long Branch",
    "Matawan",
    "Middletown Township",
    "Monmouth Beach",
    "Neptune City",
    "Neptune Township",
    "Oceanport",
    "Red Bank",
    "Rumson",
    "Sea Bright",
    "Union Beach",
    "West Long Branch",
];

const __extraRenderAllTowns: string[] = [

];

export default function createMap(el: HTMLCanvasElement, location: HTMLSpanElement, hoveringOverLocation: HTMLSpanElement, selectedMaps = allMonmouthTowns, extraRender: string[] = extraRenderAllMonmouthTowns) {
    const renderer = new WebGLRenderer({ antialias: true, canvas: el });
    const width = 800;
    const height = 600;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    const skyColor = 0xFFFFEE;
    const groundColor = 0x505070;
    const intensity = 3;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    const maps = new Map<string, any>();
    const loader = new GLTFLoader();
    for (const [location, data] of modelMap.entries()) {
        if (selectedMaps.indexOf(location) == -1) continue;
        loader.load(data[0], function (gltf: any) {
            maps.set(location, gltf);
            scene.add(gltf.scene);
        }, undefined, function (error: any) {
            console.error(
                location,
                data[0],
                error,
            );
        });
    }

    for (const path of extraRender) {
        loader.load(path, function (gltf: any) {
            scene.add(gltf.scene);
        }, undefined, function (error: any) {
            console.error(
                path,
                error,
            );
        });
    }

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    const resize = () => {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const raycaster = new Raycaster();
    const mouseVector = new Vector2();

    resize();
    animate();

    let controls = new OrbitControls(camera, el);
    controls.update();
    controls.listenToKeyEvents(document);

    window.addEventListener('mousemove', e => {
        [mouseVector.x, mouseVector.y] =
            [2 * ((e.clientX - (renderer.getContext().canvas as HTMLCanvasElement).getBoundingClientRect().x) / width) - 1,
            1 - 2 * ((e.clientY - (renderer.getContext().canvas as HTMLCanvasElement).getBoundingClientRect().y) / height)];

        raycaster.setFromCamera(mouseVector, camera);

        let selectedObject: string | undefined;
        for (const [name, obj] of maps.entries()) {
            if (selectedMaps.indexOf(name) == -1) continue;
            if (name == location.innerText) continue;
            try {
                const object = obj.scene.children[0].geometry.boundingBox;
                const intersection = raycaster.ray.intersectsBox(object as Box3);
                if (intersection) {
                    selectedObject = name;
                    break;
                }
            } catch (e) {
                console.error(name, e)
            }
        }

        if (!selectedObject) {
            hoveringOverLocation.innerText = "";
            return;
        }
        hoveringOverLocation.innerText = selectedObject;
    });

    let hasClicked = false;
    window.addEventListener("mouseup", e => {
        if (e.button != 0) return;
        if (hasClicked) return;
        raycaster.setFromCamera(mouseVector, camera);

        let selectedObject: string | undefined;
        for (const [name, obj] of maps.entries()) {
            if (selectedMaps.indexOf(name) == -1) continue;
            if (name == location.innerText) continue;
            const object = obj.scene.children[0].geometry.boundingBox;
            const intersection = raycaster.ray.intersectsBox(object as Box3);
            if (intersection) {
                selectedObject = name;
                break;
            }
        }
        if (!selectedObject) return;

        const averagePosition = new Vector3();
        const positions = maps.get(selectedObject).scene.children[0].geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            averagePosition.x += positions[i] / (positions.length / 3);
            averagePosition.y += positions[i + 1] / (positions.length / 3);
            averagePosition.z += positions[i + 2] / (positions.length / 3);
        }
        hasClicked = true;
        controls.stop
        controls.dispose();
        const interval = setInterval(() => {
            camera.position.x -= (camera.position.x - averagePosition.x) / 100;
            camera.position.y -= (camera.position.y - 10) / 100;
            camera.position.z -= (camera.position.z - averagePosition.z) / 100;
        }, 10);
        setTimeout(() => {
            controls.position0 = camera.position.clone();
            controls.object = camera;
            const target = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
            controls = new OrbitControls(camera, el);
            controls.target = target;
            camera.lookAt(target);
            hasClicked = false;
            controls.listenToKeyEvents(document);
            clearInterval(interval);
            if (!selectedObject) return;
            location.innerText = selectedObject;
        }, 1000);
    });
}