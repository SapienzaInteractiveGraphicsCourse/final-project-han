import { Object } from "./Object.js"
import { makeDetrite } from "../../../systems/meshMaker.js"

class Debris extends Object
{
    constructor (color, life_time)
    {
        super()

        this.friction_coeff = 1
        this.life_time = life_time
        this.timer = 0

        this.mesh = makeDetrite(color)

        this.rotation.x = Math.random() * Math.PI * 2
        this.rotation.y = Math.random() * Math.PI * 2
    }

    update (delta)
    {
        super.update(delta)

        this.timer += delta

        const opacity = 1 - (this.timer / this.life_time)
        this.mesh.material.opacity = opacity

        if (this.timer >= this.life_time) this.die()
    }
}

export { Debris }