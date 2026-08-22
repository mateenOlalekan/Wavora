import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Wavora's workspaces, website, and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.\n\nThese terms apply to all visitors, members, and users of our platform and physical workspaces.`,
  },
  {
    title: "2. Membership & Accounts",
    content: `To access our workspaces and digital platforms, you must create an account and provide accurate, complete information. You are responsible for:\n\n• Maintaining the confidentiality of your account credentials.\n• All activities that occur under your account.\n• Notifying us immediately of any unauthorized use.\n\nYou must be at least 18 years old to create an account and use our services.`,
  },
  {
    title: "3. Bookings & Payments",
    content: `All bookings are subject to availability. By making a booking, you agree to:\n\n• Pay all applicable fees at the time of booking.\n• Our cancellation and refund policies (detailed below).\n• Compliance with workspace rules and guidelines.\n\nPayment is processed through our secure third-party payment processors. We do not store your full credit card information on our servers.`,
  },
  {
    title: "4. Cancellation & Refund Policy",
    content: `• Weekly Pass: Full refund if cancelled at least 24 hours before the start date. No refunds for cancellations within 24 hours.\n• Monthly Pro: Pro-rated refund available within the first 7 days. No refunds after the first week.\n• Yearly Elite: Full refund within 14 days of purchase. After 14 days, pro-rated refund minus a 10% administrative fee.\n• Meeting Room Bookings: Free cancellation up to 2 hours before the scheduled time. 50% charge for late cancellations.`,
  },
  {
    title: "5. Workspace Rules",
    content: `Members must adhere to the following rules while using our facilities:\n\n• Respect other members and maintain a professional environment.\n• Keep your workspace clean and tidy.\n• Do not bring hazardous materials into the premises.\n• Follow all safety protocols and emergency procedures.\n• Do not share access credentials or allow unauthorized individuals entry.\n• Comply with noise levels and phone etiquette guidelines.\n\nViolation of these rules may result in warnings, suspension, or termination of membership.`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content on our website, including text, graphics, logos, and software, is the property of Wavora or its licensors and is protected by copyright and trademark laws.\n\nMembers retain full ownership of any intellectual property they create while using our workspaces. Wavora does not claim any rights over your work product.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `Wavora provides workspaces and services on an "as is" basis. We are not liable for:\n\n• Loss or theft of personal belongings (use lockers and secure storage).\n• Interruptions to internet or utility services.\n• Any indirect, incidental, or consequential damages.\n• Business losses or lost profits.\n\nOur total liability shall not exceed the fees paid by you in the 12 months preceding the claim.`,
  },
  {
    title: "8. Termination",
    content: `We reserve the right to suspend or terminate your membership and access to our services at our discretion, including but not limited to:\n\n• Violation of these Terms of Service.\n• Non-payment of fees.\n• Conduct that disrupts other members or damages our facilities.\n\nUpon termination, you will lose access to all workspace benefits. Pro-rated refunds may apply depending on the circumstances of termination.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Lagos, Nigeria.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions about these Terms of Service, please contact us:\n\nEmail: legal@wavora.com\nPhone: (+234) 909 999 8877\nAddress: Suite 5B, Olive Grove Plaza, Victoria Island, Lagos.`,
  },
];

function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FileText className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
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
              Welcome to Wavora. These Terms of Service govern your use of our workspaces, website,
              digital platforms, and services. Please read them carefully before becoming a member or
              using our facilities.
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

export default TermsOfService;
