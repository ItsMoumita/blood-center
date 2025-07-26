import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section className="relative bg-cover  bg-center py-16" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"
        }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            <div className="container relative mx-auto px-4">
                <div className="flex flex-wrap -mx-4 ">
                    {/* Left Side - Contact Info */}
                    <div className="w-full md:w-1/2 mb-4 px-4 flex items-center">
                        <div className="relative w-full h-full backdrop-blur-sm rounded-lg p-8" style={{
                            backgroundImage: "url('https://i.ibb.co/KpVpT5SY/Google-Map-TA.jpg')"
                        }}>
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-white/70 dark:bg-[#0F172A]/70 rounded-lg opacity-80"></div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-[#BB2B29] dark:text-[#FFE8E8] mb-2">
                                    Let's get in touch
                                </h2>
                                <p className="text-gray-600 dark:text-[#FFE8E8]/80 mb-8">
                                    We're open for any suggestion or just to have a chat.
                                </p>

                                <div className="space-y-6">
                                    {/* Phone */}
                                    <div className="flex items-start">
                                        <FaPhone className="text-[#BB2B29]  text-xl mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-[#FFE8E8]/80">1.800.851.7910</p>
                                            <p className="font-medium text-gray-500 dark:text-[#FFE8E8]/80">512.595.1473</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start">
                                        <FaEnvelope className="text-[#BB2B29]  text-xl mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-[#FFE8E8]/80">bloodcenter@gmail.com</p>
                                            <p className="text-gray-500 dark:text-[#FFE8E8]/60">donateblood@gmail.com</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="text-[#BB2B29] text-xl mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-[#FFE8E8]/80">600 Congress Ave,</p>
                                            <p className="text-gray-500 dark:text-[#FFE8E8]/60">Floor 14, Austin, TX 78701</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="w-full md:w-1/2 px-4 flex items-center">
                        <div className="bg-[#BB2B29]/80 dark:bg-[#530404]/80 rounded-lg p-8 w-full h-full">
                            <form className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="FULL NAME"
                                        className="w-full p-3 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-0"
                                        aria-label="Full Name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        placeholder="EMAIL"
                                        className="w-full p-3 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-0"
                                        aria-label="Email"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        placeholder="MESSAGE"
                                        rows="4"
                                        className="w-full p-3 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-0"
                                        aria-label="Message"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-[#BB2B29]  dark:text-[#530404] font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                                >
                                    SEND MESSAGE
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;