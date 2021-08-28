import { Color } from '/final-project-han/vendor/three/three.module.js'

import { ObjectManager } from "./ObjectManager.js"
import { Debris } from "../Object/Debris.js"

const COLOR_MAX_VARIATION = 0.2
const POWER_MAX_VARIATION = 0.6

class Explosion extends ObjectManager
{
    constructor (power, color)
    {
        super()

        const debris_no =  parseInt(power / 5)
        const life_time = power / 150

        for (let i = 0; i < debris_no; i++)
        {
            const pow = power * Math.random() * POWER_MAX_VARIATION
            const alpha = Math.random() * Math.PI * 2
            const theta = Math.random() * Math.PI * 2
            const force_x = Math.sin(alpha) * Math.sin(theta) * pow
            const force_z = Math.cos(alpha)                   * pow
            const force_y = Math.sin(alpha) * Math.cos(theta) * pow

            const c = new Color(color)
            c.r += (Math.random() * 2 - 1) * COLOR_MAX_VARIATION
            c.g += (Math.random() * 2 - 1) * COLOR_MAX_VARIATION
            c.b += (Math.random() * 2 - 1) * COLOR_MAX_VARIATION

            const debris = new Debris(c, life_time)

            debris.addForce(force_x, force_y, force_z)

            this.add(debris)
        }
    }

    get position () { return this.group.position } 

    addToScene (scene) { scene.add(this.group) }
    removeFromScene (scene) { scene.remove(this.group) }
}

export { Explosion }