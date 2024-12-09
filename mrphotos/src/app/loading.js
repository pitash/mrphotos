import React from 'react';
import Image from 'next/image'; 

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Image
        src="/images/logo_1.png" 
        alt="Loading..."
        width={180} 
        height={180} 
        priority 
      />
    </div>
  );
};

export default Loading;
