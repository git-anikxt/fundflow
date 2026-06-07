export default function Documentation() {
  return (
    <div className="hero-mesh dot-grid min-h-screen">
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "80px 24px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          FundFlow Documentation
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.1rem",
            marginBottom: "3rem",
          }}
        >
          Everything you need to know about FundFlow.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          🚀 What is FundFlow?
        </h2>

        <p className="mt-3">
          FundFlow is a creator support platform that enables developers,
          designers, writers, students, and innovators to receive financial
          support directly from their community.
        </p>

        <p className="mt-3">
          Creators can build a public profile, share their work, set funding
          goals, and receive support through secure online payments.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          ✨ Core Features
        </h2>

        <ul className="list-disc ml-6 mt-3">
          <li>Creator Profiles</li>
          <li>Custom Creator Pages</li>
          <li>Funding Goals</li>
          <li>GitHub Authentication</li>
          <li>Google Authentication</li>
          <li>Secure Payments with Razorpay</li>
          <li>Creator Dashboard</li>
          <li>Responsive Design</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          👤 Creator Workflow
        </h2>

        <ol className="list-decimal ml-6 mt-3">
          <li>Create an account using GitHub or Google.</li>
          <li>Set up your creator profile.</li>
          <li>Add bio, profile image, and funding goal.</li>
          <li>Connect your Razorpay account.</li>
          <li>Share your public creator page.</li>
          <li>Receive support from your community.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-semibold">
          ❤️ Supporter Workflow
        </h2>

        <ol className="list-decimal ml-6 mt-3">
          <li>Visit a creator page.</li>
          <li>Choose an amount to support.</li>
          <li>Complete payment securely.</li>
          <li>Support creators directly.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-semibold">
          🔐 Authentication
        </h2>

        <p className="mt-3">
          FundFlow uses OAuth-based authentication powered by:
        </p>

        <ul className="list-disc ml-6 mt-3">
          <li>Google OAuth</li>
          <li>GitHub OAuth</li>
        </ul>

        <p className="mt-3">
          No passwords are stored by FundFlow.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          💳 Payments
        </h2>

        <p className="mt-3">
          Payments are processed securely through Razorpay.
        </p>

        <ul className="list-disc ml-6 mt-3">
          <li>Secure Checkout</li>
          <li>Transaction Verification</li>
          <li>Creator Payout Support</li>
          <li>Payment Tracking</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          🏗️ Tech Stack
        </h2>

        <ul className="list-disc ml-6 mt-3">
          <li>Next.js 14</li>
          <li>React</li>
          <li>MongoDB</li>
          <li>NextAuth</li>
          <li>Razorpay</li>
          <li>Tailwind CSS</li>
          <li>Vercel</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          📊 Platform Architecture
        </h2>

        <p className="mt-3">
          User → Authentication → Dashboard → Creator Page →
          Razorpay Payment → Verification → Database Update
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          🎯 Future Roadmap
        </h2>

        <ul className="list-disc ml-6 mt-3">
          <li>Creator Analytics</li>
          <li>Recurring Memberships</li>
          <li>Public Creator Directory</li>
          <li>Social Media Integration</li>
          <li>Community Features</li>
          <li>Email Notifications</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          🛠 Support
        </h2>

        <p className="mt-3">
          If you encounter issues or have questions about FundFlow,
          please contact the FundFlow team.
        </p>

        <div
          style={{
            marginTop: "4rem",
            padding: "1.5rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <h3 className="text-xl font-semibold mb-3">
            Built by Creators, for Creators 🚀
          </h3>

          <p style={{ color: "#94a3b8" }}>
            FundFlow empowers creators to focus on building while
            their community helps support the journey.
          </p>
        </div>
      </div>
    </div>
  );
}