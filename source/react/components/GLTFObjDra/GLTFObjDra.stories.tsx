import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GLTFObjDra, { GLTFObjDraProps } from './GLTFObjDra';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/GLTFObjDra",
  component: GLTFObjDra,
} as ComponentMeta<typeof GLTFObjDra>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GLTFObjDra> = (args) => <GLTFObjDra {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
//HelloWorld.args = {
//  elements: [<SpinningReel3D timer={12000} iconHeight={188} totalSymbols={5} width={160} height={564} xpos={500} ypos={200} />],
//};

export const ClickMe = Template.bind({});
//ClickMe.args = {
//  elements: [<SpinningReel3D timer={12000} iconHeight={188} totalSymbols={5} width={160} height={564} xpos={500} ypos={200} />],
//};