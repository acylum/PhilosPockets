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
//import json from "./rainbow.json"
import json from "./explode_purple02.json"

interface Props {

}

const Explosion_particles : React.FC<Props> = (props: Props) => {
    const {scene} = useThree();
    const [particleSystem, setParticleSystem] = useState<NebulaSystem>();
    const pos = useRef(new Vector3(0,0,0))
    const [partPos, setPartPos] = useState([0,0,0]);

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
            else if (props.position !== undefined)
            {
                //console.log(props.name)
                particleSystem.emitters.forEach(emitter => {
                    emitter.setPosition({x:partPos[0], y:partPos[1], z:partPos[2]})
                    //console.log(emitter.position, partPos, props.name)
                });
            }
            NebulaEngine.update(particleSystem);
        }
    })

    useEffect(() => {
        let particleJson = json.hasOwnProperty('particleSystemState')? JSON.parse(JSON.stringify(json.particleSystemState)): JSON.parse(JSON.stringify(json)); 
        setPartPos(props.position);
        //console.log(props.name, props.colorA, particleJson.emitters[0].behaviours[1].properties.colorA)
        //console.log(particleJson, props.position, partPos, props);//json.particleSystemState)
        particleJson.emitters.forEach(emitter => {
            if(props.position !== undefined){ 
                //console.log(props.position)
                emitter.position.x += props.position[0];
                emitter.position.y += props.position[1];
                emitter.position.z += props.position[2]; 
            }

            emitter.behaviours.forEach(behaviour => {
                //console.log(behaviour.properties.colorA,props.colorA)
                if(behaviour.type == 'Color')
                {
                    if(props.colorA !== undefined) behaviour.properties.colorA = props.colorA;
                    if(props.colorB !== undefined) behaviour.properties.colorB = props.colorB;
                }

                if(behaviour.type == 'Alpha')
                {
                    if(props.alphaA !== undefined) behaviour.properties.alphaA = props.alphaA;
                    if(props.alphaB !== undefined) behaviour.properties.alphaB = props.alphaB;
                }

                if(behaviour.type == 'Scale')
                {
                    if(props.scaleA !== undefined) behaviour.properties.scaleA = props.scaleA;
                    if(props.scaleB !== undefined) behaviour.properties.scaleB = props.scaleB;
                }

                if(behaviour.type == 'Force')
                {
                    if(props.force !== undefined){ 
                        behaviour.properties.fx = props.force[0];
                        behaviour.properties.fy = props.force[1];
                        behaviour.properties.fz = props.force[2];
                    }
                }

            });

            emitter.initializers.forEach(initializer => {
                if(initializer.type == 'Radius')
                {
                    if(props.radiusWidth !== undefined) initializer.properties.width = props.radiusWidth;
                    if(props.radiusHeight !== undefined) initializer.properties.height = props.radiusHeight;
                }

                if(initializer.type == 'RadialVelocity')
                {
                    if(props.rvRadius !== undefined) initializer.properties.radius = props.rvRadius;
                    if(props.rvScale !== undefined){ 
                        initializer.properties.x = props.rvScale[0];
                        initializer.properties.y = props.rvScale[1];
                        initializer.properties.z = props.rvScale[2];
                    }
                    if(props.rvTheta !== undefined) initializer.properties.theta = props.rvTheta;
                }
            });

            if(props.life !== undefined) emitter.life = props.life;
            if(props.totalEmitTimes !== undefined) emitter.totalEmitTimes = props.totalEmitTimes;
            if(props.particlesMax !== undefined) emitter.rate.particlesMax = props.particlesMax;
            if(props.particlesMin !== undefined) emitter.rate.particlesMin = props.particlesMin;
            if(props.perSecondMax !== undefined) emitter.rate.perSecondMax = props.perSecondMax;
            if(props.perSecondMin !== undefined) emitter.rate.perSecondMin = props.perSecondMin;
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

export default Explosion_particles;