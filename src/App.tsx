import React from "react";
import "./style.scss";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import User from "./components/User/User";

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <section>
        <SideBar />
        <User />
      </section>
    </div>
  );
};

export default App;
