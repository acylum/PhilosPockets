import React, { useEffect, useState } from "react"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"
import { a, useSpring } from "@react-spring/three"
import * as THREE from 'three';


export default function Avatar(props) {
  // Fetch model and a separate texture
  const { nodes, materials, animations } = useGLTF("/timmy_avatar.glb");//("/stacy.glb")
  //const texture = useTexture("/stacy.jpg")
  // Extract animation actions
  const { ref, actions, names, mixer } = useAnimations(animations)
  // Hover and animation-index states
  const [hovered, setHovered] = useState(false)
  const [index, setIndex] = useState(0)
  // Animate the selection halo
  const { color, scale } = useSpring({ scale: hovered ? [1.15, 1.15, 1] : [1, 1, 1], color: hovered ? "hotpink" : "aquamarine" })
  // Change cursor on hover-state
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  // Change animation when the index changes
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    console.log(names, index)//[index]
  
    if(actions[names[index]])
    {
      if(index<2){
        actions[names[index]].reset().fadeIn(0.5).play()
      }
      else {
        actions[names[2]].clampWhenFinished = true;
        actions[names[index]].reset().fadeIn(0.5).setLoop(THREE.LoopOnce).play()
      }
      // In the clean-up phase, fade it out
      
      console.log(index, names[index], ":",actions[names[index]],":")
      return () => actions[names[index]].fadeOut(0.5)
    }
  }, [index, actions, names])

  useEffect(() => {
      setIndex(props.avatarState)
      console.log(names[index], index)
  }, [props.avatarState])


  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorig6Hips} />
        <skinnedMesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setIndex((index + 1) % names.length)}
          geometry={nodes.Ch09.geometry}
          skeleton={nodes.Ch09.skeleton}
          material={materials.Ch09_body}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
        </skinnedMesh>
      </group>
    </group>
  )
}