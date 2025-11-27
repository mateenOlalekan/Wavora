import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import contactBg from "../assets/contact.jpg";

 function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-[40vh] md:h-[50vh] mt-[65px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative max-w-7xl w-full z-10 text-white px-4 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-base md:text-xl">
            We’d love to hear from you. Reach out through our form or details
            below.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto w-full px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between border border-gray-200 rounded-xl shadow-xl w-full p-6 md:p-10 gap-10">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="font-bold text-2xl md:text-4xl">Get In Touch</h2>
            <p className="text-base md:text-lg">
              Have questions or need assistance? Fill out the form below or
              reach us through our contact details.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin
                className="p-3 rounded-full border-2 border-green-500 text-green-500 shrink-0"
                size={48}
              />
              <div>
                <h3 className="font-bold text-lg md:text-2xl">Head Office</h3>
                <p className="text-sm md:text-base">
                  Suite 5B, Olive Grove Plaza, Victoria Island, Lagos.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail
                className="p-3 rounded-full border-2 border-green-500 text-green-500 shrink-0"
                size={48}
              />
              <div>
                <h3 className="font-bold text-lg md:text-2xl">Email Us</h3>
                <p className="text-sm md:text-base">
                  support@wavora.co.ltd <br /> wavora@mail.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone
                className="p-3 rounded-full border-2 border-green-500 text-green-500 shrink-0"
                size={48}
              />
              <div>
                <h3 className="font-bold text-lg md:text-2xl">Call Us</h3>
                <p className="text-sm md:text-base">
                  Phone: (+234) 909 999 8877 <br /> Fax: +555 444 333 314
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (Form) */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-4xl">Send a Message</h2>

            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md text-black outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md text-black outline-none"
                placeholder="Enter valid email address"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-medium">Phone Number</label>
              <input
                type="text"
                name="number"
                value={data.number}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md text-black outline-none"
                placeholder="Enter phone number"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="font-medium">Message</label>
              <textarea
                rows="4"
                name="message"
                value={data.message}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md text-black outline-none"
                placeholder="Enter your message"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4 flex-wrap">
              <button className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-50 w-full sm:w-auto">
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;