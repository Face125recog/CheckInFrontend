<script lang="ts" setup>
import {useRouter} from "vue-router";
import AdminLogin from "./AdminLogin.vue";
import {ref} from "vue";

const drawer = ref(false)
const property = defineProps<{
  pages: { name: string, path: string }[],
}>()
const router = useRouter()

const onSwitchTraget = ({id}) => {
  router.push(id)
}
</script>

<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <v-app-bar-title>打卡系统</v-app-bar-title>
    <template #prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = ! drawer"
      />
    </template>
    <template #append>
      <admin-login :admin-login-done="token => console.log(token)">
        <template #activator="{props}">
          <v-btn
            icon="mdi mdi-login"
            v-bind="props"
          />
        </template>
      </admin-login>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="true"
    location="start"
  >
    <v-list
      :items="property.pages"
      item-title="name"
      item-value="path"
      @click:select="onSwitchTraget"
    />
  </v-navigation-drawer>
</template>

<style scoped>

</style>