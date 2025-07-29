import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000]">
    <div className="flex flex-col items-center">
      <RingLoader color="#BB2B29" size={90} />
      <div className="mt-6 text-lg font-bold text-[#BB2B29] dark:text-[#FFE8E8] tracking-wide animate-pulse">
        Loading...
      </div>
    </div>
  </div>
  );
};

export default Loading;
