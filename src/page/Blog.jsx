import { Calendar, Clock, ArrowRight, Tag, Search } from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Work: Trends to Watch in 2025",
    excerpt:
      "Explore how hybrid work models, AI collaboration tools, and flexible office spaces are reshaping the way teams connect and produce results.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&h=400&fit=crop",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Workplace Trends",
    author: "Sarah Chen",
  },
  {
    id: 2,
    title: "How Coworking Spaces Boost Productivity and Creativity",
    excerpt:
      "Studies show that professionals in coworking environments report higher satisfaction and output. Here's why shared workspaces work.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=600&h=400&fit=crop",
    date: "Feb 3, 2025",
    readTime: "4 min read",
    category: "Productivity",
    author: "Marcus Rodriguez",
  },
  {
    id: 3,
    title: "Building a Thriving Community in Your Workspace",
    excerpt:
      "Community is the backbone of any successful coworking space. Learn strategies for fostering meaningful professional connections.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    date: "Feb 20, 2025",
    readTime: "6 min read",
    category: "Community",
    author: "Dr. Aisha Bello",
  },
  {
    id: 4,
    title: "Sustainable Office Design: Eco-Friendly Practices",
    excerpt:
      "Discover how modern workspaces are adopting green building standards, energy-efficient systems, and sustainable materials.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    date: "Mar 5, 2025",
    readTime: "5 min read",
    category: "Sustainability",
    author: "James Kim",
  },
  {
    id: 5,
    title: "Smart Workspace Technology: IoT and AI Integration",
    excerpt:
      "From smart booking systems to AI-powered climate control, explore the technology transforming modern work environments.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    date: "Mar 18, 2025",
    readTime: "7 min read",
    category: "Technology",
    author: "James Kim",
  },
  {
    id: 6,
    title: "Tips for Maximizing Your Coworking Membership",
    excerpt:
      "Get the most out of your workspace membership with these expert tips on networking, amenities usage, and time management.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    date: "Apr 2, 2025",
    readTime: "4 min read",
    category: "Tips & Guides",
    author: "Sarah Chen",
  },
];

const categories = ["All", "Workplace Trends", "Productivity", "Community", "Sustainability", "Technology", "Tips & Guides"];

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      (activeCategory === "All" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-green-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-green-400 font-semibold uppercase tracking-wide text-sm">
            Blog & Insights
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Stories, Tips & <span className="text-green-400">Insights</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends in workspace innovation, productivity tips, and
            community stories from our team and members.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm flex-1">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-700">{post.author}</span>
                      <button className="flex items-center gap-1.5 text-green-600 font-semibold text-sm hover:text-green-700 transition group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Subscribe to our newsletter and never miss the latest insights, tips, and community updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl outline-none text-gray-900 font-medium"
            />
            <button className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
