import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Monitor, 
  Gamepad2, 
  Search, 
  Clock, 
  Volume2, 
  Wifi, 
  X, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  User,
  Settings,
  Power,
  ExternalLink,
  Ghost,
  Trophy,
  Rocket,
  Image as ImageIcon,
  Download,
  Folder,
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home as HomeIcon,
  RefreshCw,
  TrainFront,
  Mic,
  Ruler,
  FileQuestion,
  AlertCircle,
  Skull
} from "lucide-react";

// --- Types ---
interface AppConfig {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  isBrowser?: boolean;
}

// --- Constants ---
const APPS: AppConfig[] = [
  { 
    id: "chrome", 
    name: "Google Chrome", 
    url: "https://www.google.com/webhp?igu=1", 
    icon: (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-white rounded-full scale-110 shadow-sm" />
        <svg viewBox="0 0 24 24" className="w-6 h-6 z-10">
          <path fill="#4285F4" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.5c1.47 0 2.87.32 4.14.89l-4.14 7.17L7.86 2.39C9.13 1.82 10.53 1.5 12 1.5zM2.39 7.86l4.14 7.17-5.02 1.34C1.5 14.87 1.18 13.47 1.18 12c0-1.47.32-2.87.89-4.14h.32zm9.61 5.64l4.14-7.17 5.02-1.34c.01.47.03.95.03 1.43 0 1.47-.32 2.87-.89 4.14l-8.3 2.94zm9.61 2.64l-4.14-7.17 4.14-7.17c.57 1.27.89 2.67.89 4.14 0 1.47-.32 2.87-.89 4.14l-.01 6.06z" />
          <circle fill="#FBBC05" cx="12" cy="12" r="3" />
        </svg>
      </div>
    ), 
    color: "bg-white",
    description: "Access the internet with the world's most popular browser.",
    isBrowser: true
  },
  { 
    id: "slope", 
    name: "Slope", 
    url: "https://slope-game.io/", 
    icon: <Rocket className="w-8 h-8" />, 
    color: "bg-green-600",
    description: "Navigate a ball through a 3D obstacle course at high speeds."
  },
  { 
    id: "tetris", 
    name: "Tetris", 
    url: "https://tetris.com/play-tetris", 
    icon: <Gamepad2 className="w-8 h-8" />, 
    color: "bg-blue-600",
    description: "The classic puzzle game of falling blocks."
  },
  { 
    id: "pacman", 
    name: "Pac-Man", 
    url: "https://www.google.com/logos/2010/pacman10-i.html", 
    icon: <Ghost className="w-8 h-8" />, 
    color: "bg-yellow-500",
    description: "Dodge ghosts and eat dots in this legendary arcade game."
  },
  { 
    id: "chess", 
    name: "Chess", 
    url: "https://www.chess.com/play/computer", 
    icon: <Trophy className="w-8 h-8" />, 
    color: "bg-slate-700",
    description: "The ultimate strategy game of kings and queens."
  },
  {
    id: "minecraft",
    name: "Minecraft Classic",
    url: "https://classic.minecraft.net/",
    icon: <Monitor className="w-8 h-8" />,
    color: "bg-emerald-700",
    description: "Mine and build in the classic 2009 version of Minecraft."
  },
  {
    id: "subwaysurfers",
    name: "Subway Surfers",
    url: "subway-surfers.html",
    icon: <TrainFront className="w-8 h-8" />,
    color: "bg-orange-500",
    description: "Run as far as you can and dodge the oncoming trains."
  },
  {
    id: "fnf",
    name: "Friday Night Funkin'",
    url: "friday-night-funkin.html",
    icon: <Mic className="w-8 h-8" />,
    color: "bg-pink-500",
    description: "Battle through rhythms in this legendary indie music game."
  },
  {
    id: "baldi",
    name: "Baldi's Basics",
    url: "baldi.html",
    icon: <Ruler className="w-8 h-8" />,
    color: "bg-red-600",
    description: "Educate yourself in this totally normal school game."
  },
  {
    id: "roulette",
    name: "Orange Roulette",
    url: "orange-roulette.html",
    icon: <Ghost className="w-8 h-8" />,
    color: "bg-orange-700",
    description: "A high-stakes game of chance."
  },
  {
    id: "unknown",
    name: "Unknown",
    url: "unknown.html",
    icon: <FileQuestion className="w-8 h-8" />,
    color: "bg-zinc-800",
    description: "Drop an HTML file to launch it in a new window."
  },
  {
    id: "virus",
    name: "FREE V-BUCKS",
    url: "#",
    icon: <Rocket className="w-8 h-8" />,
    color: "bg-purple-600",
    description: "Get free V-Bucks instantly! No verification needed! 100% Legit!"
  }
];

const GAMES = APPS.filter(a => !a.isBrowser);

const BACKGROUND_IMAGE = `https://picsum.photos/seed/${Math.random()}/1920/1080?nature,landscape,desktop`;
const LOGIN_BACKGROUND = `https://picsum.photos/seed/${Math.random()}/1920/1080?nature,landscape,login`;

const WALLPAPERS = [
  BACKGROUND_IMAGE,
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2064&auto=format&fit=crop", // Classic Win 10 Hero
  "https://i.postimg.cc/qM6hLhWq/644026850868779930.jpg", // Carbon Theme
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070", // Beach
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070", // Mountains
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070", // Valley
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071", // Forest
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070", // Lake
];

// --- Components ---

const VirusPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none"
    >
      <div className="bg-red-600 p-8 rounded-none border-4 border-white shadow-[0_0_100px_rgba(255,0,0,0.8)] text-white text-center pointer-events-auto">
        <div className="flex justify-center mb-4">
          <Skull size={100} className="animate-bounce" />
        </div>
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">You've been infected by the Oscar Jeej</h1>
        <p className="text-xl mb-6 font-mono leading-none">YOUR FILES ARE BEING ENCRYPTED (JK IT'S A PRANK)</p>
        <button 
          onClick={onClose}
          className="bg-white text-red-600 px-8 py-4 font-bold uppercase transition-all hover:bg-zinc-200 active:scale-95"
        >
          OH NOO! UN-INFECT ME!
        </button>
      </div>
    </motion.div>
  );
};

const VideoBackground = ({ opacity = 1, blur = 0 }: { opacity?: number, blur?: number }) => {
  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-emerald-950"
      style={{ filter: blur > 0 ? `blur(${blur}px)` : 'none' }}
    >
      {/* High-Resolution Static Fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover relative z-10"
        style={{ opacity }}
      >
        <source src="https://player.vimeo.com/external/494954471.sd.mp4?s=d7065983756da59f77f98c8bc1fa0174e7fc7e42&profile_id=165" type="video/mp4" />
        <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=34f9a3978502579df643198889953f938c82a5c3&profile_id=139" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-20" />
    </div>
  );
};

const Win10Logo = ({ size = "md", color = "white", useImage = false }: { size?: "sm" | "md" | "lg", color?: string, useImage?: boolean }) => {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-24 h-24"
  };

  if (useImage) {
    return (
      <div className={`${sizes[size]} rounded-sm overflow-hidden shadow-sm`}>
        <img 
          src="https://i.postimg.cc/qM6hLhWq/644026850868779930.jpg" 
          alt="Windows Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`${sizes[size]} flex items-center justify-center opacity-90 drop-shadow-md`}>
      <svg viewBox="0 0 88 88" className={`w-full h-full ${color === "white" ? "fill-white" : "fill-zinc-400"}`}>
        <path d="M0 12.402l35.687-4.86.015 34.425-35.702.103V12.402zm35.687 33.45l.015 34.335L0 75.328V45.865l35.687-.013zM39.67 6.84L88 0v41.528l-48.33.208V6.84zm48.33 38.604l-.015 42.556L39.67 82.25V45.457l48.33-.013z" />
      </svg>
    </div>
  );
};

const DesktopIcon = ({ name, icon, onClick, color }: { name: string, icon: React.ReactNode, onClick: () => void, color?: string, key?: string | number }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.4)", border: "1px solid rgba(0, 0, 0, 0.2)" }}
      whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      onClick={onClick}
      className="w-20 sm:w-24 flex flex-col items-center p-1.5 rounded-none border border-transparent cursor-pointer group transition-all select-none"
    >
      <div className={`w-12 h-12 rounded-none shadow-lg flex items-center justify-center text-white bg-black transition-transform group-hover:scale-105 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        {icon}
      </div>
      <p className="mt-1 text-[11px] text-black text-center font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] line-clamp-2 leading-tight">
        {name}
      </p>
    </motion.div>
  );
};

const FolderWindow = ({ name, items, onClose, onItemClick }: { name: string, items: AppConfig[], onClose: () => void, onItemClick: (app: AppConfig) => void }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-20 md:inset-32 z-[60] flex flex-col bg-white/95 backdrop-blur-xl border border-slate-300 shadow-2xl rounded-sm overflow-hidden"
    >
      {/* Title Bar */}
      <div className="relative flex items-center justify-between px-4 py-1.5 border-b border-slate-200 bg-slate-100 select-none">
        <div className="flex items-center gap-3">
          <Folder size={16} className="text-zinc-700" />
          <h2 className="text-slate-700 text-xs font-medium tracking-wide">{name}</h2>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            onClick={onClose}
            className="w-10 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-slate-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex flex-wrap gap-6 items-start">
          {items.map(app => (
            <div 
              key={app.id}
              onClick={() => onItemClick(app)}
              className="w-20 flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-black rounded shadow-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                {React.cloneElement(app.icon as React.ReactElement, { size: 24 })}
              </div>
              <span className="text-[11px] text-slate-700 text-center font-medium line-clamp-2">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400">
        {items.length} items
      </div>
    </motion.div>
  );
};

const ChromeBrowser = ({ onClose }: { onClose: () => void }) => {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");

  const handleNavigate = () => {
    let targetUrl = inputUrl;
    if (!targetUrl.startsWith("http")) {
      targetUrl = "https://" + targetUrl;
    }
    setUrl(targetUrl);
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-4 md:inset-8 z-[60] flex flex-col bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-300"
    >
      {/* Title Bar */}
      <div className="relative flex items-center justify-between px-3 py-1.5 border-b border-slate-200 bg-slate-100 select-none">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-blue-500" />
          <h2 className="text-slate-700 text-[11px] font-medium tracking-wide truncate max-w-[200px]">New Tab - Google Chrome</h2>
        </div>
        <div className="flex items-center">
          <button className="w-8 h-6 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500">
            <Minimize2 size={12} />
          </button>
          <button className="w-8 h-6 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500">
            <Maximize2 size={12} />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-slate-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Browser Controls */}
      <div className="bg-white px-2 py-1.5 border-b border-slate-200 flex items-center gap-2">
        <div className="flex items-center gap-1 text-slate-500">
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={16} /></button>
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors"><ArrowRight size={16} /></button>
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors" onClick={() => setUrl(url + "?t=" + Date.now())}><RefreshCw size={14} /></button>
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors" onClick={() => setUrl("https://www.google.com/webhp?igu=1")}><HomeIcon size={16} /></button>
        </div>
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
            className="w-full bg-slate-100 rounded-full px-4 py-1 text-[13px] text-slate-600 outline-none focus:ring-1 focus:ring-blue-400 border border-transparent shadow-sm"
          />
        </div>
        <User size={18} className="text-slate-400 p-0.5 border border-slate-200 rounded-full" />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Chrome Browser"
        />
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none opacity-80 uppercase tracking-widest font-bold">
          Chrome v124
        </div>
      </div>
    </motion.div>
  );
};

const AppWindow = ({ app, onClose }: { app: AppConfig, onClose: () => void }) => {
  if (app.id === 'chrome') {
    return <ChromeBrowser onClose={onClose} />;
  }
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-6 md:inset-12 z-[60] flex flex-col bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Title Bar */}
      <div className="relative flex items-center justify-between px-4 py-1.5 border-b border-white/5 bg-white/5 select-none">
        <div className="flex items-center gap-3">
          <div className="p-0.5">
             {React.cloneElement(app.icon as React.ReactElement, { size: 16, className: "text-white/80" })}
          </div>
          <h2 className="text-white/90 text-xs font-light tracking-wide">{app.name}</h2>
        </div>
        
        <div className="flex items-center h-full">
          <button className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60">
            <Minimize2 size={12} />
          </button>
          <button className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60">
            <Maximize2 size={12} />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-white/60"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Frame content area */}
      <div className="flex-1 bg-white relative flex flex-col m-[2px] rounded-sm overflow-hidden border border-slate-400 shadow-inner">
        <div className="flex-1 bg-[#1a1a1a]">
          <iframe 
            src={app.url} 
            className="w-full h-full border-none"
            title={app.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-[9px] font-medium tracking-tight">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
             Running as Secure App in Oscar Jeej OS
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[9px]">
            <ExternalLink size={8} /> Host: {(() => {
              try {
                return new URL(app.url, window.location.origin).hostname;
              } catch (e) {
                return "Internal";
              }
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GameWindow = ({ app, onClose }: { app: AppConfig, onClose: () => void }) => {
  return <AppWindow app={app} onClose={onClose} />;
};

const BootScreen = ({ onComplete, onLoginTrigger, onStageChange }: { onComplete: () => void, onLoginTrigger: () => void, onStageChange: (stage: number) => void }) => {
  const [stage, setStage] = useState(0); // 0: Logo, 1: Login, 2: Welcome/Sound, 3: Fade
  const [pin, setPin] = useState("");

  useEffect(() => {
    onStageChange(stage);
    if (stage === 0) {
      const t = setTimeout(() => setStage(1), 3000);
      return () => clearTimeout(t);
    }
    if (stage === 2) {
      onLoginTrigger();
      const t = setTimeout(() => setStage(3), 5000);
      return () => clearTimeout(t);
    }
    if (stage === 3) {
      const t = setTimeout(() => onComplete(), 1500);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete, onLoginTrigger, onStageChange]);

  const handleLogin = () => {
    if (stage === 1) setStage(2);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleLogin();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-[100] text-white overflow-hidden select-none font-sans"
    >
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative"
            >
               <Win10Logo size="lg" />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              {/* Profile Image (As per Image) */}
              <div className="w-56 h-56 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden mb-6">
                <div className="text-white/80 p-6 border-2 border-white/30 rounded-full scale-125">
                   <User size={96} strokeWidth={0.5} />
                </div>
              </div>

              {/* Username (Lowercase Unknown as requested) */}
              <h1 className="text-[56px] font-thin mb-10 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Unknown</h1>

              {/* PIN Input field (White Input as per Image) */}
              <div className="w-[320px] relative mb-6">
                <div className="flex bg-white shadow-xl">
                  <input 
                    type="password"
                    placeholder="PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="flex-1 bg-white px-4 py-3 text-black text-xl outline-none placeholder:text-gray-400 placeholder:font-light"
                    autoFocus
                  />
                  <div className="w-px h-8 bg-gray-200 self-center" />
                  <button 
                    onClick={handleLogin}
                    className="w-14 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                  >
                    <ChevronRight size={32} strokeWidth={1} />
                  </button>
                </div>
              </div>

              {/* Action Links (From Image) */}
              <div className="flex flex-col items-center gap-6 mt-4">
                <button className="text-[15px] font-normal hover:underline text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">I forgot my PIN</button>
                <div className="mt-4 border border-white/30 bg-white/5 hover:bg-white/10 px-8 py-2 text-[15px] font-normal tracking-wide transition-colors cursor-pointer text-white/95 shadow-sm">
                   Sign-in options
                </div>
              </div>
            </motion.div>
          )}

          {stage >= 2 && stage < 3 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center gap-6"
            >
               <div className="w-48 h-48 rounded-full border border-white/10 bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden mb-2">
                <div className="text-white/40 p-6 border-2 border-white/20 rounded-full">
                   <User size={96} strokeWidth={1} />
                </div>
              </div>
              <h1 className="text-[64px] font-extralight tracking-tight text-white drop-shadow-md">
                Welcome
              </h1>
              <div className="flex flex-col items-center gap-2">
                 <div className="w-8 h-8 rounded-full border-2 border-t-white/80 border-white/10 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      <div className="absolute bottom-16 flex flex-col items-center gap-2 pointer-events-none">
        <h3 className="text-2xl font-light italic text-white/90 drop-shadow-md">Oscar Jeej <span className="font-bold not-italic">OS</span></h3>
        <p className="text-[10px] font-normal tracking-[0.4em] text-white/60 uppercase">Home Premium</p>
      </div>

      <AnimatePresence>
        {stage === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white z-[200]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};


const StartMenu = ({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void, key?: string | number }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-10 left-0 w-96 h-[480px] win10-start-menu rounded-tr-sm overflow-hidden z-[100] flex shadow-2xl"
    >
      {/* Left Pane (Programs) */}
      <div className="flex-1 p-2 flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          {GAMES.map(g => (
            <div 
              key={g.id} 
              className="flex items-center gap-3 p-1.5 hover:bg-white/10 rounded-sm cursor-pointer group transition-all"
            >
              <div className={`w-8 h-8 bg-black rounded shadow-sm flex items-center justify-center text-white`}>
                {React.cloneElement(g.icon as React.ReactElement, { size: 18 })}
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-light">{g.name}</span>
              </div>
              <ChevronRight size={14} className="ml-auto text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        
        <div className="h-px bg-white/10 mt-2 mx-2" />
        <div className="p-2 flex items-center justify-between text-white/70 text-xs">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <User size={14} />
            <span>Account</span>
          </div>
          <div className="flex items-center gap-4">
            <Settings size={14} className="hover:text-white transition-colors cursor-pointer" />
            <Power 
              size={14} 
              className="hover:text-red-400 transition-colors cursor-pointer" 
              onClick={onLogout}
            />
          </div>
        </div>
      </div>

      {/* Right Pane (Tiles Placeholder) */}
      <div className="w-32 bg-white/5 p-3 flex flex-col gap-2">
         {GAMES.slice(0, 3).map(g => (
           <div key={g.id} className={`bg-black aspect-square rounded-sm flex items-center justify-center text-white/80 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group`}>
              {React.cloneElement(g.icon as React.ReactElement, { size: 24, className: "group-hover:scale-110 transition-transform" })}
           </div>
         ))}
      </div>
    </motion.div>
  );
};

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDownload: () => void;
  onChangeWallpaper: () => void;
}

const DesktopContextMenu = ({ x, y, onClose, onDownload, onChangeWallpaper }: ContextMenuProps) => {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleContextMenu = () => onClose();
    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ top: y, left: x }}
      className="fixed z-[1000] w-56 bg-white/95 backdrop-blur-md border border-slate-300 shadow-xl py-1 rounded-sm text-sm select-none"
      onContextMenu={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        onClick={(e) => { e.stopPropagation(); onChangeWallpaper(); onClose(); }}
        className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <ImageIcon size={16} />
          <span>Next Wallpaper</span>
        </div>
      </div>
      <div 
        onClick={(e) => { e.stopPropagation(); onDownload(); onClose(); }}
        className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <Download size={16} />
          <span>Download Image</span>
        </div>
      </div>
      <div className="h-px bg-slate-200 my-1 mx-1" />
      <div className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <Settings size={16} />
          <span>Personalize</span>
        </div>
      </div>
    </motion.div>
  );
};


export default function App() {
  const [booting, setBooting] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<AppConfig | null>(null);
  const [isGamesFolderOpen, setIsGamesFolderOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [bootStage, setBootStage] = useState(0);
  const [isInfected, setIsInfected] = useState(false);
  const [virusPopups, setVirusPopups] = useState<number[]>([]);
  const startupAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const currentWallpaper = WALLPAPERS[wallpaperIndex];

  const handleNextWallpaper = () => {
    setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
  };

  const handleDownloadWallpaper = () => {
    const link = document.createElement("a");
    link.href = currentWallpaper;
    link.download = `wallpaper-${wallpaperIndex}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Memoize the onComplete to prevent BootScreen from resetting every second
  // when the 'time' state updates.
  const handleBootComplete = React.useCallback(() => {
    setBooting(false);
  }, []);

  const handleLoginTrigger = React.useCallback(() => {
    if (startupAudioRef.current) {
      startupAudioRef.current.volume = 0.6;
      startupAudioRef.current.play().catch(err => {
        console.warn("Audio Context trigger failed in App:", err.message);
      });
    }
  }, []);

  const triggerVirus = () => {
    if (isInfected) return; // Don't trigger again if already active
    setIsInfected(true);
    setVirusPopups([]); // Clear previous if any
    
    // Add multiple popups over time with unique IDs
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
          setVirusPopups(p => [...p, Date.now() + Math.random()]);
        }, i * 2000);
    }
  };

  useEffect(() => {
    if (booting) return; // Don't run clock until booted
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [booting]);

  return (
    <div className={`min-h-screen bg-zinc-950 overflow-hidden font-sans relative ${isInfected ? 'infecting-shake infecting-glitch' : ''}`}>
      <AnimatePresence>
        {isInfected && virusPopups.map((id) => (
          <div key={id} style={{ 
            position: 'fixed', 
            top: `${Math.random() * 60 + 10}%`, 
            left: `${Math.random() * 60 + 10}%`, 
            zIndex: 999 
          }}>
            <VirusPopup onClose={() => setIsInfected(false)} />
          </div>
        ))}
      </AnimatePresence>
      
      {isInfected && (
        <div className="fixed inset-0 z-[900] pointer-events-none overflow-hidden mix-blend-difference">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: -100 }}
              animate={{ y: "110%" }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
              className="absolute text-red-500 font-mono text-3xl font-black opacity-50"
            >
              OSCAR JEEJ IS WATCHING
            </motion.div>
          ))}
        </div>
      )}
      {/* Seamless Non-stop Looping Video Background */}
      <VideoBackground 
        blur={booting ? (bootStage === 1 ? 12 : 0) : 0} 
        opacity={booting ? (bootStage === 1 ? 0.6 : 0.8) : 0.9} 
      />

      <div className="relative z-10 w-full h-full min-h-screen">
        {/* Persistent Audio Element - Stays in DOM when BootScreen unmounts */}
      <audio 
        ref={startupAudioRef} 
        preload="auto"
      >
        <source src="https://raw.githubusercontent.com/v98765/windows-7-sounds/master/Windows%20Startup.mp3" type="audio/mpeg" />
        <source src="https://archive.org/download/Windows7StartUpSound/Windows%207%20Start%20Up%20Sound.mp3" type="audio/mpeg" />
      </audio>

      {booting && (
        <BootScreen 
          onComplete={handleBootComplete} 
          onLoginTrigger={handleLoginTrigger} 
          onStageChange={setBootStage}
        />
      )}

      {!booting && (
        <div 
          className="h-screen w-screen overflow-hidden flex flex-col font-sans relative"
          onContextMenu={handleContextMenu}
        >
      {/* Context Menu */}
      {contextMenu && (
        <DesktopContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu(null)}
          onChangeWallpaper={handleNextWallpaper}
          onDownload={handleDownloadWallpaper}
        />
      )}
      {/* Desktop Area */}
      <main className="flex-1 relative p-6">
        <div className="flex flex-col gap-8 h-full">
          {/* Utilities Row */}
          <div className="flex gap-4 items-start">
            {APPS.filter(app => app.id === 'chrome' || app.id === 'unknown').map(app => (
              <DesktopIcon 
                key={app.id}
                name={app.name} 
                icon={app.icon} 
                onClick={() => setActiveApp(app)}
              />
            ))}
          </div>

          {/* Games Square Grid (3x3) */}
          <div className="grid grid-cols-3 gap-2 w-fit p-1 bg-white/5 rounded-none border border-white/10 backdrop-blur-sm self-start">
            {APPS.filter(app => !app.isBrowser && app.id !== 'unknown').map(app => (
              <DesktopIcon 
                key={app.id}
                name={app.name === 'Minecraft Classic' ? 'Minecraft' : app.name} 
                icon={app.icon} 
                onClick={() => {
                  if (app.id === 'virus') {
                    triggerVirus();
                  } else {
                    setActiveApp(app);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Windows Overlay */}
        <AnimatePresence>
          {isGamesFolderOpen && (
            <FolderWindow 
              name="Games" 
              items={GAMES} 
              onClose={() => setIsGamesFolderOpen(false)} 
              onItemClick={(app) => {
                setActiveApp(app);
                setIsGamesFolderOpen(false);
              }}
            />
          )}
          {activeApp && (
            <AppWindow app={activeApp} onClose={() => setActiveApp(null)} />
          )}
        </AnimatePresence>

        {/* Start Menu Overlay */}
        <StartMenu 
          isOpen={isStartOpen} 
          onClose={() => setIsStartOpen(false)} 
          onLogout={() => setBooting(true)}
        />
      </main>

      {/* Taskbar */}
      <footer className="h-10 w-full win10-taskbar flex items-center justify-between px-1 z-[70] shadow-xl">
        <div className="flex items-center h-full gap-0.5">
          {/* Windows Start Button */}
          <button 
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="group relative h-10 w-12 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <div className="relative z-10 transform scale-110">
               <Win10Logo size="md" />
            </div>
          </button>
          
          <div className="flex items-center h-full ml-1 px-1">
            {activeApp && (
              <motion.div 
                layoutId="taskbar-item"
                className="h-full px-4 flex items-center gap-2 bg-blue-500/20 border-b-2 border-blue-500 text-white text-xs cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center overflow-hidden rounded-none bg-black/50">
                  {React.cloneElement(activeApp.icon as React.ReactElement, { size: 14 })}
                </div>
                <span className="font-light truncate max-w-[100px]">{activeApp.name}</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/60">
          <div className="flex gap-3">
            <Wifi size={16} className="hover:text-white cursor-pointer transition-colors" />
            <Volume2 size={16} className="hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex flex-col items-end pr-2">
            <div className="text-[11px] font-medium text-white/90">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[9px] text-white/50">
              {time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          <div className="w-1.5 h-full self-stretch bg-white/5 border-l border-white/10 hover:bg-white/10 transition-colors hidden sm:block"></div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
      )}
      </div>
    </div>
  );
}
