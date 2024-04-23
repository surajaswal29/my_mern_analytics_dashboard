import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import DashboardRouting from "./pages/Routes"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route exact path="dashboard/*" element={<DashboardRouting />} />
      </Routes>
    </Router>
  )
}

export default App
