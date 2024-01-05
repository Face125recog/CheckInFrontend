<script lang="ts" setup>

import {ref} from "vue";

const data = ref<{ name: string, id: number, time: Date, status: string }[]>([
  {name: "AAA", id: 1, time: new Date(Date.now()), status: "早退"},
  {name: "BBB", id: 2, time: new Date(Date.now()), status: "准时"}
])

console.log(data)
const page = ref(1)

</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <v-card
      class="w-75 pa-3"
    >
      <v-card-title>
        打卡记录
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
                Status
              </th>
              <th class="text-center">
                RecordTime
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
              <td>{{ d.status }}</td>
              <td>{{ d.time.toLocaleString() }}</td>
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