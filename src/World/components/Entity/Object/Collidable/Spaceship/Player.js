import { Tween } from '/vendor/tween/Tween.js'

import { Spaceship } from "./Spaceship.js"
import { PlayerBullet } from "../Bullets/PlayerBullet.js"
import { Controls } from "../../../../../systems/Controls.js"
import { Hitbox } from '../HitBox.js'
import UI from '../../../../UI.js'

const HIT_BOX_HEAD = 0
const HIT_BOX_TAIL = 1

const TAIL_WIDTH = 3.2

const LIMIT_X = 40

class Player extends Spaceship 
{
    constructor () 
    {
        super ()

        this.mass = 10
        this.friction_coeff = 4
        this.power = 700

        this.turbolence_radius = 0.05
        this.turbolence_time = 5
        this.turbolence_anim_index = 1

        this.Bullet = PlayerBullet
        this.shooting_delay = 0.4
        this.cannon_power = -30

        this.reorient()

        this.controls = new Controls()

        this.set_animation(this.turbolence_anim, this.turbolence_anim_index)

        this.collision_manager.addPlayerObj(this)
    }

    loadMesh (mesh_loader) { return mesh_loader.player_spaceship }

    get turbolence_anim () 
    {
        const rand_ang = Math.random() * (Math.PI * 2) // random angle from 0 to 360 degree
        const x_force = this.turbolence_radius * 400 * Math.cos(rand_ang)
        const new_y = this.turbolence_radius * Math.sin(rand_ang)

        const anim = new Tween({ x: this.position.x, y: this.position.y })
            .to({ x: x_force, y: new_y }, this.turbolence_time)
            .on('update', (o) => {
                this.addForce(o.x)
                this.position.y = o.y
            })
            .on('complete', () => {
                this.set_animation(this.turbolence_anim, this.turbolence_anim_index)
            })

        return anim
    }

    update (delta)
    {
        super.update(delta)

        // update state
        if      (! this.state == this.IDLE_STATE && 
                 ! this.controls.left && ! this.controls.right) this.changeState(this.STABILIZING_STATE)

        else if (this.controls.left && ! this.controls.right)   this.changeState(this.MOVING_LEFT_STATE)
        else if (this.controls.right && ! this.controls.left)   this.changeState(this.MOVING_RIGHT_STATE)   
        
        if (this.controls.left_click) this.shooting = true
        else this.shooting = false

        // limit movements
        if (this.position.x > LIMIT_X) 
        {
            this.position.x = LIMIT_X 
            this.velocity.x = 0
        }
        if (this.position.x < -LIMIT_X) 
        {
            this.position.x = -LIMIT_X 
            this.velocity.x = 0
        }

        // update UI
        UI.health = this.durability

        this.animate()
    }

    updateHitBox () { 
        const new_width = TAIL_WIDTH - Math.abs(this.rotation.z) * 2
        this.hit_box.setBox(0, 0, 1.5, new_width, 2.0, 2.0, HIT_BOX_TAIL)
    }

    reorient () { this.rotation.y = Math.PI }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, 1.5, TAIL_WIDTH, 2.0, 2.0, HIT_BOX_TAIL)
        hit_box.setBox(0, 0, 0.0, 1.3,        2.0, 5.0, HIT_BOX_HEAD)

        return hit_box
    }
}

export { Player }