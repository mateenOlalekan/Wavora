import { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Send,
  BookOpen,
  Video,
  Headphones,
  Clock,
  CheckCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How do I book a workspace?",
    answer:
      "Navigate to the Bookings section from your dashboard. Select your preferred space, choose the date and time, and confirm your booking. You'll receive a confirmation email with all the details.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer:
      "Yes! You can cancel or reschedule a booking up to 2 hours before the start time from the Bookings page. Late cancellations may incur a fee depending on your membership plan.",
  },
  {
    question: "How does the membership billing work?",
    answer:
      "Billing is processed on the 1st of each month. Your membership fee is automatically charged to your saved payment method. You can view and manage your billing in the Membership section.",
  },
  {
    question: "What amenities are included in my membership?",
    answer:
      "All memberships include high-speed Wi-Fi, access to common areas, free coffee/tea, and printing credits. Premium and Enterprise members get additional perks like meeting room credits and guest passes.",
  },
  {
    question: "How do I connect with other members?",
    answer:
      "Visit the Community section to browse member profiles, join interest groups, and participate in discussions. You can also attend community events to meet fellow members in person.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, our mobile app is available for both iOS and Android. You can use it to manage bookings, check in, connect with members, and access your digital membership card.",
  },
  {
    question: "How do I get help with a technical issue?",
    answer:
      "You can submit a support ticket from this page, email support@coworkspace.com, or call our helpdesk. For urgent issues, use the live chat feature for immediate assistance.",
  },
];

const guides = [
  { icon: BookOpen, title: "Getting Started Guide", description: "Learn the basics of using your coworking space", link: "#" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step video walkthroughs of key features", link: "#" },
  { icon: Headphones, title: "Contact Support", description: "Reach our team via phone, email, or chat", link: "#" },
];

export default function MemberHelp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [ticket, setTicket] = useState({ subject: "", category: "general", message: "" });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
    setTicket({ subject: "", category: "general", message: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Find answers to your questions or get in touch with our team.</p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <a
            key={guide.title}
            href={guide.link}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
              <guide.icon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">{guide.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
          </a>
        ))}
      </div>

      {/* Search FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-lg">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <HelpCircle className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Email</h3>
          <p className="text-sm text-gray-500 mt-1">support@coworkspace.com</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> Response within 24 hours
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Phone</h3>
          <p className="text-sm text-gray-500 mt-1">+1 (555) 123-4567</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> Mon–Fri, 9am–6pm
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Live Chat</h3>
          <p className="text-sm text-gray-500 mt-1">Chat with our team</p>
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online now
          </p>
        </div>
      </div>

      {/* Submit a Ticket */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Submit a Support Ticket</h2>
            <p className="text-sm text-gray-500">Can't find what you're looking for? We'll help you out.</p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900">Ticket Submitted!</h3>
            <p className="text-sm text-green-700 mt-1">
              We've received your request and will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="booking">Booking Issue</option>
                  <option value="technical">Technical Problem</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                value={ticket.message}
                onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                placeholder="Describe your issue in detail..."
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
