import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";

function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "education"] | order(_createdAt asc)`)
      .then((data) => {
        setEducation(data);
      })
      .catch((error) => {
        console.error("Sanity education fetch error:", error);
      });
  }, []);

  return (
    <SectionWrapper>
      <section id="education" className="bg-slate-950 py-28 px-6">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Education
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            My Academic Journey
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            My educational journey has helped me build a strong foundation
            in technology while shaping my interest in artificial intelligence
            and continuous learning.
          </p>

          {/* EDUCATION */}

          <div className="mt-16 grid gap-6 md:grid-cols-2">

            {education.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
              >

                {/* Period + Status */}

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <span className="font-semibold text-cyan-400">
                    {item.period}
                  </span>

                  {item.status && (
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {item.status}
                    </span>
                  )}

                </div>

                {/* Degree */}

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {item.degree}
                </h3>

                {/* Institution */}

                <p className="mt-2 text-lg font-medium text-slate-300">
                  {item.institution}
                </p>

                {/* Description */}

                {item.description && (
                  <p className="mt-5 leading-8 text-slate-400">
                    {item.description}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>
    </SectionWrapper>
  );
}

export default Education;