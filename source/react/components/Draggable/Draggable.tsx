import React, { useEffect, useRef, useState } from "react";
import { extend, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "@react-three/drei";

extend({ DragControls });

function Draggable(props) {
  const groupRef = useRef();
  const controlsRef = useRef();
  const [objects, setObjects] = useState();
  const { camera, gl, scene } = useThree();
  useEffect(() => {
    console.log('drag01-current children', groupRef.current.children)
    setObjects(groupRef.current.children);
  }, [groupRef]);

  useEffect(() => {
    const orbitControls = (scene as any).orbitControls
    //console.log(orbitControls)
    //console.log('drageffect',Object.getPrototypeOf(scene.__r3f.objects[0]).constructor.name)//.objects[OrbitControls])
    
    
    //if(Object.getPrototypeOf(scene.__r3f.objects[0]).constructor.name == 'OrbitControls')//orbitControls)
    if(orbitControls)
    {
      console.log("yes orbit", controlsRef)
      controlsRef.current.addEventListener("hoveron", () => {
        //scene.orbitControls.enabled = false;
        orbitControls.enabled = false;
      });
      controlsRef.current.addEventListener("hoveroff", () => {
        //scene.orbitControls.enabled = true;
        orbitControls.enabled = true;//
      });
    }
  }, [objects]);
  return (
    <group ref={groupRef}>
      <dragControls ref={controlsRef} args={[objects, camera, gl.domElement, props.api]}/>
      {props.children}
    </group>
  );
}
/*
<dragControls ref={controlsRef} args={[objects, camera, gl.domElement, props.api]}/>
*/
export default Draggable;