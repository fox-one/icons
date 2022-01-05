import Vue from "vue";
import Vuetify from "vuetify/lib";
import UIKit from "@foxone/uikit/build/index.min.js";
import "@foxone/uikit/build/index.min.css";

const preset = UIKit.preset;
const addtionalIcons = {};
const requireComponent = require.context("../icons", false, /\.vue$/);

requireComponent.keys().map((filename) => {
  const componentName = filename.replace(/\.\//, "").replace(/\.\w+$/, "");
  const componentConfig = requireComponent(filename);
  const component = componentConfig.default || componentConfig;

  addtionalIcons[componentName] = { component };
  Vue.component(componentName, component);
});

preset.icons!.values = { ...preset.icons!.values, ...addtionalIcons };

export default function () {
  Vue.use(Vuetify);
  Vue.use(UIKit);

  return new Vuetify(preset);
}
