import { PerspectiveCamera } from '/final-project-han/vendor/three/three.module.js'

import { Tween } from '/final-project-han/vendor/tween/Tween.js'
import { Easing } from '/final-project-han/vendor/tween/Easing.js'


class Camera extends PerspectiveCamera
{
    constructor (start_pos, start_look_at)
    {
        super(
            35, // fov = Field Of View
            1, // aspect ratio (dummy value)
            5, // near clipping plane
            50000, // far clipping plane
        )

        this.looking_at = { x: null, y: null, z: null }

        const p = start_pos
        const l = start_look_at

        this.position.set(p.x, p.y, p.z)
        this.lookAt(l.x, l.y, l.z)

        this.animation = null

        this.to_follow = null
    }

    lookAt (l_x, l_y, l_z)
    {
        this.looking_at = {x: l_x, y: l_y, z: l_z}
        super.lookAt(l_x, l_y, l_z)
    }

    transitionTo (new_pos, time, look_at = null, callback = () => {}) 
    {
        let to_look_at
        if (!look_at) to_look_at = { x:0, y:0, z:0 }
        else to_look_at = look_at

        const from = {
            p_x: this.position.x,
            p_y: this.position.y,
            p_z: this.position.z,
            l_x: this.looking_at.x,
            l_y: this.looking_at.y,
            l_z: this.looking_at.z
        }
        const to = {
            p_x: new_pos.x,
            p_y: new_pos.y,
            p_z: new_pos.z,
            l_x: to_look_at.x,
            l_y: to_look_at.y,
            l_z: to_look_at.z
        }

        const tween = new Tween(from)
            .to(to, time)
            .easing(Easing.Quadratic.InOut)
            .on('update', (o) => {
                if (o.p_x) this.position.x = o.p_x
                if (o.p_y) this.position.y = o.p_y
                if (o.p_z) this.position.z = o.p_z

                if (look_at) this.lookAt(o.l_x, o.l_y, o.l_z)
            })
            .on('complete', () => {
                this.animation = null
                callback()
            })

        this.animation = tween

        tween.start()
    }

    follow (obj)
    {
        this.to_follow = obj
    }

    update (delta) 
    { 
        if (this.animation) this.animation.update() 

        if (this.animation || ! this.to_follow) return

        // follow a position on the x axis
        const distance = this.to_follow.position.x - this.position.x

        this.position.x += distance / 10
        //this.position.x += distance * distance * Math.sign(distance) / 20

    }
}

export { Camera }