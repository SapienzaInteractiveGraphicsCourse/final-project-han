import { Bullet } from "./Bullet.js"


class PlayerBullet extends Bullet
{
    constructor () 
    {
        super()

        this.collision_manager.addPlayerObj(this)

        this.color = 'blue'

        this.damage = 20
    }

    loadMesh (mesh_loader) { return mesh_loader.bullet }
}

export { PlayerBullet }