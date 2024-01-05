<script lang="ts" setup>

import FaceDect from "../FaceDect.vue";
import {FrontFaceDetectService} from "../../service/impls/frontfaceDetect.ts";
import {computed, onMounted, ref} from "vue";

const faceDetect = new FrontFaceDetectService()
const modelReady = ref(false)
const remainTimes = ref(200)
const startCollecting = ref(false)
const onCollect = computed(() => {
  return startCollecting.value && remainTimes.value > 0
})

const faceImg = ref()
onMounted(() => {
  faceDetect.init().then(() => {
    modelReady.value = true
  })
})
const activateFaceDetect = (activate: () => void) => {

  activate()
  if (onCollect.value) {
    setTimeout(() => {
      activateFaceDetect(activate)
    }, 20)
  } else {
    startCollecting.value = false
    remainTimes.value = 200
  }

}
const onPickFace = (face: Blob) => {
  faceImg.value.src = URL.createObjectURL(face)
  remainTimes.value -= 1
}


</script>

<template>
  <v-dialog
    class=""
    transition="dialog-top-transition"
  >
    <template #activator="{props}">
      <slot
        :active="props"
        name="activator"
      />
    </template>

    <v-card
      :loading="onCollect"
      class="w-33 d-flex justify-center ma-2"
      style="align-self: center"
    >
      <v-card-text class="pa-2">
        <v-stepper
          :items="[`登记信息`,`录入人脸`]"
          elevation="0"
        >
          <template #item.1>
            <v-card>
              <v-card-text>
                <v-text-field label="Name" />
                <v-text-field label="ID" />
              </v-card-text>
            </v-card>
          </template>
          <template #item.2>
            <face-dect
              :face-detect="faceDetect"
              :face-picker="onPickFace"
              :height="200"
              :width="300"
              class="elevation-0 ma-2"
            >
              <template #detect-activator="{activate}">
                <v-btn @click="startCollecting=true;activateFaceDetect(activate)">
                  {{ onCollect ? `采集中 ${remainTimes + 1}/200` : '开始采集' }}
                </v-btn>
              </template>
            </face-dect>
          </template>
        </v-stepper>

        <img
          ref="faceImg"
          :hidden="!onCollect"
          class="ma-2 rounded-sm"
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>