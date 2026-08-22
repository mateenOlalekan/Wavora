import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Information We Collect",
    content: `When you use our platform or visit our workspaces, we may collect the following types of information:\n\n• Personal Information: Name, email address, phone number, billing details, and government-issued ID for access purposes.\n• Usage Data: Information about how you interact with our website, booking system, and digital platforms.\n• Device Information: Browser type, operating system, IP address, and device identifiers.\n• Location Data: General location information to help you find nearby workspaces.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:\n\n• Process bookings, payments, and membership subscriptions.\n• Provide access to our workspaces and manage facility security.\n• Communicate with you about your account, services, and upcoming events.\n• Improve our platform, services, and member experience.\n• Send marketing communications (with your consent).\n• Comply with legal obligations and protect our rights.`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell your personal information. We may share your data with:\n\n• Service Providers: Third-party vendors who help us operate our platform (payment processors, cloud hosting, analytics).\n• Legal Authorities: When required by law, regulation, or legal process.\n• Business Transfers: In connection with a merger, acquisition, or sale of assets.\n• With Your Consent: When you explicitly authorize us to share your information.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your personal information, including:\n\n• Encryption of data in transit (TLS/SSL) and at rest.\n• Regular security audits and vulnerability assessments.\n• Access controls and authentication protocols.\n• Employee training on data protection practices.\n\nWhile we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "5. Cookies & Tracking",
    content: `Our website uses cookies and similar technologies to:\n\n• Maintain your session and remember your preferences.\n• Analyze website traffic and usage patterns.\n• Provide personalized content and recommendations.\n\nYou can control cookie settings through your browser preferences. For more details, see our Cookie Policy.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you may have the following rights:\n\n• Access: Request a copy of the personal data we hold about you.\n• Correction: Request correction of inaccurate or incomplete data.\n• Deletion: Request deletion of your personal data.\n• Portability: Request a copy of your data in a machine-readable format.\n• Opt-Out: Unsubscribe from marketing communications at any time.\n\nTo exercise these rights, please contact us at privacy@wavora.com.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including:\n\n• Membership duration plus 12 months after account closure.\n• Financial records as required by applicable laws (typically 7 years).\n• Usage analytics in anonymized form for up to 36 months.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by:\n\n• Posting the updated policy on our website.\n• Sending an email notification to registered members.\n\nYour continued use of our services after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:\n\nEmail: privacy@wavora.com\nPhone: (+234) 909 999 8877\nAddress: Suite 5B, Olive Grove Plaza, Victoria Island, Lagos.`,
  },
];

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300">Last updated: January 1, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              At Wavora, we are committed to protecting your privacy and ensuring the security of your
              personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your data when you use our workspaces, website, and services.
            </p>

            <div className="flex flex-col gap-10">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
