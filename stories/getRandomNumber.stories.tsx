import { GetRandomNumber } from './getRandomNumber';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/connectWallet.mdx';

export default {
	title: 'Components/getRandomNumber',
	component: GetRandomNumber,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetRandomNumber>;

const Template: ComponentStoryFn<typeof GetRandomNumber> = (args) => (
	<HyperverseProvider>
		<GetRandomNumber {...args} />
	</HyperverseProvider>
);

export const Random1 = Template.bind({});

Random1.args = {
	guessNumber: 1,
};

export const Random2 = Template.bind({});
Random2.args = {
	guessNumber: 2,
};
