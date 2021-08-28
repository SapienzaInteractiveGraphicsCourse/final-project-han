import { Vector3, Box3 } from '/final-project-han/vendor/three/three.module.js'

import { Object } from "../Object.js"
import { Hitbox } from './HitBox.js'
import CollisionManager from '../../CollisionManager.js'

class Collidable extends Object
{
    #hit_box

    constructor () 
    {
        super ()

        if (this.constructor == Collidable) 
            throw new Error("Abstract class cannot be instantiated.")

        this.collision_manager = CollisionManager

        this.hit_box = this.makeHitBox()

        // damage
        this.durability = 1
        this.damage = 1
    }

    get hit_box () { return this.#hit_box }
    set hit_box (hb) 
    { 
        this.#hit_box = hb 
        this.group.add(hb)
        this.updateHitBoxPosition()
    }

    updateHitBoxPosition ()
    {
        this.hit_box.position.set(
            this.position.x, this.position.y, this.position.z
        )
    }

    makeHitBox ()
    {
        const box = new Box3().setFromObject(this.mesh)

        const size = new Vector3()
        const pos = new Vector3()

        box.getSize(size)
        box.getCenter(pos)

        const hit_box = new Hitbox()
        hit_box.setBox(pos.x, pos.y, pos.z, size.x, size.y, size.z, 0)

        return hit_box
    }

    update (delta)
    {
        super.update(delta)
        
        this.updateHitBoxPosition ()
    }

    intersects (other)
    {
        return this.hit_box.intersects(other.hit_box)
    }

    collision (other) 
    {
        this.durability -= other.damage

        if (this.durability <= 0) 
        {
            this.durability = 0
            this.die()
        }
    }

    die () 
    {
        super.die()
        this.collision_manager.remove(this)
    }
}

export { Collidable }