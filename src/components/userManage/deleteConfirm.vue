<script lang="ts" setup>
import {computed, ref} from "vue";
import {useDisplay} from "vuetify";
import {getWidthClass} from "../../utils.ts";

const props = defineProps<{ user: string, id: number, deleting: () => Promise<void> }>()
const onDelete = ref(false)
const openDialog = ref(false)
const doDelete = () => {
  props.deleting().then(() => {
    onDelete.value = false
    openDialog.value = false
  })
  onDelete.value = true

}
const display = useDisplay()
const displayWidth = computed(() => getWidthClass(display))
</script>

<template>
  <v-dialog
    v-model="openDialog"
  >
    <template #activator="{props}">
      <slot
        :args="props"
        name="activator"
      />
    </template>
    <v-card
      :class="displayWidth"
      :loading="onDelete"
      class="d-flex justify-center"
      style="align-self: center"
    >
      <template #title>
        删除员工确认
      </template>
      <template #text>
        确实要移除员工？<p>
          姓名： [{{ user }}] ID: {{ id }} ?
        </p>
      </template>
      <template
        #actions
      >
        <v-btn
          prepend-icon="mdi mdi-check"
          @click="doDelete"
        >
          {{ onDelete ? "删除中" : "删除" }}
        </v-btn>
        <v-btn
          color="red"
          prepend-icon="mdi mdi-close"
          @click="openDialog=false"
        >
          Cancel
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>