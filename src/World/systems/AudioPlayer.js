const music = document.querySelector('#music')
const explosion_sfx = document.querySelector('#explosion-sfx')
const shooting_sfx = document.querySelector('#shooting-sfx')

const volume_up_icon = document.querySelector('#volume-up')
const volume_off_icon = document.querySelector('#volume-off')

let audio_on = false

music.volume = 0.15
explosion_sfx.volume = 0.4
shooting_sfx.volume = 0.2

music.loop = true

volume_up_icon.addEventListener('click', musicHandler)
volume_off_icon.addEventListener('click', musicHandler)

function musicHandler ()
{
    if (audio_on) pauseMusic()
    else playMusic()
}

function playMusic ()
{
    music.play()

    volume_off_icon.style.display = 'none'
    volume_up_icon.style.display = 'block'

    audio_on = true
}

function pauseMusic ()
{
    music.pause()

    volume_off_icon.style.display = 'block'
    volume_up_icon.style.display = 'none'

    audio_on = false
}


function playSFX (sfx, distance) 
{
    const audio = sfx.cloneNode(true);
    document.body.appendChild(audio);

    audio.volume = sfx.volume - Math.abs(distance / 400)
    audio.play()

    setTimeout(() => { audio.remove() }, 400)
    
}

class AudioPlayer
{
    constructor () { }

    playExplosionSFX (distance)
    {
        if (! audio_on) return

        playSFX(explosion_sfx, distance)
    }

    playShootingSFX (distance)
    { 
        if (! audio_on) return

        playSFX(shooting_sfx, distance)
    }
}

const instance = new AudioPlayer()
Object.freeze(instance)

export default instance