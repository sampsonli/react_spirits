

import {connect} from './'
const tmp = connect({
    ns: 'hello',
    state: {
        aa: null,
        bb: 124,
        cc: 333
    },
    act: {
        getAa(payload, context) {
            this.commit('set', 1111)
            this.commit('hello world', 333)


        }
    },
    mt: {
        setAa(payload) {
            // this.aa = payload
            this.bb = payload
            this.cc = 1;


        }
    }
});
tmp.act.getAa({})
