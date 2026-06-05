"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { fetchuser, fetchpayments } from "@/actions/useractions"
import {
Users,
IndianRupee,
Target,
TrendingUp,
ExternalLink,
Copy,
Settings
} from "lucide-react"

const CreatorDashboard = () => {
const { data: session } = useSession()
const router = useRouter()

const [user, setUser] = useState(null)
const [payments, setPayments] = useState([])
const [loading, setLoading] = useState(true)

const [stats, setStats] = useState({
totalRaised: 0,
supporters: 0,
averageDonation: 0,
goalProgress: 0,
})

useEffect(() => {
if (!session) {
router.push("/login")
} else {
loadDashboard()
}
}, [session])

const loadDashboard = async () => {
try {
const userData = await fetchuser(session.user.name)
const paymentData = await fetchpayments(session.user.name)


  setUser(userData)
  setPayments(paymentData)

  const totalRaised = paymentData.reduce(
    (sum, payment) => sum + payment.amount,
    0
  )

  const supporters = paymentData.length

  const averageDonation =
    supporters > 0
      ? Math.round(totalRaised / supporters)
      : 0

  const goalProgress = userData?.goal
    ? Math.min(
        100,
        Math.round((totalRaised / userData.goal) * 100)
      )
    : 0

  setStats({
    totalRaised,
    supporters,
    averageDonation,
    goalProgress,
  })
} catch (error) {
  console.log(error)
} finally {
  setLoading(false)
}


}

const copyLink = async () => {
await navigator.clipboard.writeText(
`${window.location.origin}/${session?.user?.name}`
)


alert("Creator link copied!")


}

if (loading) {
return (
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
}}
>
Loading Dashboard... </div>
)
}

return (
<div style={{ minHeight: "100vh", paddingBlock: "3rem" }}> <div className="container-custom">

    <div className="mb-10">
      <div className="badge mb-3">FundFlow</div>

      <h1
        style={{
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 800,
          color: "var(--color-text)",
        }}
      >
        Welcome back, {user?.name || "Creator"} 👋
      </h1>

      <p
        style={{
          color: "var(--color-text-muted)",
          marginTop: "0.5rem",
        }}
      >
        Track donations, supporters and campaign growth.
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div className="glass-card p-6">
        <IndianRupee size={20} />
        <h3 style={{ marginTop: "1rem" }}>
          ₹{stats.totalRaised}
        </h3>
        <p>Total Raised</p>
      </div>

      <div className="glass-card p-6">
        <Users size={20} />
        <h3 style={{ marginTop: "1rem" }}>
          {stats.supporters}
        </h3>
        <p>Supporters</p>
      </div>

      <div className="glass-card p-6">
        <TrendingUp size={20} />
        <h3 style={{ marginTop: "1rem" }}>
          ₹{stats.averageDonation}
        </h3>
        <p>Average Donation</p>
      </div>

      <div className="glass-card p-6">
        <Target size={20} />
        <h3 style={{ marginTop: "1rem" }}>
          {stats.goalProgress}%
        </h3>
        <p>Goal Progress</p>
      </div>
    </div>

    <div className="glass-card p-6 mb-6">
      <h2
        style={{
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Goal Progress
      </h2>

      <div
        style={{
          height: "12px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${stats.goalProgress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg,#6366f1,#8b5cf6)",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "1rem",
          color: "var(--color-text-muted)",
        }}
      >
        ₹{stats.totalRaised} raised of ₹{user?.goal || 0}
      </p>
    </div>

    <div className="glass-card p-6 mb-6">
      <h2
        style={{
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Quick Actions
      </h2>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href={`/${session?.user?.name}`}
          target="_blank"
          className="btn-primary"
        >
          <ExternalLink size={16} />
          View Public Page
        </a>

        <button
          onClick={copyLink}
          className="btn-ghost"
        >
          <Copy size={16} />
          Copy Link
        </button>

        <button
          onClick={() =>
            router.push("/dashboard/profile")
          }
          className="btn-ghost"
        >
          <Settings size={16} />
          Edit Profile
        </button>
      </div>
    </div>

    <div className="glass-card p-6">
      <h2
        style={{
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Recent Supporters
      </h2>

      {payments.length === 0 && (
        <p>No supporters yet.</p>
      )}

      {payments.map((payment) => (
        <div
          key={payment._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 0",
            borderBottom:
              "1px solid var(--color-border)",
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>
              {payment.name}
            </div>

            <div
              style={{
                color:
                  "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              {payment.message}
            </div>
          </div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            ₹{payment.amount}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


)
}

export default CreatorDashboard
