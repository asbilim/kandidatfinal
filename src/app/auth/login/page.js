"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from "react-cookie"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Main() {
  // Step 1: Initialize react-hook-form
  const { handleSubmit, register, errors,watch } = useForm();
  const router = useRouter()

  // Step 2: Create a function to handle form submission
  const onSubmit = async (data) => {
      const backenHost = process.env.NEXT_PUBLIC_BACKEND_URL
      console.log(data)
      const username = data.username
      const password = data.password
      const finalData = {'username': username, 'password': password}
      const cookie = new Cookies()
      try {
       
        const response = await axios.post(backenHost+'/auth/jwt/create', finalData);
        console.log('Form submitted successfully!', response.data);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        const cookieOptionsForDomain = { expires: expirationDate, path: '/'}
    
        cookie.set('auth',response.data.access,cookieOptionsForDomain)
        toast.success('login successful')
        router.replace('/')
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('error during the login of the user')

      }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="hero min-h-screen max-w-4xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className='text-base-content font-semibold text-center'>Login</h2>
              {/* Step 4: Add the form element and attach the onSubmit handler */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">username</span>
                  </label>
                  {/* Step 5: Add the ref and validation rules to the input */}
                  <input
                    type="text"
                    name="username" // Set the name to match the key in the form data
                    placeholder="username"
                    className={`input input-bordered text-slate-600 ${errors?.username ? 'input-error' : ''}`}
                    {...register('username',{ required: 'username is required' })}
                  />
                  {/* Step 6: Show error message if validation fails */}
                  {errors?.username && <span className="text-xs text-error">{errors?.username.message}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  {/* Repeat Step 5 and Step 6 for other input fields */}
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className={`input input-bordered text-slate-600 ${errors?.password ? 'input-error' : ''}`}
                    {...register('password',{ required: 'Password is required' })}
                  />
              
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  {/* Step 7: Add the submit button */}
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <h2 className='text-base-content my-4'>don't have an account? <Link className='underline' href="/auth/register/">Register</Link></h2>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
}
