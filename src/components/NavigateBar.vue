<script lang="ts" setup>
import {useRouter} from "vue-router";
import AdminLogin from "./AdminLogin.vue";
import {ref} from "vue";
import "../api/callApi/admin.ts"
import {Authorize} from "../authorize.ts";

const drawer = ref(false)
const showLogin = ref(false)
const authorizeToken = ref<string>("")
const property = defineProps<{
  pages: { name: string, path: string }[],
}>()
const router = useRouter()

const onSwitchTraget = ({id}) => {
  router.push(id)
}

const logined = ref<(token: string) => void | null>()
defineExpose({
  getAuthorize: async (): Promise<string> => {
    if (authorizeToken.value) {
      return authorizeToken.value
    } else {
      showLogin.value = true
      let promise = new Promise<string>((resolve) => {
        logined.value = resolve
      })
      return await promise;

    }
  }
})

const handleAuthorize = async (login: { name: string, password: string }) => {
  Authorize.getAuthorizeToken(async () => login)
      .then((token) => {
        if (logined.value)
          logined.value(token)
        authorizeToken.value = token
        console.log(token)
        showLogin.value = false
      })
}

</script>

<template>
  <v-app-bar
    color="primary"
  >
    <v-app-bar-title>打卡系统</v-app-bar-title>
    <template #prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = ! drawer"
      />
    </template>
    <template #append>
      <admin-login
        v-model="showLogin"
        :fetch-login-info="handleAuthorize"
      >
        <template #activator="{props}">
          <v-btn
            icon="mdi mdi-login-variant"
            v-bind="props"
            @click="showLogin=true"
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
      class="text-left"
      item-title="name"
      item-value="path"
      @click:select="onSwitchTraget"
    />
  </v-navigation-drawer>
</template>

<style scoped>

</style>