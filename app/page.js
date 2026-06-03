import Link from "next/link";
import { ArrowRight, Heart, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-grid min-h-[85vh] flex items-center">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-blue-700 text-sm mb-6">
                🚀 Creator Funding Platform
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Support creators
                <span className="gradient-text block">
                  directly.
                </span>
              </h1>

              <p className="text-slate-600 text-lg mt-6 max-w-xl">
                Help developers, designers, writers and creators
                bring their ideas to life through direct community
                support.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">
                <Link href="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                    Start Creating
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href="/about">
                  <button className="border border-slate-300 px-6 py-3 rounded-xl font-medium hover:bg-slate-50">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>

                  <div>
                    <h3 className="font-bold text-xl">
                      Aniket Sharma
                    </h3>
                    <p className="text-slate-500">
                      Full Stack Developer
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-slate-500 text-sm">
                      Raised
                    </p>
                    <h4 className="text-2xl font-bold">
                      ₹18,400
                    </h4>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-slate-500 text-sm">
                      Supporters
                    </p>
                    <h4 className="text-2xl font-bold">
                      128
                    </h4>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Goal Progress</span>
                    <span>63%</span>
                  </div>

                  <div className="h-3 bg-slate-200 rounded-full">
                    <div className="h-3 w-[63%] bg-blue-600 rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <Heart className="text-blue-600 mb-4" />
              <h3 className="text-4xl font-bold">
                ₹25L+
              </h3>
              <p className="text-slate-500">
                Funds Raised
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <Users className="text-blue-600 mb-4" />
              <h3 className="text-4xl font-bold">
                10K+
              </h3>
              <p className="text-slate-500">
                Supporters
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <TrendingUp className="text-blue-600 mb-4" />
              <h3 className="text-4xl font-bold">
                500+
              </h3>
              <p className="text-slate-500">
                Creators
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="section-padding">
        <div className="container-custom">

          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Creators
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  C
                </div>

                <h3 className="font-bold text-xl mt-4">
                  Creator {item}
                </h3>

                <p className="text-slate-500">
                  Developer & Builder
                </p>

                <div className="mt-4 text-blue-600 font-semibold">
                  ₹15,000 Raised
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-custom text-center">

          <h2 className="text-5xl font-bold">
            Start your creator journey
          </h2>

          <p className="mt-6 text-blue-100 text-lg">
            Build your page, connect with supporters,
            and receive direct funding.
          </p>

          <Link href="/login">
            <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold">
              Create Your Page
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}