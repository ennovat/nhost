import { useSelector, useActor } from '@xstate/react'
import { useContext } from 'react'

import { NhostContext } from './provider'

export const useAuthService = () => {
  const globalServices = useContext(NhostContext)
  return globalServices.authService
}

export const useNhostbackendUrl = () => {
  const globalServices = useContext(NhostContext)
  return globalServices.backendUrl
}

export const useAuthActor = () => {
  const service = useAuthService()
  return useActor(service)
}

export const useLoading = () => {
  const service = useAuthService()
  // TODO review: add xstate 'tags' ?
  return useSelector(service, (state) =>
    state.matches({
      authentication: 'signedOut',
      tokenRefresher: 'refreshing'
    })
  )
}

export const useAuthenticated = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.matches({ authentication: 'signedIn' }))
}

export const useNhostAuth = () => {
  const [state] = useAuthActor()
  // TODO review: add xstate 'tags' ?
  const isLoading = !state.matches({
    authentication: 'signedOut',
    tokenRefresher: 'refreshing'
  })
  const isAuthenticated = state.matches({ authentication: 'signedIn' })

  return { isLoading, isAuthenticated }
}

export const useAccessToken = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.accessToken)
}

export const useSignUpEmailPassword = (email: string, password: string) => {
  const service = useAuthService()
  return () =>
    service.send({
      type: 'REGISTER',
      email,
      password
    })
}

export const useChangeEmail = (email: string) => {
  const service = useAuthService()
  return () =>
    service.send({
      type: 'CHANGE_EMAIL',
      email
    })
}

export const useChangePassword = (password: string) => {
  const service = useAuthService()
  return () =>
    service.send({
      type: 'CHANGE_PASSWORD',
      password
    })
}

export const useSignOut = (all = false) => {
  const service = useAuthService()
  return () => service.send({ type: 'SIGNOUT', all })
}

export const useEmailPasswordSignIn = (email: string, password: string) => {
  const service = useAuthService()
  return () =>
    service.send({
      type: 'SIGNIN_PASSWORD',
      email,
      password
    })
}

export const useEmailPasswordlessSignIn = (email: string) => {
  const service = useAuthService()
  return () =>
    service.send({
      type: 'SIGNIN_PASSWORDLESS_EMAIL',
      email
    })
}

export const useRefreshToken = (): [string | null, (v: string) => void] => {
  const service = useAuthService()
  const value = useSelector(service, (state) => state.context.accessToken)
  const setValue = (token: string) => {
    service.send({ type: 'LOAD_TOKEN', data: { refreshToken: token } })
  }
  return [value, setValue]
}

export const useUserData = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user)
}

export const useAvatarUrl = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.avatarUrl)
}

export const useDefaultRole = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.defaultRole)
}

export const useDisplayName = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.displayName)
}

export const useEmail = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.email)
}

export const useUserId = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.id)
}

export const useIsAnonymous = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.isAnonymous)
}

export const useUserLocale = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.locale)
}

export const useUserRoles = () => {
  const service = useAuthService()
  return useSelector(service, (state) => state.context.user?.roles)
}
