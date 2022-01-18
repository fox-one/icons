<template>
  <div>
    <div class="icons">
      <div v-for="(icon, index) in icons" :key="index" class="icon">
        <icon :key="index + '_1'" :icon="icon" :color="color" :size="size" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Icon from "./Icon.vue";
import meta from "../meta.json";
import icons from "../icons.json";

const iconsColorful = meta.colorful.map((x) => x.componentName);

@Component({
  components: {
    Icon
  }
})
class Icons extends Vue {
  @Prop() type!: string;

  @Prop() color;

  icons: any[] = [];

  size: any = 12;

  mounted() {
    if (this.type === "3p") {
      this.size = 12;
      this.icons = icons["3P"];
    } else if (this.type === "4p") {
      this.size = 16;
      this.icons = icons["4P"];
    } else if (this.type === "6p") {
      this.size = 24;
      this.icons = icons["6P"];
    } else if (this.type === "colorful") {
      this.icons = iconsColorful;
      this.size = 48;
    } else {
      const all = [...meta.outline, ...meta.fill].map((x) => x.componentName);
      const used = [...icons["3P"], ...icons["4P"], ...icons["6P"]];

      this.icons = all.filter((x) => used.findIndex((y) => x === y) === -1);
      this.size = 24;
    }
  }
}

export default Icons;
</script>

<style lang="scss" scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 16px;
  row-gap: 16px;
}
</style>
