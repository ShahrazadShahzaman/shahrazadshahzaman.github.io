import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import SectionWrapper from "../common/sectionwrapper";
function Contact() {
  const [contact, setContact] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "contact"][0]`)
      .then((data) => {
        setContact(data);
      })
      .catch((error) => {
        console.error("Sanity contact fetch error:", error);
      });
  }, []);
  const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);
  setFormStatus("");

  const formData = new FormData(e.target);

  formData.append("access_key", "89079c76-dbfb-48f7-9adb-d12d6ad58cc3");
  formData.append("subject", "New Portfolio Contact Message");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setFormStatus("Message sent successfully! I'll get back to you soon.");
      e.target.reset();
    } else {
      setFormStatus("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    setFormStatus("Something went wrong. Please try again.");
  }

  setIsSubmitting(false);
};
  return (
    <SectionWrapper>
      <section
        id="contact"
        className="bg-slate-950 py-28 px-6"  >
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-cyan-400 uppercase tracking-[0.3em] font-semibold">
            Contact
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {contact?.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400 max-w-3xl mx-auto">
            {contact?.description}
          </p>
<form
  onSubmit={handleSubmit}
  className="mx-auto mt-14 max-w-4xl rounded-3xl border border-slate-800 bg-slate-950 p-8 md:p-10"
>
  <h3 className="text-2xl font-bold text-white">
    Send Me a Message
  </h3>

  <p className="mt-2 text-slate-400">
    Have a question or want to work together? Send me a message.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-2">

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Name
      </label>

      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Email
      </label>

      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
      />
    </div>

  </div>

  <div className="mt-6">
    <label className="mb-2 block text-sm font-medium text-slate-300">
      Message
    </label>

    <textarea
      name="message"
      required
      rows="6"
      placeholder="Tell me about your project or idea..."
      className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
    />
  </div>

  <button
    type="submit"
    disabled={isSubmitting}
    className="mt-6 rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSubmitting ? "Sending..." : "Send Message"}
  </button>

  {formStatus && (
    <p className="mt-4 text-sm text-cyan-400">
      {formStatus}
    </p>
  )}
</form>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">

            <a
              href={`mailto:${contact?.email}`}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
            >
              <p className="text-cyan-400 text-sm uppercase">
                Email
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white break-all">
                {contact?.email}
              </h3>
            </a>

            <a
              href={contact?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
            >
              <p className="text-cyan-400 text-sm uppercase">
                LinkedIn
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                View Profile
              </h3>
            </a>

            <a
              href={contact?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
            >
              <p className="text-cyan-400 text-sm uppercase">
                GitHub
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Explore Projects
              </h3>
            </a>

            <a
              href={contact?.etsy}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
            >
              <p className="text-cyan-400 text-sm uppercase">
                Paper & Coffee
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Visit Store
              </h3>
            </a>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
export default Contact;