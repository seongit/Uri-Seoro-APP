/* eslint-disable */
import Vue from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCheck,faTrash,faGear,faPlusCircle,faEllipsis,faPen} from '@fortawesome/free-solid-svg-icons'
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
// import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faCheck,faTrash,faPlusCircle,faGear,faEllipsis,faPen)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)