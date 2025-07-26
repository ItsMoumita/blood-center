import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section className="relative bg-cover bg-center py-16" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"
        }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            <div className="container relative mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Left Side - Contact Info */}
                    <div className="w-full md:w-1/2 px-4" >
                        <div className=" backdrop-blur-sm rounded-lg p-8" style={{
                            backgroundImage: "url('https://i.ibb.co/KpVpT5SY/Google-Map-TA.jpg')"
                        }}>
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-white/70 rounded-lg opacity-80"></div>

                            <h2 className="text-2xl font-bold text-[#BB2B29] dark:text-[#ff4444] mb-2">
                                Let's get in touch
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                We're open for any suggestion or just to have a chat.
                            </p>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start">
                                    <FaPhone className="text-[#BB2B29] dark:text-[#ff4444] text-xl mt-1 mr-3" />
                                    <div>
                                        <p className="font-medium">1.800.851.7910</p>
                                        <p className="text-gray-500">512.595.1473</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start">
                                    <FaEnvelope className="text-[#BB2B29] dark:text-[#ff4444] text-xl mt-1 mr-3" />
                                    <div>
                                        <p className="font-medium">info@suubo.io</p>
                                        <p className="text-gray-500">sales@suubo.io</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="text-[#BB2B29] dark:text-[#ff4444] text-xl mt-1 mr-3" />
                                    <div>
                                        <p className="font-medium">600 Congress Ave,</p>
                                        <p className="text-gray-500">Floor 14, Austin, TX 78701</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="w-full md:w-1/2 px-4">
                        <div className="bg-[#BB2B29] dark:bg-[#530404] rounded-lg p-8">
                            <form className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="FULL NAME"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                                        aria-label="Full Name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        placeholder="EMAIL"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                                        aria-label="Email"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        placeholder="MESSAGE"
                                        rows="4"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                                        aria-label="Message"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-[#27AE60] font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
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