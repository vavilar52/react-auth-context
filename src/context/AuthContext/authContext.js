import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getToken } from "../../api/auth";
import { useLocalStorage } from "../../hooks";

const LOADING = "LOADING";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  loading: false,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case SIGN_IN:
      return {
        ...state,
        token: action.payload.token,
      };
    case SIGN_OUT:
      return { ...initialState };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [persistedState, setPersistedState] =
    useLocalStorage("auth_persistance");
  const contextValue = useReducer(
    reducer,
    persistedState ? persistedState : initialState
  );

  useEffect(() => {
    const [state] = contextValue;
    setPersistedState(state);
  }, [contextValue, setPersistedState]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [state, dispatch] = useContext(AuthContext);

  const signIn = useCallback(async () => {
    dispatch({ payload: true, type: LOADING });
    try {
      const token = await getToken();
      dispatch({
        payload: { token },
        type: SIGN_IN,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ payload: false, type: LOADING });
    }
  }, [dispatch]);

  const signOut = useCallback(() => {
    dispatch({ type: SIGN_OUT });
  }, [dispatch]);

  const api = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut]
  );

  return [state, api];
};
