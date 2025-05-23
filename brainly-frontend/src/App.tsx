import { Dashboard } from "./pages/dashboard" 
import { BrowserRouter,Route, Routes} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import {SharedContent} from "./pages/SharedContent"


function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/share/:shareLink" element={<SharedContent/>}/>
    </Routes>
  </BrowserRouter>
}

export default App