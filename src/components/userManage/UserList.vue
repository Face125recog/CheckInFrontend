<script lang="ts" setup>
import {ref} from "vue";

const itemPerPage = ref(5)
const items = ref<{ name: string, identity: string }[]>([])
const itemLength = ref(100)
const loading = ref(false)

const loadItems = (arg) => {
  console.log(arg)
}
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemPerPage"
  />
</template>

<style scoped>

</style>