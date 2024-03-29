import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Assuming the action.payload contains the user object with a role property
      if (!action.payload.blocked) {
        return { user: action.payload };
      } else {
        // Optionally, handle the case for 'Professional' users differently
        console.log('Login attempts by user with the role of Professional  or Initiator that are unverified will be put on hold until an administrator verifies them..');
        return state; // Return the current state without changes
      }
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
  //  const admin = JSON.parse(localStorage.getItem('admin'))

    if (user && !user.blocked) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
    // if (admin) {
    //   dispatch({ type: 'LOGIN', payload: admin }) 
    // }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}