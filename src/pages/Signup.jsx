'use client'

import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SignUpPage() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Student',
    },
  })
  const [loading, setLoading] = useState(false)
  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // API call for signup
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      // Handle response
      console.log('Signup successful', response)
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignUp = (provider) => {
    // OAuth signup logic
    console.log(`Sign up with ${provider}`)
    window.location.href = `/api/auth/oauth/${provider}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Create Account</h1>
          <p className="text-center text-gray-600 mb-8">Join our community today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="your@email.com"
                  />
                )}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                  />
                )}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                  />
                )}
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Your Role</label>
              <div className="space-y-3">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className="flex items-center">
                        <input
                          {...field}
                          type="radio"
                          id="student"
                          value="Student"
                          className="radio radio-primary"
                        />
                        <label htmlFor="student" className="ml-3 text-gray-700 cursor-pointer">
                          Student
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          {...field}
                          type="radio"
                          id="clubs"
                          value="Clubs"
                          className="radio radio-primary"
                        />
                        <label htmlFor="clubs" className="ml-3 text-gray-700 cursor-pointer">
                          Clubs
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          {...field}
                          type="radio"
                          id="admin"
                          value="Admin"
                          className="radio radio-primary"
                        />
                        <label htmlFor="admin" className="ml-3 text-gray-700 cursor-pointer">
                          Admin
                        </label>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* OAuth Divider */}
          <div className="divider my-6">or</div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignUp('google')}
              className="btn btn-primary w-full"
            >
              Sign up with Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}