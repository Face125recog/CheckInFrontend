// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'

export default createVuetify({
        display: {
            mobileBreakpoint: "sm",
            thresholds: {
                xs: 0,
                sm: 400,
                md: 540,
                lg: 800,
                xl: 1280,
            }
        }
    }
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
