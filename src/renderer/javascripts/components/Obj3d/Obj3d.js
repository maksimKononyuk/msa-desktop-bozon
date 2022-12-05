import React, { useEffect, useRef } from 'react'
import { View } from 'react-native-web'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const Obj3d = ({ url }) => {
  let requestAnimationId
  const container = useRef(null)

  useEffect(() => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, 1.77, 0.1, 1000)
    const light = new DirectionalLight(0xffffff, 0.5)
    light.position.set(5, 5, 5)
    scene.add(light)
    const renderer = new WebGLRenderer()
    container.current.appendChild(renderer.domElement)
    renderer.setSize(
      container.current.offsetWidth,
      container.current.offsetHeight
    )
    renderer.setClearColor('#4a708b')
    camera.position.z = 4
    const update = (obj) => {
      obj.rotation.y += 0.01
      renderer.setSize(
        container.current.offsetWidth,
        container.current.offsetHeight
      )
    }
    const loader = new OBJLoader()
    loader.load(url, (obj) => {
      obj.scale.set(0.065, 0.065, 0.065)
      scene.add(obj)
      const animate = () => {
        update(obj)
        renderer.render(scene, camera)
        requestAnimationId = requestAnimationFrame(animate)
      }
      animate()
    })
    return () => cancelAnimationFrame(requestAnimationId)
  }, [])

  return (
    <View style={{ width: ' 100%', height: '100%' }} ref={container}></View>
  )
}

export default Obj3d
