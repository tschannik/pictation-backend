export enum ErrorCodes {
  API_NOT_AVAILABLE = 'API_NOT_AVAILABLE',

  /* Request Payload */
  INVALID_PAYLOAD = 'INVALID_PAYLOAD',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  MISSING_ID = 'MISSING_ID',
  MISSING_PARAMETER = 'MISSING_PARAMETER',

  /* Authorization */
  MISSING_AUTHORIZATION = 'MISSING_AUTHORIZATION',
  FORBIDDEN_ORIGIN = 'FORBIDDEN_ORIGIN',
  UNAUTHORIZED = 'UNAUTHORIZED',

  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
}
