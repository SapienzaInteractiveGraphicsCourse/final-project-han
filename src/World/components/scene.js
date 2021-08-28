import { Color, Scene } from '/final-project-han/vendor/three/three.module.js'

function createScene() {
  const scene = new Scene()

  scene.background = new Color('black')

  return scene
}

export { createScene }