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
    funFacts: string[],
    contactInfo: string[],
    leftImageUrl: string,
    rightImageUrl: string,
];
const modelMap = new Map<string, LocationData>();

modelMap.set("Carteret", ["/models/cities/middlesex/carteret.glb",
    [
        "Fun Facts!"
    ],
    [
        "Office Directory:",
        "Health & Recreation: 732-541-3890, HealthDept@carteret.net",
        "Building, Construction & Land Use: 732-541-3819, Building@carteret.net",
        "Engineering/Zoning: 732-541-3847, Zoning@carteret.net",
        "Finace & Purchasing: 732-541-3820, TaxOffice@carteret.net",
        "Fire Department: 732-541-8000, Fire@carteret.net",
        "Public Housing Authority: 732-541-6800, Eric@carterethousing.org",
        "Borough Attorney: 732-541-3804, RussoM@carteret.net",
        "Marina: 732-541-3835, Marina@carteret.net",
        "Municipal Clerk: 732-541-3800, ClerkOffice@carteret.net",
        "Municipal Court: 732-541-3900",
        "Office of Emergency Management: 732-541-4007, OEM@carteret.net",
        "Office on Aging: 732-802-3014",
        "Parks: 732-541-3885, Parks@carteret.net",
        "Police Department: 732-541-4181, CPD@carteret.net",
        "Public Works: 732-541-3881, KurdylaT@carteret.net",
        "Redevelopment Agency: 732-541-3801, CarteretRedevelopment@gmail.com",
        "Sewerage Authority: 732-541-3878, Sewer@carteret.net",
        "Streets & Roads: 732-541-3881, DPW@carteret.net",
        "Carteret Public Library: 732-541-3830, Library@carteret.net",
        "Mayor's Office: 732-541-3801, MayorsOffice@carteret.net",
        "Economic Development: 732-541-3801, EcDevInfo@carteret.net",
        "Carteret Port Authority: 732-541-3802"],
    "",
    ""
]);
modelMap.set("Edison Township", ["/models/cities/middlesex/edison.glb",
    [
        "",
    ],
    [
        "Animal Shelter: 732-248-7278, eas@edisonnj.org",
        "Clerk's Office: 732 248-7350, crussomanno@edisonnj.org",
        "Code Enforcement: 732-248-7257, pleary@edisonnj.org",
        "Edison TV: 732-248-7426, mdamato@edisonnj.org",
        "Department of Planning & Engineering: 732-248-7248, cmeengineering@edisonnj.gov",
        "Fire Division: 732-248-7558",
        "Edison Public Library: 732 287-2298, helpdesk@edisonpubliclibrary.org",
        "Mayor Sam Joshi: 732-248-7298, mayorjoshi@edisonnj.org",
        "Municipal Court: 732-248-7328, edisoncourt@edisonnj.gov",
        "Office of Emergency Management: 732-404-8681, oemcoordinator@edisonnj.org",
        "Edison Police Department: 911, COP@edisonpd.org",
        "Public Works: 732-248-7288, publicworks@edisonnj.org",
        "Purchasing Division: purchasing@edisonnj.org",
        "Edison Recreation: 732-248-7310",
        "Senior Citizen Services: 732-248-7345"
    ],
    "",
    ""
])
modelMap.set("Highland Park", ["/models/cities/middlesex/highland park.glb",
    [
        "",
    ],
    [
        "Clerk | Highland Park, NJ: 732-777-6014, jsantiago@hpboro.com",
        "Communications | Highland Park, NJ: 732-819-3781, hglazer@hpboro.com, hglazer@hpboro.com ",
        "Construction/Code Enforcement | Highland Park, NJ: 732-819-3795, sbrescher@hpboro.com",
        "Finance | Highland Park, NJ: 732-572-3400, lmajeski@hpboro.com",
        "Health Services | Highland Park, NJ: 732-777-6013, Kathleen.Smith@co.middlesex.nj.us",
        "Public Works | Highland Park, NJ: 732-514-1277, mwieczorkiewicz@hpboro.com",
        "Tax Assessor | Highland Park, NJ: 732-572-340, tmancuso@hpboro.com",
        "Tax Collector | Highland Park, NJ: 732-819-3787, mramos@hpboro.com",
        "Water & Sewer | Highland Park, NJ: 732-819-3788, mramos@hpboro.com"

    ],
    "",
    ""
]);
modelMap.set("Metuchen", ["/models/cities/middlesex/metuchen.glb",
    [
        ""
    ],
    [
        "Administrator: 732-632-8509, mperilstein@metuchen.com",
        "Schedule Building Inspection: 732-632-8515, jcovey@metuchen.com",
        "Clerk: 732-632-8508, dzupan@metuchen.com",
        "Construction Officia: 732-632-8515",
        "Finance: 732-632-8512: bcuthbert@metuchen.com",
        "Health Inspector: 732-632-8504, victoria.otersen@co.middlesex.nj.us",
        "Library: 732-632-8526, hsichung@lmxac.org",
        "Metuchen Arts Council: metuchen.arts@gmail.com",
        "Municipal Court: 732-632-8505, wwilliams-fisher@metuchen.com",
        "Metuchen Media: 732-603-9750, buhlig@metuchen.com",
        "Office of Emergency Management: 732-632-8500, flaherty@metuchenpd.org",
        "Parking Authority: 732-548-5553, metuchenpa@optimum.net",
        "Planning and Zoning Office: 732-632-8556, shollis@metuchen.com",
        "Police and Fire (non emergency): 732-632-8500, flaherty@metuchenpd.org",
        "Parking Authority: 732-548-5553, metuchenpa@optimum.net",
        "Planning and Zoning Office: 732-632-8556, shollis@metuchen.com",
        "Police and Fire (non emergency): 732-632-8500, flaherty@metuchenpd.org",
        "Pool Business Office: 732-632-8512, bcuthbert@metuchen.com",
        "Public Works Superintendent: 732-632-8563, blewis@metuchen.com",
        "Public Works - General: 732-632-8518, recycle@metuchen.com",
        "Recreation Director: 732-632-8502, rperrine@metuchen.com",
        "Recycling: 732-632-8519, recycle@metuchen.com",
        "Registrar of Vital Statistics: 732-632-8523, mmulligan@metuchen.com",
        "Senior Citizens Center: 732-632-8524, wrichards@metuchen.com",
        "Tax Assessor: 732-632-8516, rduda@metuchen.com",
        "Tax Collector: 732-632-8512, bcuthbert@metuchen.com",
        "Zoning Official: 732-632-8514, tdimartino@metuchen.com"
    ],
    "",
    ""
]);
modelMap.set("New Brunswick", ["/models/cities/middlesex/new brunswick.glb"]);
modelMap.set("Old Bridge Township", ["/models/cities/middlesex/old bridge.glb"]);
modelMap.set("Perth Amboy", ["/models/cities/middlesex/perth_amboy.glb"]);
modelMap.set("Piscataway Township", ["/models/cities/middlesex/piscataway.glb"]);
modelMap.set("Sayreville", ["/models/cities/middlesex/sayreville.glb"]);
modelMap.set("South Amboy", ["/models/cities/middlesex/south_amboy.glb"]);
modelMap.set("South Plainfield", ["/models/cities/middlesex/south plainfield.glb"]);
modelMap.set("Woodbridge Township", ["/models/cities/middlesex/woodbridge.glb"]);
modelMap.set("Aberdeen Township", ["/models/cities/monmouth/aberdeen.glb"]);
modelMap.set("Allenhurst", ["/models/cities/monmouth/allenhurst.glb"]);
modelMap.set("Asbury Park", ["/models/cities/monmouth/asbury park.glb"]);
modelMap.set("Atlantic Highlands", ["/models/cities/monmouth/atlantic highlands.glb"]);
modelMap.set("Bradley Beach", ["/models/cities/monmouth/bradley beach.glb"]);
modelMap.set("Deal", ["/models/cities/monmouth/deal.glb"]);
modelMap.set("Fair Haven", ["/models/cities/monmouth/fair haven.glb"]);
modelMap.set("Hazlet Township", ["/models/cities/monmouth/hazlet.glb"]);
modelMap.set("Highlands", ["/models/cities/monmouth/highlands.glb"]);
modelMap.set("Interlaken", ["/models/cities/monmouth/interlaken.glb"]);
modelMap.set("Keansburg", ["/models/cities/monmouth/keansburg.glb"]);
modelMap.set("Keyport", ["/models/cities/monmouth/keyport.glb"]);
modelMap.set("Little Silver", ["/models/cities/monmouth/little silver.glb"]);
modelMap.set("Loch Arbour", ["/models/cities/monmouth/loch arbour.glb"]);
modelMap.set("Long Branch", ["/models/cities/monmouth/long branch.glb"]);
modelMap.set("Matawan", ["/models/cities/monmouth/matawan.glb"]);
modelMap.set("Middletown Township", ["/models/cities/monmouth/middletown.glb"]);
modelMap.set("Monmouth Beach", ["/models/cities/monmouth/monmouth beach.glb"]);
modelMap.set("Neptune City", ["/models/cities/monmouth/neptune.glb"]);
modelMap.set("Neptune Township", ["/models/cities/monmouth/neptune twp.glb"]);
modelMap.set("Oceanport", ["/models/cities/monmouth/ocean port.glb"]);
modelMap.set("Rumson", ["/models/cities/monmouth/rumson.glb"]);
modelMap.set("Sea Bright", ["/models/cities/monmouth/sea bright.glb"]);
modelMap.set("Union Beach", ["/models/cities/monmouth/union beach.glb"]);
modelMap.set("West Long Branch", ["/models/cities/monmouth/west long branch.glb"]);
modelMap.set("Shrewsbury", ["/models/cities/monmouth/shrewsbury.glb"]);

const selectedMaps: string[] = [
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
    "Old Bridge Township",
    "Red Bank",
    "Rumson",
    "Sea Bright",
    "Union Beach",
    "West Long Branch",
    "Shrewsbury"
];

const extraRender: string[] = [
    "/models/rivers/Middlesex River.glb",
    "/models/rivers/Monmouth River.glb",
    "/models/nj.glb",
];

export default function createMap(el: HTMLCanvasElement, location: HTMLSpanElement, hoveringOverLocation: HTMLSpanElement, funFacts: HTMLUListElement, contactInfo: HTMLUListElement, searchBar: HTMLInputElement) {
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
    }, resize = () => {
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
        if (Math.abs(mouseVector.x) > 1 || Math.abs(mouseVector.y) > 1) return;

        let selectedObject: string | undefined;
        for (const [name, obj] of maps.entries()) {
            if (selectedMaps.indexOf(name) == -1) continue;
            if (name == location.innerText) continue;
            try {
                const object = obj.scene.children[0].geometry.boundingBox;
                const position = obj.scene.children[0].position;
                const newBox = { ...object };
                newBox.min = { ...object.min };
                newBox.max = { ...object.max };
                newBox.min.x += position.x;
                newBox.min.y += position.y;
                newBox.min.z += position.z;
                newBox.max.x += position.x;
                newBox.max.y += position.y;
                newBox.max.z += position.z;
                const intersection = raycaster.ray.intersectsBox(
                    newBox as Box3
                );
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
            const position = obj.scene.children[0].position;
            const newBox = { ...object };
            newBox.min = { ...object.min };
            newBox.max = { ...object.max };
            newBox.min.x += position.x;
            newBox.min.y += position.y;
            newBox.min.z += position.z;
            newBox.max.x += position.x;
            newBox.max.y += position.y;
            newBox.max.z += position.z;
            const intersection = raycaster.ray.intersectsBox(
                newBox as Box3
            );
            if (!intersection) continue;
            selectedObject = name;
            break;
        }
        if (!selectedObject) return;

        tpToObj(selectedObject);
    });

    function tpToObj(selectedObject: string) {
        const averagePosition = maps.get(selectedObject).scene.children[0].position;
        hasClicked = true;
        controls.enabled = false;
        controls.dispose();
        let i = 0;
        const interval = setInterval(() => {
            camera.position.x -= (camera.position.x - averagePosition.x) / 10;
            camera.position.y -= (camera.position.y - 2) / 10;
            camera.position.z -= (camera.position.z - averagePosition.z) / 10;
            i++;
            if (i < 100) return;
            clearInterval(interval);
            controls.position0 = camera.position.clone();
            controls.object = camera;
            const target = new Vector3(0, 0, -1)
                .applyQuaternion(camera.quaternion)
                .add(camera.position);
            controls = new OrbitControls(camera, el);
            controls.target = target;
            camera.lookAt(target);
            hasClicked = false;
            controls.listenToKeyEvents(document);
            if (!selectedObject) return;
            location.innerText = selectedObject;

            funFacts.innerText = "";
            const funFax = modelMap.get(selectedObject)![1];
            for (let i = 0; i < funFax.length; i++) {
                const li = document.createElement("li");
                li.innerText = funFax[i];
                funFacts.appendChild(li);
            }

            contactInfo.innerText = "";
            const contactInfos = modelMap.get(selectedObject)![2];
            for (let i = 0; i < contactInfos.length; i++) {
                const li = document.createElement("li");
                li.innerText = contactInfos[i];
                contactInfo.appendChild(li);
            }
        }, 10);
    }

    searchBar.addEventListener('keydown', e => {
        const input = searchBar.value.toLowerCase();
        const sortedMaps = selectedMaps
            .map(m => [
                m,
                stringDistance(input, m.toLowerCase())
            ] as [string, number])
            .sort((a, b) => b[1] - a[1])
            .filter(e => e[1] > 0)
            .map(e => e[0]);

        switch (e.key) {
            case "Enter":
                if (!sortedMaps[0]) return;
                tpToObj(sortedMaps[0]);
                searchBar.value = "";
                break;
        }
    });
}

function stringDistance(str1: string, str2: string): number {
    let longestSubstring = "";

    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let substring = "";
            let x = i;
            let y = j;

            while (x < str1.length &&
                y < str2.length &&
                str1[x] === str2[y]) {
                substring += str1[x];
                x++;
                y++;
            }

            if (substring.length > longestSubstring.length) {
                longestSubstring = substring;
            }
        }
    }

    return longestSubstring.length;
}