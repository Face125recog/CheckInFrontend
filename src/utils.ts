import {Ref} from "vue";

export function getWidthClass({xlAndUp, mdAndDown, smAndDown, mdAndUp}: {
    xlAndUp: Ref<boolean>, mdAndDown: Ref<boolean>, smAndDown: Ref<boolean>, mdAndUp: Ref<boolean>
}): string {

    if (xlAndUp.value) {
        return "w-25"
    } else if (mdAndUp.value) {
        return "w-33"
    } else if (smAndDown.value) {
        return "w-100"
    } else if (mdAndDown.value) {
        return "w-66"
    } else return "w-50"
}