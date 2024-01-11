<script lang="ts" setup>
import {useRouter} from "vue-router";
import AdminLogin from "./AdminLogin.vue";
import {computed, ref} from "vue";
import "../api/callApi/admin.ts"
import {Authorize} from "../authorize.ts";

const coast = ref("")
const showCoast = computed(() => coast.value.length > 0)
const drawer = ref(false)
const showLogin = ref(false)
const authorizeToken = Authorize.init()
const authorizeState = computed(() => authorizeToken.value != null)
const property = defineProps<{
  pages: { name: string, path: string }[],
}>()
const router = useRouter()

const onSwitchTarget = ({id}: { id: string }) => {
  router.push(id)
}


const isOnline = ref<(token: string) => void | null>()
defineExpose({
  getAuthorize: async (): Promise<string> => {
    if (authorizeToken.value) {
      return authorizeToken.value
    } else {
      showLogin.value = true
      let promise = new Promise<string>((resolve) => {
        isOnline.value = resolve
      })
      return await promise;

    }
  }
})

const handleAuthorize = async (login: { name: string, password: string }) => {
  await Authorize.getAuthorizeToken(async () => login)
      .then((token) => {
        if (isOnline.value)
          isOnline.value(token)
        authorizeToken.value = token
        console.log(token)
        showLogin.value = false
        coast.value = "Admin login success"
        setTimeout(() => {
          coast.value = ""
        }, 3000)
      })
}
const handleLogState = () => {
  if (authorizeState.value) {
    Authorize.removeAuthorize()
    coast.value = "Admin logout success"
    setTimeout(() => {
      coast.value = ""
    }, 3000)
  } else {
    showLogin.value = true
  }
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
        :close="()=>{router.push('/');showLogin = false}"
        :fetch-login-info="handleAuthorize"
      >
        <template #activator="{props}">
          <v-btn
            :prepend-icon="authorizeState? `mdi mdi-account-circle`:`mdi mdi-login-variant`"
            :text="authorizeState?`管理登出`:`管理登录`"
            v-bind="props"
            @click="handleLogState"
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
      @click:select="onSwitchTarget"
    />
  </v-navigation-drawer>
  <v-snackbar
    v-if="showCoast"
    v-model="showCoast"
    close-delay="1000"
  >
    {{ coast }}
  </v-snackbar>
</template>

<style scoped>

</style>