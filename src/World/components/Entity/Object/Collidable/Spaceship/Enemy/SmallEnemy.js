import { Hitbox } from "../../HitBox.js"
import { Enemy } from "./Enemy.js"

class SmallEnemy extends Enemy 
{
    constructor () 
    {
        super()

        this.rotation.y = Math.PI / 2

        this.mass = 10
        this.friction_coeff = 4
        this.power = 200

        this.durability = 10

        this.points4damage = 0
        this.points4kill = 1000

        this.explosion_color = 'rgb(25, 90, 55)'
        this.damage_explosion_power = 10
        this.final_explosion_power = 200
    }

    loadMesh (mesh_loader) { return mesh_loader.small_enemy }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, 0, 2.5, 4.0, 2.5, 0)

        return hit_box
    }

    goRight ()
    {
        this.initial_x = this.position.x
        this.changeState(this.MOVING_RIGHT_STATE)
    }

    goLeft () { this.goRight() }

    update (delta)
    {
        super.update(delta)

        if (this.position.x > 120) this.die()
    }
}

export { SmallEnemy }