"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Big Sale - Up to 50% Off!",
    text: "Biggest Sale of the Year!",
    subtext: "Up to 50% off on electronics & more",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "New Arrivals",
    text: "Fresh Styles Just Landed",
    subtext: "Check out the latest fashion trends",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Gadgets Galore",
    text: "Upgrade Your Tech!",
    subtext: "Exclusive discounts on top brands",
  },
];

export const AmazonStyleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {theme} = useTheme();

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative w-full min-h-[100%] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full min-w-full h-[600px] bg-gray-200 justify-center items-center"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {theme === "dark" ? (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>
            )}
            <div className="relative t-0 bg-black/70 p-6 text-white">
              <h2 className="text-5xl font-bold mb-4">{slide.text}</h2>
              <p className="text-3xl">{slide.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white p-2 rounded-full"
      >
        <ChevronLeft className="h-6 w-6 text-black" />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white p-2 rounded-full"
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </Button>

      {/* Dots Indicator */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full cursor-pointer transition-all",
              index === currentIndex ? "bg-white scale-110" : "bg-gray-400"
            )}
          />
        ))}
      </div> */}
    </div>
  );
};
