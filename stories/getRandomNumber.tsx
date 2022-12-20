import { useModule } from '../source/react';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

export const GetRandomNumber = ({ ...props }: { guessNumber: number }) => {
	const myModule = useModule();
	const [data, setData] = useState();
     
    useEffect(() => {
		if (myModule.getRandomNumber) {
			myModule.getRandomNumber?.(0).then(setData);
		}
	}, [myModule.getRandomNumber]);
	
	const checkURI = () => {
		console.log('in check',data)
        return data ? <p>{ethers.utils.formatUnits(data, 0)}</p> : <p>{JSON.stringify(myModule.error)}</p>;
	};

	return <div className="body"> RandomNumberA: {checkURI()}</div>;


/*
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