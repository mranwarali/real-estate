import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactDetails from "./ContactDetails";
import { contactSections } from "../../data/data";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="container mx-auto">
      <Breadcrumbs currentLabel={"Contact Us"} />
      <div className="max-w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
          {/* left side  */}
          <div
            className="col-span-1 lg:col-span-2 bg-white p-8"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <ContactForm />
          </div>

          {/* right side  */}
          <div className="col-span-1 bg-white">
            <ContactDetails contactSections={contactSections} />
          </div>
        </div>
        {/* map  */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4296.450145754226!2d-80.1826226240246!3d25.852865304830914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b22c59057bf1%3A0x7977972d22752b33!2s774%20NE%2084th%20St%2C%20Miami%2C%20FL%2033138%2C%20USA!5e1!3m2!1sen!2sin!4v1778672835792!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0, paddingBottom: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
