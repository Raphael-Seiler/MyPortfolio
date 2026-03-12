import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Zap,
  Target,
  Coffee,
  Car,
  Fish,
  Users,
} from "lucide-react";
import imgDefault from "../../assets/Portrait_Prof.png";
import imgHover from "../../assets/Portrait_Chill.png";

export function Home() {
  const [showAlt, setShowAlt] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col md:flex-row items-center justify-between pt-10 pb-20 overflow-hidden gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl flex-1 z-10"
        >
          <span className="text-[#55555a] dark:text-[#e5e5ea] font-medium tracking-widest uppercase mb-4 block text-sm">
            Ich.
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 leading-[1.05] drop-shadow-sm dark:drop-shadow-md">
            Hallo, ich bin
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] to-[#55555a] dark:from-[#f5f5f7] dark:to-[#d1d1d6]">
              Raphi.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#55555a] dark:text-[#e5e5ea] max-w-xl leading-relaxed font-light">
            Ein angehender UX-Designer mit dem Ziel, komplexe
            Probleme durch empathisches und minimalistisches
            Design zu lösen.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="flex-1 w-full max-w-md relative z-10"
        >
          <div
            className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-transparent border border-black/10 dark:border-white/10 relative cursor-pointer select-none"
            onMouseEnter={() => setShowAlt(true)}
            onMouseLeave={() => setShowAlt(false)}
            onClick={() => setShowAlt((prev) => !prev)}
          >
            <img
              src={imgDefault}
              alt="Raphi - Portrait"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${showAlt ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src={imgHover}
              alt="Raphi - Casual"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${showAlt ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid: Über Mich */}
      <section className="py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)] relative z-10">
          {/* Main About Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-transparent rounded-[2rem] p-8 md:p-12 border border-black/10 dark:border-white/10 dark:bg-[#111111]/60 dark:backdrop-blur-xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-3">
              <span className="w-6 h-6 text-[#55555a] dark:text-[#e5e5ea]">
                💡
              </span>
              Meine Philosophie
            </h2>
            <p className="text-[#55555a] dark:text-[#e5e5ea] leading-relaxed font-light text-lg">
              Meine Arbeit soll etwas Positives in der Welt
              bewegen. Mich fasziniert es, komplizierte Probleme
              anzupacken und einfache, gute Lösungen dafür zu
              finden. Dabei ist es mir besonders wichtig, dass
              meine Designs für alle Menschen leicht
              verständlich und ohne Hürden nutzbar sind. Denn
              gutes Design sollte niemanden ausschliessen,
              sondern den Alltag für jeden ein bisschen besser
              machen.
            </p>
          </motion.div>

          {/* Stärken */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-transparent rounded-[2rem] p-8 border border-black/10 dark:border-white/10 flex flex-col dark:bg-[#111111]/60 dark:backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              Stärken
            </h3>
            <ul className="space-y-3 text-[#55555a] dark:text-[#e5e5ea] font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Prototyping & Iteration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Gutes Nutzerverständnis (Empathie)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Analytisches Denken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Neugierig</span>
              </li>
            </ul>
          </motion.div>

          {/* Schwächen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-transparent rounded-[2rem] p-8 border border-black/10 dark:border-white/10 dark:bg-[#111111]/60 dark:backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              Entwicklungspotenzial
            </h3>
            <ul className="space-y-3 text-[#55555a] dark:text-[#e5e5ea] font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Erfahrung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Perfektionismus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] mt-2 flex-shrink-0" />
                <span>Coding</span>
              </li>
            </ul>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-transparent rounded-[2rem] p-8 border border-black/10 dark:border-white/10 flex flex-col justify-center dark:bg-[#111111]/60 dark:backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold mb-6 text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              Wenn ich nicht designe...
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: (
                    <Car className="w-6 h-6 mb-2 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                  ),
                  label: "Auto-Fanatiker",
                },
                {
                  icon: (
                    <Fish className="w-6 h-6 mb-2 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                  ),
                  label: "Fischer",
                },
                {
                  icon: (
                    <Coffee className="w-6 h-6 mb-2 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                  ),
                  label: "Kaffee-Geniesser",
                },
                {
                  icon: (
                    <Users className="w-6 h-6 mb-2 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                  ),
                  label: "Familie & Freunde",
                },
              ].map((hobby, i) => (
                <div
                  key={i}
                  className="bg-transparent border border-black/5 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-black/20 dark:hover:border-white/30 transition-colors"
                >
                  {hobby.icon}
                  <span className="text-sm font-medium text-[#55555a] dark:text-[#e5e5ea]">
                    {hobby.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Collage Section */}
      <section className="pt-32 pb-10 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-3">
              Kleine Projekt-Kollage
            </h2>
            <p className="text-[#55555a] dark:text-[#e5e5ea] font-light">
              Ein visueller Vorgeschmack auf meine Arbeiten.
            </p>
          </div>
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center space-x-2 text-sm font-medium border-b border-black/20 dark:border-white/20 pb-1 hover:border-black dark:hover:border-white transition-colors text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            <span>Alle Projekte</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 rounded-[2rem] overflow-hidden relative group bg-transparent border border-black/10 dark:border-white/10"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1750056393326-8feed2a1c34f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbW9iaWxlJTIwYXBwJTIwdWklMjBtb2NrdXB8ZW58MXx8fHwxNzcyNzE5NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Mobile App Mockup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-medium text-lg">
                Fintech Mobile App
              </span>
            </div>
          </motion.div>

          {/* Top Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 rounded-[2rem] overflow-hidden relative group bg-transparent border border-black/10 dark:border-white/10"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdlYnNpdGUlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dashboard UI"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-medium text-sm">
                Analytics Dashboard
              </span>
            </div>
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 rounded-[2rem] overflow-hidden relative group bg-transparent border border-black/10 dark:border-white/10"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="UX Wireframes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-medium text-sm">
                Wireframes & Sketches
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-sm font-medium border-b border-black/20 dark:border-white/20 pb-1 hover:border-black dark:hover:border-white transition-colors text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            <span>Alle Projekte entdecken</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}