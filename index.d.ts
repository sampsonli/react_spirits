
interface Model  {
    ns: string,
    state: any,
    actions: {
        [propName: string]: Action
    },
    mutations: {
        [propName: string]: Commit
    },
}
interface Commit {
    (state: any, payload: any): any
}
type Context = {
    commit: Commit,
    dispatch: any,
}
interface Action {
    (payload: any, context?: Context): any
}
interface Method {
    (payload: any, test: any): any
}
interface Methods {
    [propName: string]: Method
}
interface Connect {
    (model: Model): Methods
}
export declare const connect: Connect;
export default interface Spirits {
    (store: any, asyncReducers?:any): Methods
}
