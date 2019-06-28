
interface Model<T>  {
    ns: string,
    state: any,
    actions: T,
    mutations: {
        [propName: string]: Commit
    },
}
type Actions<T> = {
    [propName in keyof T]: Action
}
interface Commit {
    (state: any, payload: any): any
}
type Context = {
    commit: Commit,
    dispatch: any,
    state: object,
    rootState: object
}
interface Action {
    (payload: any, context?: Context): any
}
export function connect<T extends Actions<T>>(model: Model<T>): T
export default function (store: any, asyncReducers?:any):any
