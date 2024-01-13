<script lang="ts" setup>
import {computed, ref} from "vue";
import {AdminLogin} from "../api/callApi/admin.ts";
import {useDisplay} from "vuetify";
import {getWidthClass} from "../utils.ts";

const property = defineProps<
    { fetchLoginInfo: (login: AdminLogin) => Promise<void>, modelValue: boolean, close: () => void }
>()
const displayInfo = useDisplay()
const userName = ref("")
const userPwd = ref("")
const waitingLogin = ref(false)
const showDialog = ref(property.modelValue)
const errMsg = ref("")
const loginAble = computed(() => {
  return userName.value.length != 0 && userPwd.value.length != 0
})
const adminLogin = () => {
  waitingLogin.value = true;
  property.fetchLoginInfo({name: userName.value, password: userPwd.value}).catch((err) => {
    console.log(err)
    errMsg.value = err.toString()
    setTimeout(() => {
      errMsg.value = ""
    }, 5000)
  }).then(() => {
    userPwd.value = ""
    userName.value = ""
    showDialog.value = false
    waitingLogin.value = false
  })
}

const dialogWidth = computed(() => getWidthClass(displayInfo))

</script>

<template>
  <v-dialog
    v-model="showDialog"
    :class="dialogWidth"
    :model-value="property.modelValue"
    transition="dialog-top-transition"
  >
    <template #activator="{props}">
      <slot
        :props="props"
        name="activator"
      />
    </template>
    <template #default="{isActive}">
      <v-card
        :loading="waitingLogin"
        title="Admin Login"
      >
        <v-card-text>
          <v-alert
            v-if="errMsg"
            :text="errMsg"
            class="mb-3"
            title="登录失败"
            type="error"
          />
          <v-text-field
            v-model="userName"
            label="Admin Name"
            placeholder="admin"
            prepend-icon="mdi mdi-account-tie"
          />
          <v-text-field
            v-model="userPwd"
            :clearable="true"
            hint="enter admin password to access manage module"
            label="Admin Password"
            prepend-icon="mdi mdi-lock"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!loginAble"
            color="green"
            @click="adminLogin"
            @keyup.enter="adminLogin"
          >
            Login
          </v-btn>
          <v-btn
            v-model="isActive.value"
            color="red"
            @click="property.close()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>