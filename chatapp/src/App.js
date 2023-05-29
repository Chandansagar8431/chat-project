import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { useState } from "react";
import Homepage from "./scenes/Homepage/Homepage";
import Navbar from "./scenes/Navbar/Navbar";
import Profilepage from "./scenes/Profilepage/Profilepage";
import Loginpage from "./scenes/Loginpage/Loginpage";
import { Themesettings } from "./theme";
function App() {
  const [mode, setmode] = useState("dark");
  const handlemode = () => {
    setmode(mode === "dark" ? "light" : "dark");
  };

  const theme = useMemo(() => createTheme(Themesettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar mode={mode} handlemode={handlemode} />
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile/:userid" element={<Profilepage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
