<script setup lang="ts">
import {onMounted, ref} from "vue";
import {OpenCv} from "./face_detect.ts";

const cv = new OpenCv()
const dialog = ref(false)
const video = ref<HTMLVideoElement | null>(null);
const canv = ref<HTMLCanvasElement | null>(null);
const canv_out=ref<HTMLCanvasElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
const initOpencv = ref(false)
onMounted(() => {
  // console.log(cv)
  navigator.mediaDevices.getUserMedia({video: {width: 200, height: 150}})
      .then((stream) => {
        if (video.value) {
          video.value.srcObject = stream
          video.value.play()
        }
      })
  cv.init().then(()=>{initOpencv.value =true})

})

const checkIn = () => {
  const context = canv.value!.getContext("2d")
  canv.value!.width = 200
  canv.value!.height = 150
  context!.drawImage(video.value!, 0, 0, 200, 150)
  cv.find_face(canv.value!,canv_out.value!)
  // const url = canv.value!.toDataURL("image/png")
  // img.value!.src = url

}

</script>

<template>
  <v-container class="bg-blue-accent-1 h-25 w-33">

    <v-card class="elevation-4 align-center" :onprogress="!initOpencv">
      <v-card-title>Check In</v-card-title>
      <v-card-text v-if="initOpencv" class="fill-height w-100 ma-2 pa-2">
        <video ref="video" class=""></video>
        <canvas ref="canv"/>
        <canvas ref="canv_out"/>
        <v-divider class="ma-2"></v-divider>
        <v-btn color="primary" @click="checkIn">
          签到
          <v-dialog
              v-model="dialog"
              activator="parent"
              width="auto"
          >
            <v-card>
              <v-card-title>王阳琦</v-card-title>
              <v-card-text>完成签到</v-card-text>
              <v-card-actions>
                <v-btn @click="dialog=false">Close</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </v-btn>
        <v-divider/>
        <img src="" ref="img"/>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<style scoped>

</style>
