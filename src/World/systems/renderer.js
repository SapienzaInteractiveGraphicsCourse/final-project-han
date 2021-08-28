import { WebGLRenderer } from '/final-project-han/vendor/three/three.module.js'

function createRenderer() 
{
    const renderer = new WebGLRenderer({ antialias: true })

    // turn on the physically correct lighting model
    renderer.physicallyCorrectLights = true

    return renderer
}

export { createRenderer }