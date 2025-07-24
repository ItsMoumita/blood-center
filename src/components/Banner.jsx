import animation from "../assets/cooking.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <section className="bg-background bg-contain bg-fixed">
      <div
        id="banner"
        className="flex min-h-screen flex-col-reverse md:flex-row items-center justify-around bg-surface bg-opacity-95"
      >
        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary">
            Basic{" "}
            <span className="text-primary dark:text-purple-400 transition-colors">
              Authentication
            </span>{" "}
            Template
          </h1>

          <div className="max-w-[520px] md:rounded-full p-3 bg-primary/90 text-background font-medium shadow-md mx-auto md:mx-0 animate-pulse">
            Start your project the smart, simple way.
          </div>

          <h2 className="text-2xl md:text-3xl text-textSecondary font-medium">
            Build in the best way
          </h2>

          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-primary text-background px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-primary/80 transition">
              Join Now
            </button>
            <button className="bg-surface border border-primary text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-background transition">
              See More
            </button>
          </div>
        </div>

        {/* Animation */}
        <div className="max-w-[400px] w-full flex items-center justify-center mb-8 md:mb-0">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;