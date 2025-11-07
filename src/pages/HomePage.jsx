import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { PRODUCT_API } from "../services/apis";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, selectedBrand, products]);

  async function fetchProducts() {
    setLoading(true);
    const res = await apiConnector("GET", PRODUCT_API.GET_ALL_PRODUCTS);

    if (res?.success && Array.isArray(res.data)) {
      setProducts(res.data);
      setFiltered(res.data);
    } else {
      setProducts([]);
      setFiltered([]);
    }
    setLoading(false);
  }

  function filterProducts() {
    let result = [...products];

    if (selectedBrand !== "all") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(selectedBrand)
      );
    }

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }

  // Polished spinner component
  const Spinner = () => (
    <div className="flex justify-center items-center py-20 col-span-full">
      <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* HERO BANNER */}
      <div className="w-full h-64 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-semibold shadow-lg mb-12 animate-fadeIn">
        Smartphones on Easy EMI 💳
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 animate-fadeInUp">
          <input
            type="text"
            placeholder="Search smartphones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full sm:w-1/2 focus:outline-blue-500 shadow-sm"
          />

          <div className="flex gap-3">
            {["all", "iphone", "samsung", "oneplus"].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition shadow-sm border
                  ${selectedBrand === brand
                    ? "bg-blue-600 text-white"
                    : "bg-white border-gray-300 hover:bg-gray-100"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {loading ? (
            <Spinner />
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 col-span-full">
              No phones found.
            </p>
          ) : (
            filtered.map((product, index) => {
              const firstImage = product.variants?.[0]?.images?.[0];

              return (
                <div
                  key={product._id}
                  className="bg-white border rounded-2xl p-5 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.03] duration-200 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <img
                    src={firstImage}
                    alt={product.name}
                    className="w-full h-56 object-contain"
                  />

                  <h2 className="text-xl font-semibold mt-5 text-gray-800 text-center">
                    {product.name}
                  </h2>

                  <Link to={`/product/${product.slug}`}>
                    <button className="mt-5 w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}




