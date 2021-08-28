import { Collidable } from "../Collidable.js"

class Bullet extends Collidable 
{
    constructor () 
    {
        super()

        if (this.constructor == Bullet) 
            throw new Error("Abstract class cannot be instantiated.")

        this.mass = 0.01
        this.friction_coeff = 0
    }

    set color (color) { this.mesh.material.color.set(color) }

    update (delta)
    {
        super.update(delta)

        if (this.position.z < -700) this.die()
    }
}

export { Bullet }