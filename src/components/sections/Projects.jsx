import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`
        *[_type == "project"] | order(_createdAt desc)
      `)
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
      });
  }, []);

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  const otherProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <SectionWrapper id="projects">
      <section className="bg-slate-900 py-28 px-6"
      >

        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Featured Work
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              A selection of projects that reflect my journey in frontend
              development, AI, and continuous learning.
            </p>
          </motion.div>

          {/* FEATURED PROJECTS */}

          <div className="mt-16 grid gap-8 lg:grid-cols-2">

            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id || project.id || `featured-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]"
              >

                {/* Top */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm font-medium text-cyan-400">
                    {project.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === "Live"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : project.status === "In Progress"
                        ? "bg-amber-400/10 text-amber-400"
                        : "bg-slate-800 text-slate-400"
                      }`}
                  >
                    {project.status}
                  </span>

                </div>

                {/* Title */}

                <h3 className="mt-5 text-3xl font-bold text-white">
                  {project.title}
                </h3>

                {/* Description */}

                <p className="mt-5 leading-8 text-slate-400">
                  {project.description}
                </p>

                {/* Technologies */}

                <div className="mt-6 flex flex-wrap gap-2">

                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-cyan-400/10 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

                {/* Buttons */}

                {(project.github || project.live) && (
                  <div className="mt-8 flex flex-wrap gap-4">

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                      >
                        GitHub
                      </a>
                    )}

                  </div>
                )}

              </motion.article>
            ))}

          </div>

          {/* OTHER PROJECTS */}

          {otherProjects.length > 0 && (
            <>
              <motion.h3
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-24 text-3xl font-bold text-white"
              >
                Other Projects
              </motion.h3>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {otherProjects.map((project, index) => (
                  <motion.article
                    key={project._id || project.id || `other-${index}`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.06)]"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <span className="text-sm text-cyan-400">
                        {project.category}
                      </span>

                      <span
                        className={`text-xs ${project.status === "Live"
                          ? "text-emerald-400"
                          : "text-slate-500"
                          }`}
                      >
                        {project.status}
                      </span>

                    </div>

                    <h4 className="mt-3 text-xl font-semibold text-white">
                      {project.title}
                    </h4>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}

                    </div>
                    {(project.github || project.live) && (
                      <div className="mt-6 flex flex-wrap gap-3">

                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                          >
                            Live Demo
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </motion.article>
                ))}

              </div>
            </>
          )}

        </div>

      </section>
    </SectionWrapper>
  );
}

export default Projects;