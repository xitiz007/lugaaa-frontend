import {
  NOTIFY,
  AUTH,
  ADD_CART,
  ORDERS,
  USERS,
  CATEGORIES,
  POPUP,
} from "./constants";

const reducers = (state, action) => {
    if(action.type === NOTIFY)
    {
        return {
            ...state,
            notify: action.payload
        }
    }
    else if(action.type === AUTH)
    {
        return {
            ...state,
            auth: action.payload
        }
    }
    else if(action.type === ADD_CART)
    {
        return {
            ...state,
            cart: action.payload
        }
    }
    else if (action.type === ORDERS) 
    {
        return {
            ...state,
            orders: action.payload
        }
    }
    else if (action.type === USERS) 
    {
        return {
            ...state,
            users: action.payload
        }
    }
    else if (action.type === CATEGORIES) {
        return{
            ...state,
            categories: action.payload
        }
    }
    else if(action.type === POPUP)
    {
        return {
          ...state,
          popupShown: true,
        };
    }
    return state;
}

export default reducers;