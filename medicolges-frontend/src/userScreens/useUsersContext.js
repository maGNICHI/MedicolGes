import { UsersContext } from './UserContext'
import { useContext } from 'react'

export const useUsersContext = () => {
  const context = useContext(UsersContext)

  if (!context) {
    throw Error('useUsersContext must be used inside an UsersContextProvider')
  }

  return context
}