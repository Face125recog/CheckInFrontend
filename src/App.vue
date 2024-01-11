<script lang="ts" setup>
import NavigateBar from "./components/NavigateBar.vue";
import {ref} from "vue";
import {useDisplay} from "vuetify";

const nvBar = ref()

const callForAuthorize = async () => {
  return await nvBar.value.getAuthorize()
}
const {width} = useDisplay()
</script>

<template>
  <v-app>
    <v-main>
      <navigate-bar
        ref="nvBar"
        :pages="[{name:`首页`,path:'/'},{name:`打卡`,path:'/check_in'},{name:`管理`,path:`/admin`}]"
      />
      <router-view
        v-if="width>350"
        v-slot="{Component }"
      >
        <component
          :is="Component"
          :require-authorize="callForAuthorize"
        />
      </router-view>
      <v-card
        v-else
        class="pa-10 ma-4 d-flex align-center justify-center"
      >
        <template #title>
          设备宽度过低，请横屏使用
        </template>
      </v-card>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
