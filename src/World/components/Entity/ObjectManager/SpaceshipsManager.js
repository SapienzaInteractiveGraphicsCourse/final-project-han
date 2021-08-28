import { ObjectManager } from './ObjectManager.js'

import { Player } from '../Object/Collidable/Spaceship/Player.js'

import { BasicEnemy } from '../Object/Collidable/Spaceship/Enemy/BasicEnemy.js'
import { SmallEnemy } from '../Object/Collidable/Spaceship/Enemy/SmallEnemy.js'
import { RotatingEnemy } from '../Object/Collidable/Spaceship/Enemy/RotatingEnemy.js'
import { PowerEnemy } from '../Object/Collidable/Spaceship/Enemy/PowerEnemy.js'
import { MotherShip } from '../Object/Collidable/Spaceship/Enemy/MotherShip.js'

import { Interceptor } from '../Object/Collidable/Spaceship/Interceptor.js'

import UI from '../../UI.js'


// map margins
const LEFT_MARGIN               = -40
const RIGHT_MARGIN              = 40

const FIRST_ROW_Z               = -10
const SPAWN_ROW_EACH            = -10

const B = BasicEnemy
const R = RotatingEnemy
const P = PowerEnemy
const M = MotherShip
const I = Interceptor
const _ = false

const SHIPS_MAP = [
    //     player is here     //
    [_, I, _, _, I, _, _, I, _],
    [_, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _],
    [B, B, B, B, B, B, B, _, _],
    [P, P, P, P, P, P, P, _, _],
    [R, R, R, R, R, R, R, _, _],
    [M, _, _, M, _, _, M, _, _],
]
const FIRST_ENEMY_ROW = 1

// don't change --------------------
const NUM_ROWS = SHIPS_MAP.length
const NUM_COLS = SHIPS_MAP[0].length
const SPAWN_EACH = - (LEFT_MARGIN - RIGHT_MARGIN) / (NUM_COLS - 1)
const NUM_ENEMY_ROWS = NUM_ROWS - FIRST_ENEMY_ROW
// ---------------------------------

const CASUAL_SHOOTING_PROBABILITY = 0.01

const DIFFICULTY_UPDATE_TIME    = 20
const MOVEMENT_INCREASE         = 100
const SHOOTING_DECAY_MULT       = 0.9

let player_id = null
let timer = 0
let num_enemies = 0

let game_over = false
let level = 1

// level up 
const LEVEL_MULTIPLIER  = 1.5
const DAMAGE_MULT       = 1.1
const DURABILITY_MULT   = 1.2 

class SpaceshipsManager extends ObjectManager
{
    constructor () 
    {
        super()

        this.shooters_hierarchy = []
        for (let i = 0; i < NUM_COLS - 2; i++)
            this.shooters_hierarchy[i] = []
    }

    get player () { return this.map.get(player_id) }
    get game_over () { return game_over }
    get level_finished () { return num_enemies <= 0 }
    get level () { return level }

    initialize ()
    {
        this.reset()

        game_over = false
        level = 1
        num_enemies = 0

        this.#initFrom(0)
        this.#initPlayer()
    }

    #initPlayer ()
    {
        const player = new Player()
        player.position.set(0, 0)
        
        this.add(player)

        player_id = player.id
    }

    #initFrom (start_row) 
    {
        for (let row = start_row; row < NUM_ROWS; row++)
        {
            const z = FIRST_ROW_Z + SPAWN_ROW_EACH * row

            for (let col = 0; col < NUM_COLS; col++)
            {
                const Ship = SHIPS_MAP[row][col]
                if (!Ship) continue

                const x = LEFT_MARGIN + SPAWN_EACH * col

                const ship = new Ship()
                ship.position.set(x, 0, z)
                ship.updateHitBoxPosition()
                this.add(ship)

                if (row < FIRST_ENEMY_ROW) continue 

                // this is only for enemies
                ship.goRight()

                this.shooters_hierarchy[col].push(ship.id)

                num_enemies++
            }
        }
    }

    update (delta) 
    {
        super.update(delta)

        // check end of game
        if (! this.player) return this.#gameOver()

        timer += delta
        if (timer >= DIFFICULTY_UPDATE_TIME)
            this.#difficultyUp()

        this.#updateShooters()
    }

    remove (obj)
    {
        super.remove(obj)
        if (isEnemy(obj)) num_enemies--
    }

    #updateShooters ()
    {
        for (let i = 0; i < NUM_COLS - 2; i++)
        {
            const shooter = this.map.get(this.shooters_hierarchy[i][0])
            if (! shooter) this.shooters_hierarchy[i].splice(0, 1)

            else // make the shooter shoot if in front of player
            {
                if (near(shooter.position.x, this.player.position.x)) 
                    shooter.shooting = true

                else 
                    shooter.shooting = Math.random() < CASUAL_SHOOTING_PROBABILITY

                // if they reach you, you lose
                if (shooter.position.z >= FIRST_ROW_Z - 7)
                    game_over = true
            }
        }
    }

    #difficultyUp ()
    {
        timer = 0
        // when the game gets harder enemies get faster at  
        // moving and at shooting
        for (const ship of this.map.values())
        {
            if (ship.id == player_id) continue

            ship.power += MOVEMENT_INCREASE
            ship.shooting_decay *= SHOOTING_DECAY_MULT
        }
    }

    levelUp ()
    {
        level++
        num_enemies = 0

        this.#initFrom(FIRST_ENEMY_ROW)

        this.player.position.set(0, 0)

        UI.increaseMultiplier(LEVEL_MULTIPLIER)

        for (const ship of this.map.values())
        {
            if (! isEnemy(ship)) continue

            ship.damage *= DAMAGE_MULT
            ship.durability *= DURABILITY_MULT 
        }
    }

    #gameOver ()
    {
        setTimeout(() => { game_over = true }, 2000)
    }

}

function isEnemy (obj) 
{
    if (obj instanceof Player || obj instanceof SmallEnemy || obj instanceof Interceptor)
        return false

    return true
}

function near (x, y)
{
    return Math.abs(x - y) < 5
}

const instance = new SpaceshipsManager()

Object.freeze(instance)
export default instance 