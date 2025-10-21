// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { SiGithub } from "react-icons/si";
// import { FiArrowLeft, FiMapPin } from "react-icons/fi";
// import loginAnsh from "../assets/loginAnsh.png";
// import loginNitin from "../assets/loginNitin.png";

// const contributors = [
//   {
//     name: "Nits",
//     designation: "UI/UX and frontend Dev",
//     specialty: "Figma & React",
//     location: "Pahadi, RJ",
//     img: loginNitin,
//     linkedin: "https://www.linkedin.com/in/nitin-goyal-33a273300/",
//   },
//   {
//     name: "Ansh",
//     designation: "FullStack Dev",
//     specialty: "MERN Stack",
//     location: "Ayodhya, UP",
//     img: loginAnsh,
//     linkedin: "https://www.linkedin.com/in/anshitva-mishra-1099392a7/",
//   },
//   {
//     name: "Charlie",
//     designation: "Backend Dev",
//     specialty: "Node & Express",
//     location: "London, UK",
//     img: "https://i.pravatar.cc/150?img=3",
//     linkedin: "https://www.linkedin.com/in/ananya-goswami-3a76782b3/",
//   },
//   {
//     name: "Diana",
//     designation: "Full Stack",
//     specialty: "MERN & API Design",
//     location: "Toronto, Canada",
//     img: "https://i.pravatar.cc/150?img=4",
//     linkedin: "#",
//   },
//   {
//     name: "Eve",
//     designation: "UX Specialist",
//     specialty: "User Research",
//     location: "New York, USA",
//     img: "https://i.pravatar.cc/150?img=5",
//     linkedin: "#",
//   },
//   {
//     name: "Frank",
//     designation: "QA Engineer",
//     specialty: "Automated Testing",
//     location: "Sydney, Australia",
//     img: "https://i.pravatar.cc/150?img=6",
//     linkedin: "#",
//   },
// ];

// const Auth = () => {
//   const [index, setIndex] = useState(0);
//   const [showFlip, setShowFlip] = useState(false);
//   const [flipping, setFlipping] = useState(false);
//   const [result, setResult] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [canFlip, setCanFlip] = useState(true);
//   const [screen, setScreen] = useState(window.innerWidth);
//   const audioRef = useRef(null);

//   // ✅ Responsive screen tracking
//   useEffect(() => {
//     const handleResize = () => setScreen(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ Auto-rotate contributors on desktop
//   useEffect(() => {
//     if (screen < 768 || showFlip) return;
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % contributors.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [showFlip, screen]);

//   // ✅ Enhanced coin flip handler
//   const handleFlip = () => {
//     if (!canFlip || flipping) return;

//     setFlipping(true);
//     setShowFlip(true);
//     setResult(null);

//     // 🎧 Restart and play sound fully
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       audioRef.current
//         .play()
//         .catch((err) => console.log("Audio playback blocked:", err));
//     }

//     // 🎯 Match sound & animation (≈2.3s duration)
//     setTimeout(() => {
//       const outcome = Math.random() > 0.5 ? "google" : "github";
//       setResult(outcome);
//       setActiveButton(outcome);
//       setFlipping(false);
//       setCanFlip(false);
//     }, 2300);
//   };

//   const handleBack = () => {
//     setShowFlip(false);
//     setResult(null);
//     setActiveButton(null);
//     setCanFlip(true);
//   };

//   const handleCardClick = (url) => {
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
//       {/* ✅ Audio must be in /public */}
//       <audio ref={audioRef} src="/flip.mp3" preload="auto" />
//       <div
//         className={`bg-gray-800 text-white shadow-xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 max-w-6xl w-full overflow-hidden ${
//           screen < 768 ? "items-center justify-center" : ""
//         }`}
//       >
//         {/* LEFT: Contributors Carousel */}
//         {screen >= 768 && (
//           <div className="flex-1 flex flex-col justify-center items-center min-h-[26rem]">
//             {!showFlip && (
//               <div className="w-full h-96 flex flex-col items-center">
//                 <h2 className="flex items-center justify-center text-2xl md:text-3xl font-semibold mb-6 tracking-wide gap-2">
//                   Our <span className="text-blue-400">Contributors</span>
//                 </h2>
//                 <div
//                   className="flex flex-col items-center justify-center text-center bg-gray-700 rounded-2xl w-64 p-5 shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
//                   onClick={() => handleCardClick(contributors[index].linkedin)}
//                 >
//                   <img
//                     src={contributors[index].img}
//                     alt={contributors[index].name}
//                     className="rounded-xl w-36 h-36 object-cover mb-4 border border-gray-600"
//                   />
//                   <h3 className="text-lg font-bold font-serif tracking-wide text-yellow-400 mb-1">
//                     {contributors[index].name}
//                   </h3>
//                   <p className="text-gray-300 font-mono italic mb-1">
//                     {contributors[index].designation}
//                   </p>
//                   <p className="text-gray-400 font-mono mb-1">
//                     {contributors[index].specialty}
//                   </p>
//                   <p className="text-gray-400 flex items-center justify-center gap-1 font-mono">
//                     <FiMapPin /> {contributors[index].location}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* COIN FLIP (desktop only) */}
//             {screen >= 1024 && showFlip && (
//               <div className="w-full h-96 flex flex-col items-center justify-center">
//                 <motion.div
//                   className="w-40 h-40 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl cursor-pointer border border-yellow-600"
//                   style={{ perspective: 1000 }}
//                   animate={
//                     flipping
//                       ? { rotateY: [0, 1080], rotateX: [0, 20, -20, 0] }
//                       : {}
//                   }
//                   transition={{
//                     duration: 2.3,
//                     ease: "easeInOut",
//                     times: [0, 0.3, 0.7, 1],
//                   }}
//                 >
//                   {result ? (
//                     result === "google" ? (
//                       <FcGoogle size={40} />
//                     ) : (
//                       <SiGithub size={40} color="black" />
//                     )
//                   ) : (
//                     <span className="text-4xl font-bold select-none">?</span>
//                   )}
//                 </motion.div>

//                 {result && (
//                   <p className="mt-3 text-center font-semibold text-lg">
//                     {result === "google"
//                       ? "Heads! Google login enabled."
//                       : "Tails! GitHub login enabled."}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* RIGHT: Login Section */}
//         <div
//           className={`flex-1 flex flex-col justify-center items-center gap-4 ${
//             screen < 1024 ? "w-full h-full p-6 bg-gray-800 rounded-2xl" : ""
//           }`}
//         >
//           <h2 className="flex items-center justify-center text-2xl md:text-4xl font-semibold mb-6 tracking-wide gap-2 text-center">
//             Welcome to DevMaestro.UI
//           </h2>

//           {/* Google Login */}
//           <button
//             disabled={activeButton === "github"}
//             className={`flex items-center justify-center gap-2 w-64 bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-xl shadow-md transition-all text-lg hover:scale-105 hover:shadow-xl ${
//               activeButton === "github" ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             <FcGoogle size={24} /> Continue with Google
//           </button>

//           {/* GitHub Login */}
//           <button
//             disabled={activeButton === "google"}
//             className={`flex items-center justify-center gap-2 w-64 bg-gray-900 text-white font-medium py-2 px-4 rounded-xl shadow-md transition-all text-lg hover:scale-105 hover:shadow-xl ${
//               activeButton === "google" ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             <SiGithub size={24} /> Continue with GitHub
//           </button>

//           {/* Coin Flip Trigger */}
//           {screen >= 1024 && !showFlip && (
//             <>
//               <div className="my-4 flex items-center w-64">
//                 <div className="flex-grow h-px bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500"></div>
//                 <span className="px-3 text-gray-300 text-base font-semibold">
//                   OR
//                 </span>
//                 <div className="flex-grow h-px bg-gradient-to-l from-gray-500 via-gray-400 to-gray-500"></div>
//               </div>

//               <p className="text-gray-400 text-lg text-center">
//                 Let the <span className="text-yellow-400 text-2xl">coin</span>{" "}
//                 flip decide your login option
//               </p>

//               <button
//                 onClick={handleFlip}
//                 disabled={!canFlip}
//                 className={`mt-2 w-48 relative bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-full shadow-xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl active:scale-95 active:rotate-0 ${
//                   !canFlip ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <span className="absolute left-2 -top-1 animate-bounce text-xl">
//                   🪙
//                 </span>
//                 Flip <span className="text-white">Coin</span>
//               </button>
//             </>
//           )}

//           {/* Back Button */}
//           {screen >= 1024 && showFlip && result && (
//             <button
//               onClick={handleBack}
//               className="mt-2 w-48 bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full shadow-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl active:scale-95 active:rotate-0"
//             >
//               <motion.span
//                 className="inline-block"
//                 animate={{ y: [0, -5, 0] }}
//                 transition={{ repeat: Infinity, duration: 1 }}
//               >
//                 <FiArrowLeft size={20} />
//               </motion.span>
//               Back
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


