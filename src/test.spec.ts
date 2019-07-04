

import {connect} from './'
connect({
    ns: 'hello',
    state: {
        aa: null,
        bb: 124
    },
    act: {
        getAa(payload) {
            this.commit('set', 1111)

        }
    },
    mt: {
        setAa(payload) {
            // this.aa = payload
            this.aa = payload

        }
    }
}).act.getAa('hello')