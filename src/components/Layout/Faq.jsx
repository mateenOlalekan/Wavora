import { useState, useRef, useEffect } from "react";
import { Plus, Minus, MessageCircle, Zap, Users, Coffee } from "lucide-react";

const faqs = [
  { question: "Do I need to book in advance?", answer: "Yes. We recommend booking in advance to ensure availability, especially for our premium spaces and meeting rooms which tend to get booked quickly.", category: "booking", icon: Zap },
  { question: "What are the opening hours?", answer: "Our spaces are accessible 24/7 for members with keycard access. Staffed hours are from 9:00 AM to 5:00 PM (WAT) on weekdays, with weekend access available for premium members.", category: "general", icon: Coffee },
  { question: "Do you offer discounts for teams or long-term members?", answer: "Absolutely! We provide customized enterprise pricing for teams of 5+ and offer significant discounts for annual commitments. Contact our sales team for a tailored quote.", category: "pricing", icon: Users },
  { question: "Is your space pet-friendly?", answer: "While we love pets, we generally do not permit them in our main workspaces to ensure the comfort and safety of all members. However, we have designated pet-friendly zones in some locations.", category: "amenities", icon: Coffee },
  { question: "Can I upgrade or downgrade my plan later?", answer: "Yes, you can upgrade or downgrade your plan at any time without disruption. Changes take effect at the start of your next billing cycle with no hidden fees.", category: "pricing", icon: Zap },
];

const categories = [
  { id: "all", name: "All Questions", count: faqs.length },
  { id: "general", name: "General", count: faqs.filter(f => f.category === "general").length },
  { id: "booking", name: "Booking", count: faqs.filter(f => f.category === "booking").length },
  { id: "pricing", name: "Pricing", count: faqs.filter(f => f.category === "pricing").length },
  { id: "amenities", name: "Amenities", count: faqs.filter(f => f.category === "amenities").length },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(true), []);

  const filtered = faqs.filter(f => 
    (f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())) &&
    (category === "all" || f.category === category)
  );

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <MessageCircle className="w-4 h-4" />
            FAQ Center
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Frequently{' '}
            <span className="text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text">Asked</span>{' '}
            Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our co-working spaces. <span className="text-green-600 font-semibold">Reach out to our team directly.</span>
          </p>
        </div>

        <div className="space-y-2">
          {filtered.map((faq, idx) => (
            <div key={idx} className={`bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${
              openIndex === idx ? 'ring-2 ring-green-500/20 shadow-xl border-green-200' : 'border-gray-200 hover:border-green-200'
            }`}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex justify-between items-center w-full text-left p-4"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 transition-transform ${
                    openIndex === idx ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    <faq.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs mt-2">
                      {categories.find(c => c.id === faq.category)?.name}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-full border-2 transition-all ml-4 ${
                  openIndex === idx ? 'bg-green-500 border-green-500 text-white rotate-180' : 'border-gray-300 text-gray-400'
                }`}>
                  {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              {openIndex === idx && (
                <div className="px-8 pb-6 border-t border-2 border-green-200 ">
                  <div className="pl-14 border-l-2 border-green-200 pt-2">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}