import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  selectedPatient: null,
  managementOpened: true,
  decisionOpened: true,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    // initialState.user = decodedToken;
  }
}

const AppContext = createContext({
  user: null,
  selectedPatient: null,
  managementOpened: false,
  decisionOpened: false,
  login: (userData) => {},
  logout: () => {},
  selectPatient: (selectedPatient) => {},
  toggleManagement: () => {},
  toggleDecision: () => {},
});

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SELECT_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload,
      };
    case "TOGGLE_MANAGEMENT":
      return {
        ...state,
        managementOpened: action.payload,
      };
    case "TOGGLE_DECISION":
      return {
        ...state,
        decisionOpened: action.payload,
      };
    default:
      return state;
  }
}

function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  function selectPatient(selectedPatient) {
    dispatch({
      type: "SELECT_PATIENT",
      payload: selectedPatient,
    });
  }

  function toggleManagement(set) {
    dispatch({
      type: "TOGGLE_MANAGEMENT",
      payload: set,
    });
  }

  function toggleDecision(set) {
    dispatch({
      type: "TOGGLE_DECISION",
      payload: set,
    });
  }

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        selectedPatient: state.selectedPatient,
        managementOpened: state.managementOpened,
        decisionOpened: state.decisionOpened,
        login,
        logout,
        selectPatient,
        toggleManagement,
        toggleDecision,
      }}
      {...props}
    />
  );
}

export { AppContext, AppProvider };
