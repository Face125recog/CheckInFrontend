<script lang="ts" setup>

import FaceDect from "../FaceDect.vue";
import {FrontFaceDetectService} from "../../service/impls/frontfaceDetect.ts";
import {computed, onMounted, ref, watch} from "vue";
import {VStepper} from "vuetify/components";
import {AbcFaceDetect} from "../../service/abcFaceDetect.ts";
import {useDisplay} from "vuetify";
import {getWidthClass} from "../../utils.ts";

const {requireAuthorize, collectNum} = defineProps<{ requireAuthorize: () => Promise<string>, collectNum: number }>()
type State = "None" | "Collecting" | "Done" | "Failure"
const showDialog = ref(false)
const modelReady = ref(false)
const faceDetect = ref<AbcFaceDetect | null>()
const remainTimes = ref(collectNum)
const registerStep = ref<VStepper | null>()
const userName = ref("")
const userId = ref<number>(0)
const collectState = ref<State>("None")

const collectProgress = ref(0)

watch(remainTimes, () => {
  collectProgress.value = Math.round((collectNum - remainTimes.value) * (100 / collectNum))
  console.log(collectProgress.value)
})
const userInfoFilled = computed(() => userName.value.length > 0 && userId.value > 0)
const onCollect = computed(() => {
  return collectState.value == "Collecting" && remainTimes.value > 0
})

const pickedFace = ref<Blob | null>(null)

const faceImg = ref()
onMounted(() => {
  FrontFaceDetectService.getInstance().then((detector) => {
    faceDetect.value = detector
    modelReady.value = true
  })
})
watch(showDialog, (value) => {
  if (!value) {

    userName.value = ""
    userId.value = 0
    collectState.value = "None"
    remainTimes.value = collectNum
  }
})
const activateFaceDetect = (activate: () => void) => {
  if (faceDetect.value) {
    const collectFace = async () => {
      const auth = await requireAuthorize()
      await faceDetect.value?.addingFace({
        nextFace: async (_, context) => {
          context()
          return await getFace(context)
        }
      }, activate, collectNum, auth, {name: userName.value, identity: userId.value})
    }
    collectFace().then(() => {
      collectState.value = "Done"
    }).catch(() => {
      collectState.value = "Failure"
    })
  }
}

const getFace = (activator: () => void) => {
  return new Promise<Blob>((resolve) => {
        const inner = () => {
          if (pickedFace.value) {
            const payload = pickedFace.value;
            pickedFace.value = null
            remainTimes.value -= 1
            resolve(payload)
          } else {
            activator()
            setTimeout(() => {
              inner()
            }, 20)
          }
        }
        inner()
      }
  )
}

const onPickFace = (face: Blob) => {
  pickedFace.value = face
  faceImg.value.src = URL.createObjectURL(face)
}
const display = useDisplay()
const width = computed(() => {
  return getWidthClass(display)
})
</script>

<template>
  <v-dialog
    v-model="showDialog"
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
      :class="width"
      :loading="collectState=='Collecting'"
      class="d-flex justify-center ma-2"
      style="align-self: center"
    >
      <v-card-text class="pa-2">
        <v-alert
          v-if="collectState=='Failure'"
          text="录入失败，请尝试重新录入"
          type="error"
        />
        <v-stepper
          ref="registerStep"
          :items="[`登记信息`,`录入人脸`]"
          elevation="0"
          hide-actions
        >
          <template #[`item.1`]>
            <v-card>
              <v-card-text>
                <v-text-field
                  v-model="userName"
                  label="Name"
                  prepend-icon="mdi mdi-card-account-details"
                  type="text"
                />
                <v-text-field
                  v-model="userId"
                  label="ID"
                  prepend-icon="mdi mdi-account"
                  type="number"
                />
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn
                  :disabled="!userInfoFilled"
                  variant="elevated"
                  @click="registerStep?.next()"
                >
                  Next
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <template #[`item.2`]>
            <face-dect
              v-if="modelReady"
              :face-detect="faceDetect!"
              :face-picker="onPickFace"
              :height="200"
              :width="300"
              class="elevation-0 ma-2"
            >
              <template #detect-activator="{activate}">
                <v-btn
                  v-if="collectState=='None' || collectState=='Collecting'"
                  :disabled="!modelReady"
                  variant="elevated"
                  @click="collectState='Collecting';activateFaceDetect(activate)"
                >
                  <template
                    v-if="onCollect"
                    #prepend
                  >
                    <v-progress-circular v-model="collectProgress" />
                  </template>
                  {{ onCollect ? `采集中 ${remainTimes >= 0 ? remainTimes : 0}/${collectNum}` : '开始采集' }}
                </v-btn>
                <v-btn
                  v-else
                  variant="elevated"
                  @click="showDialog = false"
                >
                  Done
                </v-btn>
              </template>
            </face-dect>
            <v-progress-circular
              v-else
              color="primary"
              indeterminate
            />
          </template>
        </v-stepper>

        <img
          ref="faceImg"
          :hidden="!onCollect"
          alt=""
          class="ma-2 rounded-sm"
          src=""
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>