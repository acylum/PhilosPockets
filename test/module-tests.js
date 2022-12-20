const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Module', function () {
	let Module;
	let ModuleFactory;
	let moduleContract;
	let factoryContract;
	let alice;
	

	beforeEach(async () => {
		Module = await ethers.getContractFactory('Module');
		[owner, alice, bob, cara] = await ethers.getSigners();

		moduleContract = await Module.deploy(owner.address);
		await moduleContract.deployed();

		ModuleFactory  = await ethers.getContractFactory('ModuleFactory');
		factoryContract = await ModuleFactory.deploy(moduleContract.address, owner.address);
	});

	describe('Initial', function ()  {
		it('Checking owner', async () => {
			expect(await moduleContract.contractOwner()).to.equal(owner.address);
		});
	});

	describe('GuessRandom', function ()  {
		it('guess number', async () => {
			for(var i=0;i<5;i++)
      		{
				await network.provider.send("evm_increaseTime", [900])
        		await network.provider.send("evm_mine")
				const res = await moduleContract.guess(0);
				console.log("rand", ethers.utils.formatUnits(res, 0), res);
			}
			//expect(await moduleContract.guess(0));
		});
	});
});
