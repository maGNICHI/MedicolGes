import { createContext, useReducer } from 'react'

export const UsersContext = createContext()

export const UsersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS': 
      return {
        users: action.payload,
        
      }
      case 'SET_Admins': 
      return {
        admins: action.payload,
        
      }
    // case 'CREATE_USERS':
    //   return {
    //     users: [action.payload,...state.users]
    //   }
    // case 'DELETE_USERS':
    //   return {
    //     users: state.users.filter((w) => w._id !== action.payload._id)
    //   }
      /*case 'UPDATE_USERS':
      return {
        users: state.users.map((user) => 
          user._id === action.payload._id ? action.payload : user
        )
      }*/
    default:
      return state
  }
}

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, {
    users: null
     
  })

  return (
    <UsersContext.Provider value={{...state, dispatch}}>
      { children }
    </UsersContext.Provider>
  )
}