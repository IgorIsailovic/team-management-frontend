import "./styles/App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  //onst url = "http://192.168.0.22:8088";
  const url = "http://10.17.48.57:8088";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn url={url} />}></Route>
        <Route path="/signin" element={<SignIn url={url} />}></Route>
        <Route path="/signup" element={<SignUp url={url} />}></Route>
        <Route path="/mainPage" element={<MainPage url={url} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
