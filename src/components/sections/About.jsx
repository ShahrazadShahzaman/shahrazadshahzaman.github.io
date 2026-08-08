import { useEffect, useState } from "react";
import profile from "../../assets/images/profile.jpeg";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";
function About() {
    const [about, setAbout] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "about"][0]`)
            .then((data) => {
                setAbout(data);
            })
            .catch((error) => {
                console.error("Sanity about fetch error:", error);
            });
    }, []);
    return (
        <SectionWrapper>
            <section
                id="about"
                className="bg-slate-900 py-28 px-6"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left */}

                    <div className="flex justify-center">

                        <img
                            src={profile}
                            alt="Shahrazad"
                            className="h-96 w-80 rounded-3xl object-cover border border-cyan-500/20 shadow-2xl"
                        />

                    </div>

                    {/* Right */}

                    <div>

                        <p className="text-cyan-400 font-semibold tracking-widest uppercase">
                        {about?.label}
                        </p>

                        <h2 className="mt-4 text-5xl font-bold text-white">
                            {about?.heading}
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-slate-400">
                         {about?.paragraph1}
                        </p>

                        <p className="mt-6 text-lg leading-8 text-slate-400">
                          {about?.paragraph2}
                        </p>

                    </div>

                </div>
            </section>
        </SectionWrapper>
    );
}

export default About;