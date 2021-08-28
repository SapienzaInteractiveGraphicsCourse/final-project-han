import { Entity } from "./Entity.js"


// In this game it is not important to acknowledge all the 
// collisions. E.g. if the enemies collide it is not important
// to know (and that should not even happen). Therefore
// we divide objects in three sections:
const NEUTRAL_OBJECT = 0
const PLAYER_OBJECT = 1
const ENEMY_OBJECT = 2

const player_objects = new Map()
const enemy_objects = new Map()
const neutral_objects = new Map()


class CollisionManager extends Entity
{
    constructor ()
    {
        super()
    }

    // adds an Object to the collision manager
    add (obj, type) 
    {
        const id = obj.id

        if (type == PLAYER_OBJECT)
            player_objects.set(id, obj)

        if (type == ENEMY_OBJECT || type == NEUTRAL_OBJECT)
            enemy_objects.set(id, obj)
    }

    addNeutralObj (obj) { neutral_objects.set(obj.id, obj) }
    addPlayerObj (obj) { player_objects.set(obj.id, obj) }
    addEnemyObj (obj) { enemy_objects.set(obj.id, obj) }

    // removes an Object from the collision manager
    remove (obj)
    {
        const id = obj.id

        player_objects.delete(id)
        enemy_objects.delete(id)
        neutral_objects.delete(id)
    }

    update (delta)
    {
        // check the collisions between player objects and enemy objects
        for (const [id_p, p_obj] of player_objects.entries()) 
        {
            for (const [id_e, e_obj] of enemy_objects.entries()) 
            {
                if (id_p != id_e && p_obj.intersects(e_obj)) 
                {
                    p_obj.collision(e_obj)
                    e_obj.collision(p_obj)
                }
            }
        }

        // check the collisions between neutral objects and all other objects
        for (const [id_n, n_obj] of neutral_objects.entries()) 
        {
            for (const [id_e, e_obj] of enemy_objects.entries()) 
            {
                if (id_n != id_e && n_obj.intersects(e_obj)) 
                {
                    n_obj.collision(e_obj)
                    e_obj.collision(n_obj)
                }
            }
            for (const [id_p, p_obj] of player_objects.entries()) 
            {
                if (id_n != id_p && n_obj.intersects(p_obj)) 
                {
                    n_obj.collision(p_obj)
                    p_obj.collision(n_obj)
                }
            }
        }
    }
}

const instance = new CollisionManager()

Object.freeze(instance)
export default instance 