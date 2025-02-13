export const initialState = {
    userId: null,
    name: "",
    email: "",
    token: null,
  };
  
  export const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER": // Handle both login and register
        return {
          ...state,
          userId: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
        };
        
      case "LOGOUT":
        return initialState;
  
      default:
        return state;
    }
  };
  