<script lang="ts" setup>
import NavigateBar from "./components/NavigateBar.vue";
import {ref} from "vue";

const nvBar = ref()

const callForAuthorize = async () => {
  return await nvBar.value.getAuthorize()
}

</script>

<template>
  <v-app>
    <v-main>
      <navigate-bar
        ref="nvBar"
        :pages="[{name:`首页`,path:'/'},{name:`打卡`,path:'/check_in'},{name:`管理`,path:`/admin`}]"
      />
      <router-view v-slot="{Component }">
        <component
          :is="Component"
          :require-authorize="callForAuthorize"
        />
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
