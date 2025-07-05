import { Link } from 'react-router-dom';

const BudgetBanner = () => {
  return (
    <section
      className="relative h-[510px] py-21 text-white px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #072015, #004B6F )',
      }}
    >
      {/* Background image from right, covers 40-50%, cropped if needed */}
      <div
        className="absolute inset-y-0 right-0 w-[45%] bg-no-repeat bg-right bg-contain z-0"
        style={{
          backgroundImage:
            "url('https://s3-alpha-sig.figma.com/img/3181/75eb/7a84253747f72e16c280799472a6f934?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=m0W86r7GnHa9JzU04kQzO6waCw8SRUpUNZaN8QFV5a7o8saOuP-WRK2Q0PY~1M7pf8e246ld0vrQoX2tVty~N4Frm-PvfXYIOj8ozHhWiGGns-TazFMM6TXvF7e0IjJhZTPAMikC19RZXXQWZKvjqWFN4CSb4codUi6Hwl0T9E-gKhL4B8sQti2rpa1Nezhb~0kGKZrO7kfL6ZSMRtdL33uICCkvS8T-yYfSQMts0KKgCx6Tj-26yup08lmQqNlkno9a8ebNa3v95dF9akff9E7KBP3MkwMG9wJc2ZfHDsw7iaajKU1IFTACDlQAnnlpIBX3Gj0UGLwJ-KKW3lWthg__')",
        }}
      ></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold font-['Rajdhani']">
            Build Your Dream Gaming Setup 🕹️
          </h2>
          <p className="text-xl text-gray-200 font-['Rajdhani']">
            Choose your budget and get ready-made, expert-picked gaming PC setups tailored to your price range — CPU, GPU, RAM, Monitor, and more!
          </p>
          <Link to="/budget-recommendations">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-xl transition duration-300">
              Explore Setups
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BudgetBanner;
