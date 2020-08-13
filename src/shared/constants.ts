import {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes'

export const MsgTitleErr = {
  [UNAUTHORIZED]: 'Unauthorized',
  [BAD_REQUEST]: 'Bad Request',
  [NOT_FOUND]: 'Not Found',
}

export const MsgErr = {
  [INTERNAL_SERVER_ERROR]: 'Something technical wrong, please try again later',
  [BAD_REQUEST]: 'Invalid form parameter',
  [NOT_FOUND]: 'Data not found',
}
