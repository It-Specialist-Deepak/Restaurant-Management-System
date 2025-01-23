import React from "react";

function About() {
  return (
    <div className="about-page max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-6">
        Welcome to our company! Learn more about our mission, values, and the
        team behind the scenes.
      </p>
      <section className="about-section mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
        <p>
          A brief description of how the company started, its key milestones,
          and the vision that drives us.
        </p>
      </section>
      <section className="about-section mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>Get in touch with us for any inquiries or feedback.</p>
      </section>
    </div>
  );
}

export default About;
