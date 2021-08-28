import { 
    Mesh,
    MeshPhongMaterial,
    BoxGeometry
} from '/final-project-han/vendor/three/three.module.js'


function makeStarMesh () 
{
    const star_size = 10

    const geometry = new BoxGeometry(star_size, star_size, star_size*10)
    const material = new MeshPhongMaterial({ 
        'color': 'white', 
        'emissive': 1
    })

    const mesh = new Mesh(geometry, material)

    return mesh
}

function makeBullet ()
{
    const bullet_size = 0.3

    const geometry = new BoxGeometry(bullet_size, bullet_size, bullet_size*4)
    const material = new MeshPhongMaterial({ 'color': 'red' })

    const mesh = new Mesh(geometry, material)

    return mesh
}

function makeDetrite (color)
{
    const detrite_size = 0.4

    const geometry = new BoxGeometry(detrite_size, detrite_size, detrite_size)
    const material = new MeshPhongMaterial({ 'color': color })

    material.transparent = true;

    const mesh = new Mesh(geometry, material)

    return mesh
}


export { makeStarMesh, makeBullet, makeDetrite }