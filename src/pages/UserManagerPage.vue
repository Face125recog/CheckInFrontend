<template>
  <user-list
    :manager="FrontUserManagerService.getInstance()"
    :require-authorize="requireAuthorize"
  />
  <!--  <check-in-history />-->
</template>

<script lang="ts" setup>

import UserList from "../components/userManage/UserList.vue";
import {FrontUserManagerService} from "../service/impls/frontUserManagerService.ts";

const {requireAuthorize} = defineProps<{ requireAuthorize: () => Promise<string> }>()
</script>