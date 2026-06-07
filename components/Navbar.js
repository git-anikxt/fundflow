"use client"

import React, { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Menu, X, LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react"
import Image from "next/image"

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
   <nav
  className="sticky top-0 z-50"
  style={{
    background: scrolled
      ? 'rgba(5,7,20,0.98)'
      : 'rgba(5,7,20,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    boxShadow: scrolled
      ? '0 4px 30px rgba(0,0,0,0.25)'
      : 'none',
    transition: 'all 0.3s ease',
  }}
>
      <div className="container-custom">
        <div className="h-16 flex items-center justify-between">

        
<Link
  href="/"
  style={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  }}
>
  <Image
    src="/logo.png"
    alt="FundFlow"
    width={170}
    height={45}
    priority
    style={{
      width: "170px",
      height: "auto",
      objectFit: "contain",
    }}
  />
</Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[['/', 'Home'], ['/about', 'About'], ['/dashboard', 'Dashboard'],['/creators', 'Creators']].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding:'0.45rem 0.875rem',
                  borderRadius:'var(--radius-sm)',
                  color:'var(--color-text-muted)',
                  fontWeight:500,
                  fontSize:'0.9rem',
                  textDecoration:'none',
                  transition:'color 0.18s, background 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--color-text)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--color-text-muted)'; e.currentTarget.style.background='transparent'; }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {!session && (
              <Link href="/login" className="btn-primary" style={{padding:'0.5rem 1.25rem',fontSize:'0.875rem'}}>
                Sign In
              </Link>
            )}

            {session && (
              <div style={{position:'relative'}}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'0.6rem',
                    padding:'0.4rem 0.75rem',
                    background: showDropdown ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                    border:'1px solid var(--color-border)',
                    borderRadius:'var(--radius-md)',
                    cursor:'pointer',
                    transition:'background 0.18s',
                  }}
                >
                  <div className="avatar w-7 h-7" style={{fontSize:'0.75rem',fontWeight:700}}>
                    {session?.user?.name ? session.user.name.split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:block" style={{color:'var(--color-text)',fontWeight:500,fontSize:'0.875rem'}}>
                    {session?.user?.name}
                  </span>
                  <ChevronDown size={14} style={{color:'var(--color-text-muted)',transform: showDropdown ? 'rotate(180deg)' : 'none',transition:'transform 0.2s'}} />
                </button>

                {showDropdown && (
                  <div
                    style={{
                      position:'absolute',
                      right:0,
                      top:'calc(100% + 0.5rem)',
                      width:'200px',
                      background:'var(--color-surface-2)',
                      border:'1px solid var(--color-border)',
                      borderRadius:'var(--radius-lg)',
                      boxShadow:'var(--shadow-lg)',
                      overflow:'hidden',
                    }}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      style={{display:'flex',alignItems:'center',gap:'0.7rem',padding:'0.75rem 1rem',color:'var(--color-text-muted)',fontSize:'0.875rem',textDecoration:'none',transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link
                      href={`/${session.user.name}`}
                      onClick={() => setShowDropdown(false)}
                      style={{display:'flex',alignItems:'center',gap:'0.7rem',padding:'0.75rem 1rem',color:'var(--color-text-muted)',fontSize:'0.875rem',textDecoration:'none',transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <User size={15} /> My Creator Page
                    </Link>
                    <Link
  href="/dashboard/profile"
  onClick={() => setShowDropdown(false)}
  style={{
    display:'flex',
    alignItems:'center',
    gap:'0.7rem',
    padding:'0.75rem 1rem',
    color:'var(--color-text-muted)',
    fontSize:'0.875rem',
    textDecoration:'none',
    transition:'background 0.15s'
  }}
  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
  onMouseLeave={e => e.currentTarget.style.background='transparent'}
>
  <User size={15} /> Edit Profile
</Link>
                    <div style={{height:'1px',background:'var(--color-border)',margin:'0.25rem 0'}}></div>
                    <button
                      onClick={() => signOut()}
                      style={{display:'flex',alignItems:'center',gap:'0.7rem',padding:'0.75rem 1rem',color:'#f87171',fontSize:'0.875rem',background:'transparent',border:'none',cursor:'pointer',width:'100%',transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(248,113,113,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
              style={{padding:'0.5rem',color:'var(--color-text-muted)',background:'transparent',border:'none',cursor:'pointer'}}
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div
            style={{
              borderTop:'1px solid var(--color-border)',
              padding:'1rem 0 1.25rem',
              display:'flex',
              flexDirection:'column',
              gap:'0.25rem',
            }}
          >
            {[['/', 'Home'], ['/about', 'About'], ['/dashboard', 'Dashboard']].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenu(false)}
                style={{padding:'0.6rem 0.5rem',color:'var(--color-text-muted)',fontWeight:500,textDecoration:'none',borderRadius:'var(--radius-sm)'}}
              >
                {label}
              </Link>
            ))}
            {session && (
              <>
                <Link href={`/${session.user.name}`} onClick={() => setMobileMenu(false)}
                  style={{padding:'0.6rem 0.5rem',color:'var(--color-text-muted)',fontWeight:500,textDecoration:'none'}}>
                  My Creator Page
                </Link>
                <button onClick={() => signOut()}
                  style={{padding:'0.6rem 0.5rem',color:'#f87171',fontWeight:500,textAlign:'left',background:'transparent',border:'none',cursor:'pointer'}}>
                  Sign Out
                </button>
              </>
            )}
            {!session && (
              <Link href="/login" onClick={() => setMobileMenu(false)}
                style={{padding:'0.6rem 0.5rem',color:'var(--color-primary)',fontWeight:500,textDecoration:'none'}}>
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
