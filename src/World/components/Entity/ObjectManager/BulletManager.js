import { ObjectManager } from "./ObjectManager.js"

class BulletManager extends ObjectManager
{
    constructor () { super() }
}

const instance = new BulletManager()

Object.freeze(instance)
export default instance 