import { Tween } from '/final-project-han/vendor/tween/Tween.js'
import { Easing } from '/final-project-han/vendor/tween/Easing.js'

import { Enemy } from "./Enemy.js"
import { Hitbox } from "../../HitBox.js"

class RotatingEnemy extends Enemy 
{
    constructor () 
    {
        super()

        this.tilt_angle = 0
        this.tilt_speed = 0

        this.durability = 25

        this.damage = 15
        this.shooting_delay = 0.5
        this.cannon_power = 10

        this.points4damage = 8
        this.points4kill = 140

        this.explosion_color = 'rgb(125, 0, 0)'
        this.damage_explosion_power = 25
        this.final_explosion_power = 230

        this.rotationg_anim_index = 0
        this.rotation_timer = 0
        this.rotation_time = 6  // each 6 seconds it rotates 
        this.rotated = false
    }

    get rotation_anim () 
    {
        const to = (this.rotated) ?  0 : Math.PI / 2

        if (to == 0)
        {
            this.hit_box.setBox(0, 0, 0.0, 1.5, 5.0, 5.0, 0)
            this.rotated = false
        }

        else
        {
            this.hit_box.setBox(0, 0, 0.0, 5.0, 2.0, 5.0, 0)
            this.rotated = true
        }

        const anim = new Tween({ rot: this.rotation.z })
            .to({ rot: to }, 1000)
            .easing(Easing.Back.Out)
            .on('update', (o) => {
                this.rotation.z = o.rot
            })

        return anim
    }

    loadMesh (mesh_loader) { return mesh_loader.rotating_enemy }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, 0.0, 1.5, 5.0, 5.0, 0)

        return hit_box
    }

    update (delta)
    {
        super.update(delta)

        this.rotation_timer += delta
        if (this.rotation_timer >= this.rotation_time)
        {
            this.rotation_timer = 0
            this.set_animation(this.rotation_anim, this.rotationg_anim_index)
        }
    }

    shoot ()
    {
        if (! this.rotated) return

        super.shoot()
    }
}

export { RotatingEnemy }