"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";

const GradeTarget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState({
    gpa: {
      advice: "暂无GPA建议",
    },
    language: {
      type: "托福",
      advice: "暂无语言分数建议",
    },
    greGmat: {
      type: "GRE",
      advice: "暂无标化建议",
    },
  });

  const [formData, setFormData] = useState({
    gpa: {
      advice:
        "目前3.667+，保持现有分数不断提高，冲击3.8，申请之前在能力范围内越高越好。",
    },
    language: {
      type: "托福",
      advice:
        "部分项目是海本不可waive托福，广义此前已有111高分，保险起见，可以GRE达标之后大三暑假/大四上学期再刷一个托福分数。",
    },
    greGmat: {
      type: "GRE",
      advice: "争取8月中旬首考达到325+ (170, 155-160)",
    },
  });

  const handleInputChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    setPreviewData({ ...formData });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({ ...previewData });
    setIsModalOpen(false);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 border border-gray-300 shadow-2xl rounded-lg bg-white">
        {/* 编辑按钮 */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary">三维成绩目标</h3>
          <div className="mb-8 text-right">
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              <Pencil size={16} />
            </Button>
          </div>
        </div>

        {/* 预览部分 - 3列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GPA 列 */}
          <div className="bg-teal-500 text-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center min-h-[300px]">
            <h2 className="text-4xl font-bold mb-6">GPA</h2>
            <div className="text-lg leading-relaxed">
              <p>{previewData.gpa.advice}</p>
            </div>
          </div>

          {/* 语言成绩列 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center min-h-[300px]">
            <h2 className="text-4xl font-bold mb-6 text-teal-500">
              {previewData.language.type}
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed">
              <p>{previewData.language.advice}</p>
            </div>
          </div>

          {/* GRE/GMAT 列 */}
          <div className="bg-teal-500 text-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center min-h-[300px]">
            <h2 className="text-4xl font-bold mb-6">
              {previewData.greGmat.type}
            </h2>
            <div className="text-lg leading-relaxed">
              <p>{previewData.greGmat.advice}</p>
            </div>
          </div>
        </div>

        {/* 弹窗遮罩 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">编辑成绩目标</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6 space-y-8">
                {/* GPA 部分 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-4 text-teal-600">
                    GPA 目标
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      建议
                    </label>
                    <textarea
                      value={formData.gpa.advice}
                      onChange={(e) =>
                        handleInputChange("gpa", "advice", e.target.value)
                      }
                      className="w-full p-2 border rounded h-20"
                      placeholder="输入GPA提升建议..."
                    />
                  </div>
                </div>

                {/* 语言成绩部分 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-4 text-teal-600">
                    语言成绩目标
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      考试类型
                    </label>
                    <select
                      value={formData.language.type}
                      onChange={(e) =>
                        handleInputChange("language", "type", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="托福">托福</option>
                      <option value="雅思">雅思</option>
                      <option value="Duolingo">Duolingo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      建议
                    </label>
                    <textarea
                      value={formData.language.advice}
                      onChange={(e) =>
                        handleInputChange("language", "advice", e.target.value)
                      }
                      className="w-full p-2 border rounded h-20"
                      placeholder="输入语言成绩建议..."
                    />
                  </div>
                </div>

                {/* GRE/GMAT 部分 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-4 text-teal-600">
                    GRE/GMAT 目标
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      考试类型
                    </label>
                    <select
                      value={formData.greGmat.type}
                      onChange={(e) =>
                        handleInputChange("greGmat", "type", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="GRE">GRE</option>
                      <option value="GMAT">GMAT</option>
                      <option value="LSAT">LSAT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      建议
                    </label>
                    <textarea
                      value={formData.greGmat.advice}
                      onChange={(e) =>
                        handleInputChange("greGmat", "advice", e.target.value)
                      }
                      className="w-full p-2 border rounded h-20"
                      placeholder="输入考试建议..."
                    />
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

export default GradeTarget;
