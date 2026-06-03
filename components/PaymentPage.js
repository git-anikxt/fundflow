"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Trophy, Heart, MessageSquare, DollarSign } from 'lucide-react'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: '', message: '', amount: '' })
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => { getData() }, [])

  useEffect(() => {
    if (searchParams.get('paymentdone') === 'true') {
      toast('Thanks for your donation! ☕', {
        position: 'top-right', autoClose: 5000, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true,
        theme: 'dark', transition: Bounce,
      })
      router.push(`/${username}`)
    }
  }, [])

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let p = await fetchpayments(username)
    setPayments(p)
  }

  const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: 'INR',
      name: 'CreatorHub',
      description: `Support ${username}`,
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: { name: paymentform.name, email: '', contact: '' },
      theme: { color: '#6366f1' },
    }
    var rzp1 = new Razorpay(options)
    rzp1.open()
  }

  const totalRaised = payments.reduce((a, b) => a + b.amount, 0)
  const goal = currentUser.goal || 50000
  const progress = Math.min((totalRaised / goal) * 100, 100)
  const isPayDisabled = paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Cover + Avatar */}
      <div style={{position:'relative',marginBottom:'5rem'}}>
        <div style={{width:'100%',height:'clamp(180px,25vw,320px)',background:'var(--color-surface)',overflow:'hidden',borderBottom:'1px solid var(--color-border)'}}>
          {currentUser.coverpic
            ? <img src={currentUser.coverpic} alt="Cover" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85}} />
            : <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(167,139,250,0.08))'}} className="dot-grid" />}
        </div>
        <div style={{
          position:'absolute',
          bottom:'-3.5rem',
          left:'50%',
          transform:'translateX(-50%)',
          width:'7rem',height:'7rem',
          borderRadius:'50%',
          border:'3px solid var(--color-bg)',
          overflow:'hidden',
          background:'var(--color-surface)',
          boxShadow:'var(--shadow-lg)',
        }}>
          {currentUser.profilepic
            ? <img src={currentUser.profilepic} alt={username} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            : <div className="avatar" style={{width:'100%',height:'100%',fontSize:'2rem',borderRadius:'50%'}}>{username?.[0]?.toUpperCase()}</div>}
        </div>
      </div>

      {/* Profile info */}
      <div style={{textAlign:'center',marginBottom:'2.5rem',padding:'0 1rem'}}>
        <h1 style={{fontSize:'1.6rem',fontWeight:800,color:'var(--color-text)',letterSpacing:'-0.02em'}}>@{username}</h1>
        <p style={{color:'var(--color-text-muted)',marginTop:'0.4rem',maxWidth:'480px',marginInline:'auto',fontSize:'0.95rem'}}>
          {currentUser.bio || `Help ${username} keep creating!`}
        </p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'1.5rem',marginTop:'0.875rem'}}>
          <span style={{color:'var(--color-text-faint)',fontSize:'0.85rem'}}>
            <b style={{color:'var(--color-text)'}}>{payments.length}</b> supporters
          </span>
          <span style={{width:'3px',height:'3px',borderRadius:'50%',background:'var(--color-text-faint)',display:'inline-block'}}></span>
          <span style={{color:'var(--color-text-faint)',fontSize:'0.85rem'}}>
            <b style={{color:'var(--color-text)'}}>₹{totalRaised.toLocaleString()}</b> raised
          </span>
        </div>

        {/* Progress */}
        <div style={{maxWidth:'480px',marginInline:'auto',marginTop:'1.25rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.8rem',color:'var(--color-text-muted)',marginBottom:'0.5rem'}}>
            <span>₹{totalRaised.toLocaleString()}</span>
            <span style={{color:'#a5b4fc',fontWeight:600}}>{Math.round(progress)}%</span>
            <span>₹{goal.toLocaleString()}</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{width:`${progress}%`}} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-custom" style={{maxWidth:'960px',paddingBottom:'5rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}} className="payment-grid">

          {/* Top Supporters */}
          <div className="glass-card p-6">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.25rem'}}>
              <h2 style={{fontWeight:700,fontSize:'1.05rem',color:'var(--color-text)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <Trophy size={17} style={{color:'#f59e0b'}} /> Top Supporters
              </h2>
              <span style={{color:'var(--color-text-faint)',fontSize:'0.8rem'}}>{payments.length} total</span>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
              {payments.length === 0 && (
                <div style={{textAlign:'center',padding:'2.5rem 1rem',color:'var(--color-text-faint)'}}>
                  <Heart size={32} style={{margin:'0 auto 0.75rem',opacity:0.4}} />
                  <div style={{fontSize:'0.9rem'}}>No supporters yet.</div>
                  <div style={{fontSize:'0.8rem',marginTop:'0.25rem'}}>Be the first one! 🚀</div>
                </div>
              )}
              {payments.sort((a, b) => b.amount - a.amount).slice(0, 10).map((p, i) => (
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:'0.75rem',
                  padding:'0.7rem 0.875rem',
                  background:'rgba(255,255,255,0.02)',
                  border:'1px solid var(--color-border)',
                  borderRadius:'var(--radius-md)',
                  transition:'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                >
                  {i < 3 && <span style={{fontSize:'1rem'}}>{['🥇','🥈','🥉'][i]}</span>}
                  {i >= 3 && (
                    <div className="avatar" style={{width:'32px',height:'32px',fontSize:'0.75rem',flexShrink:0}}>
                      {p.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:'0.875rem',color:'var(--color-text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</div>
                    {p.message && <div style={{fontSize:'0.78rem',color:'var(--color-text-faint)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.message}</div>}
                  </div>
                  <div style={{fontWeight:700,fontSize:'0.9rem',color:'#4ade80',flexShrink:0}}>₹{p.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Make Payment */}
          <div className="glass-card p-6">
            <h2 style={{fontWeight:700,fontSize:'1.05rem',color:'var(--color-text)',marginBottom:'1.25rem',display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <Heart size={17} style={{color:'#f87171'}} /> Support {username}
            </h2>

            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              <div>
                <label className="form-label">Your Name</label>
                <input onChange={handleChange} value={paymentform.name} name='name' type='text'
                  className='input-field' placeholder='Enter your name' />
              </div>
              <div>
                <label className="form-label">Message</label>
                <input onChange={handleChange} value={paymentform.message} name='message' type='text'
                  className='input-field' placeholder='Say something nice...' />
              </div>
              <div>
                <label className="form-label">Amount (₹)</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'0.9rem',top:'50%',transform:'translateY(-50%)',color:'var(--color-text-muted)',fontWeight:600,pointerEvents:'none'}}>₹</span>
                  <input onChange={handleChange} value={paymentform.amount} name='amount' type='number'
                    className='input-field' placeholder='0' style={{paddingLeft:'1.75rem'}} />
                </div>
              </div>

              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                disabled={isPayDisabled}
                className="btn-primary"
                style={{justifyContent:'center',marginTop:'0.25rem',opacity: isPayDisabled ? 0.45 : 1,cursor: isPayDisabled ? 'not-allowed' : 'pointer'}}
              >
                <DollarSign size={15} /> Pay Now
              </button>
            </div>

            {/* Quick amounts */}
            <div style={{marginTop:'1.5rem'}}>
              <div style={{fontSize:'0.78rem',color:'var(--color-text-faint)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'0.75rem'}}>Quick Select</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                {[
                  { label:'☕ ₹50',  amount:5000,  accent:false },
                  { label:'☕☕ ₹100',amount:10000, accent:false },
                  { label:'🚀 ₹250', amount:25000, accent:false },
                  { label:'⭐ ₹500', amount:50000, accent:true  },
                ].map((q) => (
                  <button
                    key={q.label}
                    onClick={() => pay(q.amount)}
                    style={{
                      padding:'0.6rem',
                      borderRadius:'var(--radius-md)',
                      fontSize:'0.875rem',
                      fontWeight:600,
                      cursor:'pointer',
                      border: q.accent ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--color-border)',
                      background: q.accent ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                      color: q.accent ? '#a5b4fc' : 'var(--color-text-muted)',
                      transition:'all 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = q.accent ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.color='var(--color-text)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = q.accent ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = q.accent ? '#a5b4fc' : 'var(--color-text-muted)' }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .payment-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

export default PaymentPage
