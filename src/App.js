import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import CoinDetailPage from "./Pages/CoinDetailPage";
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
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coin/:id" element={<CoinDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
