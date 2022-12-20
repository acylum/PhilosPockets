import React from "react";
//import "./Room3D.module.scss";
import { useBox, useCompoundBody, useContactMaterial } from '@react-three/cannon'
import {
  Suspense,
  useRef,
  useState,
} from 'react'
import GLTFObjDra from "../GLTFObjDra"
import create from 'zustand'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from "@react-spring/three"
import Explosion_particles from "../Explosion_particles"
import Points_particles from '../Points_particles'
import Avatar from '../Avatar'


function BoxTrigger({ onCollide, size, position }) {
  const [ref] = useBox(() => ({ isTrigger: true, args: size, position, onCollide }))
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial wireframe color="green" />
    </mesh>
  )
}


const Room3D = (props: any) => {
  const [doorState, setDoorState] = useState(false);
  const [avatarState, setAvatarState] = useState(0);
  const [showParticles, setShowParticles] = useState(false)
  let child1:any;

  type State = {
    doorOpen: boolean
  }
  
  const useStore = create<State>((set) => ({
    doorOpen: false,
  }))

  let door1;

  const bouncyMaterial = {
    name: 'bouncy',
    restitution: 1.1,
  }

  const groundMaterial = 'ground'

  useContactMaterial(bouncyMaterial, groundMaterial, {
    restitution: 0.4,
  })

  useContactMaterial(bouncyMaterial, bouncyMaterial, {
    restitution: 0.7,
  })

  useContactMaterial(groundMaterial, groundMaterial, {
    contactEquationRelaxation: 3,
    contactEquationStiffness: 1e8,
    friction: 0.4,
    frictionEquationStiffness: 1e8,
    restitution: 0.3,
  })


  const { spring } = useSpring({
    spring: doorState,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  const rotation = spring.to([0, 1], [0, Math.PI])
  
  
  useFrame(() => {
    if(ref.current.children[18])
    {
      if(ref.current.children[18].position.x == 0)
      {
        ref.current.children[18].position.x = 3.8;//[3.8, 0.118, 2.93];
        ref.current.children[18].position.z = 2.93;
      }
      
      if(doorState)
      {
        if(ref.current.children[18].rotation.y < 2.5){ //> -2.5
          ref.current.children[18].rotation.y += 0.04;//-= 0.04
        }
      }
    }
  });
  
  
  const [ref] = useCompoundBody(() => ({
    ...props,
    type: 'Static',
    shapes: [
      { type: 'Box', material:groundMaterial, position: [0, 0.06, 0], rotation: [0, 0, 0], args: [7.6, 0.12,7.6] },
      { type: 'Box', material:groundMaterial, position: [0, 1.25, -3.8], rotation: [0, 0, 0], args: [7.6,2.5,0.11] },
      { type: 'Box', material:groundMaterial, position: [-3.8, 1.25, 0], rotation: [0, 0, 0], args: [0.11,2.5,7.6] },
      { type: 'Box', material:groundMaterial, position: [3.8, 1.25, 0], rotation: [0, 0, 0], args: [0.11,2.5,7.6] },
      { type: 'Box', material:groundMaterial, position: [0, 1.25, 3.8], rotation: [0, 0, 0], args: [7.6,2.5,0.11] },

      { type: 'Box', material:groundMaterial, position: [-3.25, 1.369, 3.13], rotation: [0, 0, 0], args: [1.3,2.5,1] },//3.13

      { type: 'Box', material:groundMaterial, position: [-2.52, 2.53, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-2.28, 2.34, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-2.04, 2.14, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-1.8, 1.95, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-1.55, 1.76, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-1.31, 1.56, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-1.07, 1.37, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },

      { type: 'Box', material:groundMaterial, position: [-0.83, 1.17, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      
      { type: 'Box', material:groundMaterial, position: [-0.59, 0.98, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-0.34, 0.79, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [-0.1, 0.59, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [0.14, 0.40, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },
      { type: 'Box', material:groundMaterial, position: [0.38, 0.21, 3.13], rotation: [0, 0, 0], args: [0.24,0.19,1.11] },

      { type: 'Box', material:groundMaterial, position: [-1.0, 2.38, 2.6], rotation: [0, 0, -41.0*Math.PI/180], args: [4,0.1,0.1] },
      { type: 'Box', material:groundMaterial, position: [-1.2, 1.38, 2.6], rotation: [0, 0, -39.0*Math.PI/180], args: [4,0.5,0.1] },


      { type: 'Box', material:groundMaterial, position: [3.8, 1.25, 2.6], rotation: [0, -39.0*Math.PI/180, 0], args: [0.11,2.5,2.6] },
      //{ type: 'Box', position: [-2, 1.25, -1], rotation: [0, -98.0*Math.PI/180, 0], args: [0.11,2.5,2.6] },


      { type: 'Box', material:groundMaterial, position: [-0.8, 0.13, -2.3], rotation: [0, 0, -45.0*Math.PI/180], args: [0.1,0.1,0.2] },//0.13

    ]
  }))
  
  return ( 
    <group ref={ref}> 
      <Suspense fallback={null}>
        <GLTFObjDra key={0} receiveShadow={true} castShadow={true} position={[0, 0, -3.8]} scale={[1,1,1]} url={'/WallFloor1_09_dra.glb'} />
        <GLTFObjDra key={1} receiveShadow={true} castShadow={true} position={[-2.5, 0, -3.8]} scale={[1,1,1]} url={'/WallFloor1_09_dra.glb'} />
        <GLTFObjDra key={2} receiveShadow={true} castShadow={true} position={[2.5, 0, -3.8]} scale={[1,1,1]} url={'/WallFloor1_09_dra.glb'} />
        
        <GLTFObjDra key={3} receiveShadow={true} position={[-2.5, 0, -2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={4} receiveShadow={true} position={[0, 0, -2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={5} receiveShadow={true} position={[2.5, 0, -2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={6} receiveShadow={true} position={[-2.5, 0, 0]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={7} receiveShadow={true} position={[0, 0, 0]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={8} receiveShadow={true} position={[2.5, 0, 0]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={9} receiveShadow={true} position={[-2.5, 0, 2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={10} receiveShadow={true} position={[0, 0, 2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />
        <GLTFObjDra key={11} receiveShadow={true} position={[2.5, 0, 2.5]} scale={[1,1,1]} url={'/Floor_10_dra.glb'} />

        <GLTFObjDra key={12} receiveShadow={true} castShadow={true} position={[-3.8, 0, -2.5]} scale={[1,1,1]} rotation={[0, Math.PI/2, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={13} receiveShadow={true} castShadow={true} position={[-3.8, 0, 0]} scale={[1,1,1]} rotation={[0, Math.PI/2, 0]} url={'/WallFloor2_19_dra.glb'} />
        <GLTFObjDra key={14} receiveShadow={true} castShadow={true} position={[-3.8, 0, 2.5]} scale={[1,1,1]} rotation={[0, Math.PI/2, 0]} url={'/WallFloor2_17_dra.glb'} />
      
        <GLTFObjDra key={15} receiveShadow={true} castShadow={true} position={[3.8, 0, -2.5]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={16} receiveShadow={true} castShadow={true} position={[3.8, 0, 0]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={17} receiveShadow={true} castShadow={true} position={[3.8, 0, 2.5]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/WallFloor2_20_dra.glb'} />
    

        <GLTFObjDra key={18} name="door" receiveShadow={true} castShadow={true} position={[0, 0.118, 0]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/Door_05_dra.glb'} />
        <GLTFObjDra key={19} receiveShadow={true} castShadow={true} position={[-3.65, 1.6, 0]} scale={[1,1,1]} rotation={[0, Math.PI/2, 0]} url={'/Curtains_15_dra.glb'} />
      

        <GLTFObjDra key={20} receiveShadow={true} castShadow={true} position={[-1.5, 1.5, -3.71]} scale={[1,1,1]} url={'/Darts_dra.glb'} />
        <GLTFObjDra key={21} receiveShadow={true} castShadow={true} position={[1, 1.5, -3.71]} scale={[1,1,1]} url={'/Picture_05_dra.glb'} />
        <GLTFObjDra key={22} receiveShadow={true} castShadow={true} position={[0.3, 1.5, -3.71]} scale={[1,1,1]} url={'/Picture_06_dra.glb'} />
        <GLTFObjDra key={23} receiveShadow={true} castShadow={true} position={[1, 1, -3.71]} scale={[1,1,1]} url={'/Picture_07_dra.glb'} />
        <GLTFObjDra key={24} receiveShadow={true} castShadow={true} position={[0.3, 1, -3.71]} scale={[1,1,1]} url={'/Picture_08_dra.glb'} />

        <GLTFObjDra key={25} receiveShadow={true} castShadow={true} position={[3.71, 1.2, 1.7]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/SwitchLight_dra.glb'} />
        <GLTFObjDra key={26} receiveShadow={true} castShadow={true} position={[3.71, 1, -1]} scale={[1,1,1]} rotation={[0, -Math.PI/2, 0]} url={'/Mirror_02_dra.glb'} />
      
        <GLTFObjDra key={27} receiveShadow={true} position={[-2.5, 0.12, -2.5]} scale={[1,1,1]} url={'/Carpet_04_dra.glb'} />
      
        <GLTFObjDra key={28} receiveShadow={true} castShadow={true} position={[0.5, 0.12, 3.15]} scale={[1,1,1]} url={'/Stairs_03_dra.glb'} />
        <GLTFObjDra key={29} receiveShadow={true} position={[-3.25, 2.5, 3.13]} scale={[1,1,1]} url={'/Floor_16_dra.glb'} />
      
        <GLTFObjDra key={30} receiveShadow={true} castShadow={true} position={[-3.2, 0, 3.68]} scale={[0.45,1,1]} rotation={[0, Math.PI, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={31} receiveShadow={true} castShadow={true} position={[-3.2, 0, 2.6]} scale={[0.45,1,1]} rotation={[0, -Math.PI, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={32} receiveShadow={true} castShadow={true} position={[-3.2, 2.55, 2.6]} scale={[0.45,1,1]} rotation={[0, 0, 0]} url={'/WallFloor2_17_dra.glb'} />
        <GLTFObjDra key={33} receiveShadow={true} castShadow={true} position={[-3.8, 2.55, 3.19]} scale={[0.45,1,1]} rotation={[0, Math.PI/2, 0]} url={'/WallFloor2_17_dra.glb'} />
      
        <GLTFObjDra key={34} receiveShadow={true} castShadow={true} position={[0.4, 0.12, 2.6]} scale={[1,1,1]} url={'/StairsPart_03_dra.glb'} />
        <GLTFObjDra key={35} receiveShadow={true} castShadow={true} position={[0.4, 0.12, 3.71]} scale={[1,1,1]} url={'/StairsPart_03_dra.glb'} />
      
        <Avatar position={[2.5,0,2.5]} rotation={[0, -Math.PI/2, 0]} name={"avatar"} avatarState={avatarState}/>

        <BoxTrigger
          onCollide={(e) => {
            setDoorState(true);
            setShowParticles(true);
            setAvatarState(2);
          }}
          position={[-2.5, 0.12, -2.5]}
          size={[1.8, 1, 1.1]}
        />
        
        {showParticles ? 
        (
          <>
          <Explosion_particles position={[3.8,1.7,2.93]} name={'room'} colorA={'#f971ec'} scaleA={0.5} rvRadius={30} particlesMax={10} particlesMin={10}/>
          <Points_particles position={[3.8,1.7,2.93]} name={'room'} colorA={'#ff00ff'} force={[0,-1,0]} scaleA={2} scaleB={2} vRadius={50} rvScale={[0,61,0]} texture={'/points100bonus_particle.png'}/>
          </>
        ) : (
          <>
          </>
        )}
      </Suspense>
    </group> 
  )
};

export default Room3D;