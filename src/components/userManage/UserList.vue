<script lang="ts" setup>

import {ref} from "vue";
import RecordFace from "./RecordFace.vue";

const data = ref<{ name: string, id: number }[]>([
  {name: "AAA", id: 1},
  {name: "BBB", id: 2},
  {name: "AAA", id: 3},
  {name: "BBB", id: 4},
  {name: "AAA", id: 5},
  {name: "BBB", id: 6},
  {name: "AAA", id: 7},
  {name: "BBB", id: 8},
])
const page = ref(1)

</script>
<template>
  <v-container class="d-flex justify-center align-center">
    <v-card
      class="w-75 pa-3"
    >
      <v-card-title>
        <record-face class="">
          <template #activator="{active}">
            <v-btn
              class="d-flex justify-start"
              prepend-icon="mdi-plus"
              v-bind="active"
            >
              添加
            </v-btn>
          </template>
        </record-face>
        已登记员工
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-center">
                Name
              </th>
              <th class="text-center">
                Id
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="d in data"
              :key="d.id"
            >
              <td>{{ d.name }}</td>
              <td>{{ d.id }}</td>
              <td>
                <v-btn class="bg-red">
                  Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          v-model="page"
          :length="4"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>