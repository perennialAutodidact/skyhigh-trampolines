import { useState } from "react";
import "./App.scss";
import Admin from "./components/admin/Admin";
import Navbar from "./components/nav/Navbar";
import Homepage from "./components/customer/Homepage";

function App() {
  // state to toggle sidebar in admin
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div>
      <Navbar setToggleSidebar={setToggleSidebar} />
      {/* <Admin
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      /> */}
      <Homepage />
    </div>
  );
}

export default App;
