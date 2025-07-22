"use client";
import React from "react";
import { Star } from "lucide-react";

const OverallGoals = () => {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 border border-gray-300 shadow-2xl rounded-lg bg-white">
        {/* 标题 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-8">整体目标</h3>
        </div>

        {/* 图片容器 */}
        <div className="flex justify-center items-center w-full">
          <img
            src="goals.png"
            alt="整体目标图表"
            className="w-full max-w-full h-auto object-contain rounded-md"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallGoals;
