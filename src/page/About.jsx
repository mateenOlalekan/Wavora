import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Zap,
  Building,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";

// Team data
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    bio: "Former tech executive with 15+ years in workspace innovation and community building.",
    expertise: ["Workspace Design", "Community Development", "Strategic Planning"]
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Operations specialist with background in hospitality and facility management.",
    expertise: ["Operations", "Customer Experience", "Facility Management"]
  },
  {
    name: "Dr. Aisha Bello",
    role: "Community Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "PhD in Organizational Psychology focused on creating productive work environments.",
    expertise: ["Community Engagement", "Member Success", "Wellness Programs"]
  },
  {
    name: "James Kim",
    role: "Technology Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Tech entrepreneur with expertise in smart workspace solutions and digital innovation.",
    expertise: ["Smart Technology", "Digital Infrastructure", "Innovation"]
  }
];

// Values data
const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe meaningful connections drive innovation and growth. Our space is designed to foster collaboration and networking.",
    details: [
      "Weekly networking events",
      "Member-only digital platform",
      "Cross-industry collaboration programs"
    ]
  },
  {
    icon: Zap,
    title: "Innovation Driven",
    description: "We continuously evolve our spaces and services to meet the changing needs of modern professionals and teams.",
    details: [
      "Regular technology upgrades",
      "Flexible workspace solutions",
      "Future-ready infrastructure"
    ]
  },
  {
    icon: Heart,
    title: "Wellness Focused",
    description: "Productivity thrives in healthy environments. We prioritize member wellbeing in every aspect of our design.",
    details: [
      "Ergonomic furniture standards",
      "Wellness programs and workshops",
      "Natural light optimization"
    ]
  },
  {
    icon: Globe,
    title: "Sustainable Future",
    description: "We're committed to environmental responsibility and creating spaces that minimize ecological impact.",
    details: [
      "LEED-certified buildings",
      "Waste reduction programs",
      "Energy-efficient operations"
    ]
  }
];

// Milestones data
const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "Founded with a vision to redefine workspace experiences",
    achievements: ["First location launched", "100+ founding members"]
  },
  {
    year: "2019",
    title: "Growth",
    description: "Expanded to multiple locations across the city",
    achievements: ["3 new locations", "500+ active members", "Community programs launched"]
  },
  {
    year: "2020",
    title: "Adaptation",
    description: "Pivoted to support remote work during global changes",
    achievements: ["Virtual membership options", "Enhanced safety protocols", "Digital community platform"]
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Introduced smart workspace technology and AI features",
    achievements: ["Smart booking system", "IoT integration", "Mobile app launch"]
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Growing network with focus on sustainable design",
    achievements: ["8 locations nationwide", "Green building certification", "2000+ member community"]
  }
];

// Stats data
const stats = [
  { number: "2,000+", label: "Active Members", icon: Users },
  { number: "8", label: "Locations", icon: Building },
  { number: "150+", label: "Events Hosted", icon: Calendar },
  { number: "98%", label: "Member Satisfaction", icon: Star },
  { number: "50+", label: "Partner Companies", icon: TrendingUp },
  { number: "24/7", label: "Secure Access", icon: Shield }
];

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
<section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-24 lg:py-32">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col text-center gap-4">
        <span className="text-green-400 font-semibold uppercase tracking-wide text-sm">
          About Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Redefining the Future of <span className="text-green-400">Work</span>
        </h1>
        <p className="text-xl text-gray-200 leading-relaxed ">
          We're building more than just workspaces—we're creating ecosystems where innovation thrives, 
          communities connect, and businesses grow. Since 2018, we've been committed to transforming 
          how people work, collaborate, and succeed.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create dynamic, inclusive, and sustainable workspaces that empower individuals and 
                businesses to achieve their fullest potential. We're committed to providing environments 
                that inspire creativity, foster collaboration, and drive meaningful progress.
              </p>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">We achieve this through:</h3>
                <ul className="space-y-2">
                  {[
                    "Thoughtfully designed spaces that adapt to diverse work styles",
                    "Cutting-edge technology infrastructure",
                    "Curated community programs and networking opportunities",
                    "Sustainable operations and eco-friendly practices",
                    "Exceptional member support and services"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the leading catalyst for workplace innovation, setting new standards for 
                how people work, connect, and thrive in the digital age. We envision a future where 
                workspaces are ecosystems of opportunity, accessibility, and sustainable growth.
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-3">By 2030, we aim to:</h3>
                <div className="space-y-3">
                  {[
                    "Expand to 50+ sustainable locations globally",
                    "Support 10,000+ entrepreneurs and innovators",
                    "Achieve carbon-neutral operations across all spaces",
                    "Launch digital nomad programs in 20+ countries",
                    "Establish innovation labs in partnership with top universities"
                  ].map((goal, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measuring our success through the growth and satisfaction of our community members
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              Our Foundation
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Core Values That Guide Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles shape every decision we make and every space we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {value.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">How we live this value:</h4>
                  <ul className="space-y-2">
                    {value.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Milestones & Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a leader in workspace innovation
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-200 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{milestone.description}</p>
                      <div className="space-y-2">
                        {milestone.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              Leadership Team
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Meet Our Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate leaders dedicated to creating exceptional workspace experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-green-600 font-semibold mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.bio}</p>
                
                <div className="space-y-2">
                  {member.expertise.map((skill, i) => (
                    <span 
                      key={i}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Be part of a workspace revolution that puts people, innovation, and sustainability first. 
              Discover how our spaces can transform the way you work and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition transform hover:-translate-y-1 duration-300 shadow-lg">
                Book a Tour Today
              </button>
              <button className="px-8 py-4 bg-transparent text-white border border-white rounded-xl font-semibold text-lg hover:bg-white/10 transition">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;