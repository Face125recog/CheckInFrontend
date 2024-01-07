<template>
  <user-list
    :manager="FrontUserManager.getInstance()"
    :require-authorize="requireAuthorize"
  />
  <!--  <check-in-history />-->
</template>

<script lang="ts" setup>

import UserList from "../components/userManage/UserList.vue";
import {FrontUserManager} from "../service/impls/frontUserManager.ts";

const {requireAuthorize} = defineProps<{ requireAuthorize: () => Promise<string> }>()
</script>