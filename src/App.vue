<script lang="ts" setup>
import NavigateBar from "./components/NavigateBar.vue";

// import {onMounted, ref} from "vue";
// import {crop} from "./imageProcess/cropAndResize";
// import {FrontFaceDetectService} from "./service/impls/frontfaceDetect.ts";
//
// const dialog = ref(false)
// const video = ref<HTMLVideoElement | null>(null);
// const canv = ref<HTMLCanvasElement | null>(null);
// const img = ref<HTMLImageElement | null>(null);
// const face_detect = new FrontFaceDetectService()
// const modelInit = ref(false)
//
// onMounted(() => {
//   // console.log(cv)
//   navigator.mediaDevices.getUserMedia({video: {width: 600, height: 300}})
//       .then((stream) => {
//         if (video.value) {
//           video.value.srcObject = stream
//           video.value.play()
//         }
//       })
//   face_detect.init().then(() => {
//     modelInit.value = true
//   })
// })
//
// const checkIn = async () => {
//   const canvas = canv.value!;
//   canvas.width = 600
//   canvas.height = 300
//
//   const context = canvas.getContext("2d")
//   context?.drawImage(video.value!, 0, 0)
//   const face = await face_detect.faceDetect(canvas, {width: 25, height: 25})
//   if (face) {
//     const cropImg = await crop(canv.value!, {
//       width: face.size.width,
//       height: face.size.height,
//       left: face.x,
//       top: face.y
//     })
//
//     // document.body.removeChild(canvas)
//     img.value!.src = URL.createObjectURL(cropImg)
//   } else {
//     dialog.value = false
//     alert("No Face detect")
//   }
// }

</script>

<template>
  <v-app>
    <navigate-bar :pages="[{name:`首页`,path:'/'},{name:`打卡`,path:'/check_in'},{name:`管理`,path:`/admin`}]" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <!--  <v-container class="bg-blue-accent-1 h-25 w-33">-->
  <!--    <v-card :onprogress="!modelInit" class="elevation-4 align-center">-->
  <!--      <v-card-title>Check In</v-card-title>-->
  <!--      <v-card-text v-if="modelInit" class="fill-height w-100 ma-2 pa-2">-->
  <!--        <video ref="video" class="" />-->
  <!--        <canvas ref="canv" />-->
  <!--        <v-divider class="ma-2" />-->
  <!--        <v-btn :disabled="!modelInit" color="primary" @click="checkIn">-->
  <!--          签到-->
  <!--          <v-dialog v-model="dialog" activator="parent" width="auto">-->
  <!--            <v-card>-->
  <!--              <v-card-title>王阳琦</v-card-title>-->
  <!--              <v-card-text>完成签到</v-card-text>-->
  <!--              <v-card-actions>-->
  <!--                <v-btn @click="dialog = false">-->
  <!--                  Close-->
  <!--                </v-btn>-->
  <!--              </v-card-actions>-->
  <!--            </v-card>-->
  <!--          </v-dialog>-->
  <!--        </v-btn>-->
  <!--        <v-divider />-->
  <!--        <img ref="img" src="">-->
  <!--      </v-card-text>-->
  <!--    </v-card>-->
  <!--  </v-container>-->
</template>

<style scoped></style>
