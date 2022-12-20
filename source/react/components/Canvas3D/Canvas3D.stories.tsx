import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Canvas3D from "./Canvas3D";
//import Cylinder3D from "../Cylinder3D";
//import { Canvas } from '@react-three/fiber'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Canvas3D",
  component: Canvas3D,
} as ComponentMeta<typeof Canvas3D>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Canvas3D> = (args) => <Canvas3D {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  elements: [<ambientLight intensity={0.5} />, <directionalLight position={[10, 10, 5]} intensity={1} />, <pointLight position={[0, -10, 5]} intensity={1} />],
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  elements: [<ambientLight intensity={0.5} />],
};