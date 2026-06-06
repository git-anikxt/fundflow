"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { User, Mail, AtSign, Image, Layers, FileText, Target, CreditCard, Lock, Save } from 'lucide-react'

const FIELDS = [
  { name:'name',        label:'Display Name',      type:'text',   icon:<User size={15}/>,       placeholder:'Your full name' },
  { name:'email',       label:'Email Address',     type:'email',  icon:<Mail size={15}/>,       placeholder:'you@example.com' },
  { name:'username',    label:'Username',          type:'text',   icon:<AtSign size={15}/>,     placeholder:'your_handle' },
  { name:'profilepic',  label:'Profile Picture URL',type:'text',  icon:<Image size={15}/>,      placeholder:'https://...' },
  { name:'coverpic',    label:'Cover Picture URL', type:'text',   icon:<Layers size={15}/>,     placeholder:'https://...' },
  { name:'bio',         label:'Bio',               type:'textarea',icon:<FileText size={15}/>, placeholder:'Tell your story...' },
  { name:'goal',        label:'Funding Goal (₹)',  type:'number', icon:<Target size={15}/>,     placeholder:'50000' },
  { name:'razorpayid',  label:'Razorpay ID',       type:'text',   icon:<CreditCard size={15}/>, placeholder:'rzp_live_...' },
  { name:'razorpaysecret', label:'Razorpay Secret',type:'password',icon:<Lock size={15}/>,      placeholder:'•••••••••••••••••••' },
]

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/login')
    } else {
      getData()
    }
  }, [session, router])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setSaving(true)
    await updateProfile(e, session.user.name)
    setSaving(false)
    toast('Profile updated successfully!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    })
  }
console.log("Form data:", form);
  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />

      <div style={{minHeight:'100vh',paddingBlock:'3rem'}}>
        <div className="container-custom" style={{maxWidth:'800px'}}>

          {/* Header */}
          <div className="mb-10">
            <div className="badge mb-3">Settings</div>
            <h1 style={{fontSize:'clamp(1.8rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.03em',color:'var(--color-text)'}}>Creator Profile</h1>
            <p style={{color:'var(--color-text-muted)',marginTop:'0.5rem'}}>Manage your public creator page and payment settings.</p>
          </div>

          {/* Onboarding Section */}
          <div style={{
            padding:'1.25rem',
            borderRadius:'var(--radius-lg)',
            background:'rgba(99,102,241,0.08)',
            border:'1px solid rgba(99,102,241,0.2)',
            marginBottom:'1.5rem'
          }}>
            <div style={{display:'flex',alignItems:'flex-start',gap:'0.75rem'}}>
              <span style={{fontSize:'1.5rem',flexShrink:0}}>📋</span>
              <div>
                <div style={{fontWeight:600,color:'var(--color-text)',marginBottom:'0.25rem'}}>Complete Your Profile</div>
                <p style={{fontSize:'0.85rem',color:'var(--color-text-muted)',lineHeight:'1.5',marginBottom:'0.5rem'}}>A complete profile helps supporters trust you and increases your funding potential.</p>
                <div style={{fontSize:'0.8rem',color:'var(--color-text-faint)'}}>✓ Profile picture  ✓ Bio  ✓ Payment setup</div>
              </div>
            </div>
          </div>

          {/* Preview strip */}
          {session && (
            <div className="glass-card p-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div style={{display:'flex',alignItems:'center',gap:'0.875rem'}}>
                <div className="avatar w-11 h-11 text-base">
                  {session?.user?.name ? session.user.name.split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                </div>
                <div>
                  <div style={{fontWeight:600,color:'var(--color-text)',fontSize:'0.95rem'}}>{session?.user?.name}</div>
                  <div style={{color:'var(--color-text-faint)',fontSize:'0.8rem'}}>{session?.user?.email}</div>
                </div>
              </div>
              <a
                href={`/${session?.user?.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{fontSize:'0.8rem',padding:'0.4rem 0.875rem'}}
              >
                View Public Page →
              </a>
            </div>
          )}

          {/* Form */}
          <form action={handleSubmit}>
            <div className="glass-card p-7 mb-5">
              <h2 style={{fontWeight:600,fontSize:'1rem',color:'var(--color-text)',marginBottom:'1.5rem',paddingBottom:'1rem',borderBottom:'1px solid var(--color-border)',display:'flex',alignItems:'center',gap:'0.5rem'}}>🎯 Public Information</h2>
              <div style={{display:'grid',gap:'1.25rem'}}>
                {FIELDS.slice(0,5).map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="form-label" style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                      {f.icon} {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="input-field"
                    />
                  </div>
                ))}
                {/* Bio textarea */}
                <div>
                  <label htmlFor="bio" className="form-label" style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                    <FileText size={15}/> Bio
                  </label>
                  <textarea
                    id="bio" name="bio"
                    value={form.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell your supporters about yourself..."
                    className="input-field"
                    style={{resize:'vertical',lineHeight:'1.7'}}
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-7 mb-5">
              <h2 style={{fontWeight:600,fontSize:'1rem',color:'var(--color-text)',marginBottom:'1.5rem',paddingBottom:'1rem',borderBottom:'1px solid var(--color-border)',display:'flex',alignItems:'center',gap:'0.5rem'}}>📌 Funding Goal</h2>
              <div>
                <label htmlFor="goal" className="form-label" style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                  <Target size={15}/> Funding Goal (₹)
                </label>
                <input id="goal" name="goal" type="number" value={form.goal || ''} onChange={handleChange} placeholder="50000" className="input-field" />
              </div>
            </div>

            <div className="glass-card p-7 mb-8">
              <h2 style={{fontWeight:600,fontSize:'1rem',color:'var(--color-text)',marginBottom:'0.5rem',paddingBottom:'1rem',borderBottom:'1px solid var(--color-border)',display:'flex',alignItems:'center',gap:'0.5rem'}}>💳 Payment Integration</h2>
              <p style={{color:'var(--color-text-muted)',fontSize:'0.83rem',marginBottom:'1.25rem'}}>Connect your Razorpay account to start receiving payments.</p>
              
              {/* Security Warning */}
              <div style={{
                padding:'0.875rem',
                borderRadius:'var(--radius-md)',
                borderLeft:'4px solid #f59e0b',
                background:'rgba(245, 158, 11, 0.08)',
                marginBottom:'1.5rem',
                fontSize:'0.85rem',
                color:'var(--color-text)',
                lineHeight:'1.6'
              }}>
                <div style={{display:'flex',alignItems:'flex-start',gap:'0.75rem'}}>
                  <Lock size={16} style={{marginTop:'0.15rem',flexShrink:0,color:'#f59e0b'}}/>
                  <div>
                    <div style={{fontWeight:600,marginBottom:'0.25rem',color:'#fbbf24'}}>Keep your credentials secure</div>
                    <div>Never share your API keys. Store them securely and treat them as passwords.</div>
                  </div>
                </div>
              </div>
              
              <div style={{display:'grid',gap:'1.25rem'}}>
                <div>
                  <label htmlFor="razorpayid" className="form-label" style={{display:'flex',alignItems:'center',gap:'0.4rem'}}><CreditCard size={15}/> Razorpay ID</label>
                  <input id="razorpayid" name="razorpayid" type="text" value={form.razorpayid || ''} onChange={handleChange} placeholder="rzp_live_..." className="input-field" />
                </div>
                <div>
                  <label htmlFor="razorpaysecret" className="form-label" style={{display:'flex',alignItems:'center',gap:'0.4rem'}}><Lock size={15}/> Razorpay Secret</label>
                  <input id="razorpaysecret" name="razorpaysecret" type="password" value={form.razorpaysecret || ''} onChange={handleChange} placeholder="•••••••••••••••••" className="input-field" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{width:'100%',justifyContent:'center',padding:'0.8rem',fontSize:'0.95rem',opacity: saving ? 0.7 : 1}}
            >
              <Save size={16}/>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard
