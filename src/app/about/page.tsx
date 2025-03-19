"use client";

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen px-8 py-32 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600">About Gurukul</h1>
        <p className="mt-4 text-lg">
          Gurukul is an AI-integrated Learning Management System (LMS) designed
          to bridge the gap between technology and education, enhancing student
          engagement and adaptability.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-blue-500">Our Mission</h2>
          <p className="mt-2 text-lg">
            With a focus on developing an AI-driven LMS, Gurukul aims to make
            learning engaging, flexible, and cost-effective. By integrating AI,
            we ensure personalized learning experiences, helping students
            achieve their academic goals efficiently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-500">Key Features</h2>
          <ul className="mt-2 text-lg list-disc list-inside space-y-2">
            <li>User-friendly dashboard</li>
            <li>Downloadable videos for offline learning</li>
            <li>Support for free, paid, and sponsored courses</li>
            <li>
              AI-driven descriptive test evaluation using RAG-based LoRA
              fine-tuning
            </li>
            <li>Future features: AI chatbots & paraphrased blogs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-500">
            Challenges in Education
          </h2>
          <p className="mt-2 text-lg">
            Research has identified three major challenges in education:
          </p>
          <ul className="mt-2 text-lg list-disc list-inside space-y-2">
            <li>Rising costs</li>
            <li>Low course retention</li>
            <li>Restricted access to credible materials</li>
          </ul>
          <p className="mt-2 text-lg">
            Gurukul tackles these issues by offering an AI-driven,
            cost-effective platform focused on personalized learning and
            accessibility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-500">Our Vision</h2>
          <p className="mt-2 text-lg">
            Gurukul is committed to merging classical schooling with modern
            technology, ensuring quality education for every student.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
