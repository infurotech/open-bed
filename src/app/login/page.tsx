'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/');
      } else {
        setErrorMessage(result.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Login Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-800">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <img src="/images/logo/open-bed.png" alt="Open Bed" className="h-16 w-16" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Open Bed
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access your healthcare management dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-white">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 fill-current text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3334 9.41667C18.3334 13.25 15.0834 16.5 11.25 16.5H8.75008C4.91675 16.5 1.66675 13.25 1.66675 9.41667V6.91667C1.66675 3.08333 4.91675 -0.166667 8.75008 -0.166667H11.25C15.0834 -0.166667 18.3334 3.08333 18.3334 6.91667V9.41667ZM11.25 1.66667H8.75008C5.83341 1.66667 3.33341 4.16667 3.33341 6.91667V9.41667C3.33341 12.1667 5.83341 14.6667 8.75008 14.6667H11.25C14.0834 14.6667 16.6667 12.1667 16.6667 9.41667V6.91667C16.6667 4.16667 14.0834 1.66667 11.25 1.66667ZM11.6667 6.91667C11.6667 6.5 11.3334 6.16667 10.9167 6.16667H9.08341C8.66675 6.16667 8.33341 6.5 8.33341 6.91667C8.33341 7.33333 8.66675 7.66667 9.08341 7.66667H10.9167C11.3334 7.66667 11.6667 7.33333 11.6667 6.91667ZM9.08341 9.41667C8.66675 9.41667 8.33341 9.75 8.33341 10.1667C8.33341 10.5833 8.66675 10.9167 9.08341 10.9167H10.9167C11.3334 10.9167 11.6667 10.5833 11.6667 10.1667C11.6667 9.75 11.3334 9.41667 10.9167 9.41667H9.08341Z"
                    fill=""
                  />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {!showPassword ? (
                    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.33341 10C3.33341 10 6.66675 15 10.0001 15C13.3334 15 16.6667 10 16.6667 10C16.6667 10 13.3334 5 10.0001 5C6.66675 5 3.33341 10 3.33341 10ZM10.0001 6.66667C11.8334 6.66667 13.3334 8.16667 13.3334 10C13.3334 11.8333 11.8334 13.3333 10.0001 13.3333C8.16675 13.3333 6.66675 11.8333 6.66675 10C6.66675 8.16667 8.16675 6.66667 10.0001 6.66667ZM10.0001 8.33333C9.08341 8.33333 8.33341 9.08333 8.33341 10C8.33341 10.9167 9.08341 11.6667 10.0001 11.6667C10.9167 11.6667 11.6667 10.9167 11.6667 10C11.6667 9.08333 10.9167 8.33333 10.0001 8.33333Z"
                        fill=""
                      />
                    </svg>
                  ) : (
                    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.33341 10C3.33341 10 6.66675 15 10.0001 15C13.3334 15 16.6667 10 16.6667 10C16.6667 10 13.3334 5 10.0001 5C6.66675 5 3.33341 10 3.33341 10ZM10.0001 6.66667C11.8334 6.66667 13.3334 8.16667 13.3334 10C13.3334 11.8333 11.8334 13.3333 10.0001 13.3333C8.16675 13.3333 6.66675 11.8333 6.66675 10C6.66675 8.16667 8.16675 6.66667 10.0001 6.66667ZM10.0001 8.33333C9.08341 8.33333 8.33341 9.08333 8.33341 10C8.33341 10.9167 9.08341 11.6667 10.0001 11.6667C10.9167 11.6667 11.6667 10.9167 11.6667 10C11.6667 9.08333 10.9167 8.33333 10.0001 8.33333Z"
                        fill=""
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600 dark:bg-red-500/10 dark:text-red-500">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {!isLoading ? (
                'Sign In'
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              )}
            </button>
          </form>

          {/* Demo Users Info */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Demo Users:</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Hospital Admin: hospital-admin@openbed.com</div>
              <div>Rehab Admin: rehab-admin@openbed.com</div>
              <div>Password: admin123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 