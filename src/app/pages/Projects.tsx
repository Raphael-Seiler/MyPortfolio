import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';

type Category = 'alle' | 'real' | 'studium';

const categoryLabels: Record<Category, string> = {
  alle: 'Alle',
  real: 'Reale Projekte',
  studium: 'Studium',
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('alle');

  const filteredProjects = activeCategory === 'alle'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        
        <div className="pt-20 pb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
          >
            Projekte.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-[#55555a] dark:text-[#e5e5ea] max-w-2xl font-light"
          >
            Fallstudien, UI-Konzepte und interaktive Prototypen.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-3 mb-16"
        >
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#111111] border-transparent'
                  : 'bg-transparent text-[#55555a] dark:text-[#e5e5ea] border-black/10 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          >
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group flex flex-col gap-5 relative"
              >
                
                <div className="overflow-hidden rounded-2xl bg-transparent border border-black/10 dark:border-white/10 aspect-[4/3] relative z-10">
                  <motion.img 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col gap-3 relative z-10 dark:bg-[#111111]/40 dark:backdrop-blur-md dark:p-4 dark:-m-4 dark:rounded-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{project.title}</h3>
                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${
                      project.category === 'real'
                        ? 'bg-[#1d1d1f]/8 dark:bg-white/10 text-[#1d1d1f] dark:text-[#f5f5f7]'
                        : 'bg-[#1d1d1f]/8 dark:bg-white/10 text-[#55555a] dark:text-[#e5e5ea]'
                    }`}>
                      {project.category === 'real' ? 'Real' : 'Studium'}
                    </span>
                  </div>
                  <p className="text-[#55555a] dark:text-[#e5e5ea] font-light leading-relaxed text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 bg-transparent border border-black/10 dark:border-white/20 text-[#55555a] dark:text-[#e5e5ea] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
