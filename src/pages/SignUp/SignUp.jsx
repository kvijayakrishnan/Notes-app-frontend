import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

function Signup() {
  const [name, setName] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [error, setError]=useState(null);
  const navigate = useNavigate()

  const handleSignup = async(e) =>{
    e.preventDefault();

    if(!name){
      setError("Please Enter the name");
      return;
    } 
    if(!validEmail(email)){
      setError("Plese enter valid email address");
      return;
    }
    if(!password){
      setError("Please Enter your password");
      return;
    }
    
    setError('')

    // Signup API call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName:name,
        email:email,
        password:password
      })
      
      if(response.data){
        // localStorage.setItem("Token", response.data.accessToken)
        setError(null)
        navigate("/login")
      }

      
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }


      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error, please try again.")
      }
    }





  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignup}>
            <h4 className='text-2xl mb-7'>SignUp</h4>
            <input 
              type='text'
              placeholder='Please Enter Name'
              className='input-box p-3'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input 
              type='text'
              placeholder='Please Enter Email'
              className='input-box p-3'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <PasswordInput 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
            <button type='submit' className='btn-primary p-2'>
              SignUp
            </button>
            <p className='text-sm text-center mt-4'>
              Already Have an Account {""}
              <Link to="/login" className='font-medium text-primary underline'>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Signup