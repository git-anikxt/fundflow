import Link from "next/link";
import { ArrowRight, Heart, Users, Zap, Shield } from "lucide-react";

export default function About() {
  return (
    <>
      <section className="hero-mesh dot-grid section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="badge mb-6">About FundFlow</div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              Built for creators,
              <span className="gradient-text block">by creators.</span>
            </h1>
            <p style={{color:'var(--color-text-muted)',fontSize:'1.15rem',lineHeight:'1.8'}} className="mt-6 max-w-2xl">
              FundFlow is a direct funding platform that connects independent creators — developers, designers, writers, and makers — with the community that believes in their work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-5">Our Mission</h2>
              <p style={{color:'var(--color-text-muted)',lineHeight:'1.9'}} className="mb-4">
                We believe creators deserve direct access to the people who love their work. No middlemen, no opaque algorithms — just real community support flowing directly to the people building things that matter.
              </p>
              <p style={{color:'var(--color-text-muted)',lineHeight:'1.9'}}>
                Whether you&apos;re an open-source developer, an indie game maker, or a content creator — FundFlow gives you the tools to build a sustainable creative income.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Heart size={20} />, title: "Community First", desc: "Direct connections between creators and supporters." },
                { icon: <Zap size={20} />, title: "Instant Payouts", desc: "Funds go directly to your Razorpay account." },
                { icon: <Shield size={20} />, title: "Secure", desc: "Bank-grade security on every transaction." },
                { icon: <Users size={20} />, title: "Growing Fast", desc: "500+ creators and 10,000+ supporters." },
              ].map((v) => (
                <div key={v.title} className="glass-card p-5">
                  <div className="avatar w-9 h-9 text-sm mb-3">{v.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{v.title}</div>
                  <div style={{color:'var(--color-text-muted)',fontSize:'0.82rem'}}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'var(--color-surface)',borderTop:'1px solid var(--color-border)',borderBottom:'1px solid var(--color-border)'}} className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p style={{color:'var(--color-text-muted)'}} className="mb-8">Join hundreds of creators already getting funded.</p>
          <Link href="/login" className="btn-primary" style={{padding:'0.8rem 2rem',fontSize:'1rem'}}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
