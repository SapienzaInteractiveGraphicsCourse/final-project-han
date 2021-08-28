import { Color, Scene } from '/vendor/three/three.module.js'

function createScene() {
  const scene = new Scene()

  scene.background = new Color('black')

  return scene
}

export { createScene }