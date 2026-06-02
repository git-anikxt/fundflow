"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              C
            </div>

            <div>
              <h1 className="font-bold text-slate-900 text-lg">
                CreatorHub
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link href="/about" className="hover:text-blue-600 transition">
              About
            </Link>

            <Link href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {!session && (
              <Link href="/login">
                <button className="rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
            )}

            {session && (
              <div className="relative">

                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="hidden md:block text-slate-800 font-medium">
                    {session?.user?.name}
                  </span>

                  <span className="text-slate-500">▼</span>
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link
                      href="/dashboard"
                      className="block px-5 py-3 hover:bg-slate-50 text-slate-700"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href={`/${session.user.name}`}
                      className="block px-5 py-3 hover:bg-slate-50 text-slate-700"
                    >
                      My Creator Page
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-800"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-200 py-4 flex flex-col gap-4 text-slate-700">

            <Link href="/">Home</Link>

            <Link href="/about">About</Link>

            {session && (
              <>
                <Link href="/dashboard">Dashboard</Link>

                <Link href={`/${session.user.name}`}>
                  My Creator Page
                </Link>

                <button
                  onClick={() => signOut()}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {!session && (
              <Link href="/login">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar