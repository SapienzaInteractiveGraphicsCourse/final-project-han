import { Enemy } from "./Enemy.js"
import { Hitbox } from "../../HitBox.js"

class MotherShip extends Enemy 
{
    constructor () 
    {
        super()

        this.explosion_color = 'rgb(200, 20, 20)'

        this.tilt_angle = - Math.PI / 8
        this.tilt_speed = 0.0005

        this.durability = 100

        this.damage = 20
        this.shooting_delay = 2.5
        this.cannon_power = 8

        this.points4damage = 10
        this.points4kill = 200

        this.explosion_color = 'rgb(120, 20, 20)'
        this.damage_explosion_power = 20
        this.final_explosion_power = 320
    }

    loadMesh (mesh_loader) { return mesh_loader.mother_ship }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, -1.0, 7.0, 4.0, 4.0, 0)
        hit_box.setBox(0, 0,  0.0, 1.5, 4.0, 6.0, 1)

        return hit_box
    }
}

export { MotherShip }