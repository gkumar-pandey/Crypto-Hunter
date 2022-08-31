import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    background: {
      default: "#14161a",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});
console.log(theme);
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coin:id" element={<CoinPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
