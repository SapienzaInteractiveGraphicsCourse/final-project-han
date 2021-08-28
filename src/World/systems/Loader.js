import { FBXLoader } from '/final-project-han/vendor/three/FBXLoader.js'
import { GLTFLoader } from '/final-project-han/vendor/three/GLTFLoader.js'
import { TextureLoader } from '/final-project-han/vendor/three/three.module.js'

import { makeStarMesh, makeBullet } from './meshMaker.js'

const MODELS_PATH = '/assets/models/'
const TEXTURES_PATH = '/assets/textures/'

//let loaderFBX
let loaderGLB
let textureLoader

const loadModel = async (path) => 
{
    const data = await loaderGLB.loadAsync(path, undefined, undefined, function (e) {
        console.error( e ) 
    })
    return data.scene.children[0].children[0]
}

const loadTexture = async (path) => 
{
    const texture = await textureLoader.load(path, undefined, undefined, function (e) {
        console.error( e ) 
    })
    return texture
}

//-------SPACESHIPS---------------------
const spaceships_dir = 'spaceships/'
const spaceships_fnames = [
    'CamoStellarJet',
    'DualStriker',
    'GalactixRacer',
    'InfraredFurtive',
    'InterstellarRunner',
    'MeteorSlicer',
    'MicroRecon',
    'RedFighter',
    'StarMarineTrooper',
    'Transtellar',
    'UltravioletIntruder'
]

// PROTOTYPES 

const spaceshipProtos = []

let starProto 


async function loadSpaceships () 
{
    // load spaceships models
    for (let i = 0; i < spaceships_fnames.length; i++)
    {
        const model_path = MODELS_PATH + spaceships_dir + spaceships_fnames[i] + '.glb'
        const texture_path = TEXTURES_PATH + spaceships_dir + spaceships_fnames[i] + '.png'

        const spaceship = await loadModel(model_path)
        const texture = await loadTexture(texture_path)

        // apply texture
        spaceship.material.map = texture

        spaceship.geometry.center()

        spaceshipProtos.push(spaceship)
    }
}

async function loadStar ()
{
    starProto = makeStarMesh()
}

class Loader
{
    constructor() 
    {
        //loaderFBX = new FBXLoader()
        loaderGLB = new GLTFLoader()
        textureLoader = new TextureLoader()
    }

    async load()
    {
        await loadSpaceships()
        await loadStar()
    }

    // get random spaceship
    get random_spaceship()
    {
        const no = parseInt(Math.random() * spaceshipProtos.length)
        const spaceship = spaceshipProtos[no].clone()
        //spaceship.material = new MeshPhongMaterial().copy( spaceshipProtos[no].material )

        return spaceship
    }

    get player_spaceship () { return spaceshipProtos[4].clone() }

    get interceptor () { return spaceshipProtos[1].clone() }

    get basic_enemy () { return spaceshipProtos[9].clone() }
    get small_enemy () { return spaceshipProtos[6].clone() }
    get rotating_enemy () { return spaceshipProtos[5].clone() }
    get power_enemy () { return spaceshipProtos[2].clone() }
    get mother_ship () { return spaceshipProtos[7].clone() }

    get bullet () { return makeBullet() }

    get star () { return starProto.clone() }
}

const instance = new Loader()

Object.freeze(instance)
export default instance