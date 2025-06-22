"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";

const BgEvaluation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState({
    studentName: "卢广义",
    university: "南开大学",
    major: "经济学",
    gpa: "86",
    strengths: [],
    weaknesses: [],
    radarData: {
      academicBackground: 0,
      gpa: 0,
      greGmat: 0,
      toeflIelts: 0,
      researchIntern: 0,
      relevantExperience: 0,
    },
  });

  const [formData, setFormData] = useState({
    studentName: "志豪",
    university: "南开大学",
    major: "经济学",
    gpa: "86",
    strengths: [""],
    weaknesses: [""],
    radarData: {
      academicBackground: 0,
      gpa: 0,
      greGmat: 0,
      toeflIelts: 0,
      researchIntern: 0,
      relevantExperience: 0,
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

  const removeStrength = (index) => {
    const updatedStrengths = formData.strengths.filter((_, i) => i !== index);
    setFormData({ ...formData, strengths: updatedStrengths });
  };

  const removeWeakness = (index) => {
    const updatedWeaknesses = formData.weaknesses.filter((_, i) => i !== index);
    setFormData({ ...formData, weaknesses: updatedWeaknesses });
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

  const handleSave = () => {
    // 过滤掉空的优缺点
    const filteredStrengths = formData.strengths.filter((s) => s.trim() !== "");
    const filteredWeaknesses = formData.weaknesses.filter(
      (w) => w.trim() !== ""
    );

    setPreviewData({
      ...formData,
      strengths: filteredStrengths,
      weaknesses: filteredWeaknesses,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // 重置表单数据为预览数据
    setFormData({
      ...previewData,
      strengths:
        previewData.strengths.length > 0 ? [...previewData.strengths] : [""],
      weaknesses:
        previewData.weaknesses.length > 0 ? [...previewData.weaknesses] : [""],
    });
    setIsModalOpen(false);
  };

  // SVG for the radar chart
  const generateRadarChart = (data) => {
    const { radarData } = data;
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
    <div className="px-4 md:px-8 py-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 border border-gray-300 shadow-2xl rounded-lg bg-white">
        {/* 编辑按钮 */}
        <div className="flex justify-between items-center">
          <h3 className=" text-xl font-bold text-primary">
            研究生申请长短板分析
          </h3>
          <div className="mb-8 text-right">
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              <Pencil size={16} />
            </Button>
          </div>
        </div>

        {/* 预览部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Long/Short Analysis */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-8">
              <div className="bg-teal-500 text-white text-center py-2 px-4 inline-block mb-4">
                <h4 className="font-medium">优势分析</h4>
              </div>
              {previewData.strengths.length > 0 ? (
                <ul className="list-disc pl-6">
                  {previewData.strengths.map((strength, index) => (
                    <li key={`strength-preview-${index}`} className="mb-2">
                      {strength}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">暂无优势信息</p>
              )}
            </div>

            <div>
              <div className="bg-teal-500 text-white text-center py-2 px-4 inline-block mb-4">
                <h4 className="font-medium">短板分析</h4>
              </div>
              {previewData.weaknesses.length > 0 ? (
                <ul className="list-disc pl-6">
                  {previewData.weaknesses.map((weakness, index) => (
                    <li key={`weakness-preview-${index}`} className="mb-2">
                      {weakness}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">暂无短板信息</p>
              )}
            </div>
          </div>

          {/* Right Panel - Background Analysis */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold">
                <span className="text-teal-500">{previewData.studentName}</span>
                <span className="text-gray-700">同学背景测评</span>
              </h3>
              <div className="border-t-2 border-gray-200 w-full mt-2"></div>
            </div>

            <div className="flex justify-center">
              {generateRadarChart(previewData)}
            </div>
          </div>
        </div>

        {/* 弹窗遮罩 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">填写测评信息</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 gap-4 mb-6"></div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    优势分析
                  </label>
                  {formData.strengths.map((strength, index) => (
                    <div key={`strength-${index}`} className="flex mb-2">
                      <input
                        type="text"
                        value={strength}
                        onChange={(e) =>
                          handleStrengthChange(index, e.target.value)
                        }
                        className="flex-1 p-2 border rounded mr-2"
                        placeholder="请输入优势..."
                      />
                      {formData.strengths.length > 1 && (
                        <Button
                          onClick={() => removeStrength(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={addStrength} size="sm">
                    添加优势
                  </Button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    短板分析
                  </label>
                  {formData.weaknesses.map((weakness, index) => (
                    <div key={`weakness-${index}`} className="flex mb-2">
                      <input
                        type="text"
                        value={weakness}
                        onChange={(e) =>
                          handleWeaknessChange(index, e.target.value)
                        }
                        className="flex-1 p-2 border rounded mr-2"
                        placeholder="请输入短板..."
                      />
                      {formData.weaknesses.length > 1 && (
                        <Button
                          onClick={() => removeWeakness(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={addWeakness} size="sm">
                    添加短板
                  </Button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">背景测评数据</h3>
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
                        <div key={key} className="p-3 border rounded">
                          <label className="block text-sm font-medium mb-2">
                            {fieldNameMap[key]}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.5"
                            value={value}
                            onChange={(e) =>
                              handleRadarChange(key, e.target.value)
                            }
                            className="w-full mb-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span className="font-medium text-teal-600">
                              {value}
                            </span>
                            <span>5</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
                <Button onClick={handleCancel} variant="outline">
                  取消
                </Button>
                <Button onClick={handleSave}>保存</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BgEvaluation;
