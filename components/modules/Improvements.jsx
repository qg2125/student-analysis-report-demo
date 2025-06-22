"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Pencil,
  ExternalLink,
  CheckSquare,
  Square,
  Lightbulb,
} from "lucide-react";

const Improvements = () => {
  const [activeModal, setActiveModal] = useState(null);

  // 预览数据状态
  const [previewData, setPreviewData] = useState({
    generalAdvice:
      "结合同学现阶段的情况，建议把提升GPA放在首位，其次是在托福和GRE考试上取得高分，最后是增加科研/实习经历。",
    academicAdvice:
      "目前3.667+，保持现有分数不断提高，冲击3.8，申请之前在能力范围内越高越好。",
    academicResources: [],
    examGoals: {
      language: { type: "托福", advice: "暂无语言分数建议" },
      greGmat: { type: "GRE", advice: "暂无标化建议" },
    },
    selectedMaterials: [],
    researchGoals: "暂无科研/实习建议",
    researchResources: true,
  });

  // 表单数据状态
  const [formData, setFormData] = useState({
    generalAdvice:
      "结合同学现阶段的情况，建议把提升GPA放在首位，其次是在托福和GRE考试上取得高分，最后是增加科研/实习经历。",
    academicAdvice:
      "目前3.667+，保持现有分数不断提高，冲击3.8，申请之前在能力范围内越高越好。",
    academicResources: [
      {
        id: 1,
        name: "Kaggle竞赛平台",
        url: "https://www.kaggle.com/competitions",
        checked: false,
      },
      {
        id: 2,
        name: "阿里云天池大数据竞赛",
        url: "https://tianchi.aliyun.com/competition/gameList/activeList",
        checked: false,
      },
      {
        id: 3,
        name: "EDX网课平台",
        url: "https://www.edx.org/",
        checked: false,
      },
      {
        id: 4,
        name: "Coursera网课平台",
        url: "https://www.coursera.org/",
        checked: false,
      },
    ],
    examGoals: {
      language: {
        type: "托福",
        advice:
          "部分项目是海本不可waive托福，广义此前已有111高分，保险起见，可以GRE达标之后大三暑假/大四上学期再刷一个托福分数。",
      },
      greGmat: {
        type: "GRE",
        advice: "争取8月中旬首考达到325+ (170, 155-160)",
      },
    },
    selectedMaterials: [
      {
        id: 1,
        name: "【核桃英语】雅思全科备考资料包",
        url: "https://pan.baidu.com/s/1gPLhl2Xr92_KWy6pUC6RaQ",
        code: "htyy",
        checked: false,
      },
      {
        id: 2,
        name: "【核桃英语】托福全科综合备考资料包",
        url: "https://pan.baidu.com/s/1HEKTISiwtOeFYn1hnoarjQ",
        code: "htyy",
        checked: false,
      },
      {
        id: 3,
        name: "【核桃英语】GRE全科综合备考资料包",
        url: "https://pan.baidu.com/s/1P-8_jv_fb5LiYAMt8xxsYg",
        code: "htyy",
        checked: false,
      },
      {
        id: 4,
        name: "【核桃英语】GMAT全科综合备考资料包",
        url: "https://pan.baidu.com/s/1t9uFwzCkffcnkZeUQgrHKw",
        code: "htyy",
        checked: false,
      },
    ],
    researchGoals:
      "提升目标：理想目标为2-3段相关科研/实习（CS相关），发表1-2篇文章。可以从面对新手的getting started类型的题目开始练手。",
    researchResources: true,
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleExamGoalChange = (category, field, value) => {
    setFormData({
      ...formData,
      examGoals: {
        ...formData.examGoals,
        [category]: {
          ...formData.examGoals[category],
          [field]: value,
        },
      },
    });
  };

  const handleResourceToggle = (category, id) => {
    setFormData({
      ...formData,
      [category]: formData[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const handleSave = (modalType) => {
    setPreviewData({ ...formData });
    setActiveModal(null);
  };

  const handleCancel = () => {
    setFormData({ ...previewData });
    setActiveModal(null);
  };

  const getSelectedResources = (resources) => {
    return resources.filter((item) => item.checked);
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 border border-gray-300 shadow-2xl rounded-lg bg-white">
        {/* 主标题 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary">提升建议</h3>
        </div>

        {/* 总体建议 - 卡片式设计 */}
        <div className="mb-8 relative">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb
                    size={32}
                    className="text-teal-600 font-bold stroke-2 "
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    总体提升建议
                  </h4>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {previewData.generalAdvice}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => openModal("general")}
                variant="ghost"
                size="sm"
                className="ml-4 p-2 bg-transparent hover:bg-teal-50 border-0"
              >
                <Pencil
                  size={16}
                  className="text-teal-600 font-bold stroke-2"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* 三个主要版块 */}
        <div className="space-y-6">
          {/* 学术成绩版块 */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-teal-500 text-white p-4 flex justify-between items-center">
              <h4 className="text-lg font-bold">提升建议 - 学术成绩</h4>
              <Button
                onClick={() => openModal("academic")}
                variant="secondary"
                size="sm"
                className="bg-transparent hover:bg-white/30 text-white "
              >
                <Pencil size={16} />
              </Button>
            </div>
            <div className="p-6 bg-gray-50 space-y-6">
              {/* 个性化提升建议 */}
              <div>
                <h5 className="font-semibold mb-3 text-teal-600">
                  GPA提升建议
                </h5>
                <div className="p-4 bg-white rounded border">
                  <p className="text-gray-700">{previewData.academicAdvice}</p>
                </div>
              </div>

              {/* 竞赛网课链接 */}
              <div>
                <h5 className="font-semibold mb-3 text-teal-600">
                  竞赛网课链接
                </h5>
                {getSelectedResources(previewData.academicResources).length >
                0 ? (
                  <div className="space-y-2">
                    {getSelectedResources(previewData.academicResources).map(
                      (resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-3 bg-white rounded border hover:shadow-sm transition-shadow"
                        >
                          <ExternalLink size={16} className="text-teal-500" />
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {resource.name}
                          </a>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic p-4 bg-white rounded border">
                    暂无选中的学术资源
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 标准化考试版块 */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-teal-500 text-white p-4 flex justify-between items-center">
              <h4 className="text-lg font-bold">提升建议 - 标准化考试</h4>
              <Button
                onClick={() => openModal("exam")}
                variant="secondary"
                size="sm"
                className="bg-transparent hover:bg-white/30 text-white "
              >
                <Pencil size={14} />
              </Button>
            </div>
            <div className="p-6 bg-gray-50 space-y-6">
              {/* 考试目标 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-semibold text-teal-600 mb-2">
                    {previewData.examGoals.language.type}
                  </h5>
                  <p className="text-sm text-gray-700">
                    {previewData.examGoals.language.advice}
                  </p>
                </div>
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-semibold text-teal-600 mb-2">
                    {previewData.examGoals.greGmat.type}
                  </h5>
                  <p className="text-sm text-gray-700">
                    {previewData.examGoals.greGmat.advice}
                  </p>
                </div>
              </div>

              {/* 备考资料包 */}
              <div>
                <h5 className="font-semibold mb-3 text-teal-600">
                  四大考试备考资料包
                </h5>
                {getSelectedResources(previewData.selectedMaterials).length >
                0 ? (
                  <div className="space-y-3">
                    {getSelectedResources(previewData.selectedMaterials).map(
                      (material) => (
                        <div
                          key={material.id}
                          className="p-4 bg-white rounded border hover:shadow-sm transition-shadow"
                        >
                          <h6 className="font-medium mb-2 text-gray-800">
                            {material.name}
                          </h6>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">链接：</span>
                              <a
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-all"
                              >
                                {material.url}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">提取码：</span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                {material.code}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic p-4 bg-white rounded border">
                    暂无选中的备考资料
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 实习/科研版块 */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-teal-500 text-white p-4 flex justify-between items-center">
              <h4 className="text-lg font-bold">提升建议 - 实习/科研</h4>
              <Button
                onClick={() => openModal("research")}
                variant="secondary"
                size="sm"
                className="bg-transparent hover:bg-white/30 text-white "
              >
                <Pencil size={14} />
              </Button>
            </div>
            <div className="p-6 bg-gray-50 space-y-4">
              <div>
                <h5 className="font-semibold mb-3 text-teal-600">
                  科研/实习背景补充建议
                </h5>
                <div className="p-4 bg-white rounded border">
                  <p className="text-gray-700">{previewData.researchGoals}</p>
                </div>
              </div>

              {previewData.researchResources && (
                <div>
                  <h5 className="font-semibold mb-3 text-teal-600">
                    科研/实习资源
                  </h5>
                  <div className="p-4 bg-white rounded border">
                    <div className="space-y-2 text-sm">
                      <div>
                        1、棕榈内推+课外资源库：
                        <a
                          href="http://cms.palmdrive.cn/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-1"
                        >
                          http://cms.palmdrive.cn/
                        </a>
                      </div>
                      <div>2、学校教授官方网页等</div>
                      <div>3、各类科研院所，及时汇总更新发给同学</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 编辑弹窗 */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">
                  {activeModal === "general" && "编辑总体建议"}
                  {activeModal === "academic" && "编辑学术成绩建议"}
                  {activeModal === "exam" && "编辑标准化考试建议"}
                  {activeModal === "research" && "编辑科研/实习建议"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6">
                {/* 总体建议编辑 */}
                {activeModal === "general" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      总体建议
                    </label>
                    <textarea
                      value={formData.generalAdvice}
                      onChange={(e) =>
                        handleInputChange("generalAdvice", e.target.value)
                      }
                      className="w-full p-3 border rounded h-32 resize-none"
                      placeholder="输入总体建议..."
                    />
                  </div>
                )}

                {/* 学术成绩编辑 */}
                {activeModal === "academic" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        个性化提升建议
                      </label>
                      <textarea
                        value={formData.academicAdvice}
                        onChange={(e) =>
                          handleInputChange("academicAdvice", e.target.value)
                        }
                        className="w-full p-3 border rounded h-24 resize-none"
                        placeholder="输入学术成绩提升建议..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        竞赛网课链接选择
                      </label>
                      <div className="space-y-2">
                        {formData.academicResources.map((resource) => (
                          <div
                            key={resource.id}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded border"
                          >
                            <button
                              onClick={() =>
                                handleResourceToggle(
                                  "academicResources",
                                  resource.id
                                )
                              }
                              className="text-teal-500 hover:text-teal-700"
                            >
                              {resource.checked ? (
                                <CheckSquare size={20} />
                              ) : (
                                <Square size={20} />
                              )}
                            </button>
                            <span
                              className={
                                resource.checked
                                  ? "text-teal-600 font-medium"
                                  : "text-gray-700"
                              }
                            >
                              {resource.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 考试目标编辑 */}
                {activeModal === "exam" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 语言考试 */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          语言考试类型
                        </label>
                        <select
                          value={formData.examGoals.language.type}
                          onChange={(e) =>
                            handleExamGoalChange(
                              "language",
                              "type",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded mb-3"
                        >
                          <option value="托福">托福</option>
                          <option value="雅思">雅思</option>
                          <option value="Duolingo">Duolingo</option>
                        </select>
                        <label className="block text-sm font-medium mb-2">
                          建议
                        </label>
                        <textarea
                          value={formData.examGoals.language.advice}
                          onChange={(e) =>
                            handleExamGoalChange(
                              "language",
                              "advice",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded h-20 resize-none"
                          placeholder="输入语言考试建议..."
                        />
                      </div>

                      {/* GRE/GMAT */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          标准化考试类型
                        </label>
                        <select
                          value={formData.examGoals.greGmat.type}
                          onChange={(e) =>
                            handleExamGoalChange(
                              "greGmat",
                              "type",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded mb-3"
                        >
                          <option value="GRE">GRE</option>
                          <option value="GMAT">GMAT</option>
                          <option value="LSAT">LSAT</option>
                        </select>
                        <label className="block text-sm font-medium mb-2">
                          建议
                        </label>
                        <textarea
                          value={formData.examGoals.greGmat.advice}
                          onChange={(e) =>
                            handleExamGoalChange(
                              "greGmat",
                              "advice",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded h-20 resize-none"
                          placeholder="输入标准化考试建议..."
                        />
                      </div>
                    </div>

                    {/* 备考资料选择 */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        备考资料包选择
                      </label>
                      <div className="space-y-3">
                        {formData.selectedMaterials.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded border"
                          >
                            <button
                              onClick={() =>
                                handleResourceToggle(
                                  "selectedMaterials",
                                  material.id
                                )
                              }
                              className="text-teal-500 hover:text-teal-700 mt-1"
                            >
                              {material.checked ? (
                                <CheckSquare size={20} />
                              ) : (
                                <Square size={20} />
                              )}
                            </button>
                            <div className="flex-1">
                              <h6
                                className={`font-medium mb-1 ${
                                  material.checked
                                    ? "text-teal-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {material.name}
                              </h6>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>链接：{material.url}</div>
                                <div>提取码：{material.code}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 科研/实习建议编辑 */}
                {activeModal === "research" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        科研/实习建议
                      </label>
                      <textarea
                        value={formData.researchGoals}
                        onChange={(e) =>
                          handleInputChange("researchGoals", e.target.value)
                        }
                        className="w-full p-3 border rounded h-32 resize-none"
                        placeholder="输入科研/实习建议..."
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.researchResources}
                          onChange={(e) =>
                            handleInputChange(
                              "researchResources",
                              e.target.checked
                            )
                          }
                          className="rounded"
                        />
                        <span className="text-sm">显示科研/实习资源</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
                <Button onClick={handleCancel} variant="outline">
                  取消
                </Button>
                <Button onClick={() => handleSave(activeModal)}>保存</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Improvements;
