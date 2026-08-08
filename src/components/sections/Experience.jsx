import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";

function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "experience"] | order(_createdAt desc)`)
      .then((data) => {
        setExperience(data);
      })
      .catch((error) => {
        console.error("Sanity experience fetch error:", error);
      });
  }, []);
  return (
    <SectionWrapper>
    <section
      id="experience"
      className="bg-slate-950 py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">

        <p className="text-cyan-400 uppercase tracking-[0.3em] font-semibold">
          Experience
        </p>

        <h2 className="mt-4 text-5xl font-bold text-white">
          My Journey
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          My journey combines university studies, frontend development,
          entrepreneurship, and AI-driven creative projects.
        </p>

        <div className="mt-16 space-y-8">

          {experience.map((item, index) => (

            <div
              key={item.id || item.id || index}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >

              <span className="text-cyan-400 font-semibold">
  {item.startDate}
  {item.current
    ? "-Present"
    : item.endDate
    ? `-${item.endDate}`
    : ""}
</span>

              <h3 className="mt-2 text-2xl font-bold text-white">
                {item.role}
              </h3>

              <p className="text-slate-300 font-medium">
                {item.company}
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                {item.description}
              </p>

            </div>

          ))}

        </div>
      </div>
    </section>
    </SectionWrapper>
  );
}

export default Experience;