import "./types/main.d";

import spirits, {connect} from "./main";

spirits({})
const action = connect({
    ns: 'hello',
    state: {},
    actions: {
        getAa() {

        },
        aa: 'hello'

    },
    mutations: {}
})
console.log(action.getAa)


