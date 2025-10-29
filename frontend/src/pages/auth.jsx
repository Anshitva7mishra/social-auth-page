import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { SiGithub, SiLinkedin, SiApple } from "react-icons/si";
import { FiArrowLeft, FiMapPin, FiCheckCircle } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const contributors = [
  {
    name: "Nits",
    designation: "UI/UX and Frontend Dev",
    specialty: "Figma & React",
    location: "Pahadi, RJ",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Axar",
    designation: "FullStack Dev",
    specialty: "MERN Stack",
    location: "Ayodhya, UP",
    img: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Charlie",
    designation: "Backend Dev",
    specialty: "Node & Express",
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Eve",
    designation: "UX Specialist",
    specialty: "User Research",
    location: "New York, USA",
    img: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
];

const Auth = () => {
  const [index, setIndex] = useState(0);
  const [showFlip, setShowFlip] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [canFlip, setCanFlip] = useState(true);
  const [screen, setScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screen < 768 || showFlip) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % contributors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showFlip, screen]);

  const handleFlip = useCallback(() => {
    if (!canFlip || flipping) return;
    setFlipping(true);
    setShowFlip(true);
    setResult(null);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const providers = ["google", "github", "apple", "linkedin"];
    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];

    setTimeout(() => {
      setResult(randomProvider);
      setActiveButton(randomProvider);
      setFlipping(false);
      setCanFlip(false);

      const providerName =
        randomProvider.charAt(0).toUpperCase() + randomProvider.slice(1);
      toast.success(`${providerName} login selected`, {
        icon: <FiCheckCircle className="text-green-400 text-lg" />,
        style: {
          borderRadius: "8px",
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #22d3ee",
        },
      });
    }, 2300);
  }, [flipping, canFlip]);

  const handleBack = () => {
    setShowFlip(false);
    setResult(null);
    setActiveButton(null);
    setCanFlip(true);
  };

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  const isDisabled = (provider) =>
    activeButton && activeButton !== provider ? true : false;

  const getButtonClasses = (provider, baseClasses) => {
    const disabled = isDisabled(provider);
    if (disabled)
      return `${baseClasses} opacity-40 cursor-not-allowed pointer-events-none transform-none shadow-none hover:scale-100 hover:shadow-none`;
    return `${baseClasses} hover:scale-105 hover:shadow-xl`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 overflow-x-hidden">
      <Toaster position="top-center" />
      <audio ref={audioRef} src="/flip.mp3" preload="auto" />
      <div
        className={`bg-gray-800 text-white rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 max-w-6xl w-full border-2 border-blue-500 shadow-[0_0_15px_#3b82f6] overflow-hidden`}
      >
        <div className="flex-1 flex flex-col justify-center items-center min-h-[20rem] lg:min-h-[26rem]">
          {!showFlip && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-wide text-center">
                Our <span className="text-blue-400">Contributors</span>
              </h2>
              <div
                className="flex flex-col items-center justify-center text-center bg-gray-700 rounded-2xl w-60 sm:w-72 md:w-64 p-5 shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
                onClick={() => handleCardClick(contributors[index].linkedin)}
              >
                <img
                  src={contributors[index].img}
                  alt={contributors[index].name}
                  className="rounded-xl w-32 h-32 sm:w-36 sm:h-36 object-cover mb-4 border border-gray-600"
                />
                <h3 className="text-lg font-bold font-serif tracking-wide text-yellow-400 mb-1">
                  {contributors[index].name}
                </h3>
                <p className="text-gray-300 font-mono italic mb-1">
                  {contributors[index].designation}
                </p>
                <p className="text-gray-400 font-mono mb-1">
                  {contributors[index].specialty}
                </p>
                <p className="text-gray-400 flex items-center justify-center gap-1 font-mono text-sm">
                  <FiMapPin /> {contributors[index].location}
                </p>
              </div>
            </div>
          )}

          {screen >= 1024 && showFlip && (
            <div className="w-full flex flex-col items-center justify-center">
              <motion.div
                className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl cursor-pointer border border-yellow-600"
                style={{ perspective: 1000 }}
                animate={
                  flipping
                    ? { rotateY: [0, 1080], rotateX: [0, 20, -20, 0] }
                    : {}
                }
                transition={{
                  duration: 2.3,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1],
                }}
              >
                {result ? (
                  result === "google" ? (
                    <FcGoogle size={40} />
                  ) : result === "github" ? (
                    <SiGithub size={40} color="black" />
                  ) : result === "apple" ? (
                    <SiApple size={40} color="black" />
                  ) : (
                    <SiLinkedin size={40} color="#0A66C2" />
                  )
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold select-none">
                    ?
                  </span>
                )}
              </motion.div>

              {result && (
                <p className="mt-3 text-center font-semibold text-base sm:text-lg">
                  {result.charAt(0).toUpperCase() + result.slice(1)} login
                  enabled.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-4 w-full">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-center">
            Welcome to ProjectUI
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-sm">
            <button
              disabled={isDisabled("google")}
              className={getButtonClasses(
                "google",
                "flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-xl shadow-md text-base sm:text-lg transition-all"
              )}
            >
              <FcGoogle size={22} /> Continue with Google
            </button>

            <button
              disabled={isDisabled("github")}
              className={getButtonClasses(
                "github",
                "flex items-center justify-center gap-2 w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-xl shadow-md text-base sm:text-lg transition-all"
              )}
            >
              <SiGithub size={22} /> Continue with GitHub
            </button>

            <button
              disabled={isDisabled("apple")}
              className={getButtonClasses(
                "apple",
                "flex items-center justify-center gap-2 w-full bg-black text-white font-medium py-2 px-4 rounded-xl shadow-md text-base sm:text-lg transition-all"
              )}
            >
              <SiApple size={22} /> Continue with Apple
            </button>

            <button
              disabled={isDisabled("linkedin")}
              className={getButtonClasses(
                "linkedin",
                "flex items-center justify-center gap-2 w-full bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow-md text-base sm:text-lg transition-all"
              )}
            >
              <SiLinkedin size={22} /> Continue with LinkedIn
            </button>
          </div>

          {screen >= 1024 && !showFlip && (
            <>
              <div className="my-4 flex items-center w-full max-w-sm">
                <div className="flex-grow h-px bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500"></div>
                <span className="px-3 text-gray-300 text-base font-semibold">
                  OR
                </span>
                <div className="flex-grow h-px bg-gradient-to-l from-gray-500 via-gray-400 to-gray-500"></div>
              </div>

              <p className="text-gray-400 text-base sm:text-lg text-center">
                Let the <span className="text-yellow-400 text-xl">🪙 Coin</span>{" "}
                flip decide your login option
              </p>

              <motion.button
                onClick={handleFlip}
                disabled={!canFlip}
                whileHover={{ y: -6 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className={`mt-2 cursor-pointer w-44 sm:w-48 relative bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-full shadow-xl font-bold text-base sm:text-lg transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl active:scale-95 active:rotate-0 ${
                  !canFlip ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Flip <span className="text-white">🪙 Coin</span>
              </motion.button>
            </>
          )}

          {screen >= 1024 && showFlip && result && (
            <button
              onClick={handleBack}
              className="mt-2 w-44 cursor-pointer sm:w-48 bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full shadow-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl active:scale-95 active:rotate-0"
            >
              <motion.span
                className="inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FiArrowLeft size={18} />
              </motion.span>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
