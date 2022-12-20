import { PhilosPockets } from './PhilosPockets';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/connectWallet.mdx';

export default {
	title: 'Components/PhilosPockets',
	component: PhilosPockets,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof PhilosPockets>;

const Template: ComponentStoryFn<typeof PhilosPockets> = (args) => (
	<HyperverseProvider>
		<PhilosPockets {...args} />
	</HyperverseProvider>
);

export const Game = Template.bind({});

Game.args = {
	guessNumber: 1,
};

export const Random2 = Template.bind({});
Random2.args = {
	guessNumber: 2,
};
