import React from "react";

const people = [
  {
    name: "Jane Doe",
    title: "UI & UX Designer",
    img: "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review: "The design work exceeded all my expectations. The attention to detail and user experience considerations were exceptional."
  },
  {
    name: "Alex Smith",
    title: "CEO Expert",
    img: "https://images.pexels.com/photos/36469/woman-person-flowers-wreaths.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review: "Working with this team transformed our business. Their strategic insights and execution were game-changing for our company."
  },
  {
    name: "Emily New",
    title: "Web Designer",
    img: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review: "The website redesign boosted our conversion rates by 40%. The creative solutions were both beautiful and functional."
  },
  {
    name: "Lisa Boley",
    title: "Marketing Coordinator",
    img: "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review: "Our marketing campaign results were outstanding. The team understood our brand perfectly and delivered beyond targets."
  },
  {
    name: "Michael Tan",
    title: "Product Manager",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review: "The product development process was smooth and efficient. We launched ahead of schedule with fantastic user feedback."
  }
];

const ReviewCarousel = () => {
  return (
    <div className="w-full bg-[#000000] py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-12 font-[Rajdhani]">
        Customer <span className="text-green-500">Reviews</span>
      </h2>
      <div className="w-full h-[480px] flex justify-center gap-0 font-mono px-4">
        {people.map((person, idx) => (
          <div
            key={idx}
            className="group relative flex-none w-[160px] hover:w-[380px] duration-500 cursor-pointer rounded-lg  shadow-[1px_5px_15px_#000000] hover:shadow-[1px_3px_15px_#05DF72] transform hover:-translate-y-5 hover:scale-[1.1] overflow-visible bg-cover bg-center z-10 hover:z-20"
            style={{ backgroundImage: `url(${person.img})`,
                     borderRadius:'2' }}
          >
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-0 w-full p-4 text-white flex flex-col justify-end items-center z-10">
              <h2 className="text-xl">{person.name}</h2>
              <span className="text-base mt-1">{person.title}</span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              <div className="w-full h-[60%] overflow-y-auto p-4 text-white text-center flex flex-col justify-center">
                <p className="text-sm md:text-base italic">
                  "{person.review}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;