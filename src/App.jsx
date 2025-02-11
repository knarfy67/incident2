import React from "react";
import PageNavigation from "./navigation/PageNavigation";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <PageNavigation />
    </AuthContextProvider>
  );
}

export default App;
