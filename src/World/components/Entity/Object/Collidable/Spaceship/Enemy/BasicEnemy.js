import { Hitbox } from "../../HitBox.js"
import { Enemy } from "./Enemy.js"

class BasicEnemy extends Enemy 
{
    constructor () 
    {
        super()

        this.tilt_angle = - Math.PI / 6
        this.tilt_speed = 0.0005

        this.durability = 15

        this.damage = 10
        this.shooting_delay = 1.8
        this.cannon_power = 10

        this.points4damage = 4
        this.points4kill = 100

        this.explosion_color = 'rgb(200, 50, 0)'
        this.damage_explosion_power = 30
        this.final_explosion_power = 200
    }

    loadMesh (mesh_loader) { return mesh_loader.basic_enemy }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, -0.7, 3.5, 4.0, 4.5, 0)
        hit_box.setBox(0, 0,  0.5, 1.3, 4.0, 4.5, 1)

        return hit_box
    }
}

export { BasicEnemy }