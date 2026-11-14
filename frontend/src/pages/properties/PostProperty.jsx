import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../redux/property/propertySlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PostProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    listingType: "rent",
    propertyType: "apartment",
    price: { amount: "", currency: "INR", rentPeriod: "monthly" },
    address: { street: "", city: "", state: "", country: "India", zipcode: "" },
    features: { bedroom: 1, bathroom: 1, areaSqFt: "" },
    amenities: { wifi: false, parking: false, gym: false, pool: false },
    contact: { name: "", email: "", phone: "", whatsapp: "" },
    images: [],
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to post a property");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const propertyCategories = [
    "house",
    "apartment",
    "condo",
    "villa",
    "studio",
    "land",
    "commercial",
    "office",
    "warehouse",
  ];

  const updateNested = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    if (formData.images.length === 0) {
      setLoading(false);
      return toast.error("Please upload at least one image");
    }

    const data = new FormData();

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("listingType", formData.listingType);
    data.append("propertyType", formData.propertyType);
    data.append("uploadType", "property");

    data.append("price", JSON.stringify(formData.price));
    data.append("address", JSON.stringify(formData.address));
    data.append("features", JSON.stringify(formData.features));
    data.append("amenities", JSON.stringify(formData.amenities));
    data.append("contact", JSON.stringify(formData.contact));

    try {
      await dispatch(createProperty(data)).unwrap();
      toast.success("Property posted successfully!");
      setStep(1);

      setFormData({
        title: "",
        description: "",
        listingType: "rent",
        propertyType: "apartment",
        price: { amount: "", currency: "INR", rentPeriod: "monthly" },
        address: { street: "", city: "", state: "", country: "India", zipcode: "" },
        features: { bedroom: 1, bathroom: 1, areaSqFt: "" },
        amenities: { wifi: false, parking: false, gym: false, pool: false },
        contact: { name: "", email: "", phone: "", whatsapp: "" },
        images: [],
      });
      navigate("/properties");
    } catch (error) {
      toast.error(error?.message || "Upload failed. Please check form data.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.title.trim() || !formData.description.trim() || !formData.price.amount) {
        toast.error("Please fill title, price and description.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.address?.city.trim() || !formData.address?.state.trim()) {
        toast.error("Please fill city and state.");
        return;
      }
    }

    if (step === 3) {
      if (!formData.features?.areaSqFt) {
        toast.error("Please specify property area in sq ft.");
        return;
      }
    }

    if (step === 5) {
      if (!formData.contact?.name.trim() || !formData.contact?.phone.trim()) {
        toast.error("Please fill contact name and phone number.");
        return;
      }
    }

    setStep((s) => s + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((s) => s - 1);
  };

  const stepsConfig = [
    "General",
    "Location",
    "Features",
    "Amenities",
    "Contact",
  ];

  const Label = ({ children, required }) => (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto p-5 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
            List Your Property
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Post Free Property
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Reach thousands of buyers & renters in just a few steps
          </p>
        </div>

        {/* --- Stepper Progress Bar --- */}
        <div className="relative mb-8 px-2 sm:px-6">
          <div className="flex justify-between relative z-10">
            {stepsConfig.map((label, index) => {
              const num = index + 1;
              const isPassed = step >= num;
              const isCurrent = step === num;
              return (
                <div key={num} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? "bg-(--primaryColor) text-white ring-4 ring-orange-100"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isPassed && step > num ? <i className="bx bx-check text-base"></i> : num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-1.5 font-medium hidden sm:block ${
                      isCurrent ? "text-(--primaryColor) font-bold" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stepper background track */}
          <div className="absolute top-3.5 sm:top-4 left-6 right-6 h-0.5 bg-gray-100 z-0">
            <div
              className="h-full bg-(--primaryColor) transition-all duration-300"
              style={{
                width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* --- Form Form Body --- */}
        <form onSubmit={handleSubmit}>
          <div className="min-h-[280px]">
            {/* Step 1: General Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-base font-bold text-gray-900 pb-1 border-b border-gray-100">
                  Step 1: General Information
                </h2>

                {/* Image Upload */}
                <div>
                  <Label required>Property Images (Max 4)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1.5">
                    {formData.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-full h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors shadow-sm"
                        >
                          <i className="bx bx-x text-base"></i>
                        </button>
                      </div>
                    ))}

                    {formData.images.length < 4 && (
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-orange-50/50 hover:border-(--primaryColor) transition-all group">
                        <i className="bx bx-cloud-upload text-2xl text-gray-400 group-hover:text-(--primaryColor) transition-colors"></i>
                        <span className="text-[11px] font-semibold text-gray-400 group-hover:text-(--primaryColor) transition-colors mt-1">
                          Upload Photo
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Label required>Property Title</Label>
                  <input
                    type="text"
                    placeholder="e.g. Spacious 3 BHK Sea View Apartment"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {/* Listing Type & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Listing Type</Label>
                    <select
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.listingType}
                      onChange={(e) =>
                        setFormData({ ...formData, listingType: e.target.value })
                      }
                    >
                      <option value="rent">For Rent</option>
                      <option value="sales">For Sale</option>
                    </select>
                  </div>

                  <div>
                    <Label required>Category</Label>
                    <select
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all capitalize"
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyType: e.target.value })
                      }
                    >
                      {propertyCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <Label required>Expected Price (₹)</Label>
                  <input
                    type="number"
                    placeholder="e.g. 4500000"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.price.amount}
                    onChange={(e) =>
                      updateNested("price", "amount", e.target.value)
                    }
                  />
                </div>

                {/* Description */}
                <div>
                  <Label required>Description</Label>
                  <textarea
                    placeholder="Describe key highlights, floor level, furnishing, and locality..."
                    rows="3"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-base font-bold text-gray-900 pb-1 border-b border-gray-100">
                  Step 2: Property Location
                </h2>

                <div>
                  <Label>Street Address</Label>
                  <input
                    type="text"
                    placeholder="e.g. 104 Greenfield Avenue, Sector 62"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.address.street}
                    onChange={(e) =>
                      updateNested("address", "street", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>City</Label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.address.city}
                      onChange={(e) =>
                        updateNested("address", "city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label required>State</Label>
                    <input
                      type="text"
                      placeholder="e.g. Maharashtra"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.address.state}
                      onChange={(e) =>
                        updateNested("address", "state", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Pincode / Zipcode</Label>
                  <input
                    type="text"
                    placeholder="e.g. 400050"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.address.zipcode}
                    onChange={(e) =>
                      updateNested("address", "zipcode", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-base font-bold text-gray-900 pb-1 border-b border-gray-100">
                  Step 3: Property Specs & Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Bedrooms</Label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.features.bedroom}
                      onChange={(e) =>
                        updateNested("features", "bedroom", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Bathrooms</Label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.features.bathroom}
                      onChange={(e) =>
                        updateNested("features", "bathroom", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label required>Area (Sq Ft)</Label>
                    <input
                      type="number"
                      placeholder="e.g. 1250"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.features.areaSqFt}
                      onChange={(e) =>
                        updateNested("features", "areaSqFt", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Amenities */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-base font-bold text-gray-900 pb-1 border-b border-gray-100">
                  Step 4: Amenities & Facilities
                </h2>
                <p className="text-xs text-gray-500">
                  Properties with listed amenities get up to 3x more inquiries.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(formData.amenities).map((key) => (
                    <label
                      key={key}
                      className={`flex items-center space-x-3 p-3.5 rounded-xl border text-sm font-semibold capitalize cursor-pointer transition-all ${
                        formData.amenities[key]
                          ? "bg-orange-50 border-(--primaryColor) text-(--primaryColor)"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-(--primaryColor) rounded cursor-pointer"
                        checked={formData.amenities[key]}
                        onChange={(e) =>
                          updateNested("amenities", key, e.target.checked)
                        }
                      />
                      <span>{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Contact Details */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-base font-bold text-gray-900 pb-1 border-b border-gray-100">
                  Step 5: Contact Information
                </h2>

                <div>
                  <Label required>Full Name</Label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.contact.name}
                    onChange={(e) =>
                      updateNested("contact", "name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Email Address</Label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                    value={formData.contact.email}
                    onChange={(e) =>
                      updateNested("contact", "email", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Phone Number</Label>
                    <input
                      type="tel"
                      placeholder="10-digit Mobile"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.contact.phone}
                      maxLength={10}
                      onChange={(e) =>
                        updateNested("contact", "phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>WhatsApp Number</Label>
                    <input
                      type="tel"
                      placeholder="WhatsApp Phone"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                      value={formData.contact.whatsapp}
                      maxLength={13}
                      onChange={(e) =>
                        updateNested("contact", "whatsapp", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                step === 1
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl font-bold text-sm shadow-md shadow-orange-300 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Continue</span>
                <i className="bx bx-right-arrow-alt text-lg"></i>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-200 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
                <span>{loading ? "Publishing..." : "Submit Property Listing"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;
