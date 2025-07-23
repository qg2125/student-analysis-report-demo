"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";

const StudentReportHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState({
    studentName: "XXX",
  });

  const [formData, setFormData] = useState({
    studentName: "XXX",
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
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
      <div className="flex flex-col w-full max-w-6xl mx-auto border border-gray-300 shadow-2xl rounded-lg bg-white overflow-hidden">
        {/* 上半部分 - 白色背景 */}
        <div className="h-64 bg-white flex items-center justify-between px-8 md:px-16 relative">
          {/* 左侧logo区域 */}
          <div className="flex items-center">
            {/* Logo */}
            <img src="logo.jpg" alt="Logo" className="h-12" />
          </div>

          {/* 右上角编辑按钮 */}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
            size="sm"
            className="absolute top-8 right-8"
          >
            <Pencil size={16} />
          </Button>

          {/* 右侧插图区域 */}
          <div
            className="hidden md:block absolute right-8 top-1/2 z-10"
            style={{ transform: "translateY(-10%)" }}
          >
            <img
              src="computer.png"
              alt="Computer Illustration"
              className="w-120 h-auto"
            />
          </div>
        </div>

        {/* 下半部分 - 湖绿色背景 */}
        <div className="h-96 bg-teal-500 flex flex-col justify-center px-8 md:px-16 text-white relative">
          {/* 主标题 */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              海外深造·测评报告
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold">
              {previewData.studentName}同学
            </h2>
          </div>

          {/* 底部网址 */}
          <div className="absolute bottom-8 left-8 md:left-16">
            <p className="text-white text-sm md:text-base font-medium">
              www.palmdrive.cn
            </p>
          </div>
        </div>

        {/* 编辑弹窗 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">编辑学生姓名</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    学生姓名
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) =>
                      handleInputChange("studentName", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="输入学生姓名..."
                  />
                </div>
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
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

export default StudentReportHomepage;
