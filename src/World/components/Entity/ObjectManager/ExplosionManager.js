import { ObjectManager } from "./ObjectManager.js"

class ExplosionManager extends ObjectManager
{
    constructor () { super() }
}

const instance = new ExplosionManager()

Object.freeze(instance)
export default instance 