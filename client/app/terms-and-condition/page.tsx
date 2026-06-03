import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { PulseLines } from "@/components/landing/motion";
// import Navbar from "@/components/landing/Navbar";
// import Footer from "@/components/landing/Footer";

export const metadata: Metadata = { title: "Terms of Service — Hallmarts" };

const sections = [
  {
    title: "1. About Hallmarts",
    content: `Hallmarts is a campus-focused digital marketplace and ecosystem that enables students, vendors, businesses, and service providers to buy, sell, advertise, and interact within campus communities.`,
  },
  {
    title: "2. Eligibility",
    content: `To use Hallmarts, you must:\n\n— Be at least 16 years old or have parental consent where required\n— Provide accurate registration information\n— Maintain the security of your account\n\nYou are responsible for all activities conducted through your account.`,
  },
  {
    title: "3. User Accounts",
    content: `You agree to:\n\n— Provide accurate and current information\n— Keep your login credentials secure and confidential\n— Notify Hallmarts immediately of any unauthorized access to your account\n\nHallmarts reserves the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Marketplace Services",
    content: `Hallmarts provides a platform that enables users, students, vendors, and businesses to list, discover, purchase, and sell products and services.\n\nHallmarts does not manufacture, own, or inspect all products sold through the platform. Vendors are solely responsible for the accuracy of listings, pricing, warranties, product quality, delivery, and customer support.`,
  },
  {
    title: "5. Vendor Responsibilities",
    content: `Vendors using Hallmarts agree to:\n\n— Provide accurate product and service descriptions\n— Fulfill orders promptly and professionally\n— Comply with all applicable laws and regulations\n— Maintain ethical business practices\n— Avoid listing prohibited, illegal, or harmful products\n\nHallmarts reserves the right to remove listings or suspend vendor accounts that violate platform policies.`,
  },
  {
    title: "6. Prohibited Activities",
    content: `Users may not:\n\n— Engage in fraudulent or deceptive activities\n— Post false, misleading, or inaccurate information\n— Upload malicious software, viruses, or harmful code\n— Harass, threaten, or abuse other users\n— Violate any applicable laws or regulations\n— Impersonate another person, institution, or organization\n— Attempt to gain unauthorized access to Hallmarts systems`,
  },
  {
    title: "7. Payments",
    content: `Payments made through Hallmarts may be processed by third-party payment providers.\n\nBy making a purchase, you agree to:\n\n— Pay all applicable charges and fees\n— Provide accurate billing information\n— Authorize payment processing through our payment partners\n\nHallmarts is not responsible for payment processing errors caused by third-party providers.`,
  },
  {
    title: "8. Refunds and Disputes",
    content: `Refund eligibility may vary depending on the vendor, product category, and applicable laws.\n\nHallmarts may assist in resolving disputes between buyers and vendors but is not obligated to provide refunds for transactions conducted through the platform.\n\nUsers are encouraged to contact vendors directly before escalating disputes.`,
  },
  {
    title: "9. Intellectual Property",
    content: `All Hallmarts branding, logos, software, content, designs, graphics, and platform functionality are owned by Hallmarts or its licensors and are protected by applicable intellectual property laws.\n\nUsers may not copy, reproduce, distribute, modify, or exploit Hallmarts content without prior written permission.`,
  },
  {
    title: "10. User Content",
    content: `Users retain ownership of content they upload to Hallmarts, including product listings, images, reviews, and profile information.\n\nBy submitting content, you grant Hallmarts a non-exclusive, worldwide, royalty-free license to use, display, store, reproduce, and distribute such content for the purpose of operating and promoting the platform.`,
  },
  {
    title: "11. Platform Availability",
    content: `Hallmarts strives to maintain reliable service but does not guarantee uninterrupted access to the platform.\n\nWe reserve the right to modify, suspend, discontinue, or update any part of the platform at any time without prior notice.`,
  },
  {
    title: "12. Limitation of Liability",
    content: `To the maximum extent permitted by law, Hallmarts shall not be liable for:\n\n— Indirect, incidental, or consequential damages\n— Loss of profits, revenue, or business opportunities\n— Loss of data or service interruptions\n— Vendor-related disputes\n— Product defects or delivery failures\n\nYour use of the platform is at your own risk.`,
  },
  {
    title: "13. Termination",
    content: `Hallmarts may suspend, restrict, or terminate access to the platform if a user violates these Terms or engages in harmful activities.\n\nUsers may stop using the platform and delete their accounts at any time, subject to any outstanding obligations.`,
  },
  {
    title: "14. Changes to These Terms",
    content: `Hallmarts reserves the right to update or modify these Terms at any time.\n\nUpdated versions will be posted on this page with a revised effective date. Continued use of the platform after changes become effective constitutes acceptance of the updated Terms.`,
  },
  {
    title: "15. Contact Us",
    content: `For questions regarding these Terms and Conditions:\n\nEmail: campus@hallmarts.com\nWebsite: https://www.hallmarts.com`,
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
          Terms and Conditions<span className="text-primary">.</span>
        </h1>
        <p className=" text-xs text-muted-foreground mb-16">
          Last Updated: June 2026
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed font-semibold max-w-2xl">
          Hallmarts Terms and Conditions
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          Welcome to Hallmarts. These Terms and Conditions ("Terms") govern your
          access to and use of the Hallmarts platform, website, mobile
          applications, and related services.
        </p>
        <p className=" text-base text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          By creating an account or using Hallmarts, you agree to these Terms.
        </p>
        <div className="space-y-12">
          {sections.map((section) => (
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
