import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Books from "./pages/books";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* This is where a router would be */}
        <Books />
      </main>
      <Footer />
    </>
  );
}

export default App;
