import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../redux/property/propertySlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/joy/CircularProgress";

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
    address: { street: "", city: "", state: "", country: "", zipcode: "" },
    features: { bedroom: 0, bathroom: 0, areaSqFt: "" },
    amenities: { wifi: false, parking: false, gym: false, pool: false },
    contact: { name: "", email: "", phone: "", whatsapp: "" },
    images: [],
  });

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
    console.log("my form data", formData);
    setLoading(true);

    if (formData.images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    const data = new FormData();

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    // if (formData.images.length > 0) {
    //   formData.images.forEach((file) => {
    //     data.append("images", file);
    //   });
    // }

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
      setStep(1);

      setFormData({
        title: "",
        description: "",
        listingType: "rent",
        propertyType: "apartment",
        price: { amount: "", currency: "INR", rentPeriod: "monthly" },
        address: { street: "", city: "", state: "", country: "", zipcode: "" },
        features: { bedroom: 0, bathroom: 0, areaSqFt: "" },
        amenities: { wifi: false, parking: false, gym: false, pool: false },
        contact: { name: "", email: "", phone: "", whatsapp: "" },
        images: [],
      });
    } catch (error) {
      toast.error(error, "Upload failed");
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.title.trim() || !formData.description.trim()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.address?.city.trim() || !formData.address?.state.trim()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    if (step === 3) {
      if (!formData.features?.areaSqFt.trim()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    if (step === 5) {
      if (!formData.contact?.name.trim() || !formData.contact?.phone.trim()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    setStep((s) => s + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((s) => s - 1);
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  const stepsConfig = [
    "General",
    "Location",
    "Features",
    "Amenities",
    "Contact",
  ];

  // label component
  const Label = ({ children, required }) => (
    <label className="block text-[14px] font-medium text-gray-700 mb-1">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* --- Stepper --- */}
      <div className="flex justify-between mb-10 relative">
        {stepsConfig.map((label, index) => {
          const num = index + 1;
          return (
            <div key={num} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= num
                    ? "bg-(--primaryColor) text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {num}
              </div>
              <span className="text-xs mt-2 font-medium text-gray-500">
                {label}
              </span>
            </div>
          );
        })}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-0">
          <div
            className="h-full bg-(--primaryColor) transition-all duration-300"
            style={{
              width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        <div className="min-h-[300px]">
          {/* step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h5 className="text-lg text-[var(--grayColor)] font-semibold">
                Step 1: General Info
              </h5>

              {/* Image Upload */}
              <div className="pb-2">
                <Label>Property Images (Max 4)</Label>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-md w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <i className="bx bx-x text-lg"></i>
                      </button>
                    </div>
                  ))}

                  {formData.images.length < 4 && (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-(--primaryColor) transition-all group">
                      <i className="bx bx-cloud-upload text-2xl text-gray-400 group-hover:text-(--primaryColor)"></i>
                      <span className="text-[10px] font-medium text-gray-400 group-hover:text-(--primaryColor)">
                        Upload
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

              {/* title  */}
              <div>
                <Label required>Property Title</Label>
                <input
                  type="text"
                  placeholder="Property Title"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none focus:border-(--primaryColor)"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* listing type  */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Listing Type</Label>
                  <select
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                    value={formData.listingType}
                    onChange={(e) =>
                      setFormData({ ...formData, listingType: e.target.value })
                    }
                  >
                    <option value="rent">For Rent</option>
                    <option value="sales">For Sale</option>
                  </select>
                </div>

                {/* categories */}
                <div>
                  <Label>Property Category</Label>
                  <select
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none capitalize"
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

              {/* price */}
              <div>
                <Label>Price (Amount)</Label>
                <input
                  type="number"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                  value={formData.price.amount}
                  onChange={(e) =>
                    updateNested("price", "amount", e.target.value)
                  }
                />
              </div>

              {/* description */}
              <div>
                <Label required>Description</Label>
                <textarea
                  placeholder="Description"
                  rows="4"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h5 className="text-lg text-[var(--grayColor)] font-semibold">
                Step 2: Location
              </h5>

              <div>
                <Label>Street Address</Label>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                  value={formData.address.street}
                  onChange={(e) =>
                    updateNested("address", "street", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>City</Label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
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
                    placeholder="State"
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                    value={formData.address.state}
                    onChange={(e) =>
                      updateNested("address", "state", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h5 className="text-lg text-[var(--grayColor)] font-semibold">
                Step 3: Features
              </h5>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Bedrooms</Label>
                  <input
                    type="number"
                    className="w-full text-gray-600 p-2 text-sm border border-gray-300 rounded-sm outline-none"
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
                    className="w-full text-gray-600 p-2 text-sm border border-gray-300 rounded-sm outline-none"
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
                    className="w-full text-gray-600 p-2 text-sm border border-gray-300 rounded-sm outline-none"
                    value={formData.features.areaSqFt}
                    onChange={(e) =>
                      updateNested("features", "areaSqFt", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h5 className="text-lg text-[var(--grayColor)] font-semibold">
                Step 4: Amenities
              </h5>
              <Label>Select Amenities</Label>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData.amenities).map((key) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3"
                      checked={formData.amenities[key]}
                      onChange={(e) =>
                        updateNested("amenities", key, e.target.checked)
                      }
                    />
                    <span className="capitalize text-gray-700">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h5 className="text-lg text-[var(--grayColor)] font-semibold">
                Step 5: Contact Details
              </h5>
              <div>
                <Label required>Full Name</Label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
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
                  placeholder="Email Address"
                  className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                  value={formData.contact.email}
                  onChange={(e) =>
                    updateNested("contact", "email", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Phone Number</Label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
                    value={formData.contact.phone}
                    maxLength={10}
                    onChange={(e) =>
                      updateNested("contact", "phone", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <input
                    type="tel"
                    placeholder="WhatsApp"
                    className="w-full p-2 text-gray-600 border border-gray-300 text-sm rounded-sm outline-none"
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

        {/* --- Buttons --- */}
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-3 py-2 rounded-sm font-medium transition duration-300 cursor-pointer ${
              step === 1
                ? "text-gray-500 bg-gray-200"
                : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Prev
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2 bg-(--primaryColor) hover:bg-[var(--primaryHoverColor)] text-white rounded-sm font-medium hover:opacity-90 transition duration-300 cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-5 py-2 bg-(--primaryColor) hover:bg-[var(--primaryHoverColor)] text-white rounded-sm font-medium transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading && (
                <CircularProgress variant="solid" color="neutral" size="sm" />
              )}
              {loading ? "Submitting..." : "Submit Property"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostProperty;
