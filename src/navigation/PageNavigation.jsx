import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Gestures from "../pages/Gestures";
// import AnimationControls from "../pages/AnimationControls";
// import ViewBaseAnimation from "../pages/ViewBaseAnimation";
// import ScrollAnimation from "../pages/ScrollAnimation";
import { AuthLayout } from "../layouts/AuthLayout";
import { GuestLayout } from "../layouts/GuestLayout";
import RetracingSidebarExample from "../pages/RetracingSidebarExample";
import Login from "../pages/Login";

function PageNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route index element={<Login />} />
          <Route path="/Login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route index element={<RetracingSidebarExample />} />
          <Route path="/Dashboard" element={<RetracingSidebarExample />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Gestures />} /> */}
          {/* <Route path="/" element={<AnimationControls />} /> */}
          {/* <Route path="/" element={<ViewBaseAnimation />} /> */}
          {/* <Route path="/" element={<ScrollAnimation />} /> */}
          {/* <Route path="/" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default PageNavigation;
