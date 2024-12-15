// components/about/AboutIntro.jsx
import Image from 'next/image'

export default function AboutIntro() {

    const infoBoxes = [
        {
          number: "01",
          title: "IMAGINE A STORY",
          description: "Photography is a fantastic storytelling medium. Whether you're telling a story with one image, a sequence, a series, or an entire portfolio, the possibilities are endless. Just ask yourself what story you want to tell, and photography can get you there. Mastering the art of visual storytelling can transform simple snapshots into impactful narratives."
        },
        {
          number: "02",
          title: "SEIZE THE MOMENT",
          description: "With a photo you can capture a moment, and have it forever. I think we take that idea for granted, with photography being so ubiquitous these days. But seriously just take a second to appreciate that. If you did that in Ancient Greece they'd call you a sorcerer. Or a god. It is a testament to the impact a photo can attain"
        },
        {
          number: "03",
          title: "SEE THE BEAUTY",
          description: "Once you start noticing nature's details, you inevitably start to see how much beauty is all around you. Every day is filled with it—in the most ordinary or unexpected places. When you start to derive happiness from seeing some particularly awesome light, you'll realize that photography has changed your everyday experience."
        }
      ];


  return (
    <div className='bg-white'>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mx-auto  p-8 md:p-16">
        {/* Left Column - Title */}
        <div className="flex flex-col justify-between gap-5">
            <div className="relative h-full mx-auto md:mx-0">
                <Image
                    src="/images/profile.jpeg"
                    alt="Moshiur Rahman"
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            {/* <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight">
            Our Passion On
            <br />
            Photography
            </h2> */}
        </div>

        {/* Right Column - Content */}
        <div className="space-y-8">
            <h3 className="text-2xl font-semibold">
            Moshiur Rahman
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
            Photography is more than my passion - it's my way of breathing in the world around me. 
            Each time I raise the camera to my eye, time seems to slow, and I find myself in perfect 
            harmony with the moment. The gentle click of the shutter becomes a meditation, a pause in 
            time where everything aligns. To nurture this lifelong devotion, I constantly seek new perspectives 
            and draw inspiration from the ever-changing canvas of life. I find endless fascination in the delicate 
            dance between light and shadow, the subtle interplay of colors that paint our world, and the intricate 
            relationships between form and space. My greatest joy comes from transforming fleeting moments into timeless
             narratives - whether it's capturing the soft golden light of dawn breaking over a landscape, freezing the 
             subtle expressions that tell human stories, or finding beauty in the geometric patterns of urban architecture.
             Through my lens, I strive to infuse static images with dynamic energy, turning brief instances into eternal memories 
             that speak to the heart of human experience.

            </p>
        </div>
        </div>
        {/* Info Boxes */}
        <div className="bg-gray-50 py-20 ">
            <div className=" mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {infoBoxes.map((box, index) => (
                    <div 
                    key={index}
                    className="flex flex-col space-y-6 p-8"
                    >
                    <span className="text-4xl font-light text-gray-400">
                        {box.number}
                    </span>
                    
                    <h3 className="text-xl font-bold text-gray-900">
                        {box.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-justify">
                        {box.description}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </div> 
    </div>
  )
}