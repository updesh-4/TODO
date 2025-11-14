import React from 'react'
import { useForm } from 'react-hook-form'
import API from '../api/client'
import { setTokenLocal } from '../stores/authStore'

export default function Signup(){
  const {register, handleSubmit} = useForm();
  const onSubmit = async (data:any)=>{
    const res = await API.post('/auth/signup', data);
    setTokenLocal(res.data.token);
    window.location.href = '/';
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>
      <input {...register('name')} placeholder='name' />
      <input {...register('email')} placeholder='email' />
      <input {...register('password')} placeholder='password' type='password' />
      <button>Sign up</button>
    </form>
  )
}
