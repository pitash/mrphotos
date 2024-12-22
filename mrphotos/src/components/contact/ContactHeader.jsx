// components/contact/ContactHeader.jsx
export default function ContactHeader() {
    return (
      <div className="relative bg-[url('/images/header-bg.jpg')] bg-cover bg-center py-48">
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center">
          <div className="container mx-auto px-5">
            <h1 className="relative inline-block text-4xl md:text-5xl font-semibold text-white uppercase mb-10 pb-8 px-5">
              Contact Us
              <span className="absolute left-1/2 top-[70%] -translate-x-1/2 text-white">
                <i className="fa fa-camera"></i>
              </span>
            </h1>
            
            <p className="text-white max-w-2xl mx-auto text-justify">
            "Stay connected with Paragon Group! Whether you have inquiries, suggestions, or business opportunities, we’re here to help. <br className="hidden md:block" />Your input drives innovation. Let’s shape a better tomorrow—together."  massa eleifend et purus vel feugiat rutrum nulla cras vitae est.
            </p>
          </div>
        </div>
      </div>
    )
  }