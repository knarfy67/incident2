import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Gestures from "../pages/Gestures";
import AnimationControls from "../pages/AnimationControls";
import ViewBaseAnimation from "../pages/ViewBaseAnimation";
import ScrollAnimation from "../pages/ScrollAnimation";
import RetracingSidebarExample from "../pages/REtracingSidebarExample";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function PageNavigation() {
  const { login } = useContext(AuthContext);

  if (!login) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Gestures />} /> */}
          {/* <Route path="/" element={<AnimationControls />} /> */}
          {/* <Route path="/" element={<ViewBaseAnimation />} /> */}
          {/* <Route path="/" element={<ScrollAnimation />} /> */}
          {/* <Route path="/" element={<RetracingSidebarExample />} /> */}
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<RetracingSidebarExample />} />
          <Route path="/Dashboard" element={<RetracingSidebarExample />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Gestures />} /> */}
          {/* <Route path="/" element={<AnimationControls />} /> */}
          {/* <Route path="/" element={<ViewBaseAnimation />} /> */}
          {/* <Route path="/" element={<ScrollAnimation />} /> */}
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default PageNavigation;
