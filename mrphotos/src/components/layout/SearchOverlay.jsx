// components/layout/SearchOverlay.jsx
export default function SearchOverlay({ isOpen, onClose }) {
  return (
    <div 
      className={`
        fixed inset-0 bg-black/95 z-50 transition-all duration-500
        ${isOpen 
          ? 'opacity-100 visible scale-100' 
          : 'opacity-0 invisible scale-95'
        }
      `}
    >
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 w-[70px] h-[70px] bg-[#1e3a8a] text-white text-4xl 
                   flex items-center justify-center cursor-pointer hover:bg-[#1e4599] transition-colors"
      >
        ×
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[50px]">
        <div className="relative border-b border-[#1e3a8a]">
          <input 
            type="text"
            placeholder="Start Typing..."
            className="w-full h-[60px] bg-transparent text-white text-4xl outline-none 
                     font-[Josefin Sans] placeholder:text-white/50"
          />
          <button 
            type="submit" 
            className="absolute right-0 top-[30px] text-2xl text-white hover:text-[#1e3a8a] transition-colors"
          >
            <i className="ion-ios-search"></i>
          </button>
        </div>
      </div>
    </div>
  )
}