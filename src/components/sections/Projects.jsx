import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            category,
            description,
            technologies,
            github,
            live,
            status,
            featured
          }
        `);

        if (Array.isArray(data)) {
          setProjects(
            data.map((project) => ({
              ...project,
              technologies: Array.isArray(project?.technologies)
                ? project.technologies.filter(
                    (tech) => typeof tech === "string"
                  )
                : [],
            }))
          );
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const featuredProjects = projects.filter(
    (project) => project?.featured === true
  );

  const otherProjects = projects.filter(
    (project) => project?.featured !== true
  );

  return (
    <SectionWrapper id="projects">
      <section className="bg-slate-900 py-28 px-6">
        <div className="mx-auto w-full max-w-7xl">

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

          {/* LOADING */}

          {loading && (
            <div className="mt-16 text-slate-400">
              Loading projects...
            </div>
          )}

          {/* FEATURED PROJECTS */}

          {!loading && featuredProjects.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={
                    project?._id ||
                    project?.id ||
                    `featured-${index}`
                  }
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="group min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)] sm:p-8"
                >

                  {/* TOP */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <span className="text-sm font-medium text-cyan-400">
                      {project?.category || "Project"}
                    </span>

                    {project?.status && (
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === "Live"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : project.status === "In Progress"
                              ? "bg-amber-400/10 text-amber-400"
                              : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}

                  <h3 className="mt-5 break-words text-2xl font-bold text-white sm:text-3xl">
                    {project?.title || "Untitled Project"}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-5 break-words leading-8 text-slate-400">
                    {project?.description ||
                      "Project description coming soon."}
                  </p>

                  {/* TECHNOLOGIES */}

                  {project.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={`${tech}-${techIndex}`}
                          className="rounded-full border border-cyan-400/10 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* BUTTONS */}

                  {(project?.github || project?.live) && (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                      {project?.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
                        >
                          Live Demo
                        </a>
                      )}

                      {project?.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400 sm:w-auto"
                        >
                          GitHub
                        </a>
                      )}

                    </div>
                  )}

                </motion.article>
              ))}
            </div>
          )}

          {/* OTHER PROJECTS */}

          {!loading && otherProjects.length > 0 && (
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

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {otherProjects.map((project, index) => (
                  <motion.article
                    key={
                      project?._id ||
                      project?.id ||
                      `other-${index}`
                    }
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -5 }}
                    className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.06)] sm:p-6"
                  >

                    {/* TOP */}

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <span className="text-sm text-cyan-400">
                        {project?.category || "Project"}
                      </span>

                      {project?.status && (
                        <span
                          className={`text-xs ${
                            project.status === "Live"
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* TITLE */}

                    <h4 className="mt-3 break-words text-xl font-semibold text-white">
                      {project?.title || "Untitled Project"}
                    </h4>

                    {/* DESCRIPTION */}

                    <p className="mt-3 break-words text-sm leading-7 text-slate-400">
                      {project?.description ||
                        "Project description coming soon."}
                    </p>

                    {/* TECHNOLOGIES */}

                    {project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={`${tech}-${techIndex}`}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* BUTTONS */}

                    {(project?.github || project?.live) && (
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                        {project?.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full rounded-xl bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
                          >
                            Live Demo
                          </a>
                        )}

                        {project?.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full rounded-xl border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400 sm:w-auto"
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