

// // components/contact/ContactSection.jsx
// "use client";

// import React, { useState, useEffect } from "react";

// export default function ContactSection() {
//   const [contactInfo, setContactInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//   };

//   useEffect(() => {
//     const fetchContactInfo = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/contact");
//         if (!response.ok) {
//           throw new Error("Failed to fetch contact information.");
//         }
//         const data = await response.json();
//         console.log("the data is", data);
//         setContactInfo(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchContactInfo();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="bg-gray-50 py-32">
//       <div className="container mx-auto px-5">
//         <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
//           {/* Contact Info */}
//           <div>
//             <div className="contact-info">
//               <h3 className="text-2xl font-bold relative pb-4 mb-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-black">
//                 Contact Info
//               </h3>

//               <p className="text-gray-600 mb-8">{contactInfo.description}</p>

//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-bold text-lg mb-2">Address:</h4>
//                   <p className="text-gray-600">{contactInfo.address}</p>
//                 </div>

//                 <div>
//                   <h4 className="font-bold text-lg mb-2">Phone:</h4>
//                   <p className="text-gray-600">{contactInfo.phone}</p>
//                 </div>

//                 <div>
//                   <h4 className="font-bold text-lg mb-2">Email:</h4>
//                   <p className="text-gray-600">{contactInfo.email}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Contact Form */}
//           <div>
//             <h3 className="text-2xl font-bold uppercase relative pb-4 mb-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-black">
//               send us an email
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Contact Form Grid */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Name Input */}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
//                     placeholder=" "
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                   <label
//                     htmlFor="name"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
//                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
//                     peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Name
//                   </label>
//                 </div>

//                 {/* Subject Input */}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="subject"
//                     className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
//                     placeholder=" "
//                     value={formData.subject}
//                     onChange={(e) =>
//                       setFormData({ ...formData, subject: e.target.value })
//                     }
//                   />
//                   <label
//                     htmlFor="subject"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
//                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
//                     peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Subject
//                   </label>
//                 </div>
//               </div>

//               {/* Second row of inputs */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Email Input */}
//                 <div className="relative">
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
//                     placeholder=" "
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                   <label
//                     htmlFor="email"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
//                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
//                     peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Email
//                   </label>
//                 </div>

//                 {/* Phone Input */}
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     id="phone"
//                     className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
//                     placeholder=" "
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                   />
//                   <label
//                     htmlFor="phone"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
//                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
//                     peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Phone
//                   </label>
//                 </div>
//               </div>

//               <div className="relative">
//                 <textarea
//                   id="message"
//                   rows={4}
//                   className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer resize-none"
//                   placeholder=" "
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                 />
//                 <label
//                   htmlFor="message"
//                   className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
//                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
//                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                 >
//                   Message
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-black text-white px-8 py-3 uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Google Map */}
//       <div className="w-full h-[600px] mt-32">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.321461145748!2d90.3626239743164!3d23.7815834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76c37aa2ca9%3A0x2f9ff94e01d6d2bf!2sParagon%20Group!5e0!3m2!1sen!2sbd!4v1733045327138!5m2!1sen!2sbd"
//           className="w-full h-full border-0"
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         />
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch contact information.");
        }
        const data = await response.json();
        console.log("the data is", data);
        setContactInfo(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-50 py-32">
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="contact-info">
              <h3 className="text-2xl font-bold relative pb-4 mb-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-black">
                Contact Info
              </h3>

              <p className="text-gray-600 mb-8">{contactInfo.description}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Address:</h4>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Phone:</h4>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Email:</h4>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[600px] mt-32">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.321461145748!2d90.3626239743164!3d23.7815834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76c37aa2ca9%3A0x2f9ff94e01d6d2bf!2sParagon%20Group!5e0!3m2!1sen!2sbd!4v1733045327138!5m2!1sen!2sbd"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}