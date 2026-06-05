"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, Heart, Users, TrendingUp, Zap, Shield, Globe } from "lucide-react";



export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh dot-grid relative overflow-hidden section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative z-10">
              <div className="badge mb-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Creator Funding Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
                Support creators
                <span className="gradient-text block mt-1">you believe in.</span>
              </h1>

              <p style={{ color: 'var(--color-text-muted)' }} className="text-lg mt-6 max-w-lg leading-relaxed">
                Help developers, designers, writers and makers bring their ideas to life — through direct, meaningful community support.
              </p>

              <div className="flex gap-3 mt-10 flex-wrap">
                <div className="flex gap-3 mt-10 flex-wrap">
                  <Link
                    href={session ? "/dashboard" : "/login"}
                    className="btn-primary"
                  >
                    {session ? "Go To Dashboard" : "Start Creating"}
                    <ArrowRight size={16} />
                  </Link>

                  <Link href="/about" className="btn-ghost">
                    Learn More
                  </Link>
                </div>

              </div>
</div>
<div className="relative z-10">
  <div className="glass-card p-6">

    {/* Header */}
    <div
      className="flex items-center justify-between mb-6"
      style={{
        padding: "1rem",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="avatar w-12 h-12 text-lg">
          A
        </div>

        <div>
          <h3
            className="font-semibold"
            style={{
              color: "white",
              fontSize: "1.15rem",
              lineHeight: 1.2,
            }}
          >
            Aniket Sharma
          </h3>

          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.9rem",
            }}
          >
            Full Stack Developer
          </p>
        </div>
      </div>

      <span className="badge">
        Founder
      </span>
    </div>

    {/* Funding Goal */}
    <div className="mb-4">
      <p
        style={{
          color: "var(--color-text-muted)",
          marginBottom: "0.6rem",
          fontSize: "0.9rem",
        }}
      >
        Funding Goal
      </p>

      <div
        style={{
          padding: "1rem",
          borderRadius: "14px",
          border: "1px solid var(--color-border)",
          background: "rgba(255,255,255,0.02)",
          color: "white",
          fontWeight: "600",
        }}
      >
        ₹30,000 Goal
      </div>
    </div>

    {/* About */}
    <div className="mb-5">
      <p
        style={{
          color: "var(--color-text-muted)",
          marginBottom: "0.6rem",
          fontSize: "0.9rem",
        }}
      >
        About
      </p>

      <div
        style={{
          padding: "1rem",
          borderRadius: "14px",
          border: "1px solid var(--color-border)",
          background: "rgba(255,255,255,0.02)",
          color: "white",
          lineHeight: "1.7",
        }}
      >
        Building open-source projects and sharing knowledge with the community.
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-3">
      
    <Link
  href="/aniketsharma"
  className="btn-primary flex-1 justify-center"
  style={{
    borderRadius: "14px",
    padding: "0.8rem",
    textDecoration: "none",
  }}
>
  Support Creator
</Link>

<Link
  href="/aniketsharma"
  className="btn-ghost flex-1 justify-center"
  style={{
    borderRadius: "14px",
    padding: "0.8rem",
    textDecoration: "none",
  }}
>
  View Page
</Link>
      
    </div>

  </div>
</div>
</div> 
</div> 
</section>                               
      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="badge mb-4 mx-auto" style={{ display: 'inline-flex' }}>Why FundFlow</div>
            <h2 className="text-4xl font-bold tracking-tight">Everything creators need</h2>
            <p style={{ color: 'var(--color-text-muted)' }} className="text-lg mt-4 max-w-lg mx-auto">A simple, powerful platform built for the modern independent creator.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <Zap size={20} />, title: "Instant Payments", desc: "Receive funds directly to your Razorpay account with zero delays and full transparency." },
              { icon: <Shield size={20} />, title: "Secure & Trusted", desc: "Bank-grade encryption and trusted payment infrastructure protect every transaction." },
              { icon: <Globe size={20} />, title: "Your Own Page", desc: "A dedicated creator page with your bio, goal tracking, and supporter wall." },
            ].map((f) => (
              <div key={f.title} className="glass-card glass-card-hover p-7">
                <div className="avatar w-10 h-10 text-sm mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Benefits */}
      <section style={{ paddingBottom: "4rem" }}>
        <div className="container-custom">

          <div className="grid md:grid-cols-3 gap-5">

            <div className="glass-card glass-card-hover p-7">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-semibold text-white text-xl mb-3">
                Launch Your Creator Page
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: "1.7",
                }}
              >
                Create your personal support page in minutes and start receiving contributions.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-7">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="font-semibold text-white text-xl mb-3">
                Accept Payments Securely
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: "1.7",
                }}
              >
                Powered by Razorpay for fast and reliable transactions across India.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-7">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="font-semibold text-white text-xl mb-3">
                Share Once, Get Supported
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: "1.7",
                }}
              >
                Send your unique FundFlow link to your audience and receive direct support.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">

          <div className="text-center mb-12">
            <div className="badge mb-4">
              How It Works
            </div>

            <h2 className="text-4xl font-bold">
              Start receiving support in 3 steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="glass-card p-7">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold mb-3">
                Create Your Page
              </h3>
              <p style={{ color: "var(--color-text-muted)" }}>
                Set up your profile, bio and funding goal.
              </p>
            </div>

            <div className="glass-card p-7">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold mb-3">
                Share Your Link
              </h3>
              <p style={{ color: "var(--color-text-muted)" }}>
                Share your FundFlow page with your audience.
              </p>
            </div>

            <div className="glass-card p-7">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold mb-3">
                Receive Support
              </h3>
              <p style={{ color: "var(--color-text-muted)" }}>
                Receive contributions securely through Razorpay.
              </p>
            </div>

          </div>

        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">

          <div className="glass-card p-8">

            <h2 className="text-3xl font-bold mb-6">
              🛡️ Secure & Trusted
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>✓ Secure payments powered by Razorpay</div>
              <div>✓ Direct creator payouts</div>
              <div>✓ Transparent supporter contributions</div>
              <div>✓ No complicated setup</div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding hero-mesh relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="badge mb-6 mx-auto" style={{ display: 'inline-flex' }}>Get Started Today</div>
          <h2 className="text-5xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Launch your creator journey
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }} className="mt-5 text-lg max-w-lg mx-auto">
            Build your page, connect with supporters, and receive direct funding from your community.
          </p>
          <div className="flex gap-3 mt-10 justify-center flex-wrap">
            <Link href="/login" className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
              Create Your Page <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-ghost" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
