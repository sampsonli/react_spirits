
interface Model<T>  {
    ns: string,
    state: any,
    actions: T,
    mutations: {
        [propName: string]: Commit
    },
}
type Actions = {
    [propName: string]: Action
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
declare function connect<T extends Actions>(model: Model<Actions>): T
export default function (store: any, asyncReducers?:any):any
