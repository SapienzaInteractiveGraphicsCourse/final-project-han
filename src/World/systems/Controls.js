const LEFT = 'a'
const RIGHT = 'd'
const LEFT_CLICK = 0
const RIGHT_CLICK = 2
const UP_ARROW = 'ArrowUp'

const actions = {
    LEFT: false,
    RIGHT: false,
    LEFT_CLICK: false,
    RIGHT_CLICK: false,
    PAUSE: false
}

function set_action (action_id, bool) 
{
    switch (action_id) 
    {
        case LEFT : 
            actions.LEFT = bool
            break

        case RIGHT : 
            actions.RIGHT = bool
            break

        case LEFT_CLICK :
        case UP_ARROW : 
            actions.LEFT_CLICK = bool
            break

        case RIGHT_CLICK : 
            actions.RIGHT_CLICK = bool
            break
    }
}

const touch_start = {x: 0, y: 0}

class Controls 
{ 
    constructor ()
    {
        // disable context menu
        document.addEventListener("contextmenu", (e) => { 
            e.preventDefault() 
            return false 
        })

        // KEYBOARD
        document.addEventListener('keydown', function (event) 
        {
            set_action(event.key, true)
            event.preventDefault()
        })

        document.addEventListener('keyup', function (event) 
        {
            set_action(event.key, false)
            event.preventDefault()
        })

        // MOUSE
        document.addEventListener('mousedown',  function (event) {
            set_action(event.button, true)
            event.preventDefault()
        })

        document.addEventListener('mouseup',  function (event) {
            set_action(event.button, false)
            event.preventDefault()
        })

        // MOBILE
        document.addEventListener('touchstart', function (event) {
            touch_start.x = event.touches[0].pageX 
            set_action(LEFT_CLICK, true)
        })

        document.addEventListener('touchend', function (event) {
            set_action(LEFT_CLICK, false)
            set_action(RIGHT, false)
            set_action(LEFT, false)
        })

        document.addEventListener('touchmove', function (event) {
            const x_rel = event.touches[0].pageX - screen.width / 2 //- touch_start.x

            console.log(x_rel)

            if (Math.abs(x_rel) < 50)
            {
                set_action(RIGHT, false)
                set_action(LEFT, false)
            }

            else if (x_rel > 0) {
                set_action(LEFT, false)
                set_action(RIGHT, true)
            }
            else if (x_rel < 0) 
            {
                set_action(RIGHT, false)
                set_action(LEFT, true)
            }
        })
    }

    get left () { return actions.LEFT }
    get right () { return actions.RIGHT }
    get left_click () { return actions.LEFT_CLICK }
    get right_click () { return actions.RIGHT_CLICK }

}

export { Controls }