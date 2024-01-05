<template>
  <v-container class="d-flex justify-center">
    <face-dect

      :face-detect="new FrontFaceDetectService()"
      :face-picker="onDetectFace"
      :height="200"
      :width="300"
      class="d-flex justify-center w-25 h-50 elevation-3"
    >
      <template #detect-activator="{activate}">
        <v-btn
          :disabled="!modelReady"
          @click="activate()"
        >
          Check
        </v-btn>
      </template>
    </face-dect>
  </v-container>
  <v-dialog

    v-model="showCheckIn"

    location="center"
  >
    <v-card
      class="w-25 d-flex align-center "
      style="align-self: center"
      title="确认签到"
    >
      <v-card-text>
        <img
          ref="imageRef"
          alt="11"
          src=""
        >
      </v-card-text>
      <v-card-actions>
        <v-btn>Check In Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>

import FaceDect from "../components/FaceDect.vue";
import {FrontFaceDetectService} from "../service/impls/frontfaceDetect.ts";
import {onMounted, ref} from "vue";

const detectService = new FrontFaceDetectService()
const modelReady = ref(false)
const imageRef = ref()
const showCheckIn = ref(false)
const onDetectFace = (face: Blob) => {
  const url = URL.createObjectURL(face)
  showCheckIn.value = true
  console.log(url)
  setTimeout(() => {

    imageRef.value.src = url
  }, 500)
}

onMounted(() => {
  detectService.init().then(() => {
    modelReady.value = true
  })
})
</script>