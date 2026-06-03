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
            <p style={{color:'var(--color-text-muted)',fontSize:'0.9rem',marginTop:'0.4rem'}}>Sign in to continue to CreatorHub</p>
          </div>

          {/* GitHub — only working provider */}
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 py-3 px-5 font-semibold text-white transition-all"
            style={{
              background:'#161b22',
              border:'1px solid rgba(255,255,255,0.14)',
              borderRadius:'var(--radius-md)',
              cursor:'pointer',
              fontSize:'0.95rem',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#21262d'}
            onMouseLeave={e => e.currentTarget.style.background='#161b22'}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <div className="flex items-center gap-4 my-5">
            <div style={{flex:1,height:'1px',background:'var(--color-border)'}}></div>
            <span style={{color:'var(--color-text-faint)',fontSize:'0.8rem'}}>more providers coming soon</span>
            <div style={{flex:1,height:'1px',background:'var(--color-border)'}}></div>
          </div>

          {/* Placeholder disabled providers */}
          {[
            { label: 'Continue with Google', icon: <svg className="h-5 w-5" viewBox="0 0 48 48"><g><path d="M9.83 24c0-1.52.25-2.98.7-4.36L2.6 13.6A23.93 23.93 0 000 24c0 3.74.87 7.26 2.62 10.39l7.9-6.03A14.17 14.17 0 019.83 24z" fill="#FBBC05"/><path d="M23.71 10.13c3.31 0 6.3 1.17 8.65 3.09L39.2 6.4C35.04 2.77 29.7.53 23.71.53c-9.29 0-17.27 5.31-21.1 13.07l7.9 6.04c1.82-5.53 7.02-9.51 13.2-9.51z" fill="#EA4335"/><path d="M23.71 37.87c-6.17 0-11.37-3.97-13.19-9.51l-7.9 6.04C6.44 42.16 14.43 47.47 23.71 47.47c5.73 0 11.2-2.03 15.31-5.85l-7.51-5.8c-2.12 1.34-4.78 2.05-7.8 2.05z" fill="#34A853"/><path d="M46.15 24c0-1.39-.21-2.88-.54-4.27H23.71v9.07h12.6c-.69 3.09-2.4 5.47-4.82 7.06l7.51 5.8C43.34 37.61 46.15 31.65 46.15 24z" fill="#4285F4"/></g></svg> },
            { label: 'Continue with Twitter', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { label: 'Continue with Facebook', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
          ].map((p) => (
            <button
              key={p.label}
              disabled
              className="w-full flex items-center justify-center gap-3 py-3 px-5 mb-3 font-medium transition-all"
              style={{
                background:'rgba(255,255,255,0.02)',
                border:'1px solid var(--color-border)',
                borderRadius:'var(--radius-md)',
                cursor:'not-allowed',
                opacity:0.45,
                fontSize:'0.9rem',
                color:'var(--color-text-muted)',
              }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}

        </div>

        <p style={{color:'var(--color-text-faint)',fontSize:'0.8rem',textAlign:'center',marginTop:'1.5rem'}}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Login
