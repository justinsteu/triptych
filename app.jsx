/* Triptych v4 — Free Play (Beginner/Normal/Hard/Expert) + Daily Challenge.
   Letters above slots. Single-bubble hints. Icon-only Clear/Skip. No footer. */

const { useState, useMemo, useEffect, useCallback, useRef } = React;

/* ---------- Themed puzzles (Normal-only) ---------- */
const THEMED = [
  { theme: "Hotel",       words: ["lobby",  "guest",  "key"]    },
  { theme: "Garden",      words: ["rose",   "vine",   "leaf"]   },
  { theme: "Railway",     words: ["depot",  "rail",   "fog"]    },
  { theme: "Stationery",  words: ["pen",    "paper",  "stamp"]  },
  { theme: "Cinema",      words: ["reel",   "scene",  "usher"]  },
  { theme: "Library",     words: ["book",   "shelf",  "quiet"]  },
  { theme: "Voyage",      words: ["ship",   "anchor", "map"]    },
  { theme: "Café",        words: ["mug",    "scone",  "tea"]    },
  { theme: "Forest",      words: ["moss",   "fern",   "owl"]    },
  { theme: "Post",        words: ["letter", "stamp",  "bag"]    },
  { theme: "Atelier",     words: ["brush",  "paint",  "easel"]  },
  { theme: "Museum",      words: ["frame",  "bust",   "guide"]  },
  { theme: "Lake",        words: ["canoe",  "trout",  "dock"]   },
  { theme: "Wardrobe",    words: ["coat",   "scarf",  "boot"]   },
  { theme: "Concierge",   words: ["bell",   "desk",   "note"]   },
  { theme: "Mountain",    words: ["summit", "ridge",  "snow"]   },
  { theme: "Desert",      words: ["dune",   "cactus", "sun"]    },
  { theme: "Tea time",    words: ["kettle", "biscuit","jam"]    },
  { theme: "Sewing",      words: ["thread", "needle", "button"] },
  { theme: "Astronomy",   words: ["comet",  "planet", "star"]   },
  { theme: "Bakery",      words: ["bread",  "tart",   "flour"]  },
  { theme: "Harbour",     words: ["boat",   "rope",   "gull"]   },
  { theme: "Orchestra",   words: ["violin", "cello",  "drum"]   },
  { theme: "Toolshed",    words: ["wrench", "saw",    "nail"]   },
  { theme: "Picnic",      words: ["basket", "blanket","apple"]  },
  { theme: "Aquarium",    words: ["coral",  "fish",   "tank"]   },
  { theme: "Classroom",   words: ["pencil", "chalk",  "ruler"]  },
  { theme: "Birthday",    words: ["candle", "cake",   "gift"]   },
  { theme: "Winter",      words: ["mitten", "icicle", "frost"]  },
  { theme: "Detective",   words: ["clue",   "case",   "magnifier"] },
];

/* ---------- Mixed-mode word pool ---------- */
const NORMAL_POOL = (`
ace amber apple arrow autumn badger basket beach bench berry blanket
book bottle branch brass breeze brick brook brush bucket butter cabin
cake camera candle canoe canyon castle cedar chair cherry clock cloud
clover cobble comet copper coral cottage cotton crayon creek crown
dawn deer desk diamond dinner doll donkey door dream dusk eagle ember
emerald fable falcon fern festival field flame fleece flute forest
fountain fox garden gate gentle ghost glass globe glove golden harbor
harp hat heart hedge honey horse house ink island ivory ivy jam jar
jewel journal key kite knot lake lamp lantern leaf letter library
linen lion lobby maple meadow melody mirror mist mitten moon morning
mossy music nest noble note oak ocean opal orange orchard otter owl
paint palace paper parade pebble pencil petal piano picnic pillow
pine planet plum pocket poet pond poppy porch postcard pottery prism
quartz quiet quill rabbit rain reed ribbon ridge river robin rose
ruby sail salmon sand satin scarf scene shell shelf shore silver sky
slate snow sparrow spice spring star steam stone stork storm summer
sunset swan tea theatre thicket thread tide tile tiny topaz train
trout twig velvet vine violet voyage walnut waltz water whisper
willow window winter wisp wolf wood wool yarn
`).trim().split(/\s+/);
const BEGINNER_POOL = (`
ace ant ape arm art bat bay bed bee bus cap car cat cow cub cup dog
dot duck ear egg elf elm eye fan fig fin fly fox fun gas gem hat
hen hop ice ink jam jar jet key kid lab leg log map mat mug nap
net nut oak oil owl pan paw pen pet pie pig pit pop pot pup rat
red rib rim rod row rug run sea ski sky sun tag tap tea ten tie
tin top toy van wig win zoo arc art bar bin bow boy box bug bun
cab cob cog cot dam den dim dip dot dye eel elk fad fed fed fix
gap gel gig gum gut hub hum hut imp ivy jab jog jug lap lid lip
mad mob mom mop nod oar oat pad paw pew pup ram rap ray sap set
sip sob sow sub tan tar tow tub tug urn vat vet wax web yam yap
zip able acid arch baby bake band bank barn bath bear beat bell
belt bend bird bite blob blue boat bold bone book boot brave bread
brown bulb cake camp card cart cave chat chip city clay clip clue
coat coin cold cook cool corn crab cube cup dark deep desk dime
dirt disk dock door down draw drip drop drum duck duet dust ease
edge fair fame farm fast fern film fine fish flag flat flip flow
foam fold fond food foot frog from fuel full game gate gear gift
girl give glow goal goat gold good grin gulp hair hand hard hat
hawk head hear help herb hero high hike hill hive hold home hood
hoof hook hope horn host hour hunt iron jolly jump king kite knee
lace lake lamb lamp lane lawn leaf lend lens life lily lime line
lion list load loaf lock long loop loud love luck mail main make
mark mask meal meat melt mend menu mile milk mine mint moon mop
moss most moth move name navy near neck nest news next nice nine
noon nose note oats okay open oven oval pace pack page pail pail
pair palm park pass past path peak pear peel pest pick pile pine
pink play plot plug plum poem pond pony pool poor port pose post
pump push quay quiz race rack rage rain rake rare read rear rest
ride rind ring rise risk road robe rock role roof room root rope
rose rule sail salt sand save scan seal seat seed sell shed ship
shoe shop show sick side sift sign silk sing sink slab sled slim
slot slow snap snow soap soft song sour spin spot star stem step
stop stub sunk swim tail take talk tame task team tell tent test
thin tide tile time tiny tire toad tool town trap tray tree trip
true tuna tune turn type unit used user vase vest vine wait wake
walk wall warm wash wave wear week well west wide wild wind wine
wing wink wise wish wolf wood word work yarn year zero zone
`).trim().split(/\s+/);

const HARD_POOL = (`
abacus abalone abandon abscond acolyte acumen alchemy almanac amulet
anchovy aplomb apricot aqueduct arsenal artisan asphalt austere
azimuth ballast bayonet bazaar bedrock beetle behemoth bivouac
bombast bracket cadence calamity calliope canopy capsule caravan
carnival cascade catacomb celestial chalet chasm cherub citadel
clarion cobalt cogent colossus compass conduit cornice corsair
crevasse cryptic crystal cypress dahlia decanter decoy delirium
diadem dirigible dispatch dolmen draconian dynamo earthen eclipse
edifice effigy elixir embargo emporium enclave envoy equinox
escarp espresso estuary exalted excerpt expanse fanfare fathom
fervent finesse foible fragment fresco fulcrum gallant gambit
gauntlet glacier granary granite gondola grotto gypsum harbinger
hectare henchman heritage hexagon horizon hydrant icicle idyllic
imbroglio incarnate inferno ingot insignia intrepid jubilant
juncture keystone kindling labyrinth lacquer lagoon lantern
larynx lattice legato libretto livery lyceum maelstrom magma
mandarin mantle maraud marble marrow martyr mastodon meander
megalith menagerie meridian midden minaret minstrel mistral
moniker monolith mosaic motet murmur nadir narthex nebula
nettle nexus nimbus nocturne obelisk obsidian octave odyssey
opaque oracle orchard ornate paddock palette paragon parchment
parlor partridge passage pendant peninsula pewter phantom
phoenix pilgrim pinnacle plateau platform plaza plinth podium
polyglot portico postern prairie precept presage prism prism
pyre quagmire quanta quantum quarry quartz quirk radiant rampart
ravine recluse refuge regalia relic remnant requiem retinue
ricochet rivulet rogue rookery rotunda saffron sapphire satchel
savant scabbard scallop scepter scribe seraphim seraph serpent
shaman shanty sherpa silhouette silo skirmish solstice sonata
spectre stalwart stanza stipend strata stratus subtle sundial
sycamore symphony talisman tapestry tavern teakwood tempest
thicket tincture tinder tonic torrent traverse trellis tribute
trinket trireme tundra turret tussock twilight tycoon umbra
unison vaquero vassal vellum venison verdant vermilion vesper
vestige viaduct vigil viola vortex warden whetstone wicker
winnow wraith wrought xeric yarrow zenith zephyr zinc zodiac
`).trim().split(/\s+/);

const HINTS = {
    // original normal/themed words
    "ace":"card","amber":"resin","apple":"fruit","arrow":"projectile",
    "autumn":"season","badger":"mammal","basket":"woven","beach":"shore",
    "bench":"seat","berry":"fruit","blanket":"cover","book":"reading",
    "boat":"vessel","bottle":"vessel","branch":"limb","brass":"metal",
    "bread":"loaf","breeze":"wind","brick":"block","brook":"stream",
    "brush":"painter","bucket":"pail","bust":"sculpture","button":"fastener",
    "butter":"spread","cabin":"shelter","cactus":"desert","cake":"dessert",
    "camera":"photo","candle":"wax","canoe":"paddle","canyon":"gorge",
    "castle":"fortress","case":"mystery","cedar":"tree","chair":"seat",
    "chalk":"writing","cherry":"fruit","clock":"time","cloud":"sky",
    "clover":"plant","clue":"hint","cobble":"stone","coat":"garment",
    "comet":"icy","copper":"metal","coral":"reef","cottage":"home",
    "cotton":"fiber","crayon":"color","creek":"stream","crown":"royal",
    "dawn":"morning","deer":"forest","depot":"station","desk":"surface",
    "diamond":"gem","dinner":"meal","doll":"toy","dock":"pier",
    "donkey":"beast","door":"opening","dream":"vision","drum":"percussion",
    "dune":"sand","dusk":"twilight","eagle":"raptor","easel":"stand",
    "ember":"glow","emerald":"gem","fable":"tale","falcon":"hunter",
    "fern":"frond","fish":"swimmer","festival":"celebration","field":"meadow",
    "flame":"fire","fleece":"wool","flour":"dust","flute":"woodwind",
    "fog":"mist","forest":"trees","fountain":"water","fox":"canine",
    "frame":"border","frost":"ice","garden":"plot","gate":"opening",
    "gentle":"soft","ghost":"spirit","gift":"present","glass":"clear",
    "globe":"world","glove":"hand","golden":"hue","guest":"visitor",
    "guide":"leader","gull":"shorebird","harbor":"port","harp":"strings",
    "hat":"headwear","heart":"organ","hedge":"shrubs","honey":"sweet",
    "horse":"steed","house":"dwelling","icicle":"frozen","ink":"writing",
    "island":"surrounded","ivory":"creamy","ivy":"vine","jam":"spread",
    "jar":"container","jewel":"gem","journal":"diary","kettle":"boiler",
    "key":"opener","kite":"fly","knot":"loop","lake":"still",
    "lamp":"light","lantern":"glow","leaf":"green","letter":"mail",
    "library":"books","linen":"fabric","lion":"savanna","lobby":"entry",
    "magnifier":"lens","maple":"syrup","map":"guide","meadow":"grass",
    "melody":"tune","mirror":"reflection","mist":"haze","mitten":"hand",
    "moon":"satellite","morning":"early","moss":"carpet","mossy":"soft",
    "mug":"cup","music":"sound","nail":"fastener","needle":"thin",
    "nest":"bird","note":"message","noble":"highborn","oak":"tree",
    "ocean":"sea","opal":"gem","orange":"citrus","orchard":"grove",
    "otter":"swimmer","owl":"nocturnal","paint":"color","palace":"royal",
    "paper":"sheet","parade":"march","pebble":"stone","pencil":"writing",
    "pen":"writer","petal":"flower","piano":"keys","picnic":"outdoor",
    "pillow":"rest","pine":"evergreen","planet":"orbiting","plum":"fruit",
    "pocket":"pouch","poet":"verse","pond":"water","poppy":"red",
    "porch":"front","postcard":"travel","pottery":"clay","prism":"refracts",
    "quartz":"crystal","quiet":"hushed","quill":"feather","rabbit":"hopper",
    "rail":"track","rain":"water","reed":"marsh","reel":"film",
    "ribbon":"strip","ridge":"crest","river":"flowing","robin":"songbird",
    "rope":"cord","rose":"thorned","ruby":"red","ruler":"measure",
    "sail":"wind","salmon":"pink","sand":"grain","satin":"smooth",
    "saw":"toothed","scarf":"neck","scene":"film","scone":"bake",
    "shell":"sea","shelf":"ledge","ship":"vessel","shore":"edge",
    "silver":"metal","sky":"above","slate":"gray","snow":"flakes",
    "sparrow":"songbird","spice":"flavor","spring":"season","stamp":"postage",
    "star":"twinkling","steam":"vapor","stone":"hard","stork":"long-legged",
    "storm":"weather","summit":"peak","summer":"warm","sun":"daylight",
    "sunset":"evening","swan":"graceful","tank":"enclosure","tart":"pastry",
    "tea":"steeped","theatre":"stage","thicket":"brush","thread":"sewing",
    "tide":"sea","tile":"square","tiny":"small","topaz":"gem",
    "train":"track","trout":"fish","twig":"branch","usher":"theatre",
    "velvet":"plush","vine":"climber","violet":"purple","violin":"strings",
    "voyage":"journey","walnut":"nut","waltz":"dance","water":"liquid",
    "whisper":"hushed","willow":"weeping","window":"glass","winter":"cold",
    "wisp":"thin","wolf":"canine","wood":"timber","wool":"sheep",
    "wrench":"tool","yarn":"spun","biscuit":"bake","cello":"strings",
    "anchor":"weight","bag":"sack","bell":"chime","boot":"footwear",
    "cap":"hat","most":"majority",

    // BEGINNER pool — additional simple words
    "ant":"insect","ape":"primate","arm":"limb","art":"creative",
    "bat":"flyer","bay":"inlet","bed":"sleep","bee":"buzzer",
    "bus":"transit","car":"vehicle","cat":"feline","cow":"bovine",
    "cub":"young","cup":"vessel","dog":"canine","dot":"point",
    "duck":"waterfowl","ear":"hearing","egg":"shell","elf":"sprite",
    "elm":"tree","eye":"sight","fan":"breeze","fig":"fruit",
    "fin":"swimmer","fly":"insect","fun":"joy","gas":"vapor",
    "gem":"jewel","hen":"chicken","hop":"jump","ice":"frozen",
    "jet":"plane","kid":"child","lab":"workspace","leg":"limb",
    "log":"timber","mat":"rug","nap":"rest","net":"webbing",
    "nut":"seed","oil":"slick","pan":"cookware","paw":"foot",
    "pet":"companion","pie":"pastry","pig":"swine","pit":"hole",
    "pop":"burst","pot":"vessel","pup":"young","rat":"rodent",
    "red":"color","rib":"bone","rim":"edge","rod":"stick",
    "row":"line","rug":"floor","run":"jog","sea":"ocean",
    "ski":"snow","tag":"label","tap":"faucet","ten":"number",
    "tie":"knot","tin":"metal","top":"peak","toy":"plaything",
    "van":"vehicle","wig":"hair","win":"victory","zoo":"animals",
    "arc":"curve","bar":"rod","bin":"container","bow":"arrow",
    "boy":"child","box":"container","bug":"insect","bun":"roll",
    "cab":"taxi","cob":"corn","cog":"gear","cot":"bed",
    "dam":"barrier","den":"lair","dim":"faint","dip":"plunge",
    "dye":"color","eel":"slithery","elk":"antlered","fad":"trend",
    "fed":"nourished","fix":"repair","gap":"opening","gel":"jelly",
    "gig":"performance","gum":"chew","gut":"belly","hub":"center",
    "hum":"murmur","hut":"shack","imp":"sprite","jab":"poke",
    "jog":"trot","jug":"vessel","lap":"circuit","lid":"cover",
    "lip":"mouth","mad":"angry","mob":"crowd","mom":"parent",
    "mop":"cleaner","nod":"agree","oar":"paddle","oat":"grain",
    "pad":"cushion","pew":"bench","ram":"male","rap":"knock",
    "ray":"beam","sap":"sticky","set":"group","sip":"taste",
    "sob":"weep","sow":"plant","sub":"underwater","tan":"brown",
    "tar":"sticky","tow":"pull","tub":"bath","tug":"pull",
    "urn":"vase","vat":"barrel","vet":"doctor","wax":"polish",
    "web":"silk","yam":"tuber","yap":"bark","zip":"fastener",
    "able":"capable","acid":"sour","arch":"curve","baby":"infant",
    "bake":"oven","band":"group","bank":"financial","barn":"farm",
    "bath":"soak","bear":"furry","beat":"rhythm","belt":"strap",
    "bend":"flex","bird":"flyer","bite":"chomp","blob":"glob",
    "blue":"color","bold":"brave","bone":"skeleton","brave":"fearless",
    "brown":"color","bulb":"globe","camp":"tents","card":"deck",
    "cart":"wagon","cave":"hollow","chat":"talk","chip":"flake",
    "city":"urban","clay":"earthen","clip":"fasten","cold":"chilly",
    "coin":"currency","cook":"prepare","cool":"chill","corn":"kernel",
    "crab":"crustacean","cube":"box","dark":"shadowy","deep":"profound",
    "dime":"coin","dirt":"earth","disk":"round","down":"below",
    "draw":"sketch","drip":"trickle","drop":"fall","duet":"pair",
    "dust":"particles","ease":"comfort","edge":"border","fair":"just",
    "fame":"renown","farm":"land","fast":"quick","film":"movie",
    "fine":"good","flag":"banner","flat":"level","flip":"toss",
    "flow":"current","foam":"bubbles","fold":"crease","fond":"affectionate",
    "food":"nourishment","foot":"toes","frog":"amphibian","from":"origin",
    "fuel":"power","full":"complete","game":"play","gear":"cog",
    "girl":"child","give":"offer","glow":"radiance","goal":"target",
    "goat":"horned","gold":"metal","good":"positive","grin":"smile",
    "gulp":"swallow","hair":"strands","hand":"appendage","hard":"firm",
    "hawk":"raptor","head":"top","hear":"listen","help":"assist",
    "herb":"plant","hero":"savior","high":"elevated","hike":"walk",
    "hill":"mound","hive":"bees","hold":"grasp","home":"dwelling",
    "hood":"cover","hoof":"animal","hook":"curved","hope":"wish",
    "horn":"protrusion","host":"presenter","hour":"time","hunt":"chase",
    "iron":"metal","jolly":"jovial","jump":"leap","king":"monarch",
    "knee":"joint","lace":"thread","lamb":"young","lane":"path",
    "lawn":"grass","lend":"loan","lens":"glass","life":"existence",
    "lily":"flower","lime":"citrus","line":"row","list":"items",
    "load":"cargo","loaf":"bread","lock":"secure","long":"lengthy",
    "loop":"circle","loud":"noisy","love":"affection","luck":"chance",
    "mail":"post","main":"primary","make":"create","mark":"sign",
    "mask":"cover","meal":"food","meat":"protein","melt":"liquefy",
    "mend":"repair","menu":"list","mile":"distance","milk":"dairy",
    "mine":"shaft","mint":"fresh","moth":"insect","move":"shift",
    "name":"label","navy":"fleet","near":"close","neck":"throat",
    "news":"report","next":"following","nice":"pleasant","nine":"number",
    "noon":"midday","nose":"smell","oats":"grain","okay":"fine",
    "open":"unsealed","oven":"baker","oval":"shape","pace":"speed",
    "pack":"bundle","page":"sheet","pail":"bucket","pair":"two",
    "palm":"tropical","park":"green","pass":"go","past":"history",
    "path":"trail","peak":"top","pear":"fruit","peel":"skin",
    "pest":"nuisance","pick":"choose","pile":"heap","pink":"color",
    "play":"game","plot":"scheme","plug":"stopper","poem":"verse",
    "pony":"horse","pool":"water","poor":"needy","port":"harbor",
    "pose":"stance","post":"mail","pump":"push","push":"shove",
    "quay":"wharf","quiz":"test","race":"contest","rack":"shelf",
    "rage":"anger","rake":"tool","rare":"uncommon","read":"book",
    "rear":"back","rest":"pause","ride":"travel","rind":"peel",
    "ring":"circle","rise":"ascend","risk":"chance","road":"path",
    "robe":"garment","rock":"stone","role":"part","roof":"top",
    "room":"space","root":"underground","rule":"law","salt":"seasoning",
    "save":"rescue","scan":"sweep","seal":"close","seat":"chair",
    "seed":"plant","sell":"trade","shed":"shelter","shoe":"foot",
    "shop":"store","show":"display","sick":"ill","side":"flank",
    "sift":"sieve","sign":"symbol","silk":"smooth","sing":"vocal",
    "sink":"basin","slab":"slate","sled":"snow","slim":"thin",
    "slot":"opening","slow":"sluggish","snap":"crack","soap":"cleanser",
    "soft":"tender","song":"music","sour":"tart","spin":"twirl",
    "spot":"mark","stem":"stalk","step":"stride","stop":"halt",
    "stub":"butt","sunk":"submerged","swim":"stroke","tail":"end",
    "take":"grab","talk":"speak","tame":"docile","task":"chore",
    "team":"group","tell":"say","tent":"shelter","test":"exam",
    "thin":"slim","time":"clock","tire":"rubber","toad":"amphibian",
    "tool":"implement","town":"village","trap":"snare","tray":"platter",
    "tree":"woody","trip":"journey","true":"honest","tuna":"fish",
    "tune":"melody","turn":"rotate","type":"kind","unit":"piece",
    "used":"secondhand","user":"customer","vase":"vessel","vest":"sleeveless",
    "wait":"pause","wake":"rouse","walk":"stroll","wall":"barrier",
    "warm":"cozy","wash":"clean","wave":"motion","wear":"don",
    "week":"seven","well":"shaft","west":"direction","wide":"broad",
    "wild":"untamed","wind":"breeze","wine":"vintage","wing":"feathered",
    "wink":"blink","wise":"sage","wish":"desire","word":"term",
    "work":"labor","year":"twelve","zero":"none","zone":"area",

    // HARD pool — obscure / longer words
    "abacus":"counter","abalone":"mollusk","abandon":"forsake","abscond":"flee",
    "acolyte":"attendant","acumen":"shrewd","alchemy":"transmute","almanac":"yearly",
    "amulet":"charm","anchovy":"fish","aplomb":"poise","apricot":"stone",
    "aqueduct":"channel","arsenal":"armory","artisan":"crafter","asphalt":"pavement",
    "austere":"strict","azimuth":"bearing","ballast":"weight","bayonet":"blade",
    "bazaar":"market","bedrock":"foundation","beetle":"insect","behemoth":"huge",
    "bivouac":"camp","bombast":"pompous","bracket":"support","cadence":"rhythm",
    "calamity":"disaster","calliope":"steam","canopy":"cover","capsule":"pill",
    "caravan":"convoy","carnival":"festival","cascade":"waterfall","catacomb":"tomb",
    "celestial":"heavenly","chalet":"alpine","chasm":"abyss","cherub":"angel",
    "citadel":"fortress","clarion":"trumpet","cobalt":"blue","cogent":"convincing",
    "colossus":"giant","compass":"direction","conduit":"pipe","cornice":"ledge",
    "corsair":"pirate","crevasse":"crack","cryptic":"mysterious","crystal":"clear",
    "cypress":"tree","dahlia":"bloom","decanter":"bottle","decoy":"lure",
    "delirium":"frenzy","diadem":"crown","dirigible":"airship","dispatch":"send",
    "dolmen":"megalith","draconian":"harsh","dynamo":"generator","earthen":"clay",
    "eclipse":"shadow","edifice":"building","effigy":"likeness","elixir":"potion",
    "embargo":"ban","emporium":"market","enclave":"pocket","envoy":"messenger",
    "equinox":"balance","escarp":"cliff","espresso":"coffee","estuary":"mouth",
    "exalted":"lofty","excerpt":"passage","expanse":"vastness","fanfare":"flourish",
    "fathom":"depth","fervent":"ardent","finesse":"skill","foible":"flaw",
    "fragment":"piece","fresco":"mural","fulcrum":"pivot","gallant":"chivalrous",
    "gambit":"opening","gauntlet":"glove","glacier":"ice","granary":"storehouse",
    "granite":"rock","gondola":"venice","grotto":"cave","gypsum":"mineral",
    "harbinger":"omen","hectare":"acre","henchman":"thug","heritage":"legacy",
    "hexagon":"shape","horizon":"distant","hydrant":"spout","idyllic":"pastoral",
    "imbroglio":"entanglement","incarnate":"embodied","inferno":"blaze","ingot":"bar",
    "insignia":"emblem","intrepid":"fearless","jubilant":"joyous","juncture":"point",
    "keystone":"central","kindling":"tinder","labyrinth":"maze","lacquer":"finish",
    "lagoon":"shallow","larynx":"voicebox","lattice":"grid","legato":"smooth",
    "libretto":"opera","livery":"uniform","lyceum":"hall","maelstrom":"whirlpool",
    "magma":"molten","mandarin":"orange","mantle":"cloak","maraud":"raid",
    "marble":"stone","marrow":"bone","martyr":"sufferer","mastodon":"prehistoric",
    "meander":"wander","megalith":"monument","menagerie":"collection","meridian":"line",
    "midden":"refuse","minaret":"tower","minstrel":"musician","mistral":"wind",
    "moniker":"nickname","monolith":"pillar","mosaic":"tile","motet":"choral",
    "murmur":"whisper","nadir":"lowest","narthex":"vestibule","nebula":"cloud",
    "nettle":"sting","nexus":"hub","nimbus":"halo","nocturne":"night",
    "obelisk":"pillar","obsidian":"volcanic","octave":"interval","odyssey":"journey",
    "opaque":"cloudy","oracle":"prophet","ornate":"elaborate","paddock":"pen",
    "palette":"colors","paragon":"model","parchment":"vellum","parlor":"sitting",
    "partridge":"bird","passage":"corridor","pendant":"locket","peninsula":"land",
    "pewter":"alloy","phantom":"specter","phoenix":"firebird","pilgrim":"traveler",
    "pinnacle":"summit","plateau":"flat","platform":"stage","plaza":"square",
    "plinth":"base","podium":"stand","polyglot":"multilingual","portico":"porch",
    "postern":"backdoor","prairie":"grassland","precept":"rule","presage":"foretell",
    "pyre":"funeral","quagmire":"bog","quanta":"discrete","quantum":"physics",
    "quarry":"mine","quirk":"oddity","radiant":"glowing","rampart":"wall",
    "ravine":"gully","recluse":"hermit","refuge":"sanctuary","regalia":"finery",
    "relic":"remnant","remnant":"scrap","requiem":"mass","retinue":"entourage",
    "ricochet":"bounce","rivulet":"streamlet","rogue":"scoundrel","rookery":"colony",
    "rotunda":"dome","saffron":"spice","sapphire":"gem","satchel":"bag",
    "savant":"genius","scabbard":"sheath","scallop":"shell","scepter":"royal",
    "scribe":"copyist","seraphim":"angels","seraph":"angel","serpent":"snake",
    "shaman":"healer","shanty":"shack","sherpa":"guide","silhouette":"outline",
    "silo":"storage","skirmish":"clash","solstice":"longest","sonata":"musical",
    "spectre":"ghost","stalwart":"loyal","stanza":"verse","stipend":"allowance",
    "strata":"layers","stratus":"cloud","subtle":"faint","sundial":"clock",
    "sycamore":"tree","symphony":"orchestral","talisman":"charm","tapestry":"weaving",
    "tavern":"inn","teakwood":"hardwood","tempest":"storm","tincture":"solution",
    "tinder":"kindling","tonic":"elixir","torrent":"flood","traverse":"cross",
    "trellis":"lattice","tribute":"homage","trinket":"bauble","trireme":"galley",
    "tundra":"arctic","turret":"tower","tussock":"clump","twilight":"dusk",
    "tycoon":"magnate","umbra":"shadow","unison":"together","vaquero":"cowboy",
    "vassal":"subject","vellum":"parchment","venison":"deer","verdant":"green",
    "vermilion":"red","vesper":"evening","vestige":"trace","viaduct":"bridge",
    "vigil":"watch","viola":"strings","vortex":"whirl","warden":"keeper",
    "whetstone":"sharpener","wicker":"woven","winnow":"sift","wraith":"phantom",
    "wrought":"forged","xeric":"dry","yarrow":"herb","zenith":"peak",
    "zephyr":"breeze","zinc":"metal","zodiac":"signs",
};

/* ---------- Difficulty config ---------- */
const DIFF = {
  beginner: {
    label: "Beginner",
    blurb: "Simple words · 6 attempts · all hints · letter feedback",
    attempts: 6, hints: 3, feedback: true,
  },
  normal: {
    label: "Normal",
    blurb: "Standard words · 5 attempts · 3 hints · letter feedback",
    attempts: 5, hints: 3, feedback: true,
  },
  hard: {
    label: "Hard",
    blurb: "Longer words · 4 attempts · 2 hints · no feedback",
    attempts: 4, hints: 2, feedback: false,
  },
  expert: {
    label: "Expert",
    blurb: "Obscure words · 3 attempts · no hints · no feedback",
    attempts: 3, hints: 0, feedback: false,
  },
};

const DAILY  = { attempts: 4, hints: 0, feedback: true };
const CUSTOM = { attempts: 5, hints: 3, feedback: true };

const ROMAN = ["i.", "ii.", "iii."]; // kept for internal labeling only

/* ---------- Custom puzzle codec (base64 of {t, w}) ---------- */
function encodeCustom(theme, words) {
  const payload = JSON.stringify({ t: theme || "", w: words.map(w => w.toLowerCase()) });
  try { return btoa(unescape(encodeURIComponent(payload))).replace(/=+$/g, ""); }
  catch (e) { return btoa(payload).replace(/=+$/g, ""); }
}
function decodeCustom(code) {
  try {
    let s = code.trim();
    while (s.length % 4) s += "=";
    const raw = atob(s);
    let json;
    try { json = decodeURIComponent(escape(raw)); } catch (e) { json = raw; }
    const obj = JSON.parse(json);
    if (!obj || !Array.isArray(obj.w) || obj.w.length !== 3) return null;
    const words = obj.w.map(w => String(w).toLowerCase());
    for (const w of words) {
      if (!/^[a-z]{3,12}$/.test(w)) return null;
    }
    if (new Set(words).size !== 3) return null;
    return { theme: typeof obj.t === "string" ? obj.t : "", words };
  } catch (e) { return null; }
}
function makeCustomPuzzle(theme, words) {
  return { source: "custom", diff: "custom", idx: -1, theme: theme || null, words };
}

/* ---------- Dictionary cache (Hidden Words) ---------- */
const DICT_CACHE = {};
function isEnglishWord(w) {
  const word = String(w).toLowerCase();
  if (word.length < 3) return Promise.resolve(false);
  if (word in DICT_CACHE) return Promise.resolve(DICT_CACHE[word]);
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
    .then(r => {
      const ok = r.ok;
      DICT_CACHE[word] = ok;
      return ok;
    })
    .catch(() => false);
}

/* ---------- Icons (Lucide) ---------- */
const Bulb = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);
const IconBackspace = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <path d="M22 5H9.5L3 12l6.5 7H22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/>
    <line x1="18" y1="9" x2="12" y2="15"/>
    <line x1="12" y1="9" x2="18" y2="15"/>
  </svg>
);
const IconRefresh = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);
const IconStats = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="12" width="4" height="9" rx="1"/>
    <rect x="10" y="7" width="4" height="14" rx="1"/>
    <rect x="17" y="3" width="4" height="18" rx="1"/>
  </svg>
);
const IconCalendar = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconChevron = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconCustom = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    {/* Pencil writing — make-your-own */}
    <path d="M3 21l3.6-1 11-11-2.6-2.6-11 11L3 21z"/>
    <path d="M14.5 6.5l2.6 2.6"/>
    <path d="M17 4l3 3"/>
  </svg>
);
const IconBack = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

/* ---------- Helpers ---------- */
function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTray(words, rng) {
  const tray = [];
  let id = 0;
  for (const w of words) {
    for (const ch of w.toUpperCase()) {
      tray.push({ id: id++, ch });
    }
  }
  return shuffle(tray, rng);
}

function emptySlots() { return [[], [], []]; }

/* Deterministic seeded RNG (mulberry32) — used by Daily */
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/* Pick three words from a pool, given a length range and rng */
function pickFromPool(pool, minTotal, maxTotal, rng = Math.random) {
  for (let tries = 0; tries < 400; tries++) {
    const shuffled = shuffle(pool, rng);
    const w = [shuffled[0], shuffled[1], shuffled[2]];
    if (new Set(w).size < 3) continue;
    const total = w[0].length + w[1].length + w[2].length;
    if (total >= minTotal && total <= maxTotal) return w;
  }
  return pool.slice(0, 3);
}

function pickThemed(prevIdx, rng = Math.random) {
  if (THEMED.length <= 1) return 0;
  let n = prevIdx;
  let safety = 20;
  while (n === prevIdx && safety-- > 0) n = Math.floor(rng() * THEMED.length);
  return n;
}

function makeFreePlayPuzzle(diff, source, prevIdx, rng = Math.random) {
  // source: "themed" | "mixed". Themed bank is the source for ALL difficulties.
  if (source === "themed") {
    const idx = pickThemed(prevIdx ?? -1, rng);
    return { source, diff, idx, theme: THEMED[idx].theme, words: THEMED[idx].words };
  }
  let pool, minT, maxT;
  if (diff === "beginner") { pool = BEGINNER_POOL; minT = 9; maxT = 15; }
  else if (diff === "normal") { pool = NORMAL_POOL; minT = 9; maxT = 18; }
  else if (diff === "hard")   { pool = HARD_POOL;   minT = 15; maxT = 22; }
  else                        { pool = HARD_POOL;   minT = 18; maxT = 24; } // expert
  const words = pickFromPool(pool, minT, maxT, rng);
  return { source: "mixed", diff, idx: -1, theme: null, words };
}

function makeDailyPuzzle(dateStr) {
  const seed = hashStr("triptych-daily:" + dateStr);
  const rng = mulberry32(seed);
  // Daily uses NORMAL pool, slightly favored toward 4-6 letter words for accessibility.
  const words = pickFromPool(NORMAL_POOL, 11, 17, rng);
  return { source: "daily", diff: "daily", idx: -1, theme: null, words, dateStr };
}

function hintFor(word) { return HINTS[word.toLowerCase()] || "—"; }

/* Rhyme dictionary — longest-suffix match returns a rhyming English word.
   Each suffix maps to an array of candidate rhymes; we pick the first that
   doesn't equal the target word. */
const RHYME_SUFFIX_MAP = {
  /* 5-letter endings */
  "ought":["thought","bought","sought"],"aught":["caught","taught","naught"],
  /* 4-letter endings */
  "ight":["light","night","bright","flight"],"ould":["would","could","should"],
  "orld":["world"],"ound":["sound","found","round","ground"],
  "oint":["point","joint"],"ance":["dance","chance","glance"],
  "ence":["fence","sense","pence"],"ince":["prince","wince"],
  "ount":["count","mount"],"oast":["toast","coast","roast"],
  "east":["feast","beast","yeast"],"orse":["horse","course"],
  "urse":["nurse","purse","curse"],"arch":["march","larch"],
  "itch":["witch","pitch","stitch"],"atch":["catch","match","patch"],
  "etch":["sketch","fetch","stretch"],"otch":["notch","watch"],
  "utch":["clutch","hutch"],"each":["reach","peach","beach"],
  "ouch":["couch","pouch","vouch"],"aint":["paint","saint","faint"],
  "eaty":["meaty","sweaty"],"oody":["moody","woody"],
  "andy":["candy","handy","sandy"],"endy":["trendy","bendy"],
  "oudy":["cloudy"],"unny":["sunny","funny","bunny"],
  "erry":["merry","berry","ferry"],"orry":["sorry","worry"],
  "ucky":["lucky","ducky"],"icky":["sticky","picky"],
  "oggy":["foggy","soggy","doggy"],"ower":["flower","tower","power"],
  "over":["clover","rover"],"iver":["shiver","river","diver"],
  "aper":["caper","paper"],"iper":["viper","piper"],
  "oper":["proper","copper"],"emble":["tremble","resemble"],
  "umble":["humble","tumble","jumble"],"imble":["nimble","thimble"],
  "amble":["ramble","gamble"],"ample":["sample","example"],
  "imple":["simple","dimple"],"alace":["palace","chalice"],
  "olid":["solid","stolid"],"ilent":["silent"],
  /* 3-letter endings */
  "ake":["snake","cake","lake","bake"],"ane":["plane","crane","lane"],
  "ate":["plate","gate","skate"],"ame":["flame","game","name"],
  "ape":["grape","tape","cape"],"ase":["chase","vase","base"],
  "ave":["brave","wave","cave"],"aze":["maze","blaze","haze"],
  "ace":["space","face","race"],"ade":["shade","blade","jade"],
  "age":["stage","page","cage"],"aid":["braid","paid","raid"],
  "ail":["trail","sail","mail"],"ain":["brain","train","rain"],
  "air":["chair","hair","pair"],"alk":["chalk","walk","talk"],
  "all":["ball","call","wall"],"alt":["halt","salt","malt"],
  "amp":["lamp","camp","stamp","ramp"],"and":["hand","band","sand"],
  "ank":["thank","bank","tank"],"ant":["plant","chant","grant"],
  "ard":["yard","card","hard"],"ark":["shark","park","bark"],
  "arm":["farm","alarm","charm"],"arn":["yarn","barn","darn"],
  "arp":["sharp","harp","carp"],"art":["start","cart","heart"],
  "ash":["flash","crash","splash"],"ask":["mask","task","flask"],
  "asp":["grasp","clasp","gasp"],"ast":["blast","fast","mast"],
  "awn":["yawn","dawn","lawn"],"ear":["clear","year","near"],
  "eat":["wheat","seat","beat"],"eed":["speed","feed","seed"],
  "eep":["sleep","deep","keep"],"eet":["sweet","feet","meet"],
  "ell":["bell","cell","shell"],"elm":["helm","realm"],
  "elt":["melt","belt","felt"],"end":["friend","send","bend"],
  "ent":["tent","sent","bent"],"esh":["fresh","mesh"],
  "ess":["chess","mess","dress"],"est":["nest","best","chest"],
  "ice":["slice","mice","price"],"ide":["slide","ride","hide"],
  "ife":["knife","life","strife"],"ift":["swift","lift","gift"],
  "ike":["bike","hike","strike"],"ile":["smile","mile","file"],
  "ill":["hill","pill","still"],"ime":["chime","time","lime"],
  "ind":["kind","mind","find"],"ine":["shine","line","vine"],
  "ing":["ring","sing","string"],"ink":["think","sink","pink"],
  "int":["mint","hint","print"],"ipe":["stripe","pipe","swipe"],
  "ire":["fire","wire","hire"],"irl":["swirl","girl","curl"],
  "irt":["shirt","flirt","squirt"],"ish":["wish","fish","dish"],
  "isk":["brisk","disk","risk"],"iss":["miss","kiss","bliss"],
  "ist":["wrist","mist","list"],"ite":["kite","bite","white"],
  "ive":["dive","hive","drive"],"ize":["prize","size","wise"],
  "oad":["road","toad","load"],"oak":["cloak","soak","oak"],
  "oal":["coal","goal","foal"],"oam":["foam","roam","loam"],
  "oan":["groan","moan","loan"],"oat":["boat","coat","goat"],
  "obe":["globe","robe","probe"],"ock":["clock","rock","sock"],
  "ode":["code","mode","node"],"oft":["loft","soft"],
  "oin":["join","coin","loin"],"oke":["smoke","joke","woke"],
  "old":["gold","cold","bold"],"ole":["pole","hole","sole"],
  "oll":["roll","poll","scroll"],"olt":["bolt","jolt","colt"],
  "ome":["home","dome","chrome"],"one":["stone","bone","zone"],
  "ong":["strong","song","long"],"ook":["book","look","hook"],
  "ool":["pool","cool","tool"],"oom":["bloom","room","broom"],
  "oon":["moon","spoon","noon"],"oop":["loop","hoop","scoop"],
  "oor":["door","floor","moor"],"oot":["boot","shoot","loot"],
  "ope":["hope","rope","slope"],"orch":["torch","porch"],
  "ord":["sword","chord","lord"],"ore":["shore","more","store"],
  "ork":["fork","cork","stork"],"orm":["storm","form","swarm"],
  "orn":["horn","corn","thorn"],"ort":["sport","port","short"],
  "oss":["floss","boss","toss"],"ost":["frost","ghost","most"],
  "oth":["cloth","moth","sloth"],"oud":["loud","proud","cloud"],
  "oul":["soul","foul"],"our":["flour","hour","sour"],
  "out":["trout","shout","scout"],"ove":["glove","dove","shove"],
  "owl":["howl","growl","prowl"],"own":["crown","town","frown"],
  "ude":["dude","rude","crude"],"ule":["rule","mule"],
  "ull":["pull","full","bull"],"ump":["jump","bump","pump"],
  "ung":["sung","rung","young"],"unk":["trunk","chunk","skunk"],
  "urn":["burn","turn","churn"],"urt":["hurt","blurt"],
  "ush":["brush","crush","hush"],"ust":["trust","dust","crust"],
  "ute":["flute","mute","cute"],"lue":["blue","glue","true","clue"],
  "rue":["true","crew"],"new":["new","few","dew"],
  /* 2-letter endings (fallback) */
  "ab":["crab","grab","slab"],"ad":["glad","sad","clad"],
  "ag":["flag","tag","snag"],"am":["ham","jam","clam"],
  "an":["pan","man","can"],"ap":["map","trap","snap"],
  "ar":["star","car","jar"],"as":["glass","brass","grass"],
  "at":["hat","cat","mat"],"aw":["straw","jaw","claw"],
  "ax":["wax","tax","max"],"ay":["day","play","way"],
  "ed":["red","bed","shed"],"eg":["keg","leg","peg"],
  "en":["ten","hen","pen"],"et":["jet","vet","pet"],
  "ew":["few","dew","new"],"ex":["flex","vex"],
  "ey":["key","hey","bey"],"ib":["crib","rib","glib"],
  "id":["lid","kid","squid"],"ig":["twig","pig","wig"],
  "im":["trim","swim","slim"],"in":["thin","pin","spin"],
  "ip":["tip","chip","flip"],"is":["twist","hiss"],
  "it":["sit","fit","hit"],"ix":["six","fix","mix"],
  "ob":["job","sob","glob"],"od":["nod","pod","rod"],
  "og":["frog","log","dog"],"om":["mom","prom"],
  "on":["swan","con","upon"],"op":["shop","mop","drop"],
  "or":["door","floor","more"],"ot":["spot","dot","plot"],
  "ow":["plow","cow","bow"],"ox":["fox","box","sox"],
  "oy":["boy","toy","joy"],"ub":["club","hub","scrub"],
  "ud":["mud","thud","crud"],"ug":["bug","jug","plug"],
  "um":["plum","drum","sum"],"un":["sun","run","fun"],
  "up":["cup","pup"],"us":["bus","plus"],
  "ut":["nut","hut","shut"],"uy":["sky","sigh","fly"],
  "ee":["bee","tree","knee"],"oo":["zoo","goo","boo"],
  "ie":["tie","pie","lie"],"oe":["toe","foe","woe"],
  "ue":["blue","glue","true","clue"],
  /* Additional common endings (multi-syllable words) */
  "ter":["matter","butter","river"],"ber":["timber","member","slumber"],
  "der":["shoulder","thunder","wonder"],"per":["paper","super","copper"],
  "ger":["finger","hunger","ranger"],"mer":["summer","hammer","glimmer"],
  "ner":["banner","dinner","winner"],"ser":["laser","closer"],
  "ver":["river","silver","clever"],"cer":["dancer","slicer"],
  "ler":["ruler","cooler","smaller"],"tle":["little","settle","battle"],
  "ble":["table","trouble","marble"],"cle":["circle","miracle","obstacle"],
  "dle":["middle","saddle","riddle"],"dge":["bridge","ridge","badge"],
  "ern":["pattern","modern","tern"],"ith":["smith","with","myth"],
  "ond":["bond","pond","fond"],"ass":["glass","grass","brass"],
  "ick":["brick","stick","trick"],"val":["festival","oval","rival"],
  "nch":["branch","bench","pinch"],"ero":["hero","zero"],
  "are":["share","square","care"],"ery":["berry","cherry","misery"],
  "ose":["rose","nose","close"],"ary":["library","diary","canary"],
  "eal":["meal","deal","steal"],"nth":["month","plinth"],
  "tto":["motto","lotto"],"ise":["rise","surprise","wise"],
  "nal":["final","signal","canal"],"ony":["pony","bony","phony"],
  "ilk":["milk","silk","bilk"],"ure":["sure","pure","cure"],
  "ity":["city","pity","unity"],"oof":["roof","proof","hoof"],
  "omb":["comb","tomb"],"ial":["trial","dial","vial"],
  "tte":["flute"],"tal":["metal","crystal","vital"],
  "ral":["coral","floral","viral"],"lic":["public","frolic","garlic"],
  "uct":["product","duct"],"eek":["creek","week","cheek"],
  "ack":["black","stack","track"],"tre":["theatre","centre"],
  "ier":["flier","crier","pier"],"yre":["fire","hire"],
  /* 2-letter catch-alls for common endings */
  "er":["river","flower","silver","thunder"],
  "le":["apple","table","little","bottle"],
  "al":["crystal","coral","metal","signal"],
  "se":["house","close","rose","chase"],
  "el":["jewel","camel","hotel","angel"],
  "th":["path","myth","month","truth"],
  "re":["fire","more","square","shore"],
  "ry":["berry","cherry","library","merry"],
  "ic":["music","magic","public","comic"],
  "ck":["clock","block","track","brick"],
  "ge":["bridge","page","stage","edge"],
  "rn":["barn","yarn","corn","horn"],
  "em":["gem","stem","poem"],
  "te":["plate","flute","kite"],
  "ch":["church","march","branch"],
  "ne":["shine","stone","crane"],
  "nd":["hand","sand","sound","friend"],
  "ss":["glass","grass","chess","floss"],
  "la":["villa","gala","cola"],
  "ac":["snack","track"],
  "ld":["gold","cold","field","world"],
  "ly":["sky","fly","jolly"],
  "vy":["navy","ivy","heavy"],
  "to":["potato","tomato"],
  "il":["sail","trail","snail"],
  "lm":["palm","calm","helm"],
  "ny":["sunny","funny","bunny"],
  "lk":["silk","milk","chalk"],
  "by":["baby","ruby","hobby"],
  "ty":["pretty","city","party"],
  "de":["slide","shade","ride"],
  "ke":["snake","smoke","like"],
  "me":["flame","home","time"],
  "ve":["brave","drive","love"],
  "ze":["maze","breeze","prize"],
  "py":["happy","poppy","sleepy"],
  "ca":["replica","mica"],
  "sh":["flash","crash","fresh","wish"],
  "rt":["start","art","shirt","smart"],
  "ea":["sea","tea","pea","flea"],
  "af":["leaf","calf","half"],
  "ph":["graph","laugh"],
  "st":["frost","ghost","mast","chest"],
  "ft":["swift","draft","lift"],
  "lp":["help","gulp","scalp"],
  "rl":["girl","swirl","pearl"],
  "rm":["storm","farm","charm"],
  "mp":["lamp","camp","jump"],
  "nt":["plant","tent","point"],
  "nk":["thank","sink","trunk"],
  "ng":["ring","sing","strong"],
  "mb":["comb","thumb","tomb"],
  "sk":["mask","disk","risk"],
  "st":["frost","ghost","chest"],
  "pe":["hope","grape","stripe"],
  "ig":["twig","pig","wig"],
  "ds":["woods","clouds"],
  "ck":["clock","brick","truck"],
  "go":["ago","mango"],
  "do":["shadow","meadow"],
  "mo":["memo","limbo"],
  "co":["taco","poncho"],
  "no":["piano","volcano"],
  "vo":["bravo"],
  /* Final additions for remaining gaps */
  "une":["june","tune","dune"],"ibe":["tribe","vibe","jibe"],
  "ixir":["elixir"],"ynx":["jinx","lynx"],
  "phyr":["zephyr"],"ece":["piece","niece","fleece"],
  "ssy":["sassy","mossy","glossy"],"ism":["prism","chasm"],
  "umn":["autumn","column"],"awk":["hawk","squawk","gawk"],
  "olf":["wolf","golf"],"ens":["lens","plans","hens"],
  "ept":["slept","swept","kept"],"ata":["data","strata"],
  "tyr":["martyr"],"ign":["sign","reign","design"],
  "emy":["enemy","alchemy"],"ello":["hello","yellow"],
  "ce":["slice","price","face","piece"],
  "be":["globe","tribe","robe"],
  "ir":["sir","stir","fir"],
  "yr":["fire","hire"],
  "sm":["prism","chasm"],
  "mn":["autumn","column","hymn"],
  "wk":["hawk","squawk"],
  "lf":["wolf","golf","shelf"],
  "ns":["plans","lens","means"],
  "pt":["swept","kept","slept"],
  "ta":["strata","data"],
  "gn":["sign","reign"],
  "my":["enemy","creamy"],
  "lo":["halo","cello"],
  "rd":["bird","yard","sword"],
  "ye":["sky","dye","bye"],
  "sy":["easy","glossy","mossy"],
  "od":["nod","pod","rod"],
  "oa":["boa"],
  "ho":["poncho","echo"],
  "so":["also"],
  "da":["panda","soda"],
  "ma":["comma","llama"],
  "sa":["salsa","visa"],
  "ra":["opera","camera"],
  "je":["beige"],
  "ze":["breeze","prize","maze"],
  "fy":["daffy","taffy"],
  "ja":["ninja"],
  "ka":["polka","paprika"],
  /* Last cleanup pass */
  "ki":["sky","khaki"],"tz":["glitz","blitz"],
  "rf":["surf","turf","scarf"],"ky":["sky","funky","husky"],
  "ur":["fur","blur","slur"],"ia":["trivia","mafia","utopia"],
  "lb":["bulb"],"gg":["egg","clog"],
  "ak":["break","steak","oak","peak"],"sp":["wasp","grasp","clasp"],
  "az":["jazz","buzz"],"za":["pizza","plaza"],
  "gh":["sky","sigh"],"na":["tuna","china","arena"],
  "rc":["arc","marc"],"ts":["oats","sweets"],
  "wl":["owl","howl","prowl"],"au":["plateau","bureau"],
  "iz":["quiz","fizz"],"rk":["park","shark","work"],
  "ws":["news","crews"],"pa":["papa","sherpa"],
  "nc":["zinc","sync"],"eb":["web"],
  "nu":["menu"],"gy":["effigy","foggy"],
  "x":["fox","box","six"],
  "z":["jazz","buzz","fizz"],
  "j":["raj"],
  "v":["love","give"],
  "k":["track","book","block"],
  "f":["leaf","chef","reef"],
  "p":["shop","camp","ship"],
  "q":["clique"],
};

function rhymeFor(word) {
  const w = (word || "").toLowerCase();
  if (!w) return "—";
  /* Try longest suffix first (5 → 1 char) */
  for (let n = 5; n >= 1; n--) {
    if (w.length <= n) continue;
    const suffix = w.slice(-n);
    const candidates = RHYME_SUFFIX_MAP[suffix];
    if (!candidates) continue;
    const pick = candidates.find(c => c !== w);
    if (pick) return pick;
  }
  /* Final fallback: just describe ending sound */
  return "ends in \"" + w.slice(-2) + "\"";
}

/* Safe localStorage wrapper. Some sandboxed iframe environments (Perplexity
   Computer preview, certain in-app browsers) block storage; every call is
   try/catched so a failure silently degrades to in-memory only. */
const LS_PREFIX = "triptych:";

/* ---------- Telemetry (pseudonymous) ----------
   Anonymous device id + fire-and-forget endpoints.
   Set ANALYTICS_URL to the deployed Worker URL to enable.
   Leave "" to disable (no requests are made). */
const ANALYTICS_URL = "https://triptych-analytics.justinsteu.workers.dev";
const APP_VERSION = "v6-i";

function getClientId() {
  try {
    let id = localStorage.getItem(LS_PREFIX + "cid");
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : (Date.now().toString(16) + Math.random().toString(16).slice(2))).replace(/[^0-9a-f-]/gi, "");
      localStorage.setItem(LS_PREFIX + "cid", id);
    }
    return id;
  } catch { return "anon-" + Math.random().toString(16).slice(2, 18); }
}

function beacon(path, payload) {
  if (!ANALYTICS_URL) return;
  try {
    const url = ANALYTICS_URL.replace(/\/$/, "") + path;
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    } else {
      fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  } catch {}
}
function safeGet(key, fallback) {
  try {
    if (typeof localStorage === "undefined") return fallback;
    const raw = localStorage.getItem(LS_PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
}
function safeSet(key, value) {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch (e) { /* storage blocked or full — ignore */ }
}

/* Daily rolls over at midnight America/Los_Angeles (Pacific Time) globally.
   Every player worldwide gets the same puzzle at the same absolute moment. */
const DAILY_TZ = "America/Los_Angeles";

function ptParts(d = new Date()) {
  /* Returns {y,m,d,h,mi,s} for the given instant rendered in PT. */
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: DAILY_TZ, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const o = {};
  for (const p of fmt.formatToParts(d)) if (p.type !== "literal") o[p.type] = p.value;
  let h = parseInt(o.hour, 10); if (h === 24) h = 0;
  return { y: o.year, m: o.month, d: o.day, h, mi: parseInt(o.minute, 10), s: parseInt(o.second, 10) };
}
function pacificDateStr(d = new Date()) {
  const p = ptParts(d);
  return `${p.y}-${p.m}-${p.d}`;
}
/* Alias kept for any older call sites */
function localDateStr(d = new Date()) { return pacificDateStr(d); }

function msUntilNextPacificMidnight(now = new Date()) {
  const p = ptParts(now);
  const msIntoDay = (p.h * 3600 + p.mi * 60 + p.s) * 1000 + (now.getTime() % 1000);
  const DAY = 86400000;
  return DAY - msIntoDay;
}
function formatCountdown(ms) {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function prettyDate(input) {
  /* Accepts a Date OR a YYYY-MM-DD string. Renders in long form anchored to PT,
     e.g. "Wednesday, May 20". Strings are interpreted as PT calendar dates so the
     output never drifts a day because of UTC parsing. */
  let d;
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}/.test(input)) {
    /* Construct a UTC instant at 12:00 on that calendar day, then ask Intl to
       render it in PT. 12:00 UTC is always the same calendar day in PT, so
       weekday/month/day match the string regardless of DST. */
    const [y, m, dd] = input.slice(0, 10).split("-").map(Number);
    d = new Date(Date.UTC(y, m - 1, dd, 12, 0, 0));
  } else {
    d = input || new Date();
  }
  return new Intl.DateTimeFormat(undefined, {
    timeZone: DAILY_TZ, weekday: "long", month: "long", day: "numeric",
  }).format(d);
}


/* ---------- Modals ---------- */
function StatsModal({ stats, onClose }) {
  const winRate = stats.played > 0
    ? Math.round((stats.solved / stats.played) * 100) : 0;
  const avgAttempts = stats.solved > 0
    ? (stats.totalAttemptsOnSolves / stats.solved).toFixed(1) : "—";
  const avgHints = stats.solved > 0
    ? (stats.totalHintsOnSolves / stats.solved).toFixed(1) : "—";
  const fastest = stats.fastest > 0 ? `${stats.fastest}` : "—";
  const tiles = [
    { label: "Played",       value: stats.played },
    { label: "Solved",       value: stats.solved },
    { label: "Win rate",     value: stats.played > 0 ? `${winRate}%` : "—" },
    { label: "Streak",       value: stats.streak },
    { label: "Best streak",  value: stats.bestStreak },
    { label: "Avg attempts", value: avgAttempts },
    { label: "Avg hints",    value: avgHints },
    { label: "Fastest solve", value: fastest, sub: fastest === "—" ? "" : `attempt${stats.fastest === 1 ? "" : "s"}` },
    { label: "Hidden words", value: stats.hiddenWords || 0, sub: "found" },
  ];
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Stats</h2>
          <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className="stats-note">session only — resets when you close the tab</p>
        <div className="stats-tiles">
          {tiles.map((t) => (
            <div className="stat-tile" key={t.label}>
              <div className="stat-tile-val">{t.value}{t.sub ? <span className="stat-tile-sub"> {t.sub}</span> : null}</div>
              <div className="stat-tile-label">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Custom view (full page within play area) ---------- */
function CustomMenu({ onPickCreate, onPickPlay }) {
  return (
    <div className="custom-view">
      <p className="custom-view-sub">Make your own triptych — or play one a friend made.</p>
      <div className="custom-cards">
        <button className="custom-card" onClick={onPickCreate}>
          <span className="custom-card-eyebrow">Build</span>
          <span className="custom-card-title">Create Puzzle</span>
          <span className="custom-card-blurb">Pick three words and a theme. Get a share link.</span>
        </button>
        <button className="custom-card" onClick={onPickPlay}>
          <span className="custom-card-eyebrow">Solve</span>
          <span className="custom-card-title">Play Puzzle</span>
          <span className="custom-card-blurb">Paste a share code to play a friend’s puzzle.</span>
        </button>
      </div>
    </div>
  );
}

function CustomCreateView({ onBack, onCreate }) {
  const [w1, setW1] = useState("");
  const [w2, setW2] = useState("");
  const [w3, setW3] = useState("");
  const [theme, setTheme] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const sanitize = (v) => v.replace(/[^a-zA-Z]/g, "").toLowerCase().slice(0, 12);

  const handleCreate = () => {
    setErr("");
    const words = [w1, w2, w3].map(sanitize);
    for (const w of words) {
      if (w.length < 3) { setErr("Each word must be 3–12 letters (A–Z)."); return; }
    }
    if (new Set(words).size !== 3) { setErr("Words must be distinct."); return; }
    const c = encodeCustom(theme.trim().slice(0, 30), words);
    setCode(c);
  };
  const copyCode = () => {
    const url = (typeof window !== "undefined" ? window.location.href.split("#")[0] : "") + "#c=" + code;
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };
  const playNow = () => {
    onCreate({ theme: theme.trim().slice(0, 30), words: [w1, w2, w3].map(sanitize) });
  };

  return (
    <div className="custom-view">
      <button className="custom-back" onClick={onBack}>
        <IconBack size={12} />
        <span>Back</span>
      </button>
      <p className="custom-view-sub">Three words · 3–12 letters each · A–Z only</p>
      <div className="custom-form">
        <label className="custom-field">
          <span className="custom-label">Theme <span className="custom-hint">optional</span></span>
          <input className="custom-input" placeholder="e.g. things in a kitchen" maxLength={30}
            value={theme} onChange={e => setTheme(e.target.value)} />
        </label>
        <label className="custom-field">
          <span className="custom-label">Word one</span>
          <input className="custom-input" placeholder="a–z" maxLength={12}
            value={w1} onChange={e => setW1(sanitize(e.target.value))} />
        </label>
        <label className="custom-field">
          <span className="custom-label">Word two</span>
          <input className="custom-input" placeholder="a–z" maxLength={12}
            value={w2} onChange={e => setW2(sanitize(e.target.value))} />
        </label>
        <label className="custom-field">
          <span className="custom-label">Word three</span>
          <input className="custom-input" placeholder="a–z" maxLength={12}
            value={w3} onChange={e => setW3(sanitize(e.target.value))} />
        </label>
        {err && <div className="custom-err">{err}</div>}
        {!code && (
          <div className="end-actions">
            <button className="btn primary" onClick={handleCreate}>Generate code</button>
          </div>
        )}
        {code && (
          <div className="custom-code-block">
            <div className="custom-code-label">Share link</div>
            <div className="custom-code">{code}</div>
            <div className="end-actions">
              <button className="btn ghost" onClick={copyCode}>{copied ? "Copied" : "Copy link"}</button>
              <button className="btn primary" onClick={playNow}>Play your puzzle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomLoadView({ onBack, onLoad }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const handle = () => {
    setErr("");
    let code = val.trim();
    if (code.includes("#c=")) code = code.split("#c=")[1];
    const decoded = decodeCustom(code);
    if (!decoded) { setErr("That code doesn’t look right."); return; }
    onLoad(decoded);
  };
  return (
    <div className="custom-view">
      <button className="custom-back" onClick={onBack}>
        <IconBack size={12} />
        <span>Back</span>
      </button>
      <p className="custom-view-sub">Paste a share code or link from a friend.</p>
      <div className="custom-form">
        <label className="custom-field">
          <span className="custom-label">Share code</span>
          <input className="custom-input" placeholder="paste code here…"
            value={val} onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handle(); }} />
        </label>
        {err && <div className="custom-err">{err}</div>}
        <div className="end-actions">
          <button className="btn primary" onClick={handle}>Play puzzle</button>
        </div>
      </div>
    </div>
  );
}

function NextDailyCountdown({ label = "Next puzzle in" }) {
  const [ms, setMs] = useState(() => msUntilNextPacificMidnight());
  useEffect(() => {
    const id = setInterval(() => setMs(msUntilNextPacificMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="next-daily">
      <span className="next-daily-label">{label}</span>
      <span className="next-daily-time">{formatCountdown(ms)}</span>
    </div>
  );
}

/* Compact countdown shown inside the Daily button when the player has already
   finished today's puzzle. Updates every second. */
function DailyButtonCountdown() {
  const [ms, setMs] = useState(() => msUntilNextPacificMidnight());
  useEffect(() => {
    const id = setInterval(() => setMs(msUntilNextPacificMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="daily-btn-count">{formatCountdown(ms)}</span>;
}

/* Build the Wordle-style share text. Pure function so the modal can preview it
   exactly as it will be copied. */
function buildShareText({ dateStr, used, total, won, streak, url }) {
  const squares = Array.from({ length: total }, (_, i) =>
    i < used ? (won && i === used - 1 ? "\uD83D\uDFE9" : "\uD83D\uDFE8") : "\u2B1C"
  ).join("");
  const score = won ? `${used}/${total}` : `X/${total}`;
  const streakLine = streak > 0 ? `\n\uD83D\uDD25 ${streak}-day streak` : "";
  return `Triptych Daily \u00B7 ${prettyDate(dateStr)}\n${squares}  ${score}${streakLine}\n${url}`;
}

/* Wordle-style share card rendered inside the modal. Shows the exact preview
   of what will be shared, plus key stats. */
function DailyShareCard({ dateStr, used, total, won, streak, winRate, played }) {
  const squares = Array.from({ length: total }, (_, i) =>
    i < used ? (won && i === used - 1 ? "\uD83D\uDFE9" : "\uD83D\uDFE8") : "\u2B1C"
  );
  return (
    <div className="share-card">
      <div className="share-card-head">
        <div className="share-card-title">Triptych Daily</div>
        <div className="share-card-date">{prettyDate(dateStr)}</div>
      </div>
      <div className="share-grid" aria-label="Share preview">
        {squares.map((s, i) => <span key={i} className="share-sq">{s}</span>)}
        <span className="share-score">{won ? `${used}/${total}` : `X/${total}`}</span>
      </div>
      <div className="share-stats">
        <div className="share-stat">
          <div className="share-stat-val">{played}</div>
          <div className="share-stat-lbl">Played</div>
        </div>
        <div className="share-stat">
          <div className="share-stat-val">{played > 0 ? `${winRate}%` : "\u2014"}</div>
          <div className="share-stat-lbl">Win rate</div>
        </div>
        <div className="share-stat">
          <div className="share-stat-val">{streak}</div>
          <div className="share-stat-lbl">Streak</div>
        </div>
      </div>
    </div>
  );
}

function EndGameModal({ phase, puzzle, attempts, isDaily, isCustom, stats, onStats, onNext, onShare, onClose, onFreePlay }) {
  const won = phase === "won";
  /* In Daily, the modal is LOCKED — no close X, no veil-click, no Escape.
     The only ways forward are Share and Free Play. */
  const handleVeilClick = isDaily ? (e) => e.stopPropagation() : onClose;
  const winRate = stats && stats.played > 0 ? Math.round((stats.solved / stats.played) * 100) : 0;
  return (
    <div className="modal-veil" onClick={handleVeilClick}>
      <div className={"modal end-modal" + (isDaily ? " locked" : "")} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{won ? "Solved" : "Out of attempts"}</h2>
          {!isDaily && (
            <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
          )}
        </div>
        <p className="end-sub">
          {won
            ? (attempts === 1 ? "First try." : `Found in ${attempts} attempt${attempts === 1 ? "" : "s"}.`)
            : "Better luck next round."}
        </p>
        <div className="solution-list">
          {puzzle.words.map((w, i) => (
            <div key={i} className="solution">{w.toUpperCase()}</div>
          ))}
        </div>
        {isDaily && stats && (
          <DailyShareCard
            dateStr={puzzle.dateStr}
            used={attempts}
            total={DAILY.attempts}
            won={won}
            streak={stats.streak}
            winRate={winRate}
            played={stats.played}
          />
        )}
        {isDaily && <NextDailyCountdown />}
        <div className="end-actions">
          {isDaily && onShare && (
            <button className="btn primary big" onClick={onShare}>Share results</button>
          )}
          <button className="btn ghost" onClick={onStats}>View stats</button>
          {isDaily ? (
            <button className="btn ghost" onClick={onFreePlay}>Free Play</button>
          ) : (
            <button className="btn primary" onClick={onNext}>
              {isCustom ? "Back to Free Play" : "Next puzzle"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DailyLockedModal({ dateStr, attempts, won, puzzle, stats, onShare, onFreePlay }) {
  const winRate = stats && stats.played > 0 ? Math.round((stats.solved / stats.played) * 100) : 0;
  /* This modal is fully locked — no X, no veil dismiss. Forces a path forward. */
  return (
    <div className="modal-veil" onClick={(e) => e.stopPropagation()}>
      <div className="modal end-modal locked" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Today's puzzle complete</h2>
        </div>
        <p className="end-sub">
          {won
            ? `Solved in ${attempts} attempt${attempts === 1 ? "" : "s"}.`
            : "Out of attempts."}
        </p>
        {puzzle && (
          <div className="solution-list">
            {puzzle.words.map((w, i) => (
              <div key={i} className="solution">{w.toUpperCase()}</div>
            ))}
          </div>
        )}
        {stats && (
          <DailyShareCard
            dateStr={dateStr}
            used={attempts}
            total={DAILY.attempts}
            won={won}
            streak={stats.streak}
            winRate={winRate}
            played={stats.played}
          />
        )}
        <NextDailyCountdown />
        <p className="lock-note">Come back at midnight Pacific Time for the next puzzle.</p>
        <div className="end-actions">
          <button className="btn primary big" onClick={onShare}>Share results</button>
          <button className="btn ghost" onClick={onFreePlay}>Free Play</button>
        </div>
      </div>
    </div>
  );
}

function ToastChip({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

/* ---------- Main app ---------- */
function App() {
  const [mode, setMode]     = useState("free");          // "free" | "daily" | "custom"
  const [source, setSource] = useState("mixed");          // "themed" | "mixed"
  const [diff, setDiff]     = useState("normal");         // beginner|normal|hard|expert
  const [diffMenuOpen, setDiffMenuOpen] = useState(false);
  /* Custom page view: null = not in custom landing; "menu" | "create" | "load" */
  const [customView, setCustomView] = useState(null);

  const [puzzle, setPuzzle] = useState(null);

  const [tray, setTray]         = useState([]);
  const [slots, setSlots]       = useState(emptySlots);
  const [active, setActive]     = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [rowState, setRowState] = useState([null, null, null]);
  const activeRef = useRef(0);
  const rowStateRef = useRef([null, null, null]);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { rowStateRef.current = rowState; }, [rowState]);
  const [letterFeedback, setLetterFeedback] = useState([[], [], []]);
  const [phase, setPhase]   = useState("playing");
  const [status, setStatus] = useState("");

  const [hintsUsed, setHintsUsed] = useState(0);
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [showRhymes, setShowRhymes] = useState(false);

  /* Hidden words (session-wide set of valid English words formed that weren't the answer) */
  const hiddenWordsRef = useRef(new Set());
  /* Per-tile last-tap timestamps for double-tap-to-remove (mobile gesture) */
  const lastTapRef = useRef(new Map());

  /* Modals */
  const [showStats, setShowStats] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showLocked, setShowLocked] = useState(false);
  const [toast, setToast] = useState("");

  /* Daily lock — hydrated from localStorage when available (browsers outside
     the Perplexity sandbox). Stale (non-today) entries are wiped on load. */
  const [dailyState, setDailyState] = useState(() => {
    const saved = safeGet("daily", null);
    const today = (() => {
      try { return pacificDateStr(); } catch (e) { return null; }
    })();
    if (saved && saved.dateStr === today) {
      return { ...saved, puzzle: saved.puzzle || null };
    }
    return { dateStr: null, locked: false, attemptsUsed: 0, won: false, puzzle: null };
  });

  const [stats, setStats] = useState(() => safeGet("stats", {
    played: 0, solved: 0, streak: 0, bestStreak: 0,
    totalAttemptsOnSolves: 0, totalHintsOnSolves: 0,
    totalHintsUsed: 0, fastest: 0, hiddenWords: 0,
  }));

  /* Persist stats / daily state whenever they change. safeSet is a no-op
     when storage is blocked, so this is safe in any environment. */
  useEffect(() => { safeSet("stats", stats); }, [stats]);
  useEffect(() => { safeSet("daily", dailyState); }, [dailyState]);

  const scoredRef = useRef(false);
  const gameStartRef = useRef(0);

  /* Active config — Daily / Custom override Diff */
  const cfg = mode === "daily" ? DAILY : mode === "custom" ? CUSTOM : DIFF[diff];

  /* ---------- Start a puzzle ---------- */
  const startPuzzle = useCallback((opts) => {
    const { mode: m, diff: d, source: s, prevIdx, customPuzzle } = opts;
    let p;
    if (m === "daily") {
      const dateStr = localDateStr();
      p = makeDailyPuzzle(dateStr);
    } else if (m === "custom") {
      p = customPuzzle;
    } else {
      p = makeFreePlayPuzzle(d, s, prevIdx);
    }
    setPuzzle(p);
    setTray(buildTray(p.words, Math.random));
    setSlots(emptySlots());
    setActive(0);
    activeRef.current = 0;
    setAttempts(0);
    setRowState([null, null, null]);
    rowStateRef.current = [null, null, null];
    setLetterFeedback([[], [], []]);
    setPhase("playing");
    setStatus("");
    /* Beginner gets the descriptions as a free preview above the tray (like Daily).
       Hint #1 (rhymes) is NOT pre-spent — the player can still use all 3 hints.
       Daily also reveals descriptions, but has no hint button. */
    const beginnerStart = m === "free" && d === "beginner";
    setHintsUsed(0);
    setShowDescriptions(m === "daily" || beginnerStart);
    setShowRhymes(false);
    scoredRef.current = false;
    gameStartRef.current = Date.now();
  }, []);

  /* Telemetry: one DAU ping per page load (no-op if ANALYTICS_URL blank) */
  useEffect(() => {
    beacon("/api/ping", { clientId: getClientId() });
  }, []);

  /* Initial puzzle — check URL hash for shared custom puzzle first */
  useEffect(() => {
    if (puzzle) return;
    if (typeof window !== "undefined" && window.location.hash.startsWith("#c=")) {
      const code = window.location.hash.slice(3);
      const decoded = decodeCustom(code);
      if (decoded) {
        setMode("custom");
        startPuzzle({ mode: "custom", customPuzzle: makeCustomPuzzle(decoded.theme, decoded.words) });
        return;
      }
    }
    startPuzzle({ mode: "free", diff: "normal", source: "mixed", prevIdx: null });
    // eslint-disable-next-line
  }, []);

  /* Difficulty change (free play) */
  const changeDiff = useCallback((newDiff) => {
    setDiff(newDiff);
    setDiffMenuOpen(false);
    if (mode === "free") {
      startPuzzle({ mode: "free", diff: newDiff, source, prevIdx: null });
    }
  }, [mode, source, startPuzzle]);

  /* Source change (themed/mixed) — only meaningful in free play */
  const changeSource = useCallback((s) => {
    if (s === source) return;
    setSource(s);
    if (mode === "free") {
      startPuzzle({ mode: "free", diff, source: s, prevIdx: null });
    }
  }, [source, mode, diff, startPuzzle]);

  /* Enter Daily mode */
  const enterDaily = useCallback(() => {
    const today = pacificDateStr();
    if (dailyState.dateStr === today && dailyState.locked) {
      setMode("daily");
      setPuzzle(dailyState.puzzle);
      setShowLocked(true);
      return;
    }
    setMode("daily");
    startPuzzle({ mode: "daily" });
  }, [dailyState, startPuzzle]);

  /* Auto-rollover at Pacific midnight: if the player is sitting in Daily mode
     when a new puzzle drops, swap them onto today's puzzle and clear the lock. */
  useEffect(() => {
    const id = setInterval(() => {
      const today = pacificDateStr();
      if (mode === "daily" && puzzle && puzzle.source === "daily" && puzzle.dateStr && puzzle.dateStr !== today) {
        setShowLocked(false);
        setDailyState({ dateStr: null, locked: false, attemptsUsed: 0, won: false, puzzle: null });
        startPuzzle({ mode: "daily" });
        setToast("New daily puzzle");
        setTimeout(() => setToast(""), 2400);
      } else if (dailyState.dateStr && dailyState.dateStr !== today) {
        /* Clear stale lock from a previous day even when not currently in Daily */
        setDailyState({ dateStr: null, locked: false, attemptsUsed: 0, won: false, puzzle: null });
      }
    }, 15000);
    return () => clearInterval(id);
  }, [mode, puzzle, dailyState.dateStr, startPuzzle]);

  /* Return to Free Play */
  const exitToFreePlay = useCallback(() => {
    setShowLocked(false);
    setCustomView(null);
    setMode("free");
    if (typeof window !== "undefined" && window.location.hash.startsWith("#c=")) {
      try { history.replaceState(null, "", window.location.pathname + window.location.search); }
      catch (e) { window.location.hash = ""; }
    }
    startPuzzle({ mode: "free", diff, source, prevIdx: null });
  }, [diff, source, startPuzzle]);

  /* Open the Custom landing page (between Stats & Daily) */
  const enterCustomMenu = useCallback(() => {
    setCustomView("menu");
  }, []);

  /* Start a custom puzzle (from create or load) */
  const startCustomPuzzle = useCallback(({ theme, words }) => {
    const p = makeCustomPuzzle(theme, words);
    setCustomView(null);
    setMode("custom");
    try {
      const code = encodeCustom(theme, words);
      if (typeof window !== "undefined") {
        history.replaceState(null, "", window.location.pathname + window.location.search + "#c=" + code);
      }
    } catch (e) {}
    startPuzzle({ mode: "custom", customPuzzle: p });
  }, [startPuzzle]);

  const placedIds = useMemo(() => {
    const s = new Set();
    slots.forEach(row => row.forEach(t => s.add(t.id)));
    return s;
  }, [slots]);
  const allPlaced = puzzle && placedIds.size === tray.length;

  /* Auto-advance */
  const findNextActive = useCallback((startFrom, curSlots, curRowState, words) => {
    for (let off = 1; off <= 3; off++) {
      const i = (startFrom + off) % 3;
      if (curRowState[i] !== "correct" && curSlots[i].length < words[i].length) return i;
    }
    if (curRowState[startFrom] !== "correct" && curSlots[startFrom].length < words[startFrom].length) {
      return startFrom;
    }
    return startFrom;
  }, []);

  /* Placement */
  const placeTileInternal = useCallback((tileFinder) => {
    if (phase !== "playing" || !puzzle) return;
    setSlots(prevSlots => {
      const placed = new Set();
      prevSlots.forEach(row => row.forEach(t => placed.add(t.id)));
      const tile = tileFinder(prevSlots, placed);
      if (!tile) return prevSlots;
      const curRowState = rowStateRef.current;
      const isUsable = (i) => curRowState[i] !== "correct" && prevSlots[i].length < puzzle.words[i].length;
      let target = activeRef.current;
      if (!isUsable(target)) {
        const next = [0, 1, 2].find(isUsable);
        if (next === undefined) return prevSlots;
        target = next;
        activeRef.current = target;
        setActive(target);
      }
      if (curRowState[target] === "wrong") {
        setRowState(p => { const n = p.slice(); n[target] = null; return n; });
        setLetterFeedback(p => { const n = p.slice(); n[target] = []; return n; });
      }
      const next = prevSlots.map(r => r.slice());
      next[target] = [...next[target], tile];
      if (next[target].length >= puzzle.words[target].length) {
        const stateForAdvance = curRowState.map((s, idx) =>
          (idx === target && s === "wrong") ? null : s
        );
        const adv = findNextActive(target, next, stateForAdvance, puzzle.words);
        if (adv !== target) {
          activeRef.current = adv;
          setTimeout(() => setActive(adv), 0);
        }
      }
      return next;
    });
    setStatus("");
  }, [phase, puzzle, findNextActive]);

  const placeTile = useCallback((tile) => {
    placeTileInternal((prev, placed) => placed.has(tile.id) ? null : tile);
  }, [placeTileInternal]);

  const placeTileByChar = useCallback((ch) => {
    placeTileInternal((prev, placed) => tray.find(t => t.ch === ch && !placed.has(t.id)));
  }, [placeTileInternal, tray]);

  const removeFromSlot = useCallback((rowIdx, tileId) => {
    if (phase !== "playing") return;
    const curState = rowStateRef.current[rowIdx];
    if (curState === "correct") return;
    setSlots(prev => {
      const next = prev.map(r => r.slice());
      next[rowIdx] = next[rowIdx].filter(t => t.id !== tileId);
      return next;
    });
    if (curState === "wrong") {
      setRowState(prev => { const n = prev.slice(); n[rowIdx] = null; return n; });
      setLetterFeedback(prev => { const n = prev.slice(); n[rowIdx] = []; return n; });
    }
    activeRef.current = rowIdx;
    setActive(rowIdx);
    setStatus("");
  }, [phase]);

  const removeLastInRow = useCallback((rowIdx) => {
    if (phase !== "playing") return;
    const curState = rowStateRef.current[rowIdx];
    if (curState === "correct") return;
    setSlots(prev => {
      const row = prev[rowIdx];
      if (row.length === 0) return prev;
      const next = prev.map(r => r.slice());
      next[rowIdx] = next[rowIdx].slice(0, -1);
      return next;
    });
    if (curState === "wrong") {
      setRowState(prev => { const n = prev.slice(); n[rowIdx] = null; return n; });
      setLetterFeedback(prev => { const n = prev.slice(); n[rowIdx] = []; return n; });
    }
    setStatus("");
  }, [phase]);

  const selectRow = useCallback((rowIdx) => {
    if (phase !== "playing") return;
    if (rowStateRef.current[rowIdx] === "correct") return;
    activeRef.current = rowIdx;
    setActive(rowIdx);
  }, [phase]);

  /* ---------- Submit ---------- */
  const finalizeWinLoss = useCallback((won, usedAttempts, finalHintCount) => {
    if (scoredRef.current) return;
    scoredRef.current = true;

    /* Fire-and-forget telemetry (skipped automatically if ANALYTICS_URL is blank) */
    try {
      const timeSeconds = gameStartRef.current
        ? Math.max(0, Math.round((Date.now() - gameStartRef.current) / 1000))
        : 0;
      beacon("/api/submit", {
        clientId: getClientId(),
        mode,
        puzzleDate: mode === "daily" && puzzle ? puzzle.dateStr : undefined,
        difficulty: mode === "free" ? diff : undefined,
        attempts: usedAttempts,
        won: !!won,
        timeSeconds,
        hintsUsed: finalHintCount,
        clientTs: Date.now(),
        appVersion: APP_VERSION,
      });
    } catch {}

    setStats(prev => {
      const played = prev.played + 1;
      const solved = prev.solved + (won ? 1 : 0);
      const streak = won ? prev.streak + 1 : 0;
      const bestStreak = Math.max(prev.bestStreak, streak);
      const totalAttemptsOnSolves = prev.totalAttemptsOnSolves + (won ? usedAttempts : 0);
      const totalHintsOnSolves    = prev.totalHintsOnSolves + (won ? finalHintCount : 0);
      const fastest = won
        ? (prev.fastest === 0 ? usedAttempts : Math.min(prev.fastest, usedAttempts))
        : prev.fastest;
      return { ...prev, played, solved, streak, bestStreak,
               totalAttemptsOnSolves, totalHintsOnSolves, fastest };
    });
  }, [mode, puzzle, diff]);

  const submit = useCallback(() => {
    if (phase !== "playing" || !puzzle) return;
    if (!allPlaced) {
      setStatus("Every letter must find a home.");
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (rowState[i] === "correct") continue;
      if (slots[i].length !== puzzle.words[i].length) {
        setStatus(`Word ${ROMAN[i]} needs ${puzzle.words[i].length} letters.`);
        return;
      }
    }

    const nextRowState = rowState.slice();
    const nextLetterFeedback = letterFeedback.slice();
    const giveFeedback = cfg.feedback;

    const guessesToCheck = []; // for hidden-words detection (non-matching guesses)
    const truthsLower = puzzle.words.map(w => w.toLowerCase());
    for (let i = 0; i < 3; i++) {
      if (nextRowState[i] === "correct") continue;
      const guess = slots[i].map(t => t.ch).join("").toLowerCase();
      const truth = truthsLower[i];
      if (guess === truth) {
        nextRowState[i] = "correct";
        nextLetterFeedback[i] = guess.split("").map(() => "good");
      } else {
        nextRowState[i] = "wrong";
        nextLetterFeedback[i] = giveFeedback
          ? guess.split("").map((c, k) => c === truth[k] ? "good" : "bad")
          : guess.split("").map(() => "");
        if (guess.length >= 3 && !truthsLower.includes(guess)) guessesToCheck.push(guess);
      }
    }

    // Fire-and-forget dictionary lookups; update Hidden Words tally on success.
    for (const g of guessesToCheck) {
      if (hiddenWordsRef.current.has(g)) continue;
      isEnglishWord(g).then(ok => {
        if (!ok) return;
        if (hiddenWordsRef.current.has(g)) return;
        hiddenWordsRef.current.add(g);
        setStats(prev => ({ ...prev, hiddenWords: hiddenWordsRef.current.size }));
      });
    }
    setRowState(nextRowState);
    setLetterFeedback(nextLetterFeedback);

    const usedAttempts = attempts + 1;
    setAttempts(usedAttempts);

    if (nextRowState.every(s => s === "correct")) {
      setPhase("won");
      setStatus("");
      finalizeWinLoss(true, usedAttempts, hintsUsed);
      if (mode === "daily") {
        setDailyState({ dateStr: puzzle.dateStr, locked: true, attemptsUsed: usedAttempts, won: true, puzzle });
      }
      setTimeout(() => setShowEnd(true), 600);
      return;
    }
    if (usedAttempts >= cfg.attempts) {
      setPhase("lost");
      setStatus("");
      finalizeWinLoss(false, usedAttempts, hintsUsed);
      if (mode === "daily") {
        setDailyState({ dateStr: puzzle.dateStr, locked: true, attemptsUsed: usedAttempts, won: false, puzzle });
      }
      setTimeout(() => setShowEnd(true), 600);
      return;
    }

    setTimeout(() => {
      setSlots(prev => prev.map((row, i) => nextRowState[i] === "correct" ? row : []));
      setRowState(curr => curr.map(s => s === "wrong" ? null : s));
      setLetterFeedback(curr => curr.map((row, i) => nextRowState[i] === "wrong" ? [] : row));
      const next = [0,1,2].find(i => nextRowState[i] !== "correct");
      if (next !== undefined) { activeRef.current = next; setActive(next); }
    }, 1400);

    const remaining = cfg.attempts - usedAttempts;
    setStatus(remaining === 1 ? "One attempt left." : `${remaining} attempts remain.`);
  }, [phase, puzzle, allPlaced, rowState, slots, letterFeedback, attempts, hintsUsed, finalizeWinLoss, cfg, mode]);

  /* ---------- Hints ---------- */
  const useHint = useCallback(() => {
    if (phase !== "playing" || !puzzle) return;
    if (mode === "daily") return; // no hint button in daily
    if (hintsUsed >= cfg.hints) return;
    const nextHintNum = hintsUsed + 1;
    setHintsUsed(n => n + 1);
    setStats(prev => ({ ...prev, totalHintsUsed: prev.totalHintsUsed + 1 }));

    if (nextHintNum === 1) {
      // Beginner: rhyme hint (descriptions are already shown free above the tray)
      // Everyone else (normal/hard/custom): theme/description hint
      if (mode === "free" && diff === "beginner") {
        setShowRhymes(true);
      } else {
        setShowDescriptions(true);
      }
    } else if (nextHintNum === 2) {
      setSlots(prevSlots => {
        const next = prevSlots.map(r => r.slice());
        const placedNow = new Set();
        next.forEach(r => r.forEach(t => placedNow.add(t.id)));
        for (let i = 0; i < 3; i++) {
          if (rowStateRef.current[i] === "correct") continue;
          const firstCh = puzzle.words[i][0].toUpperCase();
          if (next[i].length > 0 && next[i][0].ch === firstCh) continue;
          const candidate = tray.find(t => t.ch === firstCh && !placedNow.has(t.id));
          if (!candidate) continue;
          next[i] = [candidate, ...next[i]];
          placedNow.add(candidate.id);
          const tgt = puzzle.words[i].length;
          while (next[i].length > tgt) {
            const removed = next[i].pop();
            placedNow.delete(removed.id);
          }
        }
        return next;
      });
      setRowState(prev => prev.map(s => s === "wrong" ? null : s));
      setLetterFeedback(prev => prev.map((row, i) => rowStateRef.current[i] === "wrong" ? [] : row));
    } else if (nextHintNum === 3) {
      const candidates = [0,1,2].filter(i => rowStateRef.current[i] !== "correct");
      if (candidates.length === 0) return;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      const truth = puzzle.words[pick].toUpperCase();
      setSlots(prevSlots => {
        const correctIds = new Set();
        prevSlots.forEach((row, i) => {
          if (rowStateRef.current[i] === "correct") row.forEach(t => correctIds.add(t.id));
        });
        const available = tray.filter(t => !correctIds.has(t.id));
        const used = new Set();
        const newRow = [];
        for (const ch of truth) {
          const t = available.find(tt => tt.ch === ch && !used.has(tt.id));
          if (!t) { newRow.length = 0; break; }
          used.add(t.id);
          newRow.push(t);
        }
        if (newRow.length !== truth.length) return prevSlots;
        const next = prevSlots.map((r, i) => {
          if (i === pick) return newRow;
          if (rowStateRef.current[i] === "correct") return r;
          return r.filter(t => !used.has(t.id));
        });
        return next;
      });
      setRowState(prev => { const n = prev.slice(); n[pick] = "correct"; return n; });
      setLetterFeedback(prev => {
        const n = prev.slice();
        n[pick] = puzzle.words[pick].split("").map(() => "good");
        return n;
      });
      const nextActive = [0,1,2].find(i => i !== pick && rowStateRef.current[i] !== "correct");
      if (nextActive !== undefined) { activeRef.current = nextActive; setActive(nextActive); }
    }
  }, [phase, puzzle, hintsUsed, tray, cfg, mode]);

  /* Skip — only in free play (not allowed in Daily or Custom) */
  const skipPuzzle = useCallback(() => {
    if (mode === "daily" || mode === "custom") return;
    if (!scoredRef.current && phase === "playing") {
      scoredRef.current = true;
      setStats(prev => ({ ...prev, played: prev.played + 1, streak: 0 }));
    }
    startPuzzle({ mode: "free", diff, source, prevIdx: puzzle ? puzzle.idx : null });
  }, [mode, diff, source, puzzle, startPuzzle, phase]);

  /* Next puzzle from end modal */
  const nextPuzzle = useCallback(() => {
    setShowEnd(false);
    if (mode === "daily") return;
    if (mode === "custom") { exitToFreePlay(); return; }
    skipPuzzle();
  }, [mode, skipPuzzle, exitToFreePlay]);

  /* Keep playing / next — used by the post-game Submit-becomes-this button */
  const keepPlaying = useCallback(() => {
    if (mode === "daily") { setShowLocked(true); return; }
    if (mode === "custom") { exitToFreePlay(); return; }
    skipPuzzle();
  }, [mode, skipPuzzle, exitToFreePlay]);

  /* Share card */
  const shareDaily = useCallback(async () => {
    const d = puzzle?.dateStr || pacificDateStr();
    const used = (mode === "daily" && dailyState.dateStr === d)
      ? dailyState.attemptsUsed
      : attempts;
    const won = (mode === "daily" && dailyState.dateStr === d)
      ? dailyState.won
      : (phase === "won");
    const total = DAILY.attempts;
    const url = (typeof window !== "undefined" ? window.location.href.split("#")[0] : "");
    const text = buildShareText({ dateStr: d, used, total, won, streak: stats.streak, url });

    /* Try native Web Share first (mobile gets a real share sheet) */
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Triptych Daily", text });
        setToast("Shared");
        setTimeout(() => setToast(""), 1500);
        return;
      }
    } catch (e) {
      /* User cancelled or share failed — fall through to clipboard */
      if (e && e.name === "AbortError") return;
    }
    /* Clipboard fallback */
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setToast("Copied to clipboard");
        setTimeout(() => setToast(""), 1800);
        return;
      }
    } catch (e) {}
    /* Last-resort: legacy execCommand */
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setToast("Copied to clipboard");
      setTimeout(() => setToast(""), 1800);
    } catch (e) {
      setToast("Copy failed");
      setTimeout(() => setToast(""), 1800);
    }
  }, [puzzle, attempts, phase, mode, dailyState, stats.streak]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (showStats || showEnd || showLocked || diffMenuOpen || customView) {
        if (e.key === "Escape") {
          /* Daily end + locked modals are intentionally not Escape-dismissable. */
          const dailyLocked = (showEnd && mode === "daily") || showLocked;
          if (!dailyLocked) {
            setShowStats(false); setShowEnd(false); setShowLocked(false);
          }
          setDiffMenuOpen(false);
          if (customView) setCustomView(null);
        }
        return;
      }
      if (phase !== "playing") return;
      if (e.key === "Enter") { e.preventDefault(); submit(); return; }
      if (e.key === "Backspace") { removeLastInRow(activeRef.current); return; }
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        selectRow(parseInt(e.key, 10) - 1);
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        placeTileByChar(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, showStats, showEnd, showLocked, diffMenuOpen, customView, placeTileByChar, removeLastInRow, selectRow, submit]);

  /* Click-outside for diff menu */
  useEffect(() => {
    if (!diffMenuOpen) return;
    const onClick = (e) => {
      if (!e.target.closest) return;
      if (diffMenuOpen && !e.target.closest(".diff-dropdown")) setDiffMenuOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [diffMenuOpen]);

  /* Render */
  if (!puzzle) return <div className="stage"><p>Loading…</p></div>;

  const isDaily  = mode === "daily";
  const isCustom = mode === "custom";
  const inCustomView = !!customView;
  const headerKicker = inCustomView ? "Triptych · Custom"
                     : isDaily ? "Triptych · Daily"
                     : isCustom ? "Triptych · Custom"
                     : "Triptych";
  const headerTitle = inCustomView
    ? (customView === "create" ? "Create Puzzle"
      : customView === "load" ? "Play Puzzle"
      : "Custom")
    : isDaily
      ? prettyDate(puzzle.dateStr || pacificDateStr())
      : isCustom
        ? (puzzle.theme ? puzzle.theme : "Your puzzle")
        : (source === "themed" && puzzle.theme ? puzzle.theme : DIFF[diff].label);

  const descriptionLine = puzzle.words.map(hintFor).join(", ");
  const rhymeLine = puzzle.words.map(rhymeFor).join(", ");
  const lengthsLine = puzzle.words.map(w => w.length).join(" · ");
  const isBeginner = mode === "free" && diff === "beginner";
  const gameOver = phase === "won" || phase === "lost";

  return (
    <div className="stage">
      <header className="app-head">
        <div className="head-left">
          <p className="head-kicker">{headerKicker}</p>
          <h1 className="head-title">{headerTitle}</h1>
        </div>
        <div className="head-right">
          <div className="head-right-stack">
            {inCustomView ? (
              <button className="daily-btn on" onClick={exitToFreePlay}>
                <span>Free Play</span>
              </button>
            ) : !isDaily && !isCustom ? (
              <>
                {(() => {
                  const today = pacificDateStr();
                  const dailyDone = dailyState.dateStr === today && dailyState.locked;
                  return (
                    <button
                      className={"daily-btn" + (dailyDone ? " done" : "")}
                      onClick={enterDaily}
                      title={dailyDone ? "You've finished today's puzzle" : "Today's Daily Puzzle"}
                    >
                      <IconCalendar size={12} />
                      {dailyDone
                        ? <><span>Next in</span> <DailyButtonCountdown /></>
                        : <span>Daily Puzzle</span>}
                    </button>
                  );
                })()}
                <div className="mode-toggle" role="tablist" aria-label="source">
                  <button
                    className={"toggle-btn" + (source === "themed" ? " on" : "")}
                    onClick={() => changeSource("themed")}
                  >Themed</button>
                  <button
                    className={"toggle-btn" + (source === "mixed" ? " on" : "")}
                    onClick={() => changeSource("mixed")}
                  >Mixed</button>
                </div>
                <div className="diff-dropdown">
                  <button
                    className="diff-btn"
                    onClick={() => setDiffMenuOpen(v => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={diffMenuOpen}
                  >
                    <span>{DIFF[diff].label}</span>
                    <IconChevron size={12} />
                  </button>
                  {diffMenuOpen && (
                    <div className="diff-menu" role="listbox">
                      {["beginner","normal","hard","expert"].map(k => (
                        <button
                          key={k}
                          className={"diff-item" + (k === diff ? " on" : "")}
                          onClick={() => changeDiff(k)}
                          role="option"
                          aria-selected={k === diff}
                        >
                          <span className="diff-item-name">{DIFF[k].label}</span>
                          <span className="diff-item-blurb">{DIFF[k].blurb}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button className="daily-btn on" onClick={exitToFreePlay}>
                <span>Free Play</span>
              </button>
            )}
          </div>
          <div className="head-icons">
            <button className="icon-btn" onClick={() => setShowStats(true)} aria-label="Stats">
              <IconStats size={16} />
            </button>
            {!isDaily && !isCustom && !inCustomView && (
              <button className="icon-btn" onClick={enterCustomMenu} aria-label="Custom puzzle" title="Custom">
                <IconCustom size={16} />
              </button>
            )}
            {!isDaily && !isCustom && !inCustomView && (
              <button className="icon-btn" onClick={skipPuzzle} aria-label="Skip" title="Skip">
                <IconRefresh size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="play-area">
        {inCustomView ? (
          customView === "menu" ? (
            <CustomMenu
              onPickCreate={() => setCustomView("create")}
              onPickPlay={() => setCustomView("load")}
            />
          ) : customView === "create" ? (
            <CustomCreateView
              onBack={() => setCustomView("menu")}
              onCreate={startCustomPuzzle}
            />
          ) : (
            <CustomLoadView
              onBack={() => setCustomView("menu")}
              onLoad={startCustomPuzzle}
            />
          )
        ) : (
        <>
        {/* Daily info panel (above tray) */}
        {isDaily && (
          <div className="daily-info-panel">
            <p className="dip-line"><strong>One puzzle per day · {DAILY.attempts} attempts · No hints</strong></p>
            <p className="dip-line">Unscramble the letters into 3 words — use every letter.</p>
            <p className="dip-line">Word lengths: <span className="dip-lengths">{lengthsLine}</span></p>
            <p className="dip-line dip-desc">{descriptionLine}</p>
          </div>
        )}

        {/* Beginner info panel (above tray) — mirrors the daily info panel.
            Shows descriptions as a free preview. Hint button still grants rhymes,
            first letter, and a full row. */}
        {isBeginner && (
          <div className="daily-info-panel">
            <p className="dip-line dip-desc">{descriptionLine}</p>
          </div>
        )}

        {/* Tray (ABOVE slots) — backspace tile at end */}
        <div className="tray">
          {tray.map(t => {
            const isPlaced = placedIds.has(t.id);
            return (
              <span
                key={t.id}
                className={"tile" + (isPlaced ? " placed" : "")}
                onClick={() => {
                  if (isPlaced) {
                    // double-tap to remove: works for both mouse and touch (mobile fires click after touchend)
                    const now = Date.now();
                    const prev = lastTapRef.current.get(t.id) || 0;
                    if (now - prev < 400) {
                      for (let r = 0; r < 3; r++) {
                        if (slots[r].some(s => s.id === t.id)) { removeFromSlot(r, t.id); break; }
                      }
                      lastTapRef.current.delete(t.id);
                    } else {
                      lastTapRef.current.set(t.id, now);
                    }
                    return;
                  }
                  placeTile(t);
                }}
              >{t.ch}</span>
            );
          })}
          <span
            className="tile tile-backspace"
            onClick={() => removeLastInRow(activeRef.current)}
            role="button"
            aria-label="Backspace"
            title="Backspace"
          ><IconBackspace size={18} /></span>
        </div>

        {/* Slots */}
        <div className="slots">
          {[0, 1, 2].map((i) => {
            const state = rowState[i];
            const cls = ["slot"];
            if (state === "correct") cls.push("correct");
            else if (state === "wrong") cls.push("wrong");
            else if (active === i) cls.push("active");

            const cur = slots[i].length;
            const tot = puzzle.words[i].length;
            const fb = letterFeedback[i];

            const missing = Math.max(0, tot - cur);

            return (
              <div className="slot-row" key={i}>
                <div
                  className={cls.join(" ")}
                  data-row={i}
                  onClick={() => selectRow(i)}
                >
                  <div className="slot-letters">
                    {slots[i].map((t, k) => {
                      const mark = fb[k];
                      const classes = ["slot-letter"];
                      if (mark === "good") classes.push("good");
                      else if (mark === "bad") classes.push("bad");
                      return (
                        <span
                          key={t.id}
                          className={classes.join(" ")}
                          onClick={(e) => { e.stopPropagation(); removeFromSlot(i, t.id); }}
                          title="Tap to remove"
                        >{t.ch}</span>
                      );
                    })}
                    {/* Underline placeholders for missing letters */}
                    {Array.from({ length: missing }).map((_, k) => (
                      <span key={`u${k}`} className="slot-blank">_</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hint chip — Beginner sees rhymes (hint #1), others see descriptions (hint #1).
            Daily skipped (no hints); Beginner's description panel above tray is a free preview, so we suppress the description chip there. */}
        {showRhymes && !isDaily && isBeginner && (
          <div className="hints-line">
            <span className="hint-chip">
              <Bulb size={12} />
              <span className="hint-chip-text">rhymes with {rhymeLine}</span>
            </span>
          </div>
        )}
        {showDescriptions && !isDaily && !isBeginner && (
          <div className="hints-line">
            <span className="hint-chip">
              <Bulb size={12} />
              <span className="hint-chip-text">{descriptionLine}</span>
            </span>
          </div>
        )}

        {/* Controls: Hint beside Submit (no shuffle, no separate clear) */}
        <div className="controls">
          {!isDaily && cfg.hints > 0 && (
            <button
              className="btn ghost hint"
              onClick={useHint}
              disabled={phase !== "playing" || hintsUsed >= cfg.hints}
              title={`${cfg.hints - hintsUsed} hint${cfg.hints - hintsUsed === 1 ? "" : "s"} remaining`}
            >
              <Bulb size={14} />
              <span>Hint</span>
              <span className="hint-meter-inline">
                {Array.from({ length: cfg.hints }).map((_, i) => (
                  <span key={i} className={"dot mini" + (i < hintsUsed ? " spent" : "")} />
                ))}
              </span>
            </button>
          )}
          <button
            className="btn primary"
            onClick={gameOver ? keepPlaying : submit}
            disabled={phase === "playing" && !allPlaced}
          >{gameOver ? "Keep Playing" : "Submit"}</button>
        </div>

        {/* Attempts meter */}
        <div className="meta-row">
          <div className="attempts">
            <span>attempts</span>
            <span className="dots">
              {Array.from({ length: cfg.attempts }).map((_, i) => (
                <span key={i} className={"dot" + (i < attempts ? " spent" : "")} />
              ))}
            </span>
          </div>
        </div>

        <div className={"status" + (phase === "won" ? " good" : phase === "lost" ? " warn" : "")}>
          {phase === "playing" && status}
          {phase === "won" && (attempts === 1 ? "Solved on the first try." : "All three words found.")}
          {phase === "lost" && "Out of attempts."}
        </div>
        </>
        )}
      </div>

      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} />}
      {showEnd && (
        <EndGameModal
          phase={phase}
          puzzle={puzzle}
          attempts={attempts}
          isDaily={isDaily}
          isCustom={isCustom}
          stats={stats}
          onStats={() => { setShowEnd(false); setShowStats(true); }}
          onNext={nextPuzzle}
          onShare={isDaily ? shareDaily : null}
          onClose={() => setShowEnd(false)}
          onFreePlay={() => { setShowEnd(false); exitToFreePlay(); }}
        />
      )}
      {showLocked && (
        <DailyLockedModal
          dateStr={dailyState.dateStr}
          attempts={dailyState.attemptsUsed}
          won={dailyState.won}
          puzzle={dailyState.puzzle}
          stats={stats}
          onShare={shareDaily}
          onFreePlay={exitToFreePlay}
        />
      )}
      <ToastChip msg={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
