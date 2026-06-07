"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { Search, Users, ArrowRight } from "lucide-react";

export default function CreatorsPage() {
    const [search, setSearch] = useState("");
    const [featuredCreators, setFeaturedCreators] = useState([]);
    const [filteredCreators, setFilteredCreators] = useState([]);

    useEffect(() => {
  loadFeaturedCreators();
}, []);

useEffect(() => {
  const timeout = setTimeout(() => {
    searchCreators();
  }, 250);

  return () => clearTimeout(timeout);
}, [search]);

const loadFeaturedCreators = async () => {
  try {
    const res = await fetch("/api/creators/search?q=");
    const data = await res.json();

    const featured = data.filter(
      (creator) =>
        creator.username === "aniketsharma" ||
        creator.username === "deepsingh7505"
    );

    setFeaturedCreators(featured);
  } catch (error) {
    console.error(error);
  }
};

const searchCreators = async () => {
  if (!search.trim()) {
    setFilteredCreators([]);
    return;
  }

  try {
    const res = await fetch(
      `/api/creators/search?q=${encodeURIComponent(search)}`
    );

    const data = await res.json();

    setFilteredCreators(data);
  } catch (error) {
    console.error(error);
  }
};
    // const featuredCreators = [
    //     {
    //         name: "Aniket Sharma",
    //         username: "aniket",
    //         role: "AI Automation & Full Stack Developer",
    //         avatar: "A",
    //     },
    //     {
    //         name: "Deep Singh",
    //         username: "deepsingh",
    //         role: "Full Stack Developer • React • Next.js",
    //         avatar: "D",
    //     },
    // ];

    // const filteredCreators = featuredCreators.filter(
    //     (creator) =>
    //         creator.name.toLowerCase().includes(search.toLowerCase()) ||
    //         creator.username.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <div className="hero-mesh dot-grid min-h-screen">
            <div className="container-custom py-20">

                {/* Hero */}
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "999px",
                            background: "rgba(99,102,241,0.12)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <Users size={16} />
                        <span>Creator Discovery</span>
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(2.5rem,5vw,4rem)",
                            fontWeight: "800",
                            lineHeight: "1.1",
                            marginBottom: "1rem",
                            color: "white",
                        }}
                    >
                        Find Amazing Creators
                    </h1>

                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            fontSize: "1.1rem",
                            maxWidth: "650px",
                            margin: "0 auto 3rem",
                        }}
                    >
                        Discover developers, designers, innovators and creators building
                        the future. Support the projects you believe in.
                    </p>

                    {/* Search */}
                    <div
                        style={{
                            position: "relative",
                            maxWidth: "700px",
                            margin: "0 auto",
                        }}
                    >
                        <Search
                            size={22}
                            style={{
                                position: "absolute",
                                left: "20px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8",
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Search creators..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "1.2rem 1.2rem 1.2rem 3.5rem",
                                borderRadius: "20px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(20px)",
                                color: "white",
                                fontSize: "1rem",
                                outline: "none",
                            }}
                        />
                    </div>
                </div>

                {/* Results */}
                {search && (
                    <div
                        style={{
                            maxWidth: "700px",
                            margin: "2rem auto 0",
                        }}
                    >
                        {filteredCreators.length > 0 ? (
                            filteredCreators.map((creator) => (
                                <Link
                                    key={creator.username}
                                    href={`/${creator.username}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "1rem",
                                        marginBottom: "1rem",
                                        borderRadius: "18px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div
                                            className="avatar"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                background:
                                                    "linear-gradient(135deg,#6366f1,#a78bfa)",
                                            }}
                                        >
                                            {creator.profilepic ? (
  <img
    src={creator.profilepic}
    alt={creator.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "999px",
    }}
  />
) : (
  creator.name?.charAt(0)
)}
                                        </div>

                                        <div>
                                            <h3 style={{ fontWeight: "600" }}>
                                                {creator.name}
                                            </h3>

                                            <p
                                                style={{
                                                    color: "var(--color-text-muted)",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                {creator.role}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight size={18} />
                                </Link>
                            ))
                        ) : (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "2rem",
                                    color: "var(--color-text-muted)",
                                }}
                            >
                                No creators found.
                            </div>
                        )}
                    </div>
                )}

                {/* Featured */}
                <div style={{ marginTop: "6rem" }}>
                    <h2
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "700",
                            marginBottom: "2rem",
                        }}
                    >
                        Featured Creators
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredCreators.map((creator) => (
                            <Link
                                key={creator.username}
                                href={`/${creator.username}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: "2rem",
                                        transition: "all 0.25s ease",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                        }}
                                    >
                                        <div
                                            className="avatar"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                background:
                                                    "linear-gradient(135deg,#6366f1,#a78bfa)",
                                                fontSize: "1.2rem",
                                            }}
                                        >
                                            {creator.profilepic ? (
  <img
    src={creator.profilepic}
    alt={creator.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "999px",
    }}
  />
) : (
  creator.name?.charAt(0)
)}
                                        </div>

                                        <div>
                                            <h3
                                                style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {creator.name}
                                            </h3>

                                            <p
                                                style={{
                                                    color: "var(--color-text-muted)",
                                                    marginTop: "0.3rem",
                                                }}
                                            >
                                                {creator.bio || "FundFlow Creator"}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "1.5rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#818cf8",
                                                fontWeight: "600",
                                            }}
                                        >
                                            View Profile
                                        </span>

                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}