import UI from '../../../../../UI.js'
import { EnemyBullet } from "../../Bullets/EnemyBullet.js"
import { Spaceship } from "../Spaceship.js"

const POS_OFFSET = 20

class Enemy extends Spaceship
{
    constructor () 
    {
        super()

        if (this.constructor == Enemy) 
            throw new Error("Abstract class cannot be instantiated.")

        this.collision_manager.addEnemyObj(this)

        this.mass = 10
        this.friction_coeff = 4
        this.power = 30

        this.tilt_angle = - Math.PI / 6
        this.tilt_speed = 0.001

        this.Bullet = EnemyBullet
        this.shooting_delay = 1.5
        this.cannon_power = 10

        this.points4damage = 4
        this.points4kill = 100
    }

    goLeft ()
    {
        this.initial_x = this.position.x
        this.changeState(this.MOVING_LEFT_STATE)
        this.addForce(0, 0, 50)
    }

    goRight ()
    {
        this.initial_x = this.position.x
        this.changeState(this.MOVING_RIGHT_STATE)
        this.addForce(0, 0, 50)
    }

    stop ()
    {
        this.changeState(this.STABILIZING_STATE)
    }

    update (delta)
    {
        super.update(delta)

        if (this.position.x > this.initial_x + POS_OFFSET) 
        {
            this.position.x = this.initial_x + POS_OFFSET
            this.goLeft()
        }
        else if (this.position.x < this.initial_x - POS_OFFSET)
        {
            this.position.x = this.initial_x - POS_OFFSET
            this.goRight()
        }

        this.animate()
    }

    // assign points for collision and deaths
    collision (other)
    {
        UI.addScore(this.points4damage)
        super.collision(other)
    }

    die ()
    {
        UI.addScore(this.points4kill)
        super.die()
    }
}

export { Enemy }