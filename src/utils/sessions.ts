/* eslint-disable no-param-reassign */

import { AxiosInstance } from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import {
  AUTHORIZATION_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  AUTHORIZATION_COOKIE_MAX_AGE,
  REFRESH_COOKIE_MAX_AGE,
  DEFAULT_TOKEN_TYPE,
} from 'constants/auth'
import { getUnobfuscatedToken, getObfuscatedToken } from 'utils/crypt'

import { NookiesNextContext } from 'types/ssr'

export const getAuthTokenOrUndefined = (context?: NookiesNextContext) => {
  const { [AUTHORIZATION_COOKIE_NAME]: obfuscatedToken } = parseCookies(context)
  const unobfuscatedToken = getUnobfuscatedToken(obfuscatedToken)

  return unobfuscatedToken
}

export const getRefreshTokenOrUndefined = (context?: NookiesNextContext) => {
  const { [REFRESH_COOKIE_NAME]: obfuscatedToken } = parseCookies(context)
  const unobfuscatedToken = getUnobfuscatedToken(obfuscatedToken)

  return unobfuscatedToken
}

export const writeSessionCookie = (cookieValue: string) => {
  setCookie(undefined, AUTHORIZATION_COOKIE_NAME, getObfuscatedToken(cookieValue), {
    maxAge: AUTHORIZATION_COOKIE_MAX_AGE,
  })
}

export const writeRefreshCookie = (cookieValue: string) => {
  setCookie(undefined, REFRESH_COOKIE_NAME, getObfuscatedToken(cookieValue), {
    maxAge: REFRESH_COOKIE_MAX_AGE,
  })
}

export const assignAuthorizationHeaderValue = (
  instance: AxiosInstance,
  value: string
) => {
  instance.defaults.headers.common.Authorization = `${DEFAULT_TOKEN_TYPE} ${value}`
}

export const clearAuthorizationHeaderValue = (instance: AxiosInstance) => {
  delete instance.defaults.headers.common.Authorization
}

export const clearCurrentSessionCookie = () => {
  destroyCookie(undefined, AUTHORIZATION_COOKIE_NAME)
}

export const clearCurrentRefreshCookie = () => {
  destroyCookie(undefined, REFRESH_COOKIE_NAME)
}
