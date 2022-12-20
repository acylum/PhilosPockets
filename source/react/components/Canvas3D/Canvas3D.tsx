import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
//import "./Canvas3D.module.scss";
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";


function Effects() {
  return (
    <EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
        samples={31}
        radius={5}
        intensity={30}
      />
    </EffectComposer>
  );
}


const Canvas3D = (props: any) => {
  
  let positionMode = 'relative';
  if(props.xpos !== undefined) positionMode = 'absolute';
  
  const container = useRef()

  return ( 
    <div ref={container}>          
    <Canvas
    name={'canvas3d'}
    
    style={{
        height: props.height ? props.height : '100%',
        width: props.width ? props.width : '100%',
        position: `${positionMode}`,
        zIndex: 10,
        left: props.xpos,
        top:props.ypos
    }}
    camera={{ position: [-0.7, 0.8, -3.3] }}//fov: 70,position: [2, 5, 7]  //fov: 100,position: [2, 2, -3.5]  //fov: 100,position: [-2, 2, -3.5]  //position: [0, 0.5, 1] //position: [-0.7, 0.8, -3.3]
    shadows
    >
      <Suspense fallback={null}>
      <OrbitControls attach="orbitControls"/>
      <Physics iterations={15} allowSleep={false}
      >
          
          
          {props.elements}
        
          
          
      </Physics>
      </Suspense>
    </Canvas>
    </div> 
  )
};


<EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
        samples={31}
        radius={5}
        intensity={30}
      />
    </EffectComposer>


/*
</Debug>
          
        <Effects />
      </Physics>


<Debug scale={1} color="black">
        
        
          {props.elements}
        
          
        </Debug>
*/

export default Canvas3D;