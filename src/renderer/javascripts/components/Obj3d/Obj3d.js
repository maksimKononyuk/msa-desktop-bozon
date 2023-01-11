import React, { useEffect, useRef, useState } from 'react'
import { View, ActivityIndicator } from 'react-native-web'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  Group
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const Obj3d = ({ url }) => {
  let requestAnimationId
  const container = useRef(null)

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      75,
      container.current.offsetWidth / container.current.offsetHeight,
      0.1,
      1000
    )
    const light = new DirectionalLight(0xffffff, 0.5)
    light.position.set(5, 5, 5)
    const lightHolder = new Group()
    lightHolder.add(light)
    scene.add(lightHolder)
    const renderer = new WebGLRenderer()
    container.current.appendChild(renderer.domElement)
    renderer.setSize(
      container.current.offsetWidth,
      container.current.offsetHeight
    )
    renderer.setClearColor('#4a708b')
    camera.position.z = 5
    const update = (obj) => {
      obj.rotation.y += 0.005
      lightHolder.quaternion.copy(camera.quaternion)
      camera.aspect =
        container.current.offsetWidth / container.current.offsetHeight
      renderer.setSize(
        container.current.offsetWidth,
        container.current.offsetHeight
      )
    }
    const controls = new OrbitControls(camera, renderer.domElement)

    const loader = new OBJLoader()
    loader.load(url, (obj) => {
      obj.scale.set(0.2, 0.2, 0.2)
      scene.add(obj)
      const animate = () => {
        update(obj)
        renderer.render(scene, camera)
        setIsLoad(false)
        requestAnimationId = requestAnimationFrame(animate)
      }
      animate()
    })
    return () => cancelAnimationFrame(requestAnimationId)
  }, [])
  return (
    <>
      {isLoad && (
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size='large' color='#000088' />
        </View>
      )}
      <View style={{ width: ' 100%', height: '100%' }} ref={container}></View>
    </>
  )
}

export default Obj3d
