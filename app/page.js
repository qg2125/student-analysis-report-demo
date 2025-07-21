import BgEvaluation from "@/components/modules/BgEvaluation";
import GradeTarget from "@/components/modules/GradeTarget";
import MajorAnalysis from "@/components/modules/MajorAnalysis";
import Improvements from "@/components/modules/Improvements";
import Cover from "@/components/modules/Cover";

export default function Page() {
  return (
    <>
      <Cover />
      <MajorAnalysis />
      <BgEvaluation />
      <GradeTarget />
      <Improvements />
    </>
  );
}
