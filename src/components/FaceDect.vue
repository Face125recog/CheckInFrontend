<script lang="ts" setup>
import {AbcFaceDetect} from "../service/abcFaceDetect.ts";
import {onMounted, ref} from "vue";
import {crop} from "../imageProcess/cropAndResize.ts";

const props = defineProps<{
  width: number, height: number,
  faceDetect: AbcFaceDetect,
  facePicker: (face: Blob) => void
}>()

const activate = async () => {

  if (tmpCan.value && video.value) {
    const canvas = tmpCan.value;
    const videoValue = video.value;
    const drawing = new Promise((resolve, reject) => {
      let ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("浏览器不支持Canvas")
        return
      }
      tmpCan.value!.width = props.width
      tmpCan.value!.height = props.height

      ctx.drawImage(videoValue, 0, 0)
      resolve(null)

    })
    await drawing;
    const face = await props.faceDetect.faceDetect(tmpCan.value)
    if (face) {
      const cropFace = await crop(tmpCan.value, {
        width: face.size.width,
        height: face.size.height,
        left: face.x,
        top: face.y
      })
      props.facePicker(cropFace)
    }
  }
}
const video = ref<HTMLVideoElement | null>()
const tmpCan = ref<HTMLCanvasElement | null>()


onMounted(() => {
  if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({video: {width: props.width, height: props.height}})
        .then((stream) => {
          video.value.srcObject = stream;
          video.value.play()
        })
  } else {
    alert("无法获取浏览器视频流")
  }
})

</script>

<template>
  <v-card
    class=" pa-3 rounded-lg"

    title="人脸采集"
  >
    <v-card-text class="d-flex justify-center">
      <video
        ref="video"
        class=" rounded-lg"
        style="align-self: center"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <slot
        :activate="activate"
        name="detect-activator"
      />
    </v-card-actions>
  </v-card>
  <canvas
    ref="tmpCan"
    :hidden="true"
  />
</template>

<style scoped>

</style>