// app/contact/page.jsx
import ContactSection from "@/components/contact/ContactSection"
import ContactHeader from "@/components/contact/ContactHeader"

export default function Contact() {
    return (
      <div className="relative min-h-screen px-5 md:px-20 pt-32 pb-24 bg-gray-100">
        {/* Side text */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
            Contact Us
          </span>
        </div>
  
        <ContactHeader />
        <ContactSection />
      </div>
    )
  }