import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput';
import { validEmail } from './../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async(e) =>{
    e.preventDefault();

    if(!validEmail(email)) {
      setError("Please Enter valid Email address.")
      return;
    }

    if(!password){
      setError("Please Enter Password.")
      return
    }
    setError('')
    setLoading(true)

    // Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email:email,
        password:password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        setError(null)
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError('Error while login, Please try again after sometime')
      }
      
    }finally {
      setLoading(false)
    }
  }

  


  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className=' text-2xl mb-7'>Login</h4>
            <input 
              type='text' 
              placeholder='Please Enter your Email' 
              className="input-box  p-3" 
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
              />
            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
            <button type='submit' className='btn-primary p-2'>
              Login
            </button>
            <p className='text-sm text-center mt-4'>
              Not Register yet? {""}
              <Link to="/signup" className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
    
  )
}

export default Login





