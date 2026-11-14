import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactDetails from "./ContactDetails";
import { contactSections } from "../../data/data";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs currentLabel={"Contact Us"} />

      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
            We'd Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Have questions about buying, selling or renting? Reach out to our real estate advisors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Left: Contact Form */}
          <div className="col-span-1 lg:col-span-2 bg-white p-5 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <ContactForm />
          </div>

          {/* Right: Contact Details */}
          <div className="col-span-1 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <ContactDetails contactSections={contactSections} />
          </div>
        </div>

        {/* Responsive Embedded Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4296.450145754226!2d-80.1826226240246!3d25.852865304830914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b22c59057bf1%3A0x7977972d22752b33!2s774%20NE%2084th%20St%2C%20Miami%2C%20FL%2033138%2C%20USA!5e1!3m2!1sen!2sin!4v1778672835792!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
