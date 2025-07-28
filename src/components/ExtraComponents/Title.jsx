const Title = ({ children }) => {
  return (
    <div className=" border-s-8 border-[#530404]/80 dark:border-[#BB2B29]  ps-3">
      <h2 className="text-4xl lg:text-6xl text-black/60 dark:text-white/80 font-bold mb-2 md:mb-4">{children}</h2>
      <p className="absolute bottom-0 text-9xl -z-10 opacity-5">{children}</p>
    </div>
  );
};

export default Title;
