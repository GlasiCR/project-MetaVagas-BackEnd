class DefaultError{
    static messageError(message: string, status: number){
        return {
            error: true,
            message,
            status
        }
    }
  }
  export { DefaultError }