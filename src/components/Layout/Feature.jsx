import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import { Zap, Lock, MapPin, Calendar, Users, Leaf } from "lucide-react";


const features = [
  {
    imgSrc: image1,
    title: "Private Rooms",
    desc: "Secured, quiet space for work, meet and create — perfect for privacy and productivity.",
    price: "Starting at $199/month",
    capacity: "1-4 people",
    features: ["Lockable door", "Furniture included", "High-speed Wi-Fi", "Access to common areas"],
    popular: false
  },
  {
    imgSrc: image2,
    title: "Shared Rooms",
    desc: "The rooms are designed for freelancers, remote teams, and creatives alike — boosting productivity.",
    price: "Starting at $99/month",
    capacity: "Flexible seating",
    features: ["Community tables", "Ergonomic chairs", "Meeting room credits", "Networking events"],
    popular: true
  },
  {
    imgSrc: image3,
    title: "Conference Rooms",
    desc: "Sophisticated spaces for impactful meetings. Tech-ready, sleek, and bookable on demand.",
    price: "From $25/hour",
    capacity: "Up to 20 people",
    features: ["4K displays", "Video conferencing", "Whiteboards", "Catering available"],
    popular: false
  },
];



export default function Features() {
  return (
    <section id="features" className="bg-white w-full py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                Premium Workspaces
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Discover flexible spaces designed for <span className="text-green-600">focus</span>,{" "}
                <span className="text-green-600">productivity</span> and{" "}
                <span className="text-green-600">collaboration</span>
              </h2>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              From private offices to dynamic shared spaces, our environment adapts to your workflow. 
              Experience thoughtfully designed areas that inspire creativity and drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="px-8 py-3.5 bg-black text-white rounded-lg font-semibold text-base w-fit hover:bg-gray-800 transition transform hover:-translate-y-1 duration-300 shadow-lg">
                Schedule a Tour
              </button>
              <button className="px-8 py-3.5 bg-white text-black border border-gray-300 rounded-lg font-semibold text-base w-fit hover:bg-gray-50 transition transform hover:-translate-y-1 duration-300">
                View Virtual Tour
              </button>
            </div>
          </div>

          {/* Right Content - Features List */}
<div className="w-full lg:w-1/2 flex flex-col gap-5 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
  
  {/* Header */}
  <div className="text-center">
    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
      What We Offer
    </h3>
    <p className="text-gray-600 mt-2 text-base">
      Everything you need to do your best work
    </p>
  </div>

  {/* Features */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { text: "Gigabit Fiber Internet & Backup Power", icon: Zap },
      { text: "24/7 Secure Access & CCTV Monitoring", icon: Lock },
      { text: "Prime Central Business District Location", icon: MapPin },
      { text: "Weekly Networking Events & Workshops", icon: Calendar },
      { text: "Vibrant Community of Professionals", icon: Users },
      { text: "Sustainable & Eco-Friendly Design", icon: Leaf },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-start gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <item.icon className="w-6 h-6 text-green-600" />
        </div>

        <p className="text-gray-800 font-medium leading-snug text-sm md:text-base">
          {item.text}
        </p>
      </div>
    ))}
  </div>

</div>

        </div>

        {/* Explore Section */}
        <div className="flex flex-col text-center gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Our Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Explore Our Versatile Workspaces
            </h2>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            From focused individual work to team collaboration and client meetings, 
            find the perfect environment for every aspect of your business. 
            <span className="font-semibold text-gray-900"> All plans include access to our premium amenities.</span>
          </p>
        </div>

        {/* Cards Section */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {features.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative ${
                  item.popular ? "ring-2 ring-green-500" : ""
                }`}
              >
                {item.popular && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Most Popular
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col p-6 gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Price & Capacity */}
                  <div className="flex justify-between items-center py-2 border-y border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">{item.price}</span>
                      <span className="text-sm text-gray-500">{item.capacity}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-gray-900">Includes:</h4>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button className={`mt-4 py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                    item.popular 
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl" 
                      : "bg-black text-white hover:bg-gray-800"
                  }`}>
                    {item.popular ? "Book Now - Priority Access" : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}