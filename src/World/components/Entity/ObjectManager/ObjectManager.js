import { Group } from '/vendor/three/three.module.js'

import { Entity } from "../Entity.js"

class ObjectManager extends Entity 
{
    constructor ()
    {
        super()

        if (this.constructor == ObjectManager) 
            throw new Error("Abstract class cannot be instantiated.")

        this.map = new Map()
        this.group = new Group()
    }

    add (object)
    {
        object.addToScene(this.group)
        this.map.set(object.id, object)
    }

    remove (object)
    {
        object.removeFromScene(this.group)
        this.map.delete(object.id)
    }

    reset ()
    {
        for (const obj of this.map.values())
        {
            obj.is_dead = true
            this.remove(obj)
        }
    }

    update (delta)
    {
        for (const obj of this.map.values())
        {
            obj.update(delta)

            if (obj.is_dead) this.remove(obj)
        }
    }
}

export { ObjectManager }