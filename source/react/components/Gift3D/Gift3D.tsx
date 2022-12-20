import React from "react";
import { useCompoundBody } from '@react-three/cannon'
//import "./Gift3D.module.scss";
import { useEffect } from 'react'
import { Vector3 } from 'three';
import BlueFlame from "../BlueFlame";
import GLTFObjDra from "../GLTFObjDra";


const Gift3D = (props: any) => {
  const bouncyMaterial = {
    name: 'bouncy',
    restitution: 1.1,
  }
  

  const [ref, api] = useCompoundBody(() => ({
    mass: 1, position: [props.position],
    ...props,
    material:bouncyMaterial,
    shapes: [
      { type: 'Sphere', position: [0,0,0], rotation: [0, 0, 0], args: [0.2, 0.2, 0.2] }
    ]
  }))

  
  useEffect(() => {
    api.mass.set(0);
    api.velocity.set(0,0,0);
    api.angularVelocity.set(0,0,0); 
    api.position.copy(new Vector3(props.position[0],props.position[1],props.position[2]));
    api.mass.set(props.testActive>0 ? 1:0);
  }, [props.testActive])

  
  return ( 
    <group ref={ref} name={'ball'}> 
      <mesh receiveShadow castShadow name={'ball'} 
        userData={api}
      >
        <GLTFObjDra key={187876} name="gift" receiveShadow={true} castShadow={true} position={[0,0,0]} scale={[0.004,0.004,0.004]} rotation={[0,0,0]} url={'/Basketball_dra.glb'} />
      </mesh>
      <BlueFlame follow={api}/>
    </group> 
  )
};


export default Gift3D;