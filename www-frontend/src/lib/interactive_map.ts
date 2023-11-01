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
        "Population: 25,326",
        "Area: 4.93mi²",
        "Carteret is home to the Wildlife Conservation and Education Center, which houses a variety of exotic animals and provides educational programs.        ",
        "Carteret was named after Lord Carteret and his son. They were important in the founding of New Jersey.        ",
    ],
    [
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
        "Population: 107,588",
        "Area: 30.69mi²",
        "This was the town where Thomas Edison invented the lightbulb and where worked for many years.",
        "The town is known for its large diverse and ethnic population, which is fastly growing.",
        "The creators are from this town!",


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
        "Population: 30,177",
        "Area: 1.83mi²",
        "The highest point of land on the coast from Texas to Maine is in Highlands.",
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
        "Population: 14,949",
        "Area: 2.842mi²",
        "Also known as “The Brainy Borough” because of the many professionals, artists, educators and literary figures (and now even a former Governor) who lived here",
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
modelMap.set("Old Bridge Township", ["/models/cities/middlesex/old bridge.glb", [
    "Population: 65,898",
    "Area: 41 mi²  ",
    "Old Bridge hosts the Old Bridge Raceway Park, a famous drag racing venue.    ",
    "The town is home to Cheesequake State Park, known for its beautiful nature trails and a unique name inspired by Native American folklore.  ",
],
    [
        "Administration: 732-745-5007",
        "Clerk's Office: 732-745-5041",
        "Engineering: 732-745-5056",
        "Finance: 732-745-5045",
        "Fire: 732-745-5254",
        "Human and Community Services: 732-246-5353",
        "Law: 732-745-5025",
        "Mayor's Office: 732-745-5004",
        "Planning, Community, and Economic Development: 732-745-5050",
        "Police: 732-745-5200",
        "Public Works: 732-745-5105",
        "Social Services: 732-745-5100",
        "Water Utility: 732-745-5062",
    ],
    "",
    ""]);
modelMap.set("Perth Amboy", ["/models/cities/middlesex/perth_amboy.glb", 
[
    "Population: 55,291",
        "Area: 4.55mi²",
        "The city's original name, Amboy, is of Native American origin.",
],[
    "Business Administration: 732-826-0290 Ext. 4009, Sonia Neira, Personnel Officer",
    "City Clerk: 732-826-0290 Ext. 4018, ",
    "Code Enforcement: 732-826-0183",
    "Economic & Community Dev: 732-826-0290 ext. 4863",
    "Finance Office: 732-826-0290 Ext. 4033",
    "Fire Department: 732-324-3500",
    "Human Services: 732-826-1690 ext. 4322",
    "Municipal Court: 732-442-6011",
    "Police Department: 732-324-3800",
    "Public Library: 732-826-2600",
    "Public Works: 732-826-2010",
    "Tax Assessor: 732-826-0290 Ext. 4029",
    "Tax Collection: 732-826-0290 Ext. 4022",

],
"",
""]);
// ,[""],[],"",""
modelMap.set("Piscataway Township", ["/models/cities/middlesex/piscataway.glb",[
    "Population: 56,923",
        "Area: 19.1mi²",
        "Piscataway is the fifth oldest municipality in New Jersey and one of the fifty oldest towns in the nation.",
],
[
    "Administration Department:732-562-2301",
    "Community Development Department: 732-562-6560",
    "Construction & Building Division: 732-562-2325",
    "Department on Aging: 732-562-1133",
    "Engineering Division: 732-562-6560",
    "Finance Department: 732-562-2316",
    "Fire/Rescue: 732-562-2333",
    "Fire Prevention Bureau: 732-562-2315",
    "Health Department: 732-562-2361",
    "Housing Certificate of Occupancy Office: 732-562-2393",
    "HR: 732-562-2308",
    "Library: Kennedy: 732-463-1633",
    "Library: Westergard: 732-752-1166",
    "Mayor's Office: :732-562-2301",
    "Municipal Alliance: 732-562-2397",
    "Municipal Complex: 732-562-2300",
    "Office of Emergency Management: 732-562-7621",
    "Parks and Recreation: 732-562-2389",
    "PCTV: 732-562-2305",
    "Personnel: 732-562-2308",
    "Planning Division: 732-562-6570",
    "Police Department: 732-562-1100",
    "Police Investigations: 732-562-2318",
    "Police Special Victims: 732-562-2371",
    "Police Services/Extra Duty: 732-562-2348",
    "Police Traffic: 732-562-2309",
    "Property Maintenance: 732-562-7638",
    "Public Information: 732-653-7384",
    "Public Works: 732-562-2390",
    "Purchasing: 732-562-2320",
    "Senior Citizens Center: 732-562-1133",
    "Senior Housing: 732-699-0033",
    "Tax Assessor: 732-562-2328",
    "Tax Collector: 732-562-2331",
    "TDD: Police: 732-562-2306",
    "Township Clerk Department: 732-562-2310",
    "Zoning Division: 732-562-6560"
],
"",
""]);
modelMap.set("Sayreville", ["/models/cities/middlesex/sayreville.glb",[
    "Population: 45,086 ",
        "Area: 18.66mi²",
        "Until the 1870s, Sayreville was an important river port.",
],
[
    "Administration: 732-390-7022, becky@sayreville.com",
    "Borough Clerk: 732-390-7025, gskarzynski@sayreville.com",
    "Code Enforcement: 732-390-7028, codeenforcement@sayreville.com",
    "Construction: 732-390-7077, construction@sayreville.com",
    "Emergency Medical Services: 732-390-7011 (non-emerg)",
    "Finace: 732-390-7035, DBiancamano@sayreville.com",
    "Fire Prevention: 732-390-7009, fireprevention@sayreville.com",
    "Health: 732-390-7012, boardofhealth@sayreville.com",
    "Library: 732-727-0212, lkloc@lmxac.org ",
    "MUNICIPAL COURT: 732-525-5446, court@sayreville.com",
    "Office on Aging: 732-390-7000x7333, JBetzler@sayreville.com",
    "Police: 732-727-4444 or 911, dplumacker@sayreville.com",
    "Public Works: 732-390-7042, publicworks@sayreville.com",
    'Recreation: 732-390-7092/7096, JeffS@sayreville.com',
    "Recycling: 732-390-7008, recycling@sayreville.com",
    "Fire Department: 732-407-2517, MJohnsen@sayreville.com",
    "Tax Assessor: 732-390-7080, KenK@sayreville.com",
    "Tax Collector: 732-390-7036, KatieE@sayreville.com",
    "Water & Sewer Department: 732-390-7060, water@sayreville.com",
    "Zoning: 732-390-7004, zoningofficer@sayreville.com"
],
"",""]);
modelMap.set("South Amboy", ["/models/cities/middlesex/south_amboy.glb",[
    "Population: 9,327 ",
        "Area: 3mi²",
        "South Amboy has passed through three of the five types of New Jersey municipalities.",
],
[
    "Administration: 732-525-5933, kudelkak@southamboynj.gov",
    "Ambulance/EMS/First Aid/Police: 732-721-0111",
    "Animal Control: 732-855-0600",
    "Arts Alliance: 732-727-4600x5971, SAarts141@google.com",
    "Board (Planning/Zoning): 732-525-5932, walentyk@southamboynj.gov",
    "Building: 732-525-5927, forted@southamboynj.gov",
    "Clerk: 732-525-5920, clerk@southamboynj.gov",
    "Code Enforcement: 732-525-5927",
    "Court: 732-525-5929, prosecutor@southamboynj.gov",
    "Emergency Management: 732-588-5830, saoem@southamboynj.gov",
    "Finance: 732-525-5922, balkad@southamboynj.gov",
    "Fire Chief: 732-727-7434, firechief@southamboynj.gov",
    "Health Office: 732-525-5961, Mike.miro@co.middlesex.nj.us",
    "Historic Preservation Commision: hpcsouthamboy@gmail.com",
    "Library: 732-721-6060, comments@dowdell.org",
    "City Attorney: 732-525-5920",
    "City Engineer: 732-605-9440",
    "Public Works: 732-721-8100, moffal@southamboynj.gov",
    "Purchasing: 732-525-5938, ManionK@southamboynj.gov",
    "Recreation/Community Events: 732-525-5965, recreation@southamboynj.gov",
    "Redevelopment Agency: 732-221-9064, southamboyredevelopment@gmail.com",
    "Rental Housing Inspections: 732-525-5936, SorrentinoJ@southamboynj.gov",
    "Senior Citizen: 732-525-5960, burkek@southamboynj.gov",
    "Sewer Billing: 732-525-5924, katkoj@southamboynj.gov",
    "Housing Authority: (732) 721-1831",
    "Tax Assessor: 732-525-5969, EnrightB@southamboynj.gov",
    "Tax Collection: 732-525-5924, katkoj@southamboynj.gov",
    "TV & Radio Stations: 732-525-5965, satv@southamboynj.gov",
    "Vital Statistics / Registrar: 732-525-5924, katkoj@southamboynj.gov",
    "Zoning Officer: 732-636-2121, valetuttoj@southamboynj.gov"
],
"",""]);
modelMap.set("South Plainfield", ["/models/cities/middlesex/south plainfield.glb",[
    "Population: 24,243 ",
        "Area: 38.33mi²",
        "George Clinton founded The Parliaments while working in a barber shop in Plainfield.",
],
[
    "Administrator / Chief Financial Officer: (908) 226-7602",
    "Assessor: (908) 226-7622",
    "Building Department: (908) 226-7640",
    "Code Enforcement Officer: (908) 226-7632",
    "Construction Officer: (908) 226-7645",
    "Clerk: (908) 226-7605",
    "Court: (908) 226-7651",
    "Mayor: (908) 226-7601",
    "Mayor's Secretary and Confidential Assistant: (908) 226-7604",
    "Municipal Court Judge: (908) 226-7651",
    "Court Administrator: (908) 226-7650",
    "Deputy Court Administrator: (908) 226-7652",
    "Prosecutor:(908) 526-0707",
    "Public Defender: (908) 756-0785",
    "Emergency Management: (908) 226-7718",
    "Fire Department: (908) 226-7715",
    "Fire Prevention: (908) 226-7715",
    "Health Department: (908) 226-7634",
    "Library: (908) 754-7885",
    "Police Department: (908) 755-0700",
    "Police Records Room: (908) 226-7670",
    "Public Works Department: (908) 755-2187",
    "Registrar of Vital Statistics: (908) 226-7607",
    "Recreation Department: (908) 226-7713",
    "Recycling: (908) 226-7621",
    "Recycling Commission: (908) 226-7620",
    "Rescue Squad: 9-1-1",
    "Senior Center: (908) 754-1047",
    "Social Services/Welfare Department: (908) 226-7625",
    "Tax Collector: (908) 226-7613",
    "Zoning Officer: (908) 226-7630",
    "Planning/Zoning Secretary: (732) 215-6383"
],
"",""]);
modelMap.set("Woodbridge Township", ["/models/cities/middlesex/woodbridge.glb",[
    "Population: 100,450 ",
        "Area: 24.61mi²",
        "It is the oldest original township in the state of New Jersey.",
],
[
    "Administration & Finance: 7326344500, vito.cimilluca@twp.woodbridge.nj.us",
    "Clerk's Office: 7326026007, john.mitch@twp.woodbridge.nj.us",
    "Division of Engineering: 7326026047,ENGINEERING@twp.woodbridge.nj.us",
    "Division of Purchasing: 7327262335, jennifer.burns@twp.woodbridge.nj.us",
    "Emergency Services: 7326027361",
    "Health & Human Services: 732-855-0600, ext. 5027, phil.bujalski@twp.woodbridge.nj.us",
    "HR: 732-634-4500 x6400, Humanresources@twp.woodbridge.nj.us ",
    "Municipal Court: 7326366430, woodbridge.court@twp.woodbridge.nj.us",
    "Police Department: 7326347700",
    "Library: 732-634-4450, wplref@woodbridgelibrary.org",
    "Public Works: 732-738-1311, Ext. 3010",
    "Recreation Programs: 7325964048",
    "Senior Services: 7327266262, michele.morgan@twp.woodbridge.nj.us",
    "Tax Assessor: 7326026002, richard.duda@twp.woodbridge.nj.us",
    "Tax Collector: 7326026010, TaxOffice@twp.woodbridge.nj.us",
    "Woodbridge Television: 7327262310, tv35@twp.woodbridge.nj.us"
]
,"",""]);
modelMap.set("Aberdeen Township", ["/models/cities/monmouth/aberdeen.glb",[
    "Population: 18,636 ",
        "Area: 7.772mi²",
        "The earliest known attempt at European settlement was in 1650 when the south side of Raritan Bay was purchased from the Lenni Lenape by the New Netherland Colony.",
],
[
    "Clean Communities: (732)583-4200 ext 132, Brittany.Shea@aberdeennj.org ",
    "Clerk: (732)583-4200 x119, melissa.pfeifer@aberdeennj.org",
    "Code Enforcement: 732-583-4200, ext. 196, code.enforcement@aberdeennj.org",
    "Commuter Parking: (732)583-4200 ext403, margarita.incle@aberdeennj.org",
    "Construction: 732-583-4200, ext. 121, Richard.Perlman@aberdeennj.org",
    "Finance: 732-583-4200, ext. 128 (only in emergency), angela.morin@aberdeennj.org",
    "Health: (732)583-4200 ext 129, patricia.geyer@aberdeennj.org",
    "Municipal Court: 732-583-4200, ext. 105, michele.wieczoreck@aberdeennj.org",
    "Planning, Zoning & Development: 732-583-4200, ext. 120, Paula.Ramsay@aberdeennj.org",
    "Public Information: 732-583-4200, ext. 130, john.roman@aberdeennj.org",
    "Police: 7325662054, matthew.lloyd@aberdeennj.org",
    "Recreation: 732-583-4200, ext. 134, Keith.Heckman@aberdeennj.org",
    "Registrar of Vital Statistics: 732-583-4200, ext. 100, margarita.incle@aberdeennj.org",
    "Tax Assessor: 732-583-4200, ext. 122, scott.kineavy@aberdeennj.org",
    "Tax Collector: (732)583-4200, ext. 127: lisa.altman@aberdeennj.org",
    "Township Manager: 732-583-4200 ext 118, bryan.russell@aberdeennj.org",
    "Utilities: 7325834200 x288, michele.hausmann@aberdeennj.org"
]
,"",""]);
modelMap.set("Allenhurst", ["/models/cities/monmouth/allenhurst.glb",[
    "Population: 470 ",
        "Area: 0.28mi²",
        "The Borough of Allenhurst was developed on the site of a 120 acre farm originally owned by Abner Allen.",
],
[
    "Administration: (732) 531-2757 Option 2",
    "Allenhurst Garden Club: (732) 531-2757",
    "Allenhurst Police Department: (732) 531-2255",
    "Borough Clerk: (732) 531-2757 Option 2",
    "Construction Office: Thursday, 8am-12pm: (732) 531-2757 Option 9",
    "Finance Department: 732-531-2757 Option 2",
    "Fire Department and First Aid: (732) 531-7239",
    "Municipal Court: (732) 776-2999 ext. 1045",
    "Office of Emergency Management: (732) 531-2255",
    "Public Works: (732) 531-2757",
    "Registrar / Vital Statistics: 732-531-2757 Option 2",
    "Tax Assessor: 732-531-2757 Option 3",
    "Tax Collector: 732-531-2757 Option 2"
]
,"",""]);
// ,[""],[],"",""
modelMap.set("Asbury Park", ["/models/cities/monmouth/asbury park.glb",[
    "Population: 15,194 ",
        "Area: 1.61mi²",
        "It was founded in 1871 by James A. Bradley, a New York manufacturer, who named it for the Reverend Francis Asbury, founder of Methodism in the United States.",
],
[
    "City Manager: 732-502-5755, donna.vieiro@cityofasburypark.com",
    "City Clerk: 7325025720, lisa.esposito@cityofasburypark.com",
    "City Court: 7327751765",
    "Community Development: 7325025741, robert.goodman@cityofasburypark.com",
    "Construction: 7325025722",
    "Film & Photo Permits: 7325025759, Leesha.floyd@cityofasburypark.com",
    "Finance: joann.boos@cityofasburypark.com",
    "Fire Department: 7327756300",
    "Health Department: 7324317456",
    "HR: 7327752100",
    "Parking and Transportation: 7325024562, parking@cityofasburypark.com",
    "Planning & Redevelopment & Zoning: 7325025724, chrisann.degenaro@cityofasburypark.com",
    "Police Department: 7327741300 or 911",
    'Library: (732)774-4221, apl-info@asburyparklibrary.org',
    "Public Works: 732-775-0900",
    "Recreation: 7325025759, Leesha.floyd@cityofasburypark.com",
    "Senior Center: 7329885252",
    "Social Services: 7325024528",
    "Tax Assessor: 7325025750, michael.delre@cityofasburypark.com",
]
,"",""]);
modelMap.set("Atlantic Highlands", ["/models/cities/monmouth/atlantic highlands.glb",[
    "Population: 4,417 ",
        "Area: 4.564mi²",
        "The town overlooks where the Atlantic Ocean and Raritan Bay meet at Sandy Hook, and its hills mark the highest point on the eastern seaboard of the U.S. south of Maine.",
],
[
    "Administrator: 732-291-1444 x 3101, rferragina@ahnj.com",
    "Building Department: 732-291-1444 x 3106, 732-291-1444 x 3106",
    "Chief Financial Officer: 732-291-1444 x 3104, csantiago@ahnj.com",
    "Code Enforcement Officer: 732-291-1444  3111, codeenforcement@ahnj.com",
    "Court Administrator: 732-291-1444 Press #4 at main menu, court@ahnj.com",
    "Harbor: 732-291-1444 Press #5 at main menu, ahharbor@ahnj.com",
    "Human Resources: 732-291-1444 x 3107, emerkel@ahnj.com",
    "Monmouth County Library: 732-291-1444  Press #3 at main menu",
    "Municipal Clerk: 732-291-1444 x3103, clerk@ahnj.com",
    "Planning Board Secretary: 732-291-1444 x3108, cbusichio@ahnj.com",
    "Public Works Director: 732-291-1444 x3110, jphillips@ahnj.com",
    "Non Emergency Police: 732-291-1212",
    "Recreation: 732-291-1444 Press #6 at main menu, recreation@ahnj.com",
    "Registrar of Vital Statistics: 732-291-1444 3107, clerk@ahnj.com",
    "Tax Assessor: 732-291-1444 x3109, taxassessor@ahnj.com",
    "Tax/ Utility Collector: 732-291-1444 x3105, utilitycollector@ahnj.com"
]
,"",""]);
modelMap.set("Bradley Beach", ["/models/cities/monmouth/bradley beach.glb",[
    "Population: 4,273 ",
        "Area: 0.633mi²",
        " The earliest accounts of Bradley Beach can be traced back to 1679 when it is said that Captain William Kidd anchored his vessel off Duck Creek, now known as Sylvan Lake.",
],
[
    "Assessment Office: (732) 776-2999 Ext. 1019",
    "Beach Department: (732) 776-2999 Ext. 3310",
    "Borough Administrator: (732) 776-2999 Ext. 1012",
    "Borough Clerk Office: (732) 776-2999 Ext. 1026",
    "Borough Deputy Office: (732) 776-2999 Ext. 1029",
    "Bradley Beach Communications: (732) 776-2999",
    "Community Development: (732) 776-2999 Ext. 1016",
    "Emergency Management: (732) 775-6900",
    "Finance Department: (732) 776-2999 Ext. 1025",
    "Fire Department: (732) 776-2402",
    "First Aid Squad: (732) 776-2997",
    "Municipal Court: (732) 776-2999 Ext. 1045",
    "Police Department: (732) 775-6900",
    "Public Works: (732) 776-2999 Ext. 3101",
    "Recreation Department: (732) 776-2999 Ext. 3210",
    "Tax Collector: (732) 776-2999 Ext. 1052",
    "Tourism Department: (732) 776-2999 Ext.1028",
    "Zoning Office: (732) 776-2999 Ext. 1038"
]
,"",""]);
// ,[""],[],"",""
modelMap.set("Deal", ["/models/cities/monmouth/deal.glb",[
    "Population: 895 ",
        "Area: 1.2mi²",
        "Captain Kidd's crew once visited this shore town in 1703, as did George Washington in 1777.",
],
[
    "Borough Hall: (732) 531-1454",
    "Public Works: 7325311454 ",
    "Municipal Court Staff: 7325311343",
    "Police Department: 7325311113",
    "Fire Department: 7325311000",
    "First Aid: 7325311000",
    "Zoning: Zoning@dealborough.com"
]
,"",""]);
modelMap.set("Fair Haven", ["/models/cities/monmouth/fair haven.glb",[
    "Population: 6,204 ",
        "Area: 2.112mi²",
        "It was built in 1882 by Lawrence & Foulks.",
],
[
    "Administrator: (732) 747-0241, ext. *219, tcasagrande@fhboro.net",
    "Clerk: (732) 747-0241 ext. *221, acinquegrana@fhboro.net",
    "Code Enforcement: (732) 747-0241 ext. *332",
    "Construction: (732) 842-3022",
    "Court: (732) 530-7131",
    "Emergency Management: (732) 747-0241 ext. *301, jmcgovern@fhboro.net",
    "Engineering: (732) 747-0241 ext. *204",
    "Finance: (732) 747-0241 ext. *210, clapp@fhboro.net",
    "Fire Department: chief@fhfd.org",
    "First Aid Squad: fhfascaptain@fhfd.org",
    "Parks and Recreation: (732) 747-0241, ext. *216, recreation@fhboro.net",
    "Police Department: Non-Emergencies: (732) 747-0991",
    "Public Works: (732) 747-0241 ext. *219, bberube@fhboro.net",
    "Recycling: (732) 747-0241 ext. *219, bberube@fhboro.net",
    "Recycling: (732) 747-0241 ext. *219, bberube@fhboro.net"
]
,"",""]);
modelMap.set("Hazlet Township", ["/models/cities/monmouth/hazlet.glb",[
    "Population: 19,802 ",
        "Area: 5.668mi²",
        "Hazlet derives its name from Dr. John Hazlett.",
],
[
    "Administration: 732-217-8687",
    "Clean Communities: 732-217-8660",
    "Code Enforcement Office: 732-217-8681",
    "Municipal Court: 732-264-2231, ext. 2129",
    "Finance: 732-217-8691",
    "Fire Prevention: 732-264-1427",
    "Fire Prevention: 732-264-1427",
    "Floodplain Administration: 732-865-9487",
    "Housing Bureau: 732-264-1427",
    "Library: 732-264-7164",
    "Municipal Clerk: 732-217-8686",
    "Public Information Office: 732-217-8660",
    "Public Works: 732-217-8654",
    "Recreation: 732-217-8648",
    "Registrar & Health Services: 732-217-8686",
    "Senior Center: 732-217-8683",
    "Sewer Utility: 732-217-8643",
    "Tax Assessor: 732-217-8655",
    "Tax Collector: 732-217-8642",
    "Zoning Office: 732-217-8659",
]
,"",""]);
modelMap.set("Highlands", ["/models/cities/monmouth/highlands.glb",[
    "Population: 4,636 ",
        "Area: 1.398mi²",
        "The first land sighted by millions of immigrants approaching America was the hills of Highlands.",
],
[
    "Administration: (732) 872-1224 x203, mmuscillo@highlandsborough.org",
    "Board of Education: (732) 872-0900 Ext 2006, tbeams@tri-district.us",
    "Building and Zoning Department: (732) 615-2106, construction@highlandsborough.org",
    "Code Enforcement: (732) 872-1224 x215, code@highlandsborough.org",
    "Department of Public Works: (732) 872-1224 x250, publicworks@highlandsborough.org",
    "Emergency Management: (732) 241-8931, highlandsoem@highlandsborough.org",
    "TAX ASSESSOR: 732-872-1224 x211, assessor@highlandsborough.org",
    "Fire Department: hfdofficers@highlandsfiredepartment.com",
    "Fire Prevention: (732) 872-1224 Ext. 252, pmurphy@highlandsborough.org",
    "Highlands First Aid Squad: (858) 300-2505, highlandsems1721@gmail.com",
    "Housing Authority: (732) 872-2022 x10, reneed@highlandsha.org",
    "Land Use Board: (732) 872-1224 x 201, landuse@highlandsborough.org",
    "Municipal Alliance: (908) 601-5091,",
    "Municipal Court: (732) 291-3225, janice.swaggerty1@njcourts.gov",
    "Police Department: (732) 872-1158 or 911",
    "Recreation Department: (732) 872-1224 ext. 232, recreation@highlandsborough.org",

]
,"",""]);
//,[""],[],"",""
modelMap.set("Interlaken", ["/models/cities/monmouth/interlaken.glb",[
    "Population: 825 ",
        "Area: 0.39mi²",
        "Interlaken was formed as a Borough on March 11, 1922, from portions of Ocean Township.",
],
[
    "Tax & Finance: 1-888-238-1233, tmcdermott@interlakenboro.com",
    "Building & Code: 732-531-7405",
    "Public Works: (732) 517-0005",
    "Borough Hall: (732) 531-7405, ba@interlakenboro.com",
    "Construction Dept: (732) 531-7405",
    "Fire Department: (732) 531-7239",
    "Library: (732) 531-7405, vlabella@interlakenboro.com",
    "Municipal Court: (732) 531-1343",
    "Police: (732) 531-3688"
]
,"",""]);
modelMap.set("Keansburg", ["/models/cities/monmouth/keansburg.glb",
    [
        "Population: 9,751",
        "Area: 6.44 mi²",
        " Keansburg is home to the Keansburg Amusement Park, a popular attraction for families and thrill-seekers.",
        "The town features beautiful views of the New York City skyline from its waterfront areas.        ",
    ],
    [
        "Code Enforcement and Construction Office: 732-787-0215 Ext. 228, Ed.Striedl@keansburg-nj.us",
        "Registrar of Vital Statistic: 732-787-0215  Ext 132",
        "Parks and Recreation: 732-787-0215 x212",
        "Police: (732) 787-0600",
        "Public Works: 732-787-0215 ext. 247",
        "School District: 732-787-2007, webmaster@keansburg.k12.nj.us",
        "Water/Sewer Department: 732-787-3903",
    ],
    "",
    ""]);
modelMap.set("Keyport", ["/models/cities/monmouth/keyport.glb",[
    "Population: 7,196 ",
        "Area: 1.46mi²",
        "Keyport's nickname is the \"Pearl of the Bayshore\" or the \"Gateway to the Bayshore\".",
],
[
    "Mayor: 732-739-5120, MayorAraneo@keyportonline.com",
    "Borough Administrator: 732-739-5122, khumphrey@keyportonline.com",
    "Borough Clerk: 732-739-5124, mclark@keyportonline.com",
    "Building & Construction: 732-739-5134, lgraham@keyportonline.com",
    "Code Enforcement: 732-739-5134, lgraham@keyportonline.com",
    "Emergency Management: 732-739-5143, OEM@keyportonline.com",
    "Finance: 732-739-3900",
    "Fire Department: keyportfirechief@keyportonline.com",
    "Fire Prevention: 732-739-3900 ext. 5269, lgraham@keyportonline.com",
    "Health & Vital Statistics: 732-739-5136, dpurcell@keyportonline.com",
    "Municipal Court: 732-739-5155, sandra.akes@njcourts.gov",
    "Planning Board: 732-739-5123, dnellis@keyportonline.com",
    "Police Department: 732-264-0706",
    "Public Works Department: 732-739-5428, sodwyer@keyportonline.com",
    "Purchasing: 732-739-5128",
    "Recreation: 732-739-5145, recreation@keyportonline.com",
    "Recycling: 732-739-5154",
    "Registrar of Vital Statistics: 732-739-5136, dpurcell@keyportonline.com",
    "Senior Center & Skipper Bus: 732-264-4916, mcostello@keyportonline.com",
    "Tax Assessor: 732-739-5134, mdelre@keyportonline.com",
    "Tax & Utility Collector: 732-739-3900 kstencel@keyportonline.com",
    "Water & Sewer: 732-739-3900",
    "Zoning: 732-739-5134: lgraham@keyportonline.com"
]
,"",""]);
//,[""],[],"",""
modelMap.set("Little Silver", ["/models/cities/monmouth/little silver.glb",[
    "Population: 6,091 ",
        "Area: 3.32mi²",
        "Little Silver is known for its outstanding school system, and the beautifully restored railroad station is a national landmark.",
],
[
    "Borough Clerk's Office: 732-842-2400, skavendek@littlesilver.org",
    "Library: 732.747.9649, Gabrielle.Cimiluca@njcourts.gov",
    "Municipal Court: 732-842-3881",
    "Planning/Zoning Board: 732-842-0261",
    "Police: 732-747-5900",
    "Tax and Finance Department: 732-219-0812, cmarshall@littlesilver.org"
]
,"",""]);
modelMap.set("Loch Arbour", ["/models/cities/monmouth/loch arbour.glb",[
    "Population: 230 ",
        "Area: 0.13mi²",
        "Named after the Scottish highlands Lochaber area, the village of Loch Arbour, New Jersey, was formed on April 23, 195.",
],
[
    "Animal Control: (732) 922-0100",
    "Health: (732) 493-9520",
    "Sanitation: (732) 531-1454",
    "Fire / First Aid: (732) 531-3333 / 911",
    "Police: (732) 532-1113",
    "Municipal Court: (732) 531-1343",
    "Zoning: (732) 531-4740",
    "Building: (732) 531-1454"
]
,"",""]);
modelMap.set("Long Branch", ["/models/cities/monmouth/long branch.glb", [
    "Population: 32,383",
    "Area: 10.11mi²",
    "Long Branch was a favorite vacation spot of seven U.S. Presidents, including Ulysses S. Grant and Woodrow Wilson.",
    "The town is home to Seven Presidents Oceanfront Park, named after the seven U.S. Presidents who visited the area.",
],
    ["Animal Control: 732-571-5665",
        "Arts & Cultural Center: 732-222-7000, ext. 2050, artscenter@longbranch.org",
        "Beach: 732-571-5697",
        "Building & Development: Building Department - 732-571-5690 Zoning Department - 732-571-5647, jpalmer@longbranch.org",
        "City Administration: 732-571-5645, cshirley@longbranch.org",
        "Finance: 732-571-5688, mmartin@longbranch.org",
        "Fire Bureau: 732-571-5651, mguarda@longbranch.org",
        "Fire Department: 732-222-0076, mguarda@longbranch.org",
        "Health: 732-571-5665, mkowal@longbranch.org",
        "Municipal Court: 732-571-6500, lmeehan@longbranch.org",
        "Office of Community and Economic Devlepoplent: 732-923-2040, jjones@longbranch.org",
        "Office of Emergency Management: 732-571-6575, sdziuba@longbranch.org",
        "Personnel: 732-571-5662, tokros@longbranch.org",
        "Planning & Zoning: 732-571-5647, ebrachman@longbranch.org",
        "Police: 732-222-1000, wbroughton@longbranch.org",
        "Programs & Events: 732-222-7000, ext. 5447, dkawut@longbranch.org",
        "Public Library: 732-222-3900, tgarcia.lbpl@gmail.com",
        "Public Works: 732-571-6520, sdziuba@longbranch.org",
        "Purchasing: 732-571-5656, dspaulding@longbranch.org",
        "Recreation & Human Services: 732-571-6545, kparker@longbranch.org",
        "Senior Affairs: 732-571-6542, pkrosnicki@longbranch.org",
        "Tax Assessor: 732-571-5658, jbutow@longbranch.org",
        "Arts & Cultural Center: 732-222-7000 ex: 2050, artscenter@longbranch.org",
        "Beach: 732-571-5697",
        "Tax Collector: 732-571-5657, taxcollector@longbranch.org",
        "Veterans: 732-842-4751",
    ],
    "",
    ""]);
modelMap.set("Matawan", ["/models/cities/monmouth/matawan.glb",[
    "Population: 9,643 ",
        "Area: 2.409mi²",
        "Town was founded by Dutch in 17th century.",
],
[
    "Mayor's Office: 732-566-3898 x605",
    "Council: 732-566-3898 x602",
    "Police: 732-566-1010 Dispatch",
    "OEM: 732-497-6400",
    "Fire: 732-522-2291",
    "First Aid: 732-566-0005",
    "Administration: 732-566-3898 x601",
    "Borough Clerk: 732-566-3898 x602",
    "Construction & Zoning: 732-583-4200 ext.120",
    "Finance: 732-566-3898 x606",
    "Health: 732-566-0740",
    "Library: 732-583-9100",
    "Municipal Court: (732) 583-4200 ext. 105 & 141",
    "Fire Prevention Bureau: 732-290-8454",
    "Property Maintenance: 732-583-4200 ext. 196",
    "Community Engagement: 732-566-3898 x630",
    "Public Works: 732-290-2011",
    "Railroad Parking: 732-566-3898 x600",
    "Recreation: 732-566-3898 x130",
    "Recycling: 732-566-3898 x132",
    "Registrar of Vital Statistics: 732-566-3898 x625",
    "Tax Assessor: 732-566-3898 x607",
    "Tax Collector: 732-566-3898 x609",
    "Utilities: 732-566-3898 x629"
]
,"",""]);
modelMap.set("Middletown Township", ["/models/cities/monmouth/middletown.glb",[
    "Population: 65,490 ",
        "Area: 58.72mi²",
        "The Seabrook-Wilson House was built in 1663 and is one of the oldest surviving structures in New Jersey.",
],
[
    "Administration: 732-615-3237",
    "Building & Inspection: 732-615-2104",
    "Township Communications: 732-615-3226",
    "Emergency Management: 732-615-2129",
    "Finance Department: 732-615-2093",
    "Fire Department: 732-615-2270",
    "Fire Prevention: 732-615-2272",
    "Health Department: 732-615-2095",
    "Human Resources: 732-615-2020",
    "Library: 732-671-3700",
    "Municipal Court: 732-615-2122",
    "Library: 732-671-3700",
    "Municipal Court: 732-615-2122",
    "Planning & Community Development: 732-615-2098",
    "Police: 732-615-2100",
    "Public Works & Engineering: 732-615-2090",
    "Purchasing: 732-615-2260",
    "Social Services: 732-615-2085",
    "Tax Assessment: 732-615-2089",
    "Tax Collection: 732-615-2086",
    "Township Clerk: 732-615-2014",
    "Vital Statistics: 732-615-2094"
]
,"",""]);
modelMap.set("Monmouth Beach", ["/models/cities/monmouth/monmouth beach.glb",[
    "Population: 3,212 ",
        "Area: 2.07mi²",
        "Monmouth County is home to a thriving arts and entertainment scene.",
],
[
    "Accident Reports: 732-229-1313",
    "Administrator: 732-229-2204 *1021",
    "Animal Licensing: DOG & CAT: 732-229-2204 *1002",
    "Bicycle Registration: Police: 732-229-1313",
    "Bingo/ Raffle Licenses: Clerk’s Office: 732-229-2204 *1002",
    "Birth Certificates: Vital Statistics: 732-229-2204 *1002",
    "Board of Education: Monmouth Beach School: 732-222-6139 *111",
    "Borough Clerk: 732-229-2204 *1002",
    "Building Inspector: 732-229-2204 *1008",
    "Comcast Cable: Cable Television: 732-542-7603",
    "Certificates of Occupancy: 732-962-5475",
    "Chief Financial Officer: 732-229-2204 *1000",
    "Chief of Police: 732-229-1345",
    "Construction Official: 732-229-2204 *1004",
    "Death Certificates: Vital Statistics: 732-229-2204 *1002",
    "Election Information: Borough Clerk: 732-229-2204 *1002",
    "Electrical Inspector: 732-229-2204 *1004",
    "Emergency Management: 732-229-1313",
    "Engineer: T&M Associates: 732-671-6400",
    "Environmental Commission: 732-229-2204 *1003",
    "Firearms Permit: Police: 732-229-1313",
    "Fire Department: Business: 732-229-2330",
    "Fire Marshal: 732-229-2204 x1009",
    "Fire Subcode: Construction Office: 732-229-2204 *1004",
    "Health Department: 732-493-9520",
    "Housing Inspector: 732-962-5475",
    "Marriage Licenses: 732-229-2204 *1002",
    "Monmouth Beach School: 732-222-6139",
    "New Jersey American Water: 1-800-272-1325",
    "Monmouth Beach School: 732-222-6139",
    "New Jersey American Water: 1-800-272-1325",
    "OPRA: Open Public Records Act: 732-229-2204 *1002",
    "Ordinances& Resolutions: Information or Copies: 732-229-2204 *1002",
    "Planning Board: 732-229-2204 *1003",
    "Police: 732-229-1313",
    "Public Works: 732-229-5513",
    "Registrar: Vital Statistics: 732-229-2204 *1002",
    "Recreation: 732-962-5475",
    "Sewer Authority: 732-229-8578",
    "Shore Regional High School: 732-222-9300",
    "Tax Assessor: 732-229-2204 *1010",
    "Tax Collector: 732-229-2204 *1003",
    "Variances: Planning Board: 732-229-2204 *1003",
    "Voter Registration: 732-229-2204 *1002",
    "Zoning Official: David Olsen: 732-229-2204 x1009"
]
,"",""]);
//,[""],[],"",""
modelMap.set("Neptune City", ["/models/cities/monmouth/neptune.glb",[
    "Population: 4,618 ",
        "Area: 0.9mi²",
        "Neptune City is 576 acres.",
],
[
    "Administration: (732) 776-7224",
    "Community Center: (732)774-0089",
    "Construction Dept: (732) 776-9204, construction@neptunecitynj.com",
    "Finance Department: (732) 776-7224 Ext. 10",
    "Municipal Clerk: (732) 776-7224 Ext. 41, clerk@neptunecitynj.com",
    "Registrar: (732) 776-7224 Ext. 10",
    "Municipal Court: (732) 775-1690",
    "Neptune City Library: (732) 988-8866, library@neptunecitynj.com",
    "Public Works: (732) 775-1607",
    "Tax and Sewer: (732) 776-7224, ajardine@neptunecitynj.com",
    "Zoning & Code Enforcement: (732) 776-7224 ext. 42",
    "Fire Department: (732) 988-4475",
    "First Aid: (732) 774-2368",
    "Police Department: (732) 775-1615"
]
,"",""]);
modelMap.set("Neptune Township", ["/models/cities/monmouth/neptune twp.glb",[
    "Population: 27,595 ",
        "Area: 8.842mi²",
        "Neptune Township was incorporated as a township on February 26, 1879.",
],
[
    "Administration: 732-988-5200 Ext. 232, glaplaca@neptunetownship.org",
    "Assessing: 732-988-5200 .x. 249, cbedrosian@neptunetownship.org",
    "Clerk’s Office: 732-988-5200 x234, gsiboni@neptunetownship.org",
    "Code Enforcement: 732-988-5200 x 210, npasquella@neptunetownship.org",
    "Construction: 732-988-5200 x 211, nrogers@neptunetownship.org",
    "EMS: 732-776-9192 Ext. 616",
    "Engineering: 732-897-4162",
    "Floodplain Management: 732-988-5200 Ext 263, dclare@neptunetownship.org",
    "Historic Preservation Commission (HPC): 732-988-5200 Ext. 278",
    "Human Resources: 732-988-5200 x 230, soppegaard@neptunetownship.org",
    "Library: 732-775-8241",
    "Marina: 732-775-7400",
    "Municipal Court: 732-988-5200 Ext. 287",
    "Fire Dept: 732-988-8510 Ext 0, info@neptunefiredistrict1.org",
    "Police Dept: (732) 988-8000",
    "Public Works: 732-775-8797",
    "Recreation: 732-869-1202",
    "Senior Services: 732-988-8855",
    "Vital Statistics: 732-988-5200, x 221"
]
,"",""]);
modelMap.set("Oceanport", ["/models/cities/monmouth/ocean port.glb",[
    "Population: 6,134 ",
        "Area: 3.79mi²",
        "While Oceanport is a small, mostly residential town of just 6,000 people, it's huge when it comes to Thoroughbred horse racing at beautiful Monmouth Park Racetrack",
],
[
    "Affordable Housing: 609 664-2769, ext 5",
    "Clerk: 732-222-8221, jsmith@oceanportboro.com",
    "Code enforcement: (732) 222-8221",
    "Construction Information: (732) 222-0641, constructionofficial@oceanportboro.com",
    "Engineering: 877-627-3772, william.white@colliersengineering.com",
    "Finance & Purchasing: 732-222-8179",
    "Fire Department: 732-542-6928, firechief@oceanportboro.com",
    "Fire Prevention: tgriffin@oceanportboro.com",
    "Health: 732-431-7000, contact@co.monmouth.nj.us",
    "Library: 732-229-2626",
    "Municipal Court: (732) 222-8222",
    "First aid squad: (732) 544-0864, FACapt@oceanportboro.com",
    "Emergency Management: (732) 222-6300, OEM@oceanportboro.com",
    "OCEANPORT POLICE DEPARTMENT: 732-222-6301, info@oceanportpolice.org",
    "Public Works: 732-222-8221 option #2, publicworks@oceanportboro.com",
    "Recreation: (732) 222-8221 EXT-1040, oprec@oceanportboro.com",
    "Registrar: 732-222-8179, jsutton@oceanportboro.com",
    "Tax Assessor: (732) 222-8221 x1023, taxassessor@oceanportboro.com",
    "Tax Collector: jsutton@oceanportboro.com",
    "Zoning: (732) 222-0641, jsmith@oceanportboro.com"
]
,"",""]);
modelMap.set("Rumson", ["/models/cities/monmouth/rumson.glb",[
    "Population: 7,280 ",
        "Area: 7.112mi²",
        "Legend has it that the borough's name is derived from early settlers who bought the piece of land now known as Rumson from the Native Americans for some rum",
],
[
    "Administrator: trogers@rumsonnj.gov",
    "Assessor's Office: (732) 431-7404, eaguiar@rumsonnj.gov",
    "Building & Construction: (732) 842-3022, shiggins@rumsonnj.gov",
    "Office of Vital Statistics: twollman@rumsonnj.gov",
    "Engineering Office: dmarks@rumsonnj.gov",
    "Finance & Tax Office: (732) 842-1170, hgraves@rumsonnj.gov",
    "Division of Fire Safety & Fire Prevention: (732) 842-3022, pmurphy@rumsonnj.gov",
    "Municipal Court: (732) 530-7131, msmallze@rumsonnj.gov",
    "Police Department: JSantaniello@rumsonnj.gov",
    "Public Works: (732) 842-8941, mwellner@rumsonnj.gov",
    "Recreation: 732-842-3300, choffmann@rumsonnj.gov"
]
,"",""]);
modelMap.set("Sea Bright", ["/models/cities/monmouth/sea bright.glb", [
    "Population: 1451",
    "Area: 1.29mi²",
    "Sea Bright is one of the narrowest incorporated towns in the United States.    ",
    "The town is known for its beautiful beaches and is a popular spot for surfing and fishing.    ",
],
    [
        "Administration:  (732) 842-0099 Ext. 113 jverruni@seabrightnj.org",
        "Assessor (732) 842-0099 Ext. 115 tanfuso@seabrightnj.org",
        "Beach 732-351-4700 dklein@seabrightnj.org",
        "Building Department (732) 842-0099, Ext. 110 ewheeler@seabrightnj.org",
        "Finance 732-842-0099, Ext. 132 Kjacobs@seabrightnj.org",
        "Fire Dept 732-842-0099, Ext. 132 ",
        "Health Commission 732-493-9520",
        "Library 732-383-8092 jfarmer@seabrightnj.org",
        "Municipal Clerk 732-842-0099 ext. 118 cpfeiffer@seabrightnj.org",
        "Municipal Court 732- 222-6517 ",
        "Unified Planning Board 732-842-0099, Ext. 123 cmitchell@seabrightnj.org",
        "Police Department 732-842-0010 bfriedman@seabrightnj.org",
        "Public Works 732-842-0099, Ext. 142 dbahrle@seabrightnj.org",
        "Recreation Department 732-842-0099, Ext. 127 dklein@seabrightnj.org",
        "Sewer Utility Department (732) 842-0099 Ext. 111 pspahr@seabrightnj.org",
        "Tax Department 732-842-0099 ext.111 pspahr@seabrightnj.org",
    ],
    "",
    ""]);
    //,[""],[],"",""
modelMap.set("Union Beach", ["/models/cities/monmouth/union beach.glb",[
    "Population: 5,723 ",
        "Area: 1.88mi²",
        "The 100-acre Poole farm became the Union Subdivision starting in 1908. The borough of Union Beach was formed in 1925 when it split off from Middletown Township",
],
[
    "Fire Chief NON EMERGENCY: UBFD6566@gmail.com",
    "Fire Department: 911",
    "First Aid Squad: 911",
    "Police Department: 732-264-0313",
    "Municipal Administrator: 732-264-3026, rmhowardjr@unionbeachnj.gov",
    "Municipal Clerk: 732-264-2277, boroughclerk@unionbeachnj.gov",
    "Sewer: 732-264-5657, aostervich@unionbeachnj.gov",
    "Board of Health: 732-264-2365, boardofhealth@unionbeachnj.gov",
    "Tax Assessor: 732-264-2360, taxassessor@unionbeachnj.gov",
    "Tax Collector: 732-264-5662, ubtax@unionbeachnj.gov",
    "Court Administrator (acting): 732-264-9098",
    "Public Works Department: 732-264-1133, rburkhardt@unionbeachnj.gov",
    "Recycling Department: 732-264-1133, rburkhardt@unionbeachnj.gov",
    "Planning Board Secretary: 732-739-7515, planningboard@unionbeachnj.gov ",
    "Recreation: 732-888-6026, ubrec@unionbeachnj.gov",
    "Code Enforcer: 732-526-8686, abencosme@unionbeachnj.gov",
    "Code Enforcement Office: 732-526-8686, CodeEnforcement@unionbeachnj.gov",
    "Construction Official: 732-526-8687, Tdavis@unionbeachnj.gov",
    "Library: 732-264-3792",
    "Board of Education: 732-264-3133",
    "Memorial School: 732-264-5400",
    "T & M Associates: 732-671-6400",
    "Emergency Management: 732-489-4108, johnperrone15@gmail.com",
    "NJ American Water Co: 800-652-6987",
    "NJ Natural Gas Co: 800-GAS-LEAK",
    "JCP&L: 800-GAS-LEAK",
    "JCP&L: 800-662-3115"
]
,"",""]);
modelMap.set("West Long Branch", ["/models/cities/monmouth/west long branch.glb",[
    "Population: 8,524 ",
        "Area: 7.89mi²",
        "Long a popular spot for surf and fun under the sun",
],
[
    "Animal Licensing: (732) 229-1756",
    "Borough Administrator: (732) 229-1756",
    "Borough Clerk: (732) 229-1756",
    "Building Department: (732) 571-5690",
    "Code Enforcement: 732 571-5957",
    "Emergency Medical Services: (732) 571-4064",
    "Finance Office: (732) 229-1756",
    "Fire Prevention Bureau: 732-571-4298 direct",
    "Housing (Certificate of Occupancy for Resale & Rentals): 732-571-5957",
    "Mayor & Borough Council: (732) 229-1756",
    "Municipal Court: (732) 531-5005",
    "Office of Emergency Management: (732) 229-1756",
    "Police Department: (732) 229-5000",
    "Public Works: (732) 571-5967",
    "Registrar: (732) 229-1756",
    "Tax Assessor: (732) 229-1756",
    "Tax Collector: (732) 571-5984",
    "Zoning Officer: 732-571-5957"
]
,"",""]);
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
    const renderer = new WebGLRenderer({ antialias: true, canvas: el, alpha: true });
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
            hoveringOverLocation.innerText = "___";
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
            if (!selectedObject) {
                location.innerText = "___";
                return;
            }
            location.innerText = selectedObject;




            funFacts.innerText = "";
            const funFax = modelMap.get(selectedObject)![1];
            for (let i = 0; i < funFax.length; i++) {
                const li = document.createElement("li");
                li.innerText = funFax[i];
                li.style.marginTop = "1vh";
                funFacts.appendChild(li);
            }




            contactInfo.innerText = "";
            const contactInfos = modelMap.get(selectedObject)![2];
            for (let i = 0; i < contactInfos.length; i++) {
                const li = document.createElement("li");
                li.innerText = contactInfos[i];
                li.style.marginTop = "1vh";
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









