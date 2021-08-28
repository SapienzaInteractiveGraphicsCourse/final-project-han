import Uid from "../../systems/Uid.js"

class Entity 
{
    constructor ()
    {
        if (this.constructor == Entity) 
            throw new Error("Abstract class cannot be instantiated.")

        this.id = Uid.next()
    }

    async init() {}
    update(delta) {}
}

export { Entity }