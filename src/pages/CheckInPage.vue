<template>
  <v-container class="d-flex justify-center">
    <face-dect

      :face-detect="detectService!"
      :face-picker="onDetectFace"
      :height="200"
      :width="300"
      class="d-flex justify-center w-25 h-50 elevation-3"
    >
      <template #detect-activator="{activate}">
        <v-btn
          :disabled="!modelReady"
          @click="onCheckIn(activate)"
        >
          <template
            v-if="findingFace"
            #prepend
          >
            <v-progress-circular
              indeterminate
            />
          </template>
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
      :class="dialogWidth"
      class="d-flex align-center"
      style="align-self: center"
      title="确认签到"
    >
      <v-card-text class="w-100 d-flex justify-center ma-2">
        <img
          ref="imageRef"
          alt="11"
          class="me-4 rounded-sm"
          src=""
        >
        <v-text-field
          v-if="userInfo"
          v-model="userInfo.name"
          class="w-100"
          hint="打卡人名称"
          label="name"
          readonly
        />
        <v-progress-circular
          v-else
          class="d-flex align-center justify-center"
          indeterminate
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="snackbar=true;showCheckIn=false">
          Check In Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-if="userInfo"
    v-model="snackbar"
    close-delay="3000"
  >
    员工 {{ userInfo.name }} 签到成功
  </v-snackbar>
</template>

<script lang="ts" setup>

import FaceDect from "../components/FaceDect.vue";
import {FrontFaceDetectService} from "../service/impls/frontfaceDetect.ts";
import {computed, onMounted, ref} from "vue";
import {AbcFaceDetect} from "../service/abcFaceDetect.ts";
import {UserInfo} from "../api/callApi/checkIn.ts";
import {useDisplay} from "vuetify";
import {getWidthClass} from "../utils.ts";

defineProps<{ requireAuthorize: () => Promise<string> }>()
const displayInfo = useDisplay()
const detectService = ref<AbcFaceDetect | null>()
const modelReady = ref(false)
const imageRef = ref()
const showCheckIn = ref(false)
const userInfo = ref<UserInfo | null>()
const snackbar = ref(false)
const findingFace = ref(false)
const onCheckIn = (activator: () => Promise<void>) => {
  activator()
  findingFace.value = true

}
const onDetectFace = (face: Blob) => {
  const url = URL.createObjectURL(face)
  showCheckIn.value = true
  findingFace.value = false
  console.log(url)


  if (detectService.value) {
    detectService.value?.faceMatch(face, 0.1).then((user) => {
      userInfo.value = user
      imageRef.value.src = url
    })
  }
}

const dialogWidth = computed(() => getWidthClass(displayInfo))

onMounted(() => {
  FrontFaceDetectService.getInstance().then((detector) => {
    detectService.value = detector
    modelReady.value = true
  })
})
</script>