
function globalReducer(state, action) {
    switch (action.type) {
      case "setToken": {
        localStorage.setItem("token", action.data); // store token in local storage
        return {
          ...state,
          token: action.data,
        };
      }
      case "setLoggedInUserName": {
        localStorage.setItem("username", action.data || ''); // store username in local storage
        return {
          ...state,
          loggedInUserName: action.data,
        };
      }
        case "setUserRole": {
          localStorage.setItem("userRole", action.data || ''); // store user role in local storage
          return {
            ...state,
            userRole: action.data,
          };
        }
      default:
        return state;
    }
}

export default globalReducer