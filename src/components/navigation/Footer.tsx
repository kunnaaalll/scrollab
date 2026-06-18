import Link from "next/link";
import { LogoMark } from "./navbar/LogoMark";
import { SocialLinks } from "./SocialLinks";
import { FooterColumn } from "./FooterColumn";

const serviceLinks = [
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "SEO & Content Systems", href: "/services/seo" },
  { label: "AI Marketing & Automation", href: "/services/ai-automation" },
  { label: "Content Creation", href: "/services/content-creation" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Guides & Templates", href: "/resources" },
  { label: "Webinars", href: "/webinars" },
  { label: "ROI Calculator", href: "/calculator" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <LogoMark />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              The premium AI-first growth marketing agency. We build scalable systems that generate qualified leads and drive predictable revenue for ambitious brands.
            </p>
            <SocialLinks />
          </div>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Scrollab. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm px-1">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm px-1">Terms of Service</Link>
            <Link href="/cookies" className="text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm px-1">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
