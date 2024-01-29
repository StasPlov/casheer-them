export default interface StateInterface<T = any> {
    data: T | null
    dataIsLoading: boolean
}
