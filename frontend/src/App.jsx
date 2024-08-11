import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Vents from "./pages/Vents";
import Home from "./pages/Home";
import MyVents from "./pages/MyVents";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateVent";
import EditVent from "./pages/EditVent";
import UpdateProfile from "./pages/UpdateProfile";
import SingleVent from "./pages/SingleVent"


function App() {  
  return (
    <Router>
        <Routes>
          <Route path="/vents" element={<Vents  />}/>
          <Route path="/" element={<Home  />}/>
          <Route path="/createblog" element={<CreateBlog />}/>
          <Route path="/singlepost/:id" element={<SingleVent />}/>
          <Route path="/editblog/:id" element={<EditVent />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updateprofile" element={<UpdateProfile />}/>
          <Route path="/myvents" element={<MyVents />} />
        </Routes>
    </Router>
  );
}

export default App;
