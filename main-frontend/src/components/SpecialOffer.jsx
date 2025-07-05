import { useEffect, useState } from "react";

const SpecialOffer = () => {
  const endTime = new Date("2025-06-23T12:00:00");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  }

  return (
    <a
      href="https://www.amazon.in/Virtual-Reality-Headset-Headphones-Gaming/dp/B097JVLW3L?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AUJVXNFKK2B10&th=1"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-screen block"
    >
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-left"
        style={{
          backgroundImage: `url('https://gaming-workdo.myshopify.com/cdn/shop/files/offer-bg-img.png?v=1721386355')`,
        }}
      >
        <div className="text-white max-w-xl justify-left text-left p-4">
          <h1 className="text-8xl md:text-7xl mb-2">Get Special Price</h1>
          <p className="text-6xl text-green-400 font-semibold mb-6">Up To 50% OFF</p>
          <div className="flex gap-4 text-6xl text-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="bg-green-800/40 p-4 rounded-md min-w-[60px]">
                <p className="text-4xl font-bold text-green-500">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default SpecialOffer;
