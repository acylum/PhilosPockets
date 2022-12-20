import { useModule } from '../source/react';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Canvas3D from "../source/react/components/Canvas3D";
import Room3D from "../source/react/components/Room3D";
import Gift3D from "../source/react/components/Gift3D";
import Notebook3D from "../source/react/components/Notebook3D";
import Apple from "../source/react/components/Apple";
import WoodBoardShort from "../source/react/components/WoodBoardShort";

export const PhilosPockets = ({ ...props }: { guessNumber: number }) => {
	const myModule = useModule();
	const [data, setData] = useState();
	const [testActive, setTestActive] = useState(0);
	const [elementsOnCanvas,setElementsOnCanvas] = useState([
		//<Apple key={1000} position={[-1.1, 0.3, -2.3]}/>,
		<WoodBoardShort key={1001} position={[-0.8, 0.3, -2.3]}/>, 
		//<Notebook3D key={1002} position={[-0.45, 0.3, -2.3]}/>,
		//<Notebook3D key={1003} position={[-0.15, 0.3, -2.3]}/>,
		//<Notebook3D key={1004} position={[0.15, 0.3, -2.3]}/>,
		//<Gift3D key={1005} testActive={testActive}/>, 
		<Room3D key={1006}/>, 
		<ambientLight key={1007} intensity={0.30} />, 
		<pointLight key={1008} intensity={1} args={[0xFFE8BE, 1, 5]} position={[0, 1.75, 0]}/>, 
		<directionalLight key={1009} castShadow shadow-mapSize-height={512} shadow-mapSize-width={512} position={[2.5, 5, 5]} intensity={0.3} />
	  ]);
	
	const [resetObj, setResetObj] = useState(0);
	const [saveObj, setSaveObj] = useState(0);
	
	function toggleTest(){
		setTestActive(testActive+1);
	}

	function resetObjects(){
	setResetObj(resetObj+1);
	
	//force the jsx elements to update their values
	let tempDup = elementsOnCanvas.map(child => {
		return React.cloneElement(child, {
		reset: (resetObj+1),
		})
	});
	setElementsOnCanvas(tempDup);
	}


	function saveObjects(){
	setSaveObj(saveObj+1);

	//force the jsx elements to update their values
	let tempDup = elementsOnCanvas.map(child => {
		return React.cloneElement(child, {
		save: (saveObj+1),
		})
	});
	setElementsOnCanvas(tempDup);
	}


	const addElement = (e)=> {
	const elementCount = elementsOnCanvas.length;
	const element= e.target.getAttribute("data-shape");
	
	let elementJSX = <></>;
	if(element == "Notebook3D") elementJSX = <Notebook3D key={elementCount} position={[0,0,0]} spawn={true} reset={resetObj}/>
	else if(element == "Apple") elementJSX = <Apple key={elementCount} position={[0,0,0]} spawn={true} reset={resetObj}/>
	else if(element == "WoodBoardShort") elementJSX = <WoodBoardShort key={elementCount} position={[0,0,0]} spawn={true} reset={resetObj}/>

	setElementsOnCanvas(
		[
		...elementsOnCanvas, 
		elementJSX
		]
	)
	}


    useEffect(() => {
		if (myModule.getRandomNumber) {
			myModule.getRandomNumber?.(0).then(setData);
		}
	}, [myModule.getRandomNumber]);
	
	const checkURI = () => {
		console.log('in check',data)
        return data ? <p>{ethers.utils.formatUnits(data, 0)}</p> : <p>{JSON.stringify(myModule.error)}</p>;
	};

	return <div className="body"> 
	
			<span style={{whiteSpace: "nowrap", display:"table", margin:"0 auto"}}>
              <button onClick={saveObjects} data-shape={"Apple"} style={{ left:'2.9rem', width:'10rem', backgroundImage:"url(./but_save.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
              <button onClick={toggleTest} style={{width:'10rem', backgroundImage:"url(./test_but.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
              <button onClick={resetObjects} style={{ left:'22.85rem', width:'10rem', backgroundImage:"url(./but_reset.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
            </span>
            
            <span style={{width:"100%", whiteSpace: "nowrap", display:"table", margin:"0 auto"}}>
              <Canvas3D height={'45rem'} elements={[...elementsOnCanvas,<Gift3D key={1005} position={[-2.3, 4, 3.16]} testActive={testActive}/>]} reset={resetObj}/>
            </span>
            
            <span style={{whiteSpace: "nowrap", display:"table", margin:"0 auto"}}>
              <button onClick={addElement} data-shape={"Apple"} style={{ left:'2.9rem', width:'10rem', backgroundImage:"url(./but_apple.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
              <button onClick={addElement} data-shape={"Notebook3D"} style={{ left:'12.56rem', width:'10rem', backgroundImage:"url(./but_notebook.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
              <button onClick={addElement} data-shape={"WoodBoardShort"} style={{ left:'22.85rem', width:'10rem', backgroundImage:"url(./but_wood.png)", backgroundRepeat: "no-repeat", backgroundSize:"contain", borderRadius:'0'}}></button>
            </span>
	</div>;


/*
<Canvas3D width={500} height={500} xpos={0} ypos={70} elements={[<Gift3D/>,<Room3D/>, <ambientLight intensity={0.5} />, <directionalLight position={[10, 10, 5]} intensity={1} />, <pointLight position={[0, -10, 5]} intensity={1} />]}/>


    const { getRandomNumber } = useModule();

	return (
		<>
			
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					const res = getRandomNumber?.(0);
                    console.log('res rand',res);
				}}
			>
				Get Random
			</button>
		</>
	);*/

};