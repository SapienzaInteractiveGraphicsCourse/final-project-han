import { Enemy } from "./Enemy.js"
import { Hitbox } from "../../HitBox.js"

class PowerEnemy extends Enemy
{
    constructor () 
    {
        super()

        this.tilt_angle = - Math.PI / 8
        this.tilt_speed = 0.0005

        this.durability = 20

        this.damage = 20
        this.shooting_delay = 2.0
        this.cannon_power = 12

        this.points4damage = 6
        this.points4kill = 120

        this.explosion_color = 'rgb(5, 55, 28)'
        this.damage_explosion_power = 35
        this.final_explosion_power = 230
    }

    loadMesh (mesh_loader) { return mesh_loader.power_enemy }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, -1.5, 4.5, 2.0, 2.0, 0)
        hit_box.setBox(0, 0,  0.0, 1.3, 2.0, 6.0, 1)

        return hit_box
    }

}

export { PowerEnemy }