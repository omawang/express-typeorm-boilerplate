export interface IErrorResponse {
  statusCode: number
  body: {
    success: boolean
    messageTitle: string
    message: string
    errors: any
  }
}
