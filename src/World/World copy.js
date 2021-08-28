import { Clock } from '/final-project-han/final-project-han/vendor/three/three.module.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loader } from './systems/Loader.js'

import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'

import { Sky } from './components/Entity/Sky.js'
import { Player } from './components/Entity/Object/Spaceship/Player.js'

// The world represents the combination of all the elements in the game

const FRAME_RATE = 30

const clock = new Clock()  
const interval = 1 / FRAME_RATE
let delta = 0

let camera
let renderer
let scene

let loader

let sky
let player

const fps_counter = document.querySelector('#fps-counter')

class World 
{
    constructor(container) 
    {
        camera = createCamera()
        scene = createScene()
        renderer = createRenderer()

        container.append(renderer.domElement)

        const resizer = new Resizer(container, camera, renderer)

        loader = new Loader()
    }

    async init() 
    {
        // load meshes
        await loader.load()

        // lights
        const { ambientLight, mainLight } = createLights()
        scene.add(ambientLight, mainLight)

        // sky
        sky = new Sky(loader)
        scene.add(sky.group)

        // player
        player = new Player(loader)
        player.position.set(0, 0)
        player.addToScene(scene)
    }

    update(delta) 
    {
        sky.update(delta)
        player.update(delta)
    }

    render() 
    {
        renderer.render(scene, camera)
    }

    start() 
    {
        renderer.setAnimationLoop(() => {
            delta += clock.getDelta()

            if (delta  > interval) 
            {
                this.update(delta)
                this.render()

                fps_counter.innerHTML = 'FPS: ' + parseInt(1 / delta)
                delta = delta % interval
            }
        })
    }

    stop() 
    {
        renderer.setAnimationLoop(null)
    }
}

export { World }