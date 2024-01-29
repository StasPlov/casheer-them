import StateInterface from './StateInterface'

export default class State implements StateInterface {
    data = null
    dataListIsLoading: boolean = false
}
