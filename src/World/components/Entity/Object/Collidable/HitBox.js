import { 
    Group,
    LineSegments,
    EdgesGeometry,
    LineBasicMaterial,
    BoxGeometry
} from '/vendor/three/three.module.js'

const HITBOX_IS_VISIBLE = false

const material = new LineBasicMaterial({ color: 'rgb(255, 255, 0)' })

class Hitbox extends Group 
{
    constructor ()
    {
        super()

        this.visible = HITBOX_IS_VISIBLE

        this.meshes = new Map()
    }

    setBox (x, y, z, w, h, d, index)
    {
        const box_geometry = new BoxGeometry(w, h, d)
        const edges = new EdgesGeometry(box_geometry)

        let mesh = this.meshes.get(index)
        if (! mesh) mesh = new LineSegments(edges, material)
        else mesh.geometry = edges

        edges.computeBoundingBox()

        mesh.position.set(x, y, z)

        this.add(mesh)

        this.meshes.set(index, mesh)
    }

    intersects (other) 
    {
        for (const t_mesh of this.meshes.values())
        {
            const b = t_mesh.geometry.boundingBox
            const t_box = b.clone().translate(this.position)

            for (const o_mesh of other.meshes.values()) 
            {
                const bb = o_mesh.geometry.boundingBox
                const o_box = bb.clone().translate(other.position)

                if(t_box.intersectsBox(o_box)) return true
            }   
        }
    }
}

export { Hitbox }