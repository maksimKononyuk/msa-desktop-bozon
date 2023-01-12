import React, { useEffect, useRef, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native-web'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  Group,
  Box3,
  Vector3,
  MathUtils
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const Obj3d = ({ url }) => {
  let requestAnimationId
  const container = useRef(null)

  const [isLoad, setIsLoad] = useState(true)
  const [loaderCount, setLoaderCount] = useState(0)

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
      // obj.rotation.y += 0.005
      lightHolder.quaternion.copy(camera.quaternion)
      camera.aspect =
        container.current?.offsetWidth / container.current?.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(
        container.current?.offsetWidth,
        container.current?.offsetHeight
      )
    }
    const frameArea = (sizeToFitOnScreen, boxSize, boxCenter, camera) => {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5
      const halfFovY = MathUtils.degToRad(camera.fov * 0.5)
      const distance = halfSizeToFitOnScreen / Math.tan(halfFovY)

      // вычисляем единичный вектор, указывающий направлениe, в котором сейчас находится камера
      // от центра коробки
      const direction = new Vector3()
        .subVectors(camera.position, boxCenter)
        .normalize()

      // перемещаем камеру на расстояние единиц расстояния от центра,
      // в каком бы направлении камера ни была от центра
      camera.position.copy(direction.multiplyScalar(distance).add(boxCenter))

      // выбираем некоторые близкие и дальние значения для усеченной пирамиды, которая
      // будет содержать коробку.
      camera.near = boxSize / 100
      camera.far = boxSize * 100

      camera.updateProjectionMatrix()

      // наводим камеру так, чтобы она смотрела в центр коробки
      camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z)
    }
    const controls = new OrbitControls(camera, renderer.domElement)

    const loader = new OBJLoader()
    loader.load(
      url,
      (obj) => {
        // obj.scale.set(0.2, 0.2, 0.2)
        scene.add(obj)
        const box = new Box3().setFromObject(obj)
        const boxSize = box.getSize(new Vector3()).length()
        const boxCenter = box.getCenter(new Vector3())
        frameArea(boxSize * 1.2, boxSize, boxCenter, camera)
        controls.maxDistance = boxSize * 10
        controls.target.copy(boxCenter)
        controls.update()
        const animate = () => {
          update(obj)
          renderer.render(scene, camera)
          setIsLoad(false)
          requestAnimationId = requestAnimationFrame(animate)
        }
        animate()
      },
      (xhr) => setLoaderCount(Math.round((xhr.loaded / xhr.total) * 100)),
      (err) => console.log(err)
    )
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
          <Text>{loaderCount} % loaded</Text>
          <ActivityIndicator size='large' color='#000088' />
        </View>
      )}
      <View style={{ width: ' 100%', height: '100%' }} ref={container}></View>
    </>
  )
}

export default Obj3d
