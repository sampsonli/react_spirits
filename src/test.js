let obj = {name: 'lichun', age: 22}
Object.getPrototypeOf(obj)[Symbol.iterator] = function () {
    const keys = Object.keys(this);
    let index = 0;
    return {
        next: () => {
            if (index < keys.length) {
                return {
                    value: this[keys[index++]],
                    done: false
                };
            } else {
                return {value: undefined, done: true};
            }
        }
    };
}


function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
function *gen() {
    let a = yield wait(1000);
    console.log('hello:' + a)
    let b = yield wait(2000)
    console.log('world:' + b)
    let c = yield wait(3000)
    return c;
}
let t = gen();
let i = 0;
function exe() {
    let p = t.next(i++)
    if(!p.done) {
        p.value.then(() => {
            exe()
        })
    }
}
exe()


