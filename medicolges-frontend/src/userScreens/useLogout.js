import { useAuthContext } from './useAuthContext'
import { useUsersContext } from './useUsersContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchUsers } = useUsersContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('userInfo')
    //localStorage.removeItem('admin')
    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchUsers({ type: 'SET_USERS', payload: null })
  }

  return { logout }
}