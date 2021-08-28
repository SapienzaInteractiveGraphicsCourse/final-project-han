import { Vector3 } from '/vendor/three/three.module.js'
import { Group } from '/vendor/three/three.module.js'

import { Entity } from "../Entity.js"
import Loader from '../../../systems/Loader.js'

class Object extends Entity 
{
    #mesh

    constructor () 
    {
        super()

        if (this.constructor == Object) 
            throw new Error("Abstract class cannot be instantiated.")

        this.group = new Group()

        const mesh = this.loadMesh(Loader)
        if (mesh) this.mesh = mesh 

        this.animation_state = null
        this.current_animations = {}

        this.velocity = new Vector3(0, 0, 0)
        this.acceleration = new Vector3(0, 0, 0)

        this.mass = 1
        this.friction_coeff = 0

        this.is_dead = false
    }

    // MESH

    get mesh () { return this.#mesh}
    set mesh (m) 
    {
        this.#mesh = m
        this.group.add(m)
    }

    loadMesh (mesh_loader) { }

    addToScene (scene) { scene.add(this.group) }

    removeFromScene (scene) { scene.remove(this.group) }

    // ANIMATION

    set_animation (animation, index) 
    {
        if (! animation) return

        if (this.current_animations[index] === animation) return 

        if (this.current_animations[index]) this.current_animations[index].stop()

        this.current_animations[index] = animation
        this.current_animations[index].start()
    }

    animate() 
    {
        for (const index in this.current_animations)
        {
            const anim = this.current_animations[index]
            if (anim) anim.update()
        }    
    }

    // PHYSICS

    get position () { return this.mesh.position }
    set position (pos) { this.mesh.position.set(pos) }
    get rotation () { return this.mesh.rotation }
    set rotation (rot) { this.mesh.rotation.set(rot) } 

    addForce (force_x = 0, force_y = 0, force_z = 0)
    {
        const force = new Vector3(force_x, force_y, force_z)
        // a = F / m
        this.acceleration = this.acceleration.addScaledVector( force, 1 / this.mass )
    }

    get friction_force ()
    {
        const force = new Vector3(0, 0, 0)

        force.x = - Math.sign(this.velocity.x) * this.velocity.x * this.velocity.x * this.friction_coeff
        force.y = - Math.sign(this.velocity.y) * this.velocity.y * this.velocity.y * this.friction_coeff
        force.z = - Math.sign(this.velocity.z) * this.velocity.z * this.velocity.z * this.friction_coeff

        return force
    }

    update(delta) 
    {
        // friction
        const friction = this.friction_force
        this.addForce(friction.x, friction.y, friction.z)

        this.velocity.addScaledVector( this.acceleration, delta )
        this.position.addScaledVector( this.velocity, delta )

        this.acceleration = new Vector3(0, 0, 0)
    }  

    die () { this.is_dead = true }
}

export { Object }