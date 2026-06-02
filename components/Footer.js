import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              CreatorHub
            </h2>

            <p className="text-slate-600 mt-3">
              Support creators directly and help bring
              meaningful projects to life.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">
              Product
            </h3>

            <div className="flex flex-col gap-2 text-slate-600">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/explore">Explore</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">
              Resources
            </h3>

            <div className="flex flex-col gap-2 text-slate-600">
              <a href="#">FAQ</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">
              Social
            </h3>

            <div className="flex flex-col gap-2 text-slate-600">
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-slate-500">
          © {currentYear} CreatorHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
