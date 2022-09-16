
import { useState } from "react";
import "./App.scss";
import Admin from "./components/admin/Admin";
import Navbar from "./components/nav/Navbar";

function App() {
  // state to toggle sidebar in admin
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div>
      <Navbar setToggleSidebar={setToggleSidebar} />
      <Admin
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default App;
