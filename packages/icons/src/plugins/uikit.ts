import Vue from "vue";
import Vuetify from "vuetify/lib";

const addtionalIcons = {};
const requireComponent = require.context("../icons", false, /\.vue$/);

requireComponent.keys().map((filename) => {
  const componentName = filename.replace(/\.\//, "").replace(/\.\w+$/, "");
  const componentConfig = requireComponent(filename);
  const component = componentConfig.default || componentConfig;

  addtionalIcons[componentName] = { component };
  Vue.component(componentName, component);
});

export default function () {
  Vue.use(Vuetify);

  return new Vuetify({
    icons: {
      values: { ...addtionalIcons }
    }
  });
}
