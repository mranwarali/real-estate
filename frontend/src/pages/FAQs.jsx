import React, { useState, useMemo } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router";

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0); // open first by default

  const faqData = [
    {
      id: 0,
      category: "buying",
      question: "How do I schedule a physical site visit for a property?",
      answer:
        "You can click the 'Call Property Owner' or 'Contact Owner' button directly on any property details page to connect with the owner or designated agent. Alternatively, submit an enquiry and our concierge team will coordinate an in-person or virtual walkthrough at your preferred time.",
    },
    {
      id: 1,
      category: "buying",
      question: "Are all listed properties verified by Nestora Realty?",
      answer:
        "Yes, our moderation and field verification team verifies property ownership, photographs, physical location, and RERA registration numbers before granting the 'Verified' badge to any listing.",
    },
    {
      id: 2,
      category: "selling",
      question: "Is it completely free to post a property listing?",
      answer:
        "Yes! Individual property owners can post their first residential or commercial listing 100% free with up to 4 high-resolution photos and detailed amenities.",
    },
    {
      id: 3,
      category: "selling",
      question: "How long does it take for my property to go live after posting?",
      answer:
        "Once you submit the Post Property form, our automated checks and verification team approve listings within 2 to 4 hours. You will receive an instant notification once your property is live for buyers to see.",
    },
    {
      id: 4,
      category: "renting",
      question: "What documents are required to rent an apartment?",
      answer:
        "Tenants typically require a valid government ID (Aadhaar, Passport, or PAN card), permanent address proof, employment verification/salary slips, and photographs for the registered rental agreement.",
    },
    {
      id: 5,
      category: "renting",
      question: "Can rent and security deposits be negotiated?",
      answer:
        "Many property owners indicate 'Price is negotiable' directly on their listings. You can discuss flexible lock-in periods, security deposit amounts, and move-in dates directly with the landlord.",
    },
    {
      id: 6,
      category: "legal",
      question: "What is RERA and why is it important?",
      answer:
        "RERA (Real Estate Regulatory Authority) is a statutory body that safeguards property buyers from delays and discrepancies. A RERA-registered project guarantees clear title, timely possession escrow accounts, and structural warranty for up to 5 years.",
    },
    {
      id: 7,
      category: "legal",
      question: "How do I calculate home loan EMI and eligibility?",
      answer:
        "Our banking partners offer online EMI calculators considering your net monthly income, existing loan liabilities, tenure, and credit score. Most banks finance up to 80-90% of the agreement value.",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "buying", label: "Buying Property" },
    { id: "selling", label: "Selling" },
    { id: "renting", label: "Renting" },
    { id: "legal", label: "Legal & Loans" },
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs currentLabel={"Frequently Asked Questions"} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto py-10">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor) bg-orange-50 px-3 py-1 rounded-full">
          Help Center
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-3">
          Quick answers to common questions about buying, renting, selling, and managing properties with Nestora Realty.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mt-6">
          <i className="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            type="text"
            placeholder="Search keywords (e.g. deposit, RERA, visit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-(--primaryColor) rounded-2xl outline-none text-sm text-gray-800 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3 pb-14">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              No questions found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-semibold text-(--primaryColor) hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-(--primaryColor) shadow-sm" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-orange-100 text-(--primaryColor) rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <i className="bx bx-chevron-down text-xl"></i>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Help Banner CTA */}
      <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center mb-10">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">
          Can't find the answer you're looking for? Our friendly support team is ready to assist.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-300 transition-all active:scale-95"
        >
          <i className="bx bx-envelope"></i>
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
};

export default Faqs;
