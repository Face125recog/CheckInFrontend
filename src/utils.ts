import {Ref} from "vue";

export function getWidthClass({xlAndUp, mdAndDown, smAndDown, mdAndUp, lgAndUp}: {
    xlAndUp: Ref<boolean>,
    mdAndDown: Ref<boolean>,
    smAndDown: Ref<boolean>,
    mdAndUp: Ref<boolean>,
    lgAndUp: Ref<boolean>
}): string {

    if (xlAndUp.value) {
        return "w-25"
    } else if (smAndDown.value) {
        return "w-100"
    } else if (mdAndDown.value) {
        return "w-75"
    } else if (lgAndUp.value) {
        return "w-50"
    } else if (mdAndUp.value) {
        return "w-33"
    } else return "w-50"
}