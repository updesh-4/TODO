import React from 'react'
import { useForm } from 'react-hook-form'
import API from '../api/client'

export default function ForgotPassword(){
  const {register, handleSubmit} = useForm();
  const onSubmit = async (data:any)=>{
    const res = await API.post('/auth/forgot', data);
    alert('If account exists, reset token created. Token (for testing): ' + res.data.resetToken);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot password</h2>
      <input {...register('email')} placeholder='email' />
      <button>Send Reset</button>
    </form>
  )
}
