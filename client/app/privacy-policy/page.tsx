import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { PulseLines } from "@/components/landing/motion";
// import Navbar from "@/components/landing/Navbar";
// import Footer from "@/components/landing/Footer";

export const metadata: Metadata = { title: "Privacy policy — Hallmarts" };

const privacyPolicySections = [
  {
    title: "1. Introduction",
    content: `Hallmarts values your privacy and is committed to protecting your personal information.\n\nThis Privacy Policy explains how we collect, use, store, disclose, and protect your information when you use the Hallmarts platform, website, mobile applications, and related services.`,
  },
  {
    title: "2. Information We Collect",
    content: `We may collect the following types of information:\n\n— Name and profile information\n— Email address\n— Phone number\n— Campus, institution, or organization details\n— Profile photos and account preferences\n— Products, services, and listings you create\n— Transaction and order history\n— Device, browser, and usage information`,
  },
  {
    title: "3. Account Information",
    content: `When you create an account on Hallmarts, we may collect information necessary to identify and manage your account, including your name, email address, phone number, profile image, and campus affiliation.\n\nYou are responsible for ensuring that the information provided is accurate and up to date.`,
  },
  {
    title: "4. Transaction Information",
    content: `When you buy, sell, or interact with vendors through Hallmarts, we may collect information related to:\n\n— Purchases and orders\n— Payment records\n— Delivery details\n— Transaction history\n— Vendor and customer interactions\n\nThis information helps us facilitate transactions and provide customer support.`,
  },
  {
    title: "5. Device and Usage Information",
    content: `We automatically collect certain technical information when you use Hallmarts, including:\n\n— IP address\n— Browser type and version\n— Device information\n— Operating system\n— Usage statistics and activity logs\n— Pages viewed and features used\n\nThis information helps us improve platform performance, security, and user experience.`,
  },
  {
    title: "6. How We Use Your Information",
    content: `We use the information we collect to:\n\n— Create and manage user accounts\n— Facilitate purchases and transactions\n— Connect buyers and vendors\n— Improve platform functionality and user experience\n— Detect fraud and unauthorized activity\n— Provide customer support\n— Send important service-related communications\n— Comply with legal obligations`,
  },
  {
    title: "7. How We Share Information",
    content: `We may share information with:\n\n— Vendors and service providers involved in transactions\n— Payment processing providers\n— Cloud hosting and infrastructure providers\n— Analytics and security service providers\n— Law enforcement or regulatory authorities when required by law\n\nHallmarts does not sell your personal information to third parties.`,
  },
  {
    title: "8. Cookies and Tracking Technologies",
    content: `Hallmarts may use cookies, analytics tools, and similar technologies to:\n\n— Remember user preferences\n— Maintain login sessions\n— Analyze platform traffic and usage patterns\n— Improve performance and functionality\n\nYou may control cookie settings through your browser preferences where available.`,
  },
  {
    title: "9. Data Security",
    content: `We implement reasonable administrative, technical, and organizational safeguards designed to protect your information from unauthorized access, disclosure, alteration, or destruction.\n\nWhile we strive to protect your information, no internet-based service can guarantee absolute security.`,
  },
  {
    title: "10. Data Retention",
    content: `We retain personal information only for as long as necessary to:\n\n— Provide our services\n— Maintain platform operations\n— Resolve disputes\n— Enforce agreements\n— Meet legal and regulatory obligations\n\nWhen information is no longer required, we will securely delete or anonymize it where appropriate.`,
  },
  {
    title: "11. Your Rights and Choices",
    content: `Depending on applicable laws, you may have the right to:\n\n— Access your personal information\n— Correct inaccurate information\n— Request deletion of your data\n— Object to certain processing activities\n— Withdraw consent where applicable\n— Request a copy of your personal information\n\nRequests may be submitted through our support channels.`,
  },
  {
    title: "12. Third-Party Services",
    content: `Hallmarts may integrate with third-party services, including payment providers, analytics providers, and external websites.\n\nWe are not responsible for the privacy practices, content, or security measures of third-party services and encourage users to review their respective privacy policies.`,
  },
  {
    title: "13. Children's Privacy",
    content: `Hallmarts does not knowingly collect personal information from children in violation of applicable laws.\n\nWhere required, parental or guardian consent must be obtained before a minor uses certain services.`,
  },
  {
    title: "14. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices.\n\nAny updates will be posted on this page with a revised effective date. Continued use of Hallmarts after such updates constitutes acceptance of the revised Privacy Policy.`,
  },
  {
    title: "15. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy:\n\nEmail: support@hallmarts.com\nWebsite: https://www.hallmarts.com`,
  },
];

export default function TermsPage() {
  return (
    <div className="relative bg-background min-h-screen overflow-x-hidden">
      {/* <PulseLines /> */}
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-10 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2  text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          {/* <ArrowLeft className="w-3 h-3" /> */}
          Back to Home
        </Link>
        <div className=" text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
          Legal
        </div>
        <h1 className="font-inter text-4xl lg:text-6xl font-bold text-foreground mb-3">
          Privacy Policy<span className="text-primary">.</span>
        </h1>
        <p className=" text-xs text-muted-foreground mb-16">
          Last Updated: June 2026
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed font-semibold max-w-2xl">
          Hallmarts Privacy Policy
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          Hallmarts values your privacy and is committed to protecting your
          personal information.
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          This Privacy Policy explains how we collect, use, disclose, and
          protect your information.
        </p>
        <div className="space-y-12">
          {privacyPolicySections.map((section) => (
            <div
              key={section.title}
              className="border-b border-border/30 pb-12"
            >
              <h2 className="font-inter text-xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer />  */}
    </div>
  );
}
