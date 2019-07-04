

import {connect} from './'
const tmp = connect({
    ns: 'hello',
    state: {
        aa: null,
        bb: 124,
        cc: 333
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
            this.bb =444

        }
    }
});
tmp.act.getAa({})
