import { Cookie, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot disable these cookies.",
    examples: ["Session ID", "Authentication tokens", "Security cookies", "Load balancing"],
    required: true,
  },
  {
    name: "Performance Cookies",
    description:
      "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform.",
    examples: ["Google Analytics", "Page load times", "Error tracking", "Traffic sources"],
    required: false,
  },
  {
    name: "Functionality Cookies",
    description:
      "These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, more personal features.",
    examples: ["Language preference", "Theme settings", "Recently viewed spaces", "Form auto-fill"],
    required: false,
  },
  {
    name: "Marketing Cookies",
    description:
      "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
    examples: ["Facebook Pixel", "Google Ads", "Retargeting tags", "Social media tracking"],
    required: false,
  },
];

const faqs = [
  {
    question: "What are cookies?",
    answer:
      "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.",
  },
  {
    question: "How do we use cookies?",
    answer:
      "We use cookies to maintain your session, remember your preferences, analyze website traffic, and provide personalized content. Cookies help us deliver a better and more personalized experience.",
  },
  {
    question: "Can I control cookies?",
    answer:
      "Yes. Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.",
  },
  {
    question: "Do third parties set cookies?",
    answer:
      "Yes, some of our service providers (such as analytics and advertising partners) may set cookies on your device when you visit our website. These cookies are governed by the respective third party's privacy policy.",
  },
  {
    question: "How long do cookies last?",
    answer:
      "Session cookies are deleted when you close your browser. Persistent cookies remain for a set period (typically 30 days to 1 year) or until you delete them manually through your browser settings.",
  },
];

function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Cookie className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-300">Last updated: January 1, 2025</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            This Cookie Policy explains how Wavora uses cookies and similar technologies when you
            visit our website. We are transparent about the data we collect and give you the ability
            to control how it is used.
          </p>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Types of Cookies We Use</h2>

          <div className="flex flex-col gap-8">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{cookie.name}</h3>
                  {cookie.required ? (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      Required
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{cookie.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cookie.examples.map((example, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently Asked Questions</h2>

          <div className="flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              You can manage your cookie preferences at any time through your browser settings. Here
              are links to cookie management instructions for popular browsers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Google Chrome:</span> Settings &gt; Privacy and
                Security &gt; Cookies
              </li>
              <li>
                <span className="font-medium">Mozilla Firefox:</span> Settings &gt; Privacy &amp;
                Security &gt; Cookies and Site Data
              </li>
              <li>
                <span className="font-medium">Safari:</span> Preferences &gt; Privacy &gt; Manage
                Website Data
              </li>
              <li>
                <span className="font-medium">Microsoft Edge:</span> Settings &gt; Privacy, Search,
                and Services &gt; Cookies
              </li>
            </ul>
            <p>
              Please note that disabling certain cookies may impact the functionality of our website
              and your user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about our use of cookies, please contact us at{" "}
            <a href="mailto:privacy@wavora.com" className="text-green-600 font-medium hover:underline">
              privacy@wavora.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default Cookies;
