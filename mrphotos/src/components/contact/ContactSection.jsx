
/// Get Method///

// "use client";

// import React, { useState, useEffect } from "react";
// import ContactForm from "./ContactForm";

// export default function ContactSection() {
//   const [contactInfo, setContactInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//           <ContactForm />
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


////Post method////



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
        const response = await fetch("http://127.0.0.1:8000/api/contact", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
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