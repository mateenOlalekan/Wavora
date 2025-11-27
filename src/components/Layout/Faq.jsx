import { useState, useRef, useEffect } from "react";
import { Plus, Minus, MessageCircle, Zap, Users, Coffee } from "lucide-react";

const faqs = [
  {
    question: "Do I need to book in advance?",
    answer: "Yes. We recommend booking in advance to ensure availability, especially for our premium spaces and meeting rooms which tend to get booked quickly.",
    category: "booking",
    icon: Zap
  },
  {
    question: "What are the opening hours?",
    answer: "Our spaces are accessible 24/7 for members with keycard access. Staffed hours are from 9:00 AM to 5:00 PM (WAT) on weekdays, with weekend access available for premium members.",
    category: "general",
    icon: Coffee
  },
  {
    question: "Do you offer discounts for teams or long-term members?",
    answer: "Absolutely! We provide customized enterprise pricing for teams of 5+ and offer significant discounts for annual commitments. Contact our sales team for a tailored quote.",
    category: "pricing",
    icon: Users
  },
  {
    question: "Is your space pet-friendly?",
    answer: "While we love pets, we generally do not permit them in our main workspaces to ensure the comfort and safety of all members. However, we have designated pet-friendly zones in some locations.",
    category: "amenities",
    icon: Coffee
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time without disruption. Changes take effect at the start of your next billing cycle with no hidden fees.",
    category: "pricing",
    icon: Zap
  },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const accordionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <MessageCircle className="w-4 h-4" />
            FAQ Center
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Frequently{' '}
            <span className="text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text">
              Asked
            </span>{' '}
            Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our co-working spaces. Can't find the answer you're looking for? 
            <span className="text-green-600 font-semibold"> Reach out to our team directly.</span>
          </p>
        </div>



        {/* FAQ Accordions */}
        <div className="space-y-2 grid grid-cols-1 max-w-7xl ">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              ref={el => accordionRefs.current[index] = el}
              className={`group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 ${
                openIndex === index 
                  ? 'ring-2 ring-green-500/20 shadow-xl' 
                  : 'hover:border-green-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left p-4"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 group-hover:scale-110 transition-transform duration-300 ${
                    openIndex === index ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    <faq.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {categories.find(cat => cat.id === faq.category)?.name}
                    </div>
                  </div>
                </div>
                <div className={`p-2 rounded-full border-2 transition-all duration-300 ml-4 ${
                  openIndex === index 
                    ? 'bg-green-500 border-green-500 text-white rotate-180' 
                    : 'border-gray-300 text-gray-400 group-hover:border-green-500 group-hover:text-green-500'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8">
                  <div className="pl-14 border-l-2 border-green-200">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}