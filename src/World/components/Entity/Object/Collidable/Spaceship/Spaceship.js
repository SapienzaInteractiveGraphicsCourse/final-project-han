import { Tween } from '/final-project-han/vendor/tween/Tween.js'
import { Easing } from '/final-project-han/vendor/tween/Easing.js'

import { Collidable } from "../Collidable.js"
import { Explosion } from '../../../ObjectManager/Explosion.js'

import BulletManager from '../../../ObjectManager/BulletManager.js'
import ExplosionManager from '../../../ObjectManager/ExplosionManager.js'

import Audio from '../../../../../systems/AudioPlayer.js'


class Spaceship extends Collidable
{
    constructor ()
    {
        super()

        if (this.constructor == Spaceship) 
            throw new Error("Abstract class cannot be instantiated.")

        this.mass = 10
        this.friction_coeff = 4
        this.power = 100

        // states
        this.IDLE_STATE = 0
        this.MOVING_LEFT_STATE = 1
        this.MOVING_RIGHT_STATE = 2
        this.STABILIZING_STATE = 3

        this.changeState(this.IDLE_STATE)

        // moving animation
        this.move_anim_index = 0

        this.tilt_angle = Math.PI / 3
        this.tilt_speed = 0.001

        // shooting
        this.Bullet = null
        this.damage = 20

        this.shooting = false
        this.shooting_delay = 0.5

        this.shooting_timer = 0

        this.cannon_power = 25

        // durability 
        this.durability = 100

        // explosions
        this.damage_explosion_power = 50
        this.final_explosion_power = 350

    }

    moving_anim (to)
    {
        const tilt_time = Math.abs( to - this.rotation.z ) / this.tilt_speed

        const anim = new Tween({ rotz : this.rotation.z })
            .to({ rotz : to }, tilt_time)
            .easing(Easing.Back.Out)
            .on('update', ({ rotz }) => {
                this.rotation.z = rotz
                this.updateHitBox()
            })

        return anim
    }

    get moving_left_anim () { return this.moving_anim(-this.tilt_angle) }
    get moving_right_anim () { return this.moving_anim(this.tilt_angle) }
    get stabilizing_anim () 
    { 
        const anim = this.moving_anim(0)
        return anim.on('complete', () => {
            this.changeState(this.IDLE_STATE)
        })
    }
    get idle_anim () { return null }

    changeState (new_state) {
        if (this.state == new_state) return

        this.state = new_state

        // set a new animation
        switch (this.state)
        {
            case this.MOVING_LEFT_STATE :
                this.set_animation(this.moving_left_anim, this.move_anim_index)
                break

            case this.MOVING_RIGHT_STATE :
                this.set_animation(this.moving_right_anim, this.move_anim_index)
                break

            case this.STABILIZING_STATE :
                this.set_animation(this.stabilizing_anim, this.move_anim_index)
                break

            case this.IDLE_STATE :
                this.set_animation(this.idle_anim, this.move_anim_index)
                break
        }
    }

    update (delta)
    {
        super.update(delta)

        // apply movement
        if (this.state == this.MOVING_LEFT_STATE) this.addForce(-this.power)
        if (this.state == this.MOVING_RIGHT_STATE) this.addForce(this.power)

        // update shooting state
        this.shooting_timer -= delta

        if (this.shooting && this.shooting_timer < 0) 
        {   
            this.shoot()
            this.shooting_timer = this.shooting_delay
        }
    }

    updateHitBox () { }

    shoot ()
    {
        if (! this.Bullet) return

        const Bullet = this.Bullet
        const bullet = new Bullet()

        bullet.position.set(this.position.x, 0, this.position.z)
        bullet.velocity.set(this.velocity.x, 0, 0)
        bullet.addForce(0, 0, this.cannon_power)

        bullet.damage = this.damage

        BulletManager.add(bullet)

        Audio.playShootingSFX(this.position.z)
    }

    collision (other)
    {
        super.collision(other)

        const explosion = new Explosion(this.damage_explosion_power, this.explosion_color)
        explosion.position.set(other.position.x, other.position.y, other.position.z)
        ExplosionManager.add(explosion)
    }

    die ()
    {
        super.die()

        const explosion = new Explosion(this.final_explosion_power, this.explosion_color)
        explosion.position.set(this.position.x, this.position.y, this.position.z)
        ExplosionManager.add(explosion)

        Audio.playExplosionSFX(this.position.z)
    }
} 

export { Spaceship }