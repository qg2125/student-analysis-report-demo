"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";

const Home = () => {
  const [formData, setFormData] = useState({
    studentName: "志豪",
    university: "南开大学",
    major: "经济学",
    gpa: "86+%",
    strengths: ["南开大学，经济学，均分86+%，院校不错，专业对口，成绩也不错。"],
    weaknesses: [
      "暂无雅思和GRE，",
      "还需要至少一段实习，再挖掘挖掘课程项目（用到经济学申请）",
    ],
    radarData: {
      academicBackground: 4.5,
      gpa: 4,
      greGmat: 1,
      toeflIelts: 1,
      researchIntern: 2,
      relevantExperience: 3,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStrengthChange = (index, value) => {
    const updatedStrengths = [...formData.strengths];
    updatedStrengths[index] = value;
    setFormData({ ...formData, strengths: updatedStrengths });
  };

  const handleWeaknessChange = (index, value) => {
    const updatedWeaknesses = [...formData.weaknesses];
    updatedWeaknesses[index] = value;
    setFormData({ ...formData, weaknesses: updatedWeaknesses });
  };

  const addStrength = () => {
    setFormData({ ...formData, strengths: [...formData.strengths, ""] });
  };

  const addWeakness = () => {
    setFormData({ ...formData, weaknesses: [...formData.weaknesses, ""] });
  };

  const handleRadarChange = (field, value) => {
    setFormData({
      ...formData,
      radarData: {
        ...formData.radarData,
        [field]: parseFloat(value),
      },
    });
  };

  // This would be connected to a PDF generation library in production
  const generatePDF = () => {
    alert("PDF生成功能将在实际实现中连接到PDF库");
    console.log("生成PDF，数据:", formData);
  };

  // SVG for the radar chart
  const generateRadarChart = () => {
    const { radarData } = formData;
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const fields = [
      { name: "学科背景匹配", key: "academicBackground", angle: 0 },
      { name: "GPA", key: "gpa", angle: 60 },
      { name: "GRE/GMAT", key: "greGmat", angle: 120 },
      { name: "TOEFL/IELTS", key: "toeflIelts", angle: 180 },
      { name: "实习经历/科研经历", key: "researchIntern", angle: 240 },
      { name: "其他相关经历", key: "relevantExperience", angle: 300 },
    ];

    // Generate points for the polygon
    const points = fields.map((field) => {
      const value = radarData[field.key];
      const distance = (value / 5) * radius;
      const x = centerX + distance * Math.cos((field.angle * Math.PI) / 180);
      const y = centerY + distance * Math.sin((field.angle * Math.PI) / 180);
      return `${x},${y}`;
    });

    // Generate grid lines
    const gridLines = [1, 2, 3, 4, 5].map((level) => {
      const gridPoints = fields.map((field) => {
        const distance = (level / 5) * radius;
        const x = centerX + distance * Math.cos((field.angle * Math.PI) / 180);
        const y = centerY + distance * Math.sin((field.angle * Math.PI) / 180);
        return `${x},${y}`;
      });

      return (
        <polygon
          key={`grid-${level}`}
          points={gridPoints.join(" ")}
          fill="none"
          stroke="#ccc"
          strokeWidth="1"
        />
      );
    });

    // Generate axes
    const axes = fields.map((field) => {
      const x = centerX + radius * Math.cos((field.angle * Math.PI) / 180);
      const y = centerY + radius * Math.sin((field.angle * Math.PI) / 180);
      return (
        <line
          key={`axis-${field.key}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="#ccc"
          strokeWidth="1"
        />
      );
    });

    // Generate labels
    const labels = fields.map((field) => {
      const labelDistance = radius + 20;
      const x =
        centerX + labelDistance * Math.cos((field.angle * Math.PI) / 180);
      const y =
        centerY + labelDistance * Math.sin((field.angle * Math.PI) / 180);
      return (
        <text
          key={`label-${field.key}`}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#666"
          fontSize="12"
        >
          {field.name}
        </text>
      );
    });

    return (
      <svg width="400" height="400" viewBox="0 0 400 400">
        {gridLines}
        {axes}
        <polygon
          points={points.join(" ")}
          fill="rgba(39, 199, 193, 0.5)"
          stroke="#27C7C1"
          strokeWidth="2"
        />
        {labels}
      </svg>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      {/* Form Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">填写测评信息</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">优势分析</label>
          {formData.strengths.map((strength, index) => (
            <div key={`strength-${index}`} className="flex mb-2">
              <input
                type="text"
                value={strength}
                onChange={(e) => handleStrengthChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={addStrength}
            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            添加优势
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">短板分析</label>
          {formData.weaknesses.map((weakness, index) => (
            <div key={`weakness-${index}`} className="flex mb-2">
              <input
                type="text"
                value={weakness}
                onChange={(e) => handleWeaknessChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={addWeakness}
            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            添加短板
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">背景测评数据</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.radarData).map(([key, value]) => {
              const fieldNameMap = {
                academicBackground: "学科背景匹配",
                gpa: "GPA",
                greGmat: "GRE/GMAT",
                toeflIelts: "TOEFL/IELTS",
                researchIntern: "实习经历/科研经历",
                relevantExperience: "其他相关经历",
              };

              return (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">
                    {fieldNameMap[key]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={value}
                    onChange={(e) => handleRadarChange(key, e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* <button
          onClick={generatePDF}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Save className="mr-2" size={16} />
          生成PDF
        </button> */}
      </div>

      {/* Preview Section */}
      <div className="border-t-2 border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-center mb-8">预览</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Long/Short Analysis */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="bg-teal-500 p-2 inline-block rounded-md mb-4">
              <h3 className="text-white text-lg font-medium">
                {formData.studentName}专业申请长短板分析
              </h3>
            </div>

            <div className="mb-8">
              <div className="bg-teal-500 text-white text-center py-2 px-4 inline-block mb-4">
                <h4 className="font-medium">优势分析</h4>
              </div>
              <ul className="list-disc pl-6">
                {formData.strengths.map((strength, index) => (
                  <li key={`strength-preview-${index}`} className="mb-2">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-teal-500 text-white text-center py-2 px-4 inline-block mb-4">
                <h4 className="font-medium">短板分析</h4>
              </div>
              <ul className="list-disc pl-6">
                {formData.weaknesses.map((weakness, index) => (
                  <li key={`weakness-preview-${index}`} className="mb-2">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel - Background Analysis */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">
                <span className="text-yellow-500">{formData.studentName}</span>
                <span className="text-gray-700">同学背景测评</span>
              </h3>
              <div className="border-t-2 border-gray-200 w-full mt-2"></div>
            </div>

            <div className="flex justify-center">{generateRadarChart()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
