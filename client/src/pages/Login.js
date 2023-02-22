import React from 'react'
import styled from 'styled-components'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Main = styled.main`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 60%;
  height: 60vh;
  display: flex;
  justify-content: center;
  margin: 50px auto;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  margin-right: 20px;
`;

const Login = () => {
  return (
    <Main>
      <div className="login-wrapper">
        <h3 className="login">Sign In to your account / Choose your sign in method</h3>
        <Input type="text" placeholder="Email"/>
        <Input type="text" placeholder="Password" />
        <AiOutlineEye/><AiOutlineEyeInvisible/>
        <p>Forgot password</p>
        <button>Sign In</button>
        
        <p> OR </p>
        <button><FcGoogle/>Continue with Google</button>
        <button><SiFacebook/>Continue with Facebook</button>

        <p> Dono't have an account? <b>Sign Up</b></p>
      </div>
    </Main>
  )
}

export default Login