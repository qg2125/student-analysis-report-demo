"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Pencil,
  GraduationCap,
  BookOpen,
  Briefcase,
  Settings,
} from "lucide-react";

const MajorAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMajors, setSelectedMajors] = useState(["计算机科学"]);

  const [studentInfo, setStudentInfo] = useState({
    name: "XXX",
    school: "NYU",
    currentMajor: "Computer Science和Data Science双学位",
    targetDirection: "DS & CS",
  });

  const majorData = {
    计算机科学: {
      overview:
        "CS作为应用性极强的工程类学科，向来是工程学院中最热门的专业之一。现代CS学科又在以前所未有的速度和广度，与其他众多学科，包括数学、计算科学、医学、材料学等等不断地交错互动，逐渐成为在全世界范围内影响力最大最广的学科之一。CS的核心课，首先要学会精通一个编程语言，也就是Java, C++, python至少精通一个。适应面较广，学会一个之后其他语言会快很多上手。算法，离散数学，数据结构也建议精通，打好基础。建议数据库SQL，大数据也学精，计算机系统（导论）也建议学习掌握。基础打好之后，机器学习是重中之重。拓展选修课：计算机网络，操作系统，分布式系统，网络安全等。",
      programs:
        "CS master项目长度为1-2年，大致分为三个方向：①理论：总体比较难，Algorithms & complexity; Logic & verification ②computer system, Operating Systems; Databases; Data Science; Software engineering; Computer Architecture; Computer Networks 创新度较小，申请难度略低于应用方向 ③应用：Machine Learning; Deep Learning; Natural Language Processing; Computer Vision",
      career:
        "互联网行业，含美团、阿里、腾讯，也含新的企业，web 3.0的企业，特斯拉（需要互联网背景的支撑）等等。软件方向来说，国内此类专业就业岗位待遇非常相当，对人才分类很精细，对应届生的要求高。一般需要对某一个特定的领域进行了解，如：同样做软件开发，国内可细分为iOS开发工程师，安卓开发工程师，Web开发工程师（Java开发工程师，智能合约工程师）等。原因：国内太卷，企业选择权利更大，而试验成本可以其他的组件，应用层次高，只需基层应用工程师就具备，所以对毕业学生的要求相对简单，更要求对CRUD的业务逻辑熟悉。",
    },
    数据科学: {
      overview:
        "DS一般设置1-2年，建议选择时间较长的项目，方便进行跟踪+积淀技术经验。工作、大厂点的DS项目下面（100人+），会细分很多方向，如用它研究任何问题，DS in Physics，DS in Biology，生物信息学，Social Science等；或按照数学文字图片视频等分类，如：NLP（需要学习语言学课程），CV（图片处理），小的项目则区分为偏应用/偏理论的分支。DS属于交叉学科，本科很少开设，大部分申请者的本科背景是统计、数学、计算机、金融等。该专业看重学生对数学统计基础，要求CS能力，但要求都不那么高，需要熟练使用编程语言和软件，尤其是：微积分、线代、概率论和统计，各科得分最好是B以上；时间序列属于略丰富性的课程，编程要求：需要掌握数据库，数据结构，算法，对于学习DL，ML来说，需要会使用R<python，用python进行数据读取，分析，清理，做数据可视化，看重分析的能力，不太需要C++等。Model：用NumPy，pandas等，也可以学习Pytorch（一个开源的Python机器学习库，基于Torch，用于自然语言处理等应用程序）。需要熟悉这些常用的工具，会建模、解决问题，建议申请时，有2-3个DS相关经历，如：实习，校内科研，课内项目都可以。",
      programs:
        "以上介绍到在申请写文书的时候回避出感兴趣的方向，写清楚自己想做课程的历程并指出将来的明确职业规划。课程举例：学制1-2年，必修课：金融分析打基础，如Programming for DS，编程都是需要的，用的是Python，CS数据库，算法都有点关系，具体不会涉及finance、intro for DS，数学，线性代数，统计分析和ML，会挂一些经典模型，帮助理解，不其基础上新模型是如何发展的，跟你数学推导计算证明能力和编程能力，帮助学生理解这些模型。Big Data：更偏业界，可以介绍业界用的工具，如SQL及其特点。",
      career:
        "Business analyst：商业分析师起薪不会太高，做简单数据分析，对tech能力要求不高，不涉及复杂的建模，做简单可视化，并和客户、领导等，需要在商业环境中，讲出来自己的insights，对员工的表达能力要求高，在工作中做副产品/项目经理（需技术，但自己不会做太多技术，自己主要负责推进产品）。金融行业则做financial analyst，最好有业务相关专业，会计等，需要finance。质量控制，属于data主导，适用于各行各业。和人打交道能力要求略低，不会做很难的ML，DL技能，需要用简单快速得出结果，对公司发展做贡献，处理问题解决问题。Data Scientist：待遇最好，最对口最契合，比前两个的技术、知识能力要求更高，而试验需要做概率调，统计模型，算法题考验编程能力等，或者做测试，出report，工资也是比前两者最高的。需要产品有学术训练、创新能力的人。",
    },
  };

  const handleMajorChange = (major, checked) => {
    if (checked) {
      setSelectedMajors([...selectedMajors, major]);
    } else {
      setSelectedMajors(selectedMajors.filter((m) => m !== major));
    }
  };

  const generateStudentBackground = (info) => {
    return `${info.name}同学目前就读于${info.school}，学习${info.currentMajor}。根据专业诊断课定位，目前暂定方向：${info.targetDirection}`;
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 border border-gray-300 shadow-2xl rounded-lg bg-white">
        {/* 标题和编辑按钮 */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-primary">专业及方向分析</h3>
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">
            <Pencil size={16} />
          </Button>
        </div>

        {/* 专业选择 */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            选择申请专业
          </h4>
          <div className="flex items-center gap-4">
            <select
              value=""
              onChange={(e) => {
                if (
                  e.target.value &&
                  !selectedMajors.includes(e.target.value)
                ) {
                  setSelectedMajors([...selectedMajors, e.target.value]);
                }
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">选择专业...</option>
              {Object.keys(majorData)
                .filter((major) => !selectedMajors.includes(major))
                .map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
            </select>

            {selectedMajors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedMajors.map((major) => (
                  <span
                    key={major}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
                  >
                    {major}
                    <button
                      onClick={() =>
                        setSelectedMajors(
                          selectedMajors.filter((m) => m !== major)
                        )
                      }
                      className="ml-2 text-teal-600 hover:text-teal-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 学生背景 */}
        <div className="mb-6 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <h4 className="text-lg font-semibold mb-2 text-teal-700 flex items-center">
            <GraduationCap className="mr-2" size={20} />
            学生背景
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {generateStudentBackground(studentInfo)}
          </p>
        </div>

        {/* 专业分析内容 */}
        {selectedMajors.map((major) => (
          <div
            key={major}
            className="mb-8 border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-teal-500 text-white p-4">
              <h3 className="text-xl font-bold text-center">{major}专业分析</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* 专业概况 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-lg font-semibold mb-3 text-teal-600 flex items-center">
                  <BookOpen className="mr-2" size={18} />
                  专业概况
                </h5>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {majorData[major].overview}
                </p>
              </div>

              {/* 课程设置 */}
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h5 className="text-lg font-semibold mb-3 text-cyan-600 flex items-center">
                  <Settings className="mr-2" size={18} />
                  课程设置与项目介绍
                </h5>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {majorData[major].programs}
                </p>
              </div>

              {/* 就业方向 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="text-lg font-semibold mb-3 text-green-600 flex items-center">
                  <Briefcase className="mr-2" size={18} />
                  就业方向与岗位
                </h5>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {majorData[major].career}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* 编辑弹窗 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">编辑学生信息</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={studentInfo.name}
                      onChange={(e) =>
                        setStudentInfo({ ...studentInfo, name: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      学校
                    </label>
                    <input
                      type="text"
                      value={studentInfo.school}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          school: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      当前专业
                    </label>
                    <input
                      type="text"
                      value={studentInfo.currentMajor}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          currentMajor: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      申请方向
                    </label>
                    <input
                      type="text"
                      value={studentInfo.targetDirection}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          targetDirection: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
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

export default MajorAnalysis;
