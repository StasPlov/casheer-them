import StateInterface from './StateInterface'

export default class State<T = any> implements StateInterface {
    data: T | null = null
    dataIsLoading: boolean = false
}
