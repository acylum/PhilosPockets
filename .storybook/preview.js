import { themes } from "@storybook/theming";
import React from "react";
import "../styles/globals.css";
global.React = React;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
