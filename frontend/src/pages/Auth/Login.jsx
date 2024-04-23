import { Link, useNavigate } from "react-router-dom"
// src/Login.js
import { useContext, useEffect, useState } from "react"
// import { loginUser } from "../../Hooks/useAuthHandler"
// import { useSnackbar } from "notistack"
import { MdCheckBox, MdCheckBoxOutlineBlank, MdLock, MdOutlineMail } from "react-icons/md"
import { UserContext } from "../../context/userContext"

const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  // const { enqueueSnackbar } = useSnackbar()
  // routing
  const navigate = useNavigate()

  const handleLogin = (e) => {
    setLoading(true)
    e.preventDefault()
    //console.log("Email:", email, "Password:", password)

    if (email === "admin@gmail.com" && password === "admin123") {
      dispatch({
        type: "SET_USER",
        payload: {
          isAuth: true,
          user: {
            name: "User Demo",
            email: "admin@gmail.com",
            role: "Admin"
          }
        }
      })
      setEmail("")
      setPassword("")
      localStorage.setItem("isAuth_dash", true)
      setLoading(false)
      navigate("/dashboard")
    } else {
      setLoading(false)
      setEmail("")
      setPassword("")
      alert("Invalid Email or Password")
    }
  }

  useEffect(() => {
    if (state.isAuth === true) {
      navigate("/dashboard")
    }
  }, [navigate, state.isAuth])

  return (
    <div className="h-screen flex items-center justify-center  bg_image p-6">
      <div className="bg-white border text-white border-gray-400 p-8 rounded-lg w-[450px] backdrop-blur-md bg-opacity-20 shadow-lg">
        <div className="w-full flex justify-center mb-4">
          <img src="/logo.png" alt="Dukkandaar Logo" className="w-[100px] h-auto" />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-100 mb-6">Login to My Dashboard</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="flex items-center gap-1 text-sm font-medium">
              <MdOutlineMail size={16} />
              Email
            </label>
            <input id="email" name="email" type="email" value={email} defaultValue={"admin@gmail.com"} autoComplete="email" required className="bg-inherit mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-300" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="flex items-center gap-1 text-sm font-medium">
              <MdLock size={16} />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              required
              className="bg-inherit mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between mt-2">
            <Link onClick={() => setIsCheck(!isCheck)} className="flex items-center justify-between gap-1 text-xs">
              {isCheck ? <MdCheckBox size={18} className="text-green-400" /> : <MdCheckBoxOutlineBlank size={18} />}
              Remember me
            </Link>
            <Link to={"/"} className="text-xs">
              Forgot password?
            </Link>
          </div>
          <div className="w-full">
            <button type="submit" className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-100 focus:outline-none">
              Login
            </button>
          </div>
          <div className="w-full flex justify-center mt-2 gap-1">
            <Link to={"/"} className="text-xs">
              Don&apos;t have an account?
            </Link>
            <Link to={"/register"} className="text-xs text-blue-200">
              Register
            </Link>
          </div>

          <div className="w-full text-sm text-red-200">
            <p>Test Credentials:</p>
            <p>Email: admin@gmail.com</p>
            <p>Password: admin123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
