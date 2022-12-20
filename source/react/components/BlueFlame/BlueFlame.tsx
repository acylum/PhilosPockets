import React, {useEffect, useState, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import NebulaEngine, {NebulaSystem} from "../NebulaEngine";
import {
	EventDispatcher,
	Matrix4,
	Plane,
	Raycaster,
	Vector2,
	Vector3
} from 'three';
//import json from "./BlueFlame.json"
import json from "./rainbow.json"
//import json from "./explode_purple.json"

interface Props {

}

const BlueFlame : React.FC<Props> = (props: Props) => {
    const {scene} = useThree();
    const [particleSystem, setParticleSystem] = useState<NebulaSystem>();
    const pos = useRef(new Vector3(0,0,0))

    /*useEffect(() => {
        if(props.follow){ 
            props.follow.position.subscribe((v) => (pos.current = v))
        }}, [props.follow])*/

    useFrame(() => {
        if (particleSystem) {
            if(props.follow)
            {
                //props.follow.position.subscribe((v) => (pos.current = v))
                particleSystem.emitters.forEach(emitter => {
                    //emitter.position.x = pos.current[0];
                    //emitter.position.y = pos.current[1];
                    //emitter.position.z = pos.current[2];  
                    emitter.setPosition({x:pos.current[0], y:pos.current[1], z:pos.current[2]})
                     
                });
            }
            NebulaEngine.update(particleSystem);
        }
    })

    useEffect(() => {
        const particleJson = json.hasOwnProperty('particleSystemState')? json.particleSystemState: json;
        console.log(particleJson);//json.particleSystemState)
        particleJson.emitters.forEach(emitter => {
            if(props.position !== undefined){ 
                emitter.position.x += props.position[0];
                emitter.position.y += props.position[1];
                emitter.position.z += props.position[2]; 
            }
        });

        NebulaEngine.loadSystem(particleJson as unknown as JSON, scene).then(nebulaSystem => {
            setParticleSystem(nebulaSystem);
        });
    }, [])
    
    if(props.follow){ 
        props.follow.position.subscribe((v) => (pos.current = v))
    }

    return (
       <>
       </>
    );
}

export default BlueFlame;