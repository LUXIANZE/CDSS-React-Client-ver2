import { ThemeProvider } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Routes from "./Routes";
import { AppProvider } from "./context";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <AppProvider>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </AppProvider>
  );
}

export default App;
