import { 
    DirectionalLight,
    AmbientLight, 
} from '/vendor/three/three.module.js'

function createLights() 
{
    const ambientLight = new AmbientLight(0x404040, 8)

    const mainLight = new DirectionalLight('white', 8)
    mainLight.position.set(500, 150, -30)

    const secondaryLight = new DirectionalLight('white', 4)
    mainLight.position.set(-500, -150, 30)

    return {ambientLight, mainLight, secondaryLight}
}

export { createLights }
