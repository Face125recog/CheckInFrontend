<script lang="ts" setup>

import {computed, onMounted, ref, watch} from "vue";
import RecordFace from "./RecordFace.vue";
import {AbcUserManager} from "../../service/abcUserManager.ts";
import {useDisplay} from "vuetify";
import DeleteConfirm from "./deleteConfirm.vue";

const props = defineProps<{ manager: AbcUserManager, requireAuthorize: () => Promise<string> }>()

const data = ref<{ name: string, identity: number }[]>([])
const pageNum = ref()
const pageSize = 8
const page = ref(1)
const {smAndDown} = useDisplay()
const ready = computed(() => {
  return data.value.length > 0 && pageNum.value != 0
})
const loadUser = async () => {
  data.value = await props.manager.allUser(await props.requireAuthorize(), pageSize, page.value)
}

const removeUser = async (id: number) => {
  await props.manager.removeUser(id, await props.requireAuthorize())
      .then(() => {
        loadUser()
      })
}

watch(page, () => {
  data.value = []
  loadUser()
})

onMounted(() => {
  props.requireAuthorize().then((token) => {
    props.manager.userNumber(token).then((num) => {
      pageNum.value = Math.ceil(num / pageSize)
    })
    loadUser()
  })
})


</script>
<template>
  <v-container class="d-flex justify-center align-center">
    <v-card
      :class="smAndDown?'w-100':'w-75'"
      :loading="!ready"
      class="pa-3"
    >
      <v-card-title>
        <record-face
          :after-recorded="() => {return loadUser()}"
          :collect-num="250"
          :require-authorize="requireAuthorize"
          class=""
        >
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
              :key="d.identity"
            >
              <td>{{ d.name }}</td>
              <td>{{ d.identity }}</td>
              <td>
                <delete-confirm
                  :id="d.identity"
                  :deleting="async()=>{await removeUser(d.identity)}"
                  :user="d.name"
                >
                  <template #activator="{args}">
                    <v-btn
                      class="bg-red"
                      icon="mdi mdi-trash-can-outline"
                      v-bind="args"
                    />
                  </template>
                </delete-confirm>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          v-model="page"
          :length="pageNum"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>