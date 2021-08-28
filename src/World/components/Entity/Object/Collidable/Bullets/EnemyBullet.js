import { Bullet } from "./Bullet.js"


class EnemyBullet extends Bullet
{
    constructor () 
    {
        super()

        this.collision_manager.addEnemyObj(this)

        this.color = 'red'

        this.damage = 20
    }

    loadMesh (mesh_loader) { return mesh_loader.bullet }
}

export { EnemyBullet }