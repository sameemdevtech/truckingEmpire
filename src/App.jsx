import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Home from "./pages/home";
import { CssBaseline } from "@mui/material";

import { theme } from "./theme";

function App ()
{
  return (
    <>
      <ThemeProvider theme={ theme }>
        <CssBaseline enableColorScheme={ true } />
          <Home />
      </ThemeProvider>
    </>
  );
}

export default App;