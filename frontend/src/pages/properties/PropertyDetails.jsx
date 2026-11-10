import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import PropertyReviews from "./PropertyReviews";

const BASE_API = import.meta.env.VITE_BASE_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${BASE_API}/property/get-property/${id}`);
        console.log("res", res.data.data);
        setProperty(res.data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto ">
      <Breadcrumbs
        parentLabel="Properties"
        parentLink="/properties"
        currentLabel={property.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 px-4 md:px-0 py-5">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {property.title}
          </h1>

          <p className="text-gray-500 mt-1 flex items-center">
            <i className="bx bx-map me-1"></i>
            {property.address?.street}, {property.address?.city},{" "}
            {property.address?.state}
          </p>

          <div className="mt-6">
            <img
              src={property.images?.[0]?.url || property.images?.[0]}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              alt=""
            />
          </div>

          {/* Key Features Bar */}
          <div className="flex flex-wrap gap-6 mt-8 py-6 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <i className="bx bx-bed text-2xl text-[var(--primaryColor)]"></i>
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-semibold">{property.features?.bedroom}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-bath text-2xl text-[var(--primaryColor)]"></i>
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold">{property.features?.bathroom}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-area text-2xl text-[var(--primaryColor)]"></i>
              <div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-semibold">
                  {property.features?.areaSqFt} sqft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-car text-2xl text-[var(--primaryColor)]"></i>
              <div>
                <p className="text-sm text-gray-500">Parking</p>
                <p className="font-semibold">
                  {property.features?.parkingSpace}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Description
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <div className="mb-4">
              <span className="bg-gray-100 text-[var(--primaryColor)] text-xs font-bold px-2.5 py-1 rounded uppercase">
                For {property.listingType}
              </span>
            </div>

            <p className="text-sm text-gray-500 font-medium">Asking Price</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{property.price?.amount?.toLocaleString("en-IN")}
            </p>

            {property.price?.isNegotiable && (
              <p className="text-sm text-green-600 mt-1 font-medium italic">
                * Price is negotiable
              </p>
            )}

            <hr className="my-6" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {property.owner?.avatar ? (
                  <img
                    src={property.owner?.avatar}
                    alt="owner"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <i className="bx bxs-user-circle text-4xl text-gray-400"></i>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {property.owner?.name}
                </p>
                <p className="text-xs text-gray-500">Property Owner</p>
              </div>
            </div>

            {/* <Link
              // to={`tel: ${property.owner.phone}`}
              to={`tel:${property.owner.phone}`}
              className="w-full inline-block text-center bg-[var(--primaryColor)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primaryHoverColor)] transition-colors shadow-lg shadow-blue-200"
            >
              Contact Owner
            </Link> */}

            <a
              href={`tel:${property.owner?.phone?.replace(/\D/g, "") || ""}`}
              className="w-full inline-block text-center bg-[var(--primaryColor)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primaryHoverColor)] transition-colors shadow-lg shadow-blue-200"
            >
              Contact Owner
            </a>
          </div>
        </div>
      </div>
      <div className="p-0">
        <PropertyReviews id={id} />
      </div>
    </div>
  );
};

export default PropertyDetails;
