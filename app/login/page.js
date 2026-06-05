"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="hero-mesh dot-grid min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="glass-card p-8">

          {/* Logo + heading */}
          <div className="text-center mb-8">
            <div className="avatar w-14 h-14 text-xl mx-auto mb-4" style={{background:'linear-gradient(135deg,#6366f1,#a78bfa)'}}>C</div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p style={{color:'var(--color-text-muted)',fontSize:'0.9rem',marginTop:'0.4rem'}}>Sign in to continue to FundFlow</p>
          </div>

          {/* GitHub */}
<button
  onClick={() => signIn("github")}
  className="w-full flex items-center justify-center gap-3 py-3 px-5 font-semibold text-white transition-all mb-3"
  style={{
    background:'#161b22',
    border:'1px solid rgba(255,255,255,0.14)',
    borderRadius:'var(--radius-md)',
    cursor:'pointer',
    fontSize:'0.95rem',
  }}
>
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
  Continue with GitHub
</button>

{/* Google */}
<button
  onClick={() => signIn("google")}
  className="w-full flex items-center justify-center gap-3 py-3 px-5 font-semibold transition-all"
  style={{
    background:'#ffffff',
    color:'#111827',
    border:'1px solid rgba(255,255,255,0.14)',
    borderRadius:'var(--radius-md)',
    cursor:'pointer',
    fontSize:'0.95rem',
  }}
>
  <svg className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.62l6.89-6.89C35.95 2.37 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.01 6.22C12.4 13.51 17.71 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.4-4.55H24v9.09h12.94c-.56 3-2.25 5.54-4.8 7.24l7.36 5.72C43.84 38.04 46.98 31.84 46.98 24.55z"/>
    <path fill="#FBBC05" d="M10.57 28.44A14.47 14.47 0 019.5 24c0-1.54.37-2.99 1.07-4.44l-8.01-6.22A23.94 23.94 0 000 24c0 3.87.93 7.53 2.56 10.66l8.01-6.22z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.36-5.72c-2.04 1.37-4.66 2.17-8.53 2.17-6.29 0-11.6-4.01-13.43-9.94l-8.01 6.22C6.51 42.62 14.62 48 24 48z"/>
  </svg>
  Continue with Google
</button>
        </div>

        <p style={{color:'var(--color-text-faint)',fontSize:'0.8rem',textAlign:'center',marginTop:'1.5rem'}}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Login
