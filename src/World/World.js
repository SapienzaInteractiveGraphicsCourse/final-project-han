import { Clock } from '/final-project-han/vendor/three/three.module.js'

import { OrbitControls } from '/final-project-han/vendor/three/OrbitControls.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import Loader from './systems/Loader.js'

import { Camera } from './components/Camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'

import CollisionManager from './components/Entity/CollisionManager.js'

import Sky from './components/Entity/ObjectManager/Sky.js'
import SpaceshipsManager from './components/Entity/ObjectManager/SpaceshipsManager.js'
import BulletManager from './components/Entity/ObjectManager/BulletManager.js'
import ExplosionManager from './components/Entity/ObjectManager/ExplosionManager.js'

import UI from './components/UI.js'

// The world represents the combination of all the elements in the game

const FRAME_RATE = 30

const clock = new Clock()  
const interval = 1 / FRAME_RATE
let delta = 0


// camera positions
const MENU_POSITION = { x: 0, y: 50, z: -90 }
const MENU_LOOK_AT = { x: 0, y: 0, z: -110 }

const IN_GAME_POSITION = { x: 0, y: 10, z: 20 }
const IN_GAME_LOOK_AT = { x: 0, y: 0, z: -20 }


let camera
let renderer
let scene

let player

const sky = Sky
const spaceships = SpaceshipsManager
const explosions = ExplosionManager
const bullets = BulletManager

const collision_manager = CollisionManager

let orbit

let started = false
let paused = false

const fps_counter = document.querySelector('#fps-counter')

const loading = document.querySelector('#loading-screen')

const menu = document.querySelector('#menu-screen')
const play_btn = document.querySelector('#play-btn')

const pause_menu = document.querySelector('#pause-menu-screen')
const continue_btn = document.querySelector('#continue-btn')
const menu_btn = document.querySelector('#menu-btn')

const game_over_menu = document.querySelector('#game-over-screen')
const menu_btn2 = document.querySelector('#menu-btn-2')

const ui = document.querySelector('#ui-screen')

const level_screen = document.querySelector('#level-up-screen')
const level = document.querySelector('#level')

function show (elem) { elem.style.display = (elem === ui) ? 'flex' : 'table' }
function hide (elem) { elem.style.display = 'none' }

play_btn.addEventListener('click', play)
continue_btn.addEventListener('click', resume)
menu_btn.addEventListener('click', end)
menu_btn2.addEventListener('click', end)

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') pause()
})

function play () 
{
    paused = false

    UI.reset()

    spaceships.initialize()

    level.innerHTML = spaceships.level

    hide(menu)
    show(ui)
    show(level_screen)

    camera.transitionTo(IN_GAME_POSITION, 2000, IN_GAME_LOOK_AT, start)
    camera.follow(spaceships.player)
}

function start ()
{
    hide(level_screen)
    started = true
}

function resume () 
{
    paused = false

    hide(pause_menu)
}

function pause ()
{
    if (!started || paused) return

    paused = true

    show(pause_menu)
}

function end ()
{
    started = false
    paused = false

    hide(pause_menu)
    hide(game_over_menu)
    hide(ui)

    camera.transitionTo(MENU_POSITION, 2000, MENU_LOOK_AT, reset)
    camera.follow(null)    

    show(menu)
}

function newLevel ()
{
    spaceships.levelUp()

    level.innerHTML = spaceships.level
    show(level_screen)

    camera.transitionTo(IN_GAME_POSITION, 2000, IN_GAME_LOOK_AT, start)
    camera.follow(spaceships.player)
}

function levelUp ()
{
    setTimeout(() => {
        started = false

        camera.transitionTo(MENU_POSITION, 2000, MENU_LOOK_AT, newLevel)
        camera.follow(null)
    }, 2000) 
}

function gameOver ()
{
    started = false

    show(game_over_menu)
    hide(ui)

    UI.setFinalScore()
}

function reset ()
{
    spaceships.reset()
    explosions.reset()
    bullets.reset()
}

class World 
{
    constructor (container) 
    {
        camera = new Camera(MENU_POSITION, MENU_LOOK_AT)
        scene = createScene()
        renderer = createRenderer()

        container.append(renderer.domElement)

        const resizer = new Resizer(container, camera, renderer)

        //orbit = new OrbitControls(camera, renderer.domElement)
    }

    async init () 
    {
        await this.load()

        // lights
        const { ambientLight, mainLight, secondaryLight } = createLights()
        scene.add(ambientLight, mainLight, secondaryLight)

        // sky
        scene.add(sky.group)
        // enemies
        scene.add(spaceships.group)  
        // explosions
        scene.add(explosions.group)
        // bullets
        scene.add(bullets.group)

        show(menu)
    }

    update (delta) 
    {
        if (paused) return

        sky.update(delta)

        camera.update(delta)

        if (!started) return

        spaceships.update(delta)
        explosions.update(delta)
        bullets.update(delta)

        //orbit.update()
        
        collision_manager.update(delta)

        // end of level
        if (spaceships.level_finished) levelUp()
        // end of game
        if (spaceships.game_over) gameOver()
    }

    render () 
    {
        renderer.render(scene, camera)
    }

    start () 
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

    stop () 
    {
        renderer.setAnimationLoop(null)
    }

    async load ()
    {
        show(loading)

        // load meshes
        await Loader.load()

        hide(loading)
    }
}

export { World }
