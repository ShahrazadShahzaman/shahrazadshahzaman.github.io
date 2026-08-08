import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";
function Skills() {
  const [skills, setSkills] = useState([]);

useEffect(() => {
  sanityClient
    .fetch(`*[_type == "skill"] | order(order asc)`)
    .then((data) => {
      setSkills(data);
    })
    .catch((error) => {
      console.error("Sanity skills fetch error:", error);
    });
}, []);
  return (
    <SectionWrapper>
      <section
        id="skills"
               className="bg-slate-900 py-28 px-6"
      >
        <div className="max-w-7xl mx-auto">

          <p className="text-cyan-400 uppercase tracking-[0.3em] font-semibold">
            My Skills
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Technologies I Work With
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            I'm continuously improving my frontend development, programming,
            and AI skills while building real-world projects and digital products.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {skills.map((skill) => (

              <div
                key={skill._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer"
              >

                <p className="text-sm uppercase tracking-widest text-cyan-400">
                  {skill.category}
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {skill.name}
                </h3>

                <p className="mt-5 text-slate-400">
                  {skill.level}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

export default Skills;