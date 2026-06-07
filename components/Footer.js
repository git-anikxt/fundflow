"use client";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', marginTop: '0' }}>
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div style={{ marginBottom: "0.75rem" }}>
              <Image
                src="/logo.png"
                alt="FundFlow"
                width={180}
                height={45}
                priority
              />
            </div>
            
          </div>

          {[{
            heading: 'Product',
            links: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Creators', href: '/creators' }]
          }, {
            heading: 'Resources',
            links: [{ label: 'Documentation', href: '/docs' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }]
          }, {
  heading: 'Connect',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/git-anikxt/fundflow'
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/deepsingh7505'
    },
    {
      label: 'X (Twitter)',
      href: 'https://x.com/Deepsingh1517'
    }
  ]
}].map((col) => (
            <div key={col.heading}>
              <h3 style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {col.heading}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem' }}>© {currentYear} FundFlow. All rights reserved.</span>
          <span style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem' }}>Made with ☕ for creators.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
