import { ObjectManager } from "./ObjectManager.js"
import { Star } from "../Object/Star.js"

const MAX_STARS = 50
const SKY_RADIUS = 3000
const HORIZON = -20000
const STARS_FORCE = 30000
const FORCE_VARIATION = 15000


class Sky extends ObjectManager
{
    constructor ()
    {
        super()
    }

    update (delta)
    {
        super.update(delta)

        const stars_to_generate = MAX_STARS - this.map.size

        for (let i = 0; i < stars_to_generate; i++)
            this.generateStar()
    }

    generateStar () 
    {
        const rand_ang = Math.random() * (Math.PI * 2)
        const x = SKY_RADIUS * Math.cos(rand_ang)
        const y = SKY_RADIUS * Math.sin(rand_ang)

        const star = new Star()

        star.position.set(x, y, HORIZON)

        const force_offset = (Math.random() * 2 - 1) * FORCE_VARIATION
        star.addForce(0, 0, STARS_FORCE + force_offset)

        this.add(star)
    }
}

const instance = new Sky()

Object.freeze(instance)
export default instance 