import Test from './Test.tsx'
import Contest from './Contest.tsx'
import User from './User.tsx'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Test />}/>
      <Route path="/contest/:id" element={<Contest />}/>
      <Route path="/user/:id" element={<User />}/>
    </Routes>
  </Router>)
}

export default App
