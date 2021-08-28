import { Object } from "./Object.js"

class Star extends Object 
{
    constructor ()
    {
        super()

        this.mass = 0.1
        this.friction_coeff = 0
    }

    loadMesh (mesh_loader) { return mesh_loader.star }

    update (delta)
    {
        super.update(delta)

        if (this.position.z > 1500) this.die()
    }
}

export { Star }