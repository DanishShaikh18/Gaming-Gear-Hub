import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragControls } from 'framer-motion';

const featuredItems = [
  {
    id: 1,
    title: "Black Shark",
    subtitle: "Green Ghost Gamepad",
    image: "https://fdn.gsmarena.com/imgroot/news/23/09/black-shark-september-global-launch-accessories/inline/-1200/gsmarena_003.jpg",
    cta: "SHOP NOW",
    link: "https://www.amazon.com/Black-Shark-Gamepad-Controller-Smartphones/dp/B0B5NQNQ9Z",
    colorScheme: "bg-[linear-gradient(to_right,black_0%,rgba(0,0,0,0.95)_10%,rgba(0,0,0,0.85)_20%,rgba(0,0,0,0.7)_35%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.3)_65%,rgba(0,0,0,0.1)_80%,transparent_95%)]"
  },
  {
    id: 2,
    title: "STREAMER STARTER PACK",
    subtitle: "For the Next Big Creator",
    image: "https://s3-alpha-sig.figma.com/img/4e6f/c4f6/a536f95d35cc081f4931ab42c45fb424?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Iwhxm7abvNIbvbrfMaFyicfSLXHhqGcMTzLy-EM2NLCXG4RZuMq6mZEbqx7QeagCKpZPdajBEIAQPj5ygRIbaUSYfuUq0MNMQJFdLEquqw4tuMSbVWeCzNCY8oU~iS5~VtiFnQDBqIAVIGOZ9~EoWujrN5NEhIPJwo9QdLCkku74u1wLNjONn8aHbkSvRI9lvHUhhRsKYqyg1M6oopoY5dMMS2LkarehjGDnj8oJLvyKGL5KB01A7W-6jNDktTbYyUxOTe3w2pZ6NfA4jRwtymVAS6yD3Mfbvo1Z4Rk4pijAFcLf~HQvFzi-umqq0gitiqNgC0vKcLRnFny0I66kVA__",
    cta: "EXPLORE",
    link: "#",
    colorScheme: "from-black-600/90 to-black/0"
  },
  {
    id: 3,
    title: "PRO PC SETUP",
    subtitle: "Maxed Performance Gear",
    image: "https://wallpapers.com/images/hd/gaming-pc-setup-4032-x-3024-wallpaper-6l7wr0g4kd5oyusc.jpg",
    cta: "DISCOVER",
    link: "#",
    colorScheme: "from-red-900/90 to-black-500/0"
  },
  {
    id: 4,
    title: "Artic Fox",
    subtitle: "Not just white— white-hot.",
    image: "https://s3-alpha-sig.figma.com/img/e086/bab2/d650e8a834daa23daeb87e5cc2ea78f4?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rT61pHa-rxRw28et-Et4wAiPv5Pe6beHNSYD3t66sUodMzkMZ2-Ys94tDyZRBzQjIQT6p2shHgy-uDPjDRd6BjOqQ17EmyAQGQqYx7IOvVWlJMEVqmdeBxGrlGE6mtLSY7KA6Sep~l1-rNx~1ccjXNu7mmnKgUpkT856~f1593O~B52752mnuPwo2kb7Sf6bEYid257pBKKvQZ22-CErfa5JQIuXcbT1nyHCE~DlIPGWYkbgPCZoMGvNmRBQTlXvxC1mcFTf3Tv-zF5yW0YcFCi29RMM8gkb3EuPgSbC8dhlXkHiyqEEuxhpFIudXw5okg~Nr~O~RAk~avcE0aiEWg__",
    cta: "VIEW NOW",
    link: "#",
    colorScheme: "bg-[linear-gradient(to_right,rgba(9,18,36,1)_0%,rgba(9,18,36,0.95)_15%,rgba(9,18,36,0.85)_30%,rgba(9,18,36,0.7)_50%,rgba(9,18,36,0)_85%)]"
  },
  {
    id: 5,
    title: "ELITE ESPORTS Headset",
    subtitle: "Gear Trusted by Pros",
    image: "https://s3-alpha-sig.figma.com/img/1b73/f377/a4a3a864988a89c147731850414e0fc8?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ttiwZOdWxeS~cVzKqPzw7~kZE6KkpFDKZha92yk1m~oIrklDxOXLOCZUcYsezzLywwJ7m3LaHwmSSvpaISIDtkM9SjXqbJ3p1tXaN7QrBWD-leR~vMfQUPxGBuXi8PLiYw-5L5w3tG1hARpnTzqeRHAeINm7sAQNeaq~TVa3Eh9uhpGXz4FhH34WrqIB55DH5rP~mc-erNLZjYP4T-b9fnmPeVKd525rx3F3I5KINmZVXMRKSWNKMy7yiyKP7yU63lmKVH8rmRXn2g6w3Uw8bAP7eyCPRtKjjNMfXFN7hXyGS3IINwVL6m-2y341lSkl~iTF-OsMNp7Sv8mEAI-VMw__",
    cta: "CHECK IT OUT",
    link: "#",
    colorScheme: "from-black/90 "
  }
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef(null);
  const dragControls = useDragControls();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '-100%' : '100%',
      transition: { duration: 0.9 }
    })
  };

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -50) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    } else if (info.offset.x > 50) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
    }
  };

  const handleCTAClick = () => {
    const currentItem = featuredItems[currentIndex];
    if (currentItem.link && currentItem.link !== "#") {
      window.open(currentItem.link, "_blank");
    }
  };

  return (
    <div className="relative w-full h-[100vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full">
            <img
              src={featuredItems[currentIndex].image}
              alt={featuredItems[currentIndex].title}
              className="absolute inset-0 w-full h-full object-contain object-right"
              loading="eager"
              fetchpriority="high"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${featuredItems[currentIndex].colorScheme}`}></div>
            <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-4xl space-y-6">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#fafaff] font-['Rajdhani'] tracking-tight"
                >
                  {featuredItems[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-300 max-w-2xl"
                >
                  {featuredItems[currentIndex].subtitle}
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleCTAClick}
                  className="mt-8 px-8 py-3 bg-white text-gray-900 text-lg font-bold rounded-md hover:bg-gray-100 transition-all hover:scale-105"
                >
                  {featuredItems[currentIndex].cta}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
