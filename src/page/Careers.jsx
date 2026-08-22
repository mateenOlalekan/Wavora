import {
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Laptop,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Community Manager",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Lead community engagement initiatives, organize events, and ensure an exceptional member experience across our workspace locations.",
    requirements: ["3+ years in community management", "Strong communication skills", "Event planning experience"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Technology",
    location: "Remote / Lagos",
    type: "Full-time",
    description:
      "Build and maintain our member-facing web applications using React, Tailwind CSS, and modern frontend tooling.",
    requirements: ["2+ years with React", "Experience with Tailwind CSS", "REST API integration"],
  },
  {
    id: 3,
    title: "Sales Executive",
    department: "Sales",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Drive membership growth by identifying leads, conducting tours, and closing deals with professionals and teams.",
    requirements: ["2+ years in B2B sales", "Excellent presentation skills", "CRM experience preferred"],
  },
  {
    id: 4,
    title: "Facility Coordinator",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Oversee daily facility operations, coordinate maintenance, and ensure our workspaces remain pristine and fully equipped.",
    requirements: ["1+ years in facility management", "Problem-solving mindset", "Vendor management experience"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote / Lagos",
    type: "Full-time",
    description:
      "Plan and execute marketing campaigns across digital channels to grow brand awareness and membership conversions.",
    requirements: ["2+ years in digital marketing", "Social media expertise", "Analytics proficiency"],
  },
  {
    id: 6,
    title: "UX/UI Designer",
    department: "Technology",
    location: "Remote",
    type: "Contract",
    description:
      "Design intuitive and visually compelling interfaces for our digital products, from wireframes to polished prototypes.",
    requirements: ["3+ years in product design", "Proficiency in Figma", "User research experience"],
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family.",
  },
  {
    icon: Laptop,
    title: "Remote Flexibility",
    description: "Work from anywhere with our hybrid and remote work options.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Annual learning budget, mentorship programs, and access to industry conferences.",
  },
  {
    icon: Globe,
    title: "Travel Opportunities",
    description: "Work from any of our 8 locations worldwide with our digital nomad program.",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular team outings, retreats, and social events to build strong connections.",
  },
  {
    icon: Star,
    title: "Growth Path",
    description: "Clear career progression paths with regular performance reviews and promotions.",
  },
];

const departments = ["All", "Operations", "Technology", "Sales", "Marketing"];

function Careers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-green-400 font-semibold uppercase tracking-wide text-sm">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Build the Future of <span className="text-green-400">Work</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team redefining how people work, connect, and grow. Join us and help
            build something extraordinary.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition shadow-lg"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              Why Wavora?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Benefits & Perks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in our people because great teams build great products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              Open Positions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Find Your Perfect Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-green-200 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="text-green-600 font-medium text-sm">{job.department}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <Briefcase className="w-3.5 h-3.5" />
                      {job.department}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-700 bg-green-50 px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      {req}
                    </span>
                  ))}
                </div>

                <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Don't See Your Role?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            We're always open to hearing from talented people. Send us your resume and tell us how
            you'd contribute to our mission.
          </p>
          <a
            href="mailto:careers@wavora.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Send Your Resume
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Careers;
