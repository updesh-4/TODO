import React from 'react'
import { useForm } from 'react-hook-form'
import API from '../api/client'

export default function ResetPassword(){
  const {register, handleSubmit} = useForm();
  const onSubmit = async (data:any)=>{
    await API.post('/auth/reset', data);
    alert('Password reset');
    window.location.href = '/login';
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset password</h2>
      <input {...register('token')} placeholder='reset token' />
      <input {...register('password')} placeholder='new password' />
      <button>Reset</button>
    </form>
  )
}
