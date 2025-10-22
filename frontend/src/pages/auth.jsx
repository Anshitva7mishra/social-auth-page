import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

const contributors = [
  {
    name: "Nits",
    designation: "UI/UX and frontend Dev",
    specialty: "Figma & React",
    location: "Pahadi, RJ",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Axar",
    designation: "FullStack Dev",
    specialty: "MERN Stack",
    location: "Ayodhya, UP",
    img: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Charlie",
    designation: "Backend Dev",
    specialty: "Node & Express",
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    linkedin: "#",
  },
  {
    name: "Eve",
    designation: "UX Specialist",
    specialty: "User Research",
    location: "New York, USA",
    img: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
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
  const [screen, setScreen] = useState(window.innerWidth);
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

  const handleFlip = () => {
    if (!canFlip || flipping) return;

    setFlipping(true);
    setShowFlip(true);
    setResult(null);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio playback blocked:", err));
    }

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "google" : "github";
      setResult(outcome);
      setActiveButton(outcome);
      setFlipping(false);
      setCanFlip(false);
    }, 2300);
  };

  const handleBack = () => {
    setShowFlip(false);
    setResult(null);
    setActiveButton(null);
    setCanFlip(true);
  };

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <audio ref={audioRef} src="/flip.mp3" preload="auto" />
      <div
        className={`bg-gray-800 text-white shadow-xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 max-w-6xl w-full overflow-hidden ${
          screen < 768 ? "items-center justify-center" : ""
        }`}
      >
        {screen >= 768 && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-[26rem]">
            {!showFlip && (
              <div className="w-full h-96 flex flex-col items-center">
                <h2 className="flex items-center justify-center text-2xl md:text-3xl font-semibold mb-6 tracking-wide gap-2">
                  Our <span className="text-blue-400">Contributors</span>
                </h2>
                <div
                  className="flex flex-col items-center justify-center text-center bg-gray-700 rounded-2xl w-64 p-5 shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
                  onClick={() => handleCardClick(contributors[index].linkedin)}
                >
                  <img
                    src={contributors[index].img}
                    alt={contributors[index].name}
                    className="rounded-xl w-36 h-36 object-cover mb-4 border border-gray-600"
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
                  <p className="text-gray-400 flex items-center justify-center gap-1 font-mono">
                    <FiMapPin /> {contributors[index].location}
                  </p>
                </div>
              </div>
            )}

            {screen >= 1024 && showFlip && (
              <div className="w-full h-96 flex flex-col items-center justify-center">
                <motion.div
                  className="w-40 h-40 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl cursor-pointer border border-yellow-600"
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
                    ) : (
                      <SiGithub size={40} color="black" />
                    )
                  ) : (
                    <span className="text-4xl font-bold select-none">?</span>
                  )}
                </motion.div>

                {result && (
                  <p className="mt-3 text-center font-semibold text-lg">
                    {result === "google"
                      ? "Heads! Google login enabled."
                      : "Tails! GitHub login enabled."}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div
          className={`flex-1 flex flex-col justify-center items-center gap-4 ${
            screen < 1024 ? "w-full h-full p-6 bg-gray-800 rounded-2xl" : ""
          }`}
        >


          {/* Enter yor webApp name instead of Devkot.... */}
          
          <h2 className="flex items-center justify-center text-2xl md:text-4xl font-semibold mb-6 tracking-wide gap-2 text-center">
            Welcome to Devkot
          </h2>

          <button
            disabled={activeButton === "github"}
            className={`flex items-center justify-center gap-2 w-64 bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-xl shadow-md transition-all text-lg hover:scale-105 hover:shadow-xl ${
              activeButton === "github" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FcGoogle size={24} /> Continue with Google
          </button>

          <button
            disabled={activeButton === "google"}
            className={`flex items-center justify-center gap-2 w-64 bg-gray-900 text-white font-medium py-2 px-4 rounded-xl shadow-md transition-all text-lg hover:scale-105 hover:shadow-xl ${
              activeButton === "google" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <SiGithub size={24} /> Continue with GitHub
          </button>

          {screen >= 1024 && !showFlip && (
            <>
              <div className="my-4 flex items-center w-64">
                <div className="flex-grow h-px bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500"></div>
                <span className="px-3 text-gray-300 text-base font-semibold">
                  OR
                </span>
                <div className="flex-grow h-px bg-gradient-to-l from-gray-500 via-gray-400 to-gray-500"></div>
              </div>

              <p className="text-gray-400 text-lg text-center">
                Let the <span className="text-yellow-400 text-2xl">coin</span>{" "}
                flip decide your login option
              </p>

              <button
                onClick={handleFlip}
                disabled={!canFlip}
                className={`mt-2 w-48 relative bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-full shadow-xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl active:scale-95 active:rotate-0 ${
                  !canFlip ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="absolute left-2 -top-1 animate-bounce text-xl">
                  🪙
                </span>
                Flip <span className="text-white">Coin</span>
              </button>
            </>
          )}

          {screen >= 1024 && showFlip && result && (
            <button
              onClick={handleBack}
              className="mt-2 w-48 bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full shadow-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl active:scale-95 active:rotate-0"
            >
              <motion.span
                className="inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FiArrowLeft size={20} />
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
