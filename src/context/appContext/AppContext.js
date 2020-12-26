import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
  selectedPatient: null,
  managementOpened: false,
  decisionOpened: false,
};

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
    // TODO: login logic
    // localStorage.setItem("jwtToken", userData.token);
    // dispatch({
    //   type: "LOGIN",
    //   payload: userData,
    // });
  }

  function logout() {
    // TODO: logout logic
    // localStorage.removeItem("jwtToken");
    // dispatch({ type: "LOGOUT" });
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
