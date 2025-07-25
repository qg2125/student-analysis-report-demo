"use client";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import BgEvaluation from "@/components/modules/BgEvaluation";
import GradeTarget from "@/components/modules/GradeTarget";
import MajorAnalysis from "@/components/modules/MajorAnalysis";
import Improvements from "@/components/modules/Improvements";
import Cover from "@/components/modules/Cover";
import OverallGoals from "@/components/modules/OverallGoals";
import WrapUp from "@/components/modules/WrapUp";
import { Button } from "@/components/ui/button";

export default function Page() {
  const reportRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 模块引用数组
  const moduleRefs = useRef([]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);

    try {
      // 设置横向
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 获取所有模块元素
      const modules = reportRef.current.children;

      for (let i = 0; i < modules.length; i++) {
        const moduleElement = modules[i];

        if (!moduleElement) {
          console.warn(`模块 ${i} 未找到`);
          continue;
        }

        // 为每个模块生成截图
        const canvas = await html2canvas(moduleElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: moduleElement.scrollWidth,
          windowHeight: moduleElement.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // 如果不是第一个模块，添加新页面
        if (i > 0) {
          pdf.addPage();
        }

        // 如果模块内容高度超过一页，需要分割
        if (imgHeight > pdfHeight) {
          let heightLeft = imgHeight;
          let position = 0;

          // 添加第一部分
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // 添加剩余部分
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
        } else {
          // 模块内容适合一页，居中显示
          const yPosition = (pdfHeight - imgHeight) / 2;
          pdf.addImage(
            imgData,
            "PNG",
            0,
            Math.max(0, yPosition),
            imgWidth,
            imgHeight
          );
        }
      }

      pdf.save("report.pdf");
    } catch (error) {
      console.error("PDF生成失败:", error);
      alert(`PDF生成失败: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="m-4"
      >
        {isGenerating ? "生成中..." : "导出为PDF"}
      </Button>
      <div ref={reportRef}>
        <div className="min-h-screen flex flex-col justify-center">
          <Cover />
        </div>
        <div className="min-h-screen flex flex-col justify-start py-8">
          <MajorAnalysis />
        </div>
        <div className="min-h-screen flex flex-col justify-start py-8">
          <BgEvaluation />
        </div>
        <div className="min-h-screen flex flex-col justify-start py-8">
          <OverallGoals />
        </div>
        <div className="min-h-screen flex flex-col justify-start py-8">
          <GradeTarget />
        </div>
        <div className="min-h-screen flex flex-col justify-start py-8">
          <Improvements />
        </div>
        <div className="min-h-screen flex flex-col justify-center">
          <WrapUp />
        </div>
      </div>
    </>
  );
}
