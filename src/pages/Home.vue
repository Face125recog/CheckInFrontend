<script lang="ts" setup>
import {useRouter} from "vue-router";

defineProps<{
  requireAuthorize: () => Promise<string>
}>()

const router = useRouter()
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card>
      <v-card-text>
        <v-btn
          class="rounded-xl ma-4"
          prepend-icon="mdi mdi-account-box-outline"
          @click="router.push('/check_in')"
        >
          前往打卡
        </v-btn>
        <v-btn
          class="rounded-xl ma-4"
          prepend-icon="mdi mdi-account-edit"
          @click="router.push('/admin')"
        >
          前往用户管理
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>