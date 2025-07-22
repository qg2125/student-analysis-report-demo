"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";

const WrapUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState({
    helpItems: [
      "制定英语复习规划，根据雅思与GRE考试情况商定备考计划",
      "梳理相关科研/实习资料，查看是适合的机会",
      "沟通修改中英简历，辅导你项目申请",
      "日常答疑，定期沟通，确保每学期制定计划的顺利执行",
    ],
  });
  const [formData, setFormData] = useState({
    helpItems: [
      "制定英语复习规划，根据雅思与GRE考试情况商定备考计划",
      "梳理相关科研/实习资料，查看是适合的机会",
      "沟通修改中英简历，辅导你项目申请",
      "日常答疑，定期沟通，确保每学期制定计划的顺利执行",
    ],
  });

  const handleInputChange = (index, value) => {
    const updatedItems = [...formData.helpItems];
    updatedItems[index] = value;
    setFormData({
      ...formData,
      helpItems: updatedItems,
    });
  };

  const addHelpItem = () => {
    setFormData({
      ...formData,
      helpItems: [...formData.helpItems, ""],
    });
  };

  const removeHelpItem = (index) => {
    if (formData.helpItems.length > 1) {
      const updatedItems = formData.helpItems.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        helpItems: updatedItems,
      });
    }
  };

  const handleSave = () => {
    // 过滤掉空的条目
    const filteredItems = formData.helpItems.filter(
      (item) => item.trim() !== ""
    );
    setPreviewData({ helpItems: filteredItems });
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
          <h3 className="text-xl font-bold text-primary">
            接下来我会如何帮助你
          </h3>
          <div className="mb-8 text-right">
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              <Pencil size={16} />
            </Button>
          </div>
        </div>

        {/* 下半部分 - 湖绿色背景 */}
        <div className="min-h-96 bg-teal-500 flex flex-col justify-center px-8 md:px-16 text-white relative">
          {/* 帮助内容列表 */}
          <div className="space-y-6">
            {previewData.helpItems.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-xl font-bold mr-4 mt-1 flex-shrink-0">
                  {index + 1}.
                </span>
                <p className="text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 新增的励志文字部分 */}
        <div className="bg-white py-8 px-8 md:px-16 text-center">
          <div className="text-teal-500 text-lg leading-relaxed space-y-2">
            <p>希望同学能够在接下来的时间明确努力方向</p>
            <p>提升学术和实践软硬实力</p>
            <p>我们一起努力</p>
            <p>备战申请季</p>
            <p>未来收获满意 offer！</p>
          </div>
        </div>

        {/* 编辑弹窗 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-bold">编辑帮助内容</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6">
                <div className="space-y-4">
                  {formData.helpItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-sm font-medium mt-3 flex-shrink-0 text-gray-500">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <textarea
                          value={item}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                          placeholder={`输入第${index + 1}项帮助内容...`}
                          rows="3"
                        />
                      </div>
                      {formData.helpItems.length > 1 && (
                        <button
                          onClick={() => removeHelpItem(index)}
                          className="text-red-400 hover:text-red-600 mt-3 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* 添加新项按钮 */}
                <div className="mt-6">
                  <Button
                    onClick={addHelpItem}
                    variant="outline"
                    className="w-full border-dashed border-2 text-gray-500 hover:text-gray-700"
                  >
                    + 添加新的帮助项
                  </Button>
                </div>
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 sticky bottom-0">
                <Button onClick={handleCancel} variant="outline">
                  取消
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapUp;
