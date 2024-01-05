<script lang="ts" setup>
import {computed, ref} from "vue";

const props = defineProps<
    { adminLoginDone: (token: string) => void; }
>()

const showDialog = ref(false)
const userName = ref("")
const userPwd = ref("")
const waitingLogin = ref(false)

const loginAble = computed(() => {
  return userName.value.length != 0 && userPwd.value.length != 0
})
const adminLogin = () => {
  waitingLogin.value = true;
  setTimeout(() => {
    waitingLogin.value = false;
    showDialog.value = false
    props.adminLoginDone("ABC")
  }, 1000)
}

</script>

<template>
  <v-dialog
    v-model="showDialog"
    class="w-33"
    transition="dialog-top-transition"
  >
    <template #activator="{props}">
      <slot
        :props="props"
        name="activator"
      />
    </template>
    <template #default="{isActive }">
      <v-card
        :loading="waitingLogin"
        title="Admin Login"
      >
        <v-card-text>
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
            @click="adminLogin"
          >
            Login
          </v-btn>
          <v-btn @click="isActive .value=false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>