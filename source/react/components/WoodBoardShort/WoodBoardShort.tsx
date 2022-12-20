//import React from "react";
import React, {useEffect, useState, useRef} from "react";
import { useCompoundBody } from '@react-three/cannon'
//import "./WoodBoardShort.module.scss";
import GLTFObjDra from "../GLTFObjDra";
import Explosion_particles from "../Explosion_particles"
import Points_particles from '../Points_particles';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';


const WoodBoardShort = (props: any) => {
  let scale = [1,1,1];
  let position = [0,2,0];

  const [showParticles, setShowParticles] = useState(false)
  const [collisionPt, setCollisionPt] = useState([0,0,0])
  const { camera, gl, scene } = useThree();
  const orbitControls = (scene as any).orbitControls;
  const pos = useRef([0,0,0])
  const rot = useRef([0,0,0])
  const gotDist = useRef(false);
  const distance = useRef(0);
  const [lastPos, setLastPos] = useState(new Vector3(0,0,0))
  const [drag, setDrag] = useState(false);  
  const [rotY, setRotY] = useState(0);
  const [lastMouse, setLastMouse] = useState(new Vector3(0,0,1))
  const [beginRot, setBeginRot] = useState(new Vector3(0,0,0))
  const [showGizmo, setShowGizmo] = useState(false);
  const [initialized, setInitialized]  = useState(false);
  const [initPos, setInitPos]  = useState(new Vector3(0,0,0));

  const [lastReset, setLastReset]  = useState(0);
  const [lastSave, setLastSave]  = useState(0);

  type ObjState = {
    position: Vector3;
    rotation: Vector3;
  };
  const [objState, setObjState]  = useState<ObjState>();

  const groundMaterial = 'ground'
  
  const [ref, api] = useCompoundBody(() => ({
    mass: 1, position: [props.position],//-0.3, 0.3, -1.9],
    ...props,
    onCollide: (e) => onCollide(e),
    material:groundMaterial,
    shapes: [
      { type: 'Box', position: [0, 0, 0], rotation: [0, -Math.PI/2, 0], args: [0.2, 0.020, 0.35] }
    ]
  }))

  api.position.subscribe((v) => (pos.current = v))
  api.rotation.subscribe((v) => (rot.current = v))


  const onCollide = (e) => {
    if(e.body.name.length>0){ 
      setCollisionPt(e.contact.contactPoint);
      setShowParticles(true);
    }
  }


  useEffect(() => {
    if(orbitControls)
    {
      if(drag || showGizmo) orbitControls.enabled = false;
      else if(!drag && !showGizmo) orbitControls.enabled = true;
    }

    if(props.spawn && !initialized){
      setInitialized(true);
      setLastReset(props.reset);//to know when there is a value change
      var vector = new Vector3(0,0,1);
      var tempPos = new Vector3();
      vector.unproject(camera);
      vector.sub(camera.position).normalize();
      tempPos.copy(camera.position).add(vector.multiplyScalar(1));
        
      if(tempPos.y< 0.3)// || tempPos.y> 0.3)
      { 
        tempPos.y = 0.3;
      }
      api.position.copy(tempPos);
      setInitPos(tempPos);
      setObjState({ position: tempPos, rotation:props.rotation ? new Vector3(props.rotation[0],props.rotation[1],props.rotation[2]) : new Vector3(0,0,0) })
    }
    else if(!props.spawn && !initialized){
      setInitialized(true);
      setLastReset(props.reset);//to know when there is a value change
      var tempPos = props.position ? new Vector3(props.position[0], props.position[1], props.position[2]) : new Vector3(0,0,0);
      setInitPos(tempPos);
      setObjState({ position: tempPos, rotation:props.rotation ? new Vector3(props.rotation[0],props.rotation[1],props.rotation[2]) : new Vector3(0,0,0) })
    }
    else if(props.reset != lastReset && objState)
    {
      setLastReset(props.reset);//to know when there is a value change
      api.position.copy(objState.position.x+objState.position.y+objState.position.z ? objState.position : initPos);//(initPos);
      api.rotation.copy(objState.rotation);
    }
    if(props.save != lastSave)
    {
      setLastSave(props.save);//to know when there is a value change
      setObjState({ position: new Vector3(pos.current[0],pos.current[1],pos.current[2]), rotation:new Vector3(rot.current[0],rot.current[1],rot.current[2]) })
    }
    
    if( drag && !showGizmo )
    {
      api.mass.set(0);
    }
    else if( !drag && showGizmo )
    {
      api.mass.set(1);
    }
    else if(!drag && !showGizmo ){
      api.mass.set(1);
    }
  }, [props.spawn, drag, showGizmo, props.reset, props.save])


  useFrame((state) => {
    if(showGizmo)
    {
      if(rotY>0)
      {
        api.angularVelocity.set(0,0,0); 
        if(rotY==1)
        {
          setLastMouse(new Vector3(lastMouse.x, state.mouse.y, 1));
          setBeginRot(new Vector3(rot.current[0],rot.current[1],rot.current[2]))
          setRotY(2);
        }

        if(rotY>1)
        {
          api.rotation.set(beginRot.x,beginRot.y+((state.mouse.x-lastMouse.x)*8),beginRot.z)
          api.position.copy(lastPos);
        }
      }
    }
    else if(drag)
    {
      api.angularVelocity.set(0,0,0); 
      var vector = new Vector3();
      var tempPos = new Vector3();
      vector.set(state.mouse.x, state.mouse.y, 1);
      vector.unproject(state.camera);
      vector.sub(state.camera.position).normalize();
      
      if(!gotDist.current)
      {
        distance.current = state.camera.position.distanceTo(initPos);
      }
      
      tempPos.copy(state.camera.position).add(vector.multiplyScalar(distance.current));
      
      if(tempPos.y< lastPos.y)
      { 
        tempPos.y = lastPos.y;
      }
      api.position.copy(tempPos);

      if(Math.abs(lastPos.y-tempPos.y)> 0.2) api.rotation.set(0,beginRot.y,0)
    } 
  });


  return ( 
    
    <group ref={ref} name={'woodboard'} > 
      <mesh receiveShadow castShadow name={'woodboard'} 
        userData={api}
        onPointerDown={(e) => { setLastPos(new Vector3(pos.current[0],pos.current[1],pos.current[2])); api.mass.set(0); setDrag(true);}}
        onPointerUp={(e) => { setLastPos(new Vector3(pos.current[0],pos.current[1],pos.current[2])); setDrag(false); setShowGizmo(true);}}
      >
        <GLTFObjDra key={18764454} name="woodboard" receiveShadow={true} castShadow={true} position={[0,0,0]} scale={[0.6,0.5,0.16]} rotation={[0,Math.PI/2,0]} url={'/Wood_04_dra.glb'} />
      </mesh>
      
      {showGizmo ?
        (
        <>
        <mesh 
          onPointerDown={(e) => { setRotY(1);}}
          onPointerUp={(e) => { setRotY(0);  setShowGizmo(false);}}
          position={[0,0,0]}
          rotation={[0,0,0]}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshNormalMaterial wireframe/>
        </mesh>
        </>
        ):
        (null)
      }

      {showParticles ? 
      (
        <>
        <Explosion_particles position={collisionPt}/>
        <Points_particles position={collisionPt} name={'woodboardshort'} texture={'/points25_particle.png'}/>
        </>
      ) : (
        <>
        </>
      )}
      
    </group> 
    
  )
};

export default WoodBoardShort;