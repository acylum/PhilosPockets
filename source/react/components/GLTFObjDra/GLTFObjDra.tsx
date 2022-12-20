import React from "react";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense, useMemo } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

export interface GLTFObjDraProps {
  name: string;
  url: string;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  receiveShadow: boolean;
  castShadow: boolean;
}

const defaultProps: GLTFObjDraProps = {
  name: "",
  url: "",
  position: [0,0,0],
  rotation: [0,0,0],
  scale: [1,1,1],
  receiveShadow: true,
  castShadow: true,
};

const GLTFObjDra = ({ name, url, position, rotation, scale, receiveShadow, castShadow, ...props }: GLTFObjDraProps) => {
  
  const gltf = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(process.env.PUBLIC_URL + '/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);
  });
  
  //const copiedScene = useMemo(() => gltfFloor.scene.clone(), [gltfFloor.scene])

  const copiedScene = useMemo(() => {
    gltf.scene.traverse(obj => {
      /*console.log(obj)
      if(obj.hasOwnProperty('material')){ 
        obj.material.metalness = 0.15;//how wide the hot spot - lower is wider
        obj.material.roughness = 0.5;//hotspot brightness - lower brighter
      }*/
      obj.castShadow = castShadow;
      obj.receiveShadow = receiveShadow;
      
      if(obj instanceof THREE.Mesh) obj.geometry.computeBoundingBox();
      else{
        obj.children.forEach(child => {
          child.children.forEach(mesh => {
            //console.log(mesh)
            if(mesh instanceof THREE.Mesh) mesh.geometry.computeBoundingBox();
          });
        });
      }
    });
    gltf.scene.castShadow = castShadow;
    gltf.scene.receiveShadow = receiveShadow;

    return gltf.scene.clone()
  }, [gltf.scene]);

  return (
    <group name={name}>
      <Suspense fallback={null}>
      <primitive name={name} receiveShadow={receiveShadow} castShadow={castShadow} object={copiedScene} position={position} rotation={rotation} scale={scale}/>
      </Suspense>
    </group>
  );
};

GLTFObjDra.defaultProps = defaultProps;

export default GLTFObjDra;


/*
<primitive name={name} receiveShadow={receiveShadow} castShadow={castShadow} object={copiedScene} position={position} rotation={rotation} scale={scale} ref={gltf}/>
*/