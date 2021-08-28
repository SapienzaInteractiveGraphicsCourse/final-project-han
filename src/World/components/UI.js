const score = document.querySelector('#score')
const score_plus = document.querySelector('#score-plus')
const final_score = document.querySelector('#final-score') 

const health = document.querySelector('#health')

const SCORE_DIGITS = 6

let score_multiplier = 1

let update_id = 0

class UI 
{
    constructor () { }

    set health (h) 
    {
        health.innerHTML = parseInt(h)
    }

    addScore (s) 
    {   
        const update_no = ++update_id

        const old_score = parseInt(score.innerHTML)
        const add_score = s * score_multiplier
        const new_score = parseInt(old_score + add_score)

        score.innerHTML = String(new_score).padStart(SCORE_DIGITS)

        if (score_plus.innerHTML.length == 0)
            score_plus.innerHTML = '+' + add_score

        else 
        {
            const old_score_plus = parseInt(score_plus.innerHTML.substr(1))
            const new_score_plus = parseInt(old_score_plus + add_score)
            score_plus.innerHTML = '+' + new_score_plus
        }

        setTimeout(() => {if (update_id == update_no) score_plus.innerHTML = ''}, 1000)
    }

    increaseMultiplier (multi)
    {
        score_multiplier *= multi
    }

    setFinalScore ()
    {
        final_score.innerHTML = score.innerHTML
    }

    reset ()
    {
        score.innerHTML = '000000'
        health.innerHTML = '100'
        score_plus.innerHTML = ''
        final_score.innerHTML = ''
    }
}

const instance = new UI()
Object.freeze(instance)
export default instance