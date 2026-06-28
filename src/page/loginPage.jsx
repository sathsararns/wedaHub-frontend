import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom'  
import { Hand } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import toast, { Toaster } from 'react-hot-toast'  // Import Toaster
import axios from 'axios'
import api from '../Utils/api'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

    async function handleLogin() {
      setLoading(true)
       try {
        const res = await api.post("/users/login", {
          email: email,
          password: password
        })
      
        localStorage.setItem("token", res.data.token)
        toast.success("Login successful")

        if (res.data.isAdmin) {
          navigate("/admin")
        } else {
          window.location.href = "/"
        }
      } catch (error) {  // 'error' is the parameter name
        toast.error(error?.response?.data?.message || "Login failed")
        setLoading(false)  // Move this inside catch block
      }
      setLoading(false)  // Remove this line from here
  }

  return (
    <>
      {/* Add Toaster component - this is what actually displays the toast */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4F46E5',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5FB] relative overflow-hidden font-sans">
        {/* Decorative background line */}
        <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 opacity-50"></div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[440px] p-8 sm:p-10 relative z-10 mx-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center">
              <Hand className="w-7 h-7 text-indigo-600 transform -rotate-12" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">
            Login
          </h1>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g. howard.thurman@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                required
                onChange={(e)=>{
                  setEmail(e.target.value)
                  
                }}
                value={email}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900"
                required
                onChange={(e)=>{
                  setPassword(e.target.value)
                  
                }}                       
                type="password"
                value={password}
              />
              <p className="text-sm text-gray-500 mt-2">
                Forgot your password?{' '}
                <a
                  href="#"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors"
                >
                  Click here
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  )
}



