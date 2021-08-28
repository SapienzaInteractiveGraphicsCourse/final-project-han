import { Hitbox } from "../../HitBox.js"
import { Enemy } from "./Enemy.js"

class SmallEnemy extends Enemy 
{
    constructor () 
    {
        super()

        this.mass = 10
        this.friction_coeff = 4
        this.power = 700
    }

    loadMesh (mesh_loader) { return mesh_loader.small_enemy }

    makeHitBox ()
    {
        const hit_box = new Hitbox()

        hit_box.setBox(0, 0, 0.3, 2.2, 2.0, 0.5, 0)
        hit_box.setBox(0, 0, 0.0, 0.6, 2.0, 2.5, 1)

        return hit_box
    }
}

export { SmallEnemy }