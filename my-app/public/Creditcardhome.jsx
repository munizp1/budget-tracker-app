/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 creditcard21.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/creditcard21.gltf')
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera makeDefault={false} far={100} near={0.1} fov={22.895} position={[1.082, 0.676, 1.095]} rotation={[-0.627, 0.71, 0.441]} />
      <mesh geometry={nodes.Plane.geometry} material={materials.White} />
      <mesh geometry={nodes.Cube.geometry} material={materials.GoldPlate} position={[-0.005, 0, 0.027]} scale={[0.004, 0, 0.005]} />
      <group position={[-0.004, 0, 0.027]} scale={[0.004, 0, 0.005]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.Black} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.GoldPlate} />
      </group>
    </group>
  )
}

useGLTF.preload('/creditcard21.gltf')