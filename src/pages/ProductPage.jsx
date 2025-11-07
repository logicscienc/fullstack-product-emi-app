import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { PRODUCT_API } from "../services/apis";
import Loader from "../components/Loader";

//  Map color keywords → Tailwind colors
const colorMap = {
  orange: "bg-orange-500",
  green: "bg-green-600",
  blue: "bg-blue-600",
  black: "bg-black",
  white: "bg-white border border-gray-300",
  silver: "bg-gray-300",
  gold: "bg-yellow-500",
  gray: "bg-gray-500",
};

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const res = await apiConnector("GET", PRODUCT_API.GET_PRODUCT_BY_SLUG(slug));
    console.log("API Response:", res);

    if (!res?.success) return;

    const productData = res.data;
    setProduct(productData);

    // default variant & image
    setSelectedVariant(productData.variants[0]);
    setSelectedImage(productData.variants[0].images[0]);
  }

  if (!product) return <Loader/>

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">
      
      {/* LEFT: IMAGE GALLERY */}
      <div>
        <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[420px] object-contain bg-white"
          />
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          {selectedVariant?.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition
                ${selectedImage === img ? "border-blue-600 scale-105" : "border-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* PRICE */}
        <div className="mt-6">
          <p className="text-3xl font-bold text-blue-600">₹{selectedVariant?.price}</p>
          {selectedVariant?.mrp && (
            <p className="text-sm text-gray-500 line-through">MRP: ₹{selectedVariant?.mrp}</p>
          )}
        </div>

        {/* VARIANT SELECTOR */}
        <h2 className="text-lg font-medium mt-6 mb-2">Choose Color Variant</h2>

        <div className="flex gap-3 flex-wrap">
          {product.variants.map((v, index) => {
            const colorName = v.title.split(" ").pop().toLowerCase(); // extract last word
            const colorClass = colorMap[colorName] || "bg-gray-400";

            return (
             <button
  key={index}
  onClick={() => {
    setSelectedVariant(v);
    setSelectedImage(v.images[0]);
  }}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition shadow-sm relative
    ${selectedVariant?.title === v.title
      ? "border-blue-600 bg-blue-50 shadow-md scale-[1.03] ring-2 ring-blue-300"
      : "border-gray-300 hover:bg-gray-100 hover:shadow-sm"}`}
>
  {/* Glow ring behind the circle */}
  <span
    className={`absolute w-5 h-5 rounded-full blur-sm opacity-60 
      ${selectedVariant?.title === v.title ? colorClass : "opacity-0"}`}
    style={{ left: "0.55rem" }}
  />

  {/* Actual Color Dot */}
  <span className={`w-4 h-4 relative rounded-full ${colorClass} border border-gray-600`} />

  {v.title}
</button>

            );
          })}
        </div>

        {/* EMI SELECTOR */}
        <h2 className="text-lg font-medium mt-6 mb-2">Choose EMI Plan</h2>

        <div className="space-y-3">
          {product?.emiPlans?.map((plan, i) => (
           <div
  key={i}
  onClick={() => setSelectedEmi(plan)}
  className={`p-4 rounded-lg border cursor-pointer transition shadow-sm relative
    ${selectedEmi?.tenureMonths === plan.tenureMonths
      ? "border-blue-600 bg-blue-50 scale-[1.02] shadow-md ring-2 ring-blue-300"
      : "border-gray-300 hover:bg-gray-100 hover:shadow-sm"}`}
>
  {/* Glow Effect Background */}
  {selectedEmi?.tenureMonths === plan.tenureMonths && (
    <span className="absolute inset-0 rounded-lg bg-blue-200 blur-md opacity-30 -z-10"></span>
  )}

  <p className="font-medium text-gray-800">{plan.name}</p>
  <p className="text-sm text-gray-600">
    ₹{plan.monthly} / month × {plan.tenureMonths} months
  </p>
  <p className="text-xs text-gray-500">Interest: {plan.interestRate}%</p>
</div>

          ))}
        </div>

        {/* TOTAL PAYABLE */}
        {selectedEmi && (
          <div className="mt-6 p-4 border rounded-lg bg-blue-50 shadow-sm">
            <h3 className="font-semibold text-lg">Total Payable</h3>
            <p className="text-2xl font-bold mt-1 text-blue-700">
              ₹{selectedEmi.monthly * selectedEmi.tenureMonths}
            </p>
          </div>
        )}

      
        {/* PROCEED BUTTON */}
<button
  disabled={!selectedEmi}
  onClick={() =>
    alert(`Proceeding with ${selectedEmi?.name} for ${product?.name}`)
  }
  className={`mt-8 w-full py-3 rounded-lg font-medium transition
    ${selectedEmi
      ? "bg-blue-600 text-white shadow hover:bg-blue-700"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
>
  Proceed
</button>

      </div>

    </div>
  );
}




