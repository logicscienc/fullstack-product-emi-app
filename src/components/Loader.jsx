import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-400">
      <div className="relative w-[120px] h-[120px] loader">

        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            style={{ "--i": i + 1 }}
            className="absolute top-0 left-0 w-full h-full rotate-[calc(18deg*var(--i))]"
          ></span>
        ))}

        <div className="rocket relative">
          <FontAwesomeIcon
            icon={faRocket}
            className="text-white text-[50px] relative z-10 rotate-180 drop-shadow-lg"
          />

          {/* Flame */}
          <div className="flame absolute left-1/2 -translate-x-1/2 top-[95px] w-4 h-6 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}

