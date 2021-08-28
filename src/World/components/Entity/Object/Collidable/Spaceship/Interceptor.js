import { Tween } from '/final-project-han/vendor/tween/Tween.js'
import { Easing } from '/final-project-han/vendor/tween/Easing.js'

import { Spaceship } from "./Spaceship.js"

class Interceptor extends Spaceship
{
    constructor ()
    {
        super()

        this.durability = 500

        this.reorient()

        this.collision_manager.addNeutralObj(this)
    }

    loadMesh (mesh_loader) { return mesh_loader.interceptor }

    reorient () { this.rotation.y = Math.PI }

    get idle_anim () 
    {
        const radius_y = 0.5
        const time = 2000

        const next_y = (this.position.y < 0) ? radius_y : -radius_y

        const anim = new Tween({ y: this.position.y})
            .to({ y: next_y }, time)
            .easing(Easing.Quadratic.InOut)
            .on('update', (o) => {
                this.position.y = o.y
            })
            .on('complete', () => {
                this.set_animation(this.idle_anim, this.move_anim_index)
            })

        return anim
    }

    update (delta)
    {
        super.update(delta)

        this.animate()
    }
}

export { Interceptor }