"use client"

import Image from 'next/image';
import '../ui/css/Carousel.css'
import { useEffect, useState } from "react";

type CarouselItem = {
  name: string;
  feedback: string;
  image: string;
};


type CarouselProp = {
  items: CarouselItem[];
  reverse?: boolean
  className?: string
}

export default function Carousel({ items, reverse = false, className }: CarouselProp) {
  // const [visible, setVisible] = useState([]);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   let i = 0;
  //   function addNextBatch() {
  //     setVisible((prev) => [...prev, ...items.slice(i, i + 5)]);
  //     i += 10;
  //     if (i < items.length) {
  //       setTimeout(addNextBatch, 50);
  //     }

  //     if (i > items.length) {
  //       setLoading(false)
  //     }
  //   }
  //   addNextBatch();
  // }, [items]);

  return (
    <div className="carousel hidden-up bg-dark relative overflow-hidden pb-6">
      <div className={`${className}`}>
        <div className={`${reverse ? 'carousel-track-reverse' : 'carousel-track'} gap-6`}>
          {items.map((item, i) => (
            <div key={i} className='max-w-sm bg-gray-900 border border-gray-700 p-8 rounded-md space-y-4'>
              <div className='flex items-center gap-4'>
                <Image src={item.image} alt={item.name} width={100} height={100} className="w-12 h-12 border border-gray-700 bg-black rounded-full overflow-hidden" loading="lazy" />
                <span className='font-semibold text-xl text-green-primary'>{item.name}</span>
              </div>
              <span className='italic text-lg'>"{item.feedback}"</span>
            </div>
          ))}
          {items.map((item, i) => (
            <div key={i} className='max-w-sm bg-gray-900 border border-gray-700 p-8 rounded-md space-y-4'>
              <div className='flex items-center gap-4'>
                <Image src={item.image} alt={item.name} width={100} height={100} className="w-12 h-12 border border-gray-700 bg-black rounded-full overflow-hidden" loading="lazy" />
                <span className='font-semibold text-xl text-green-primary'>{item.name}</span>
              </div>
              <span className='italic text-lg'>"{item.feedback}"</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fade fade-left"></div>
      <div className="fade fade-right"></div>
    </div>
  );
};

;
