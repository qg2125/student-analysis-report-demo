import BgEvaluation from "@/components/modules/BgEvaluation";
import GradeTarget from "@/components/modules/GradeTarget";
import MajorAnalysis from "@/components/modules/MajorAnalysis";
import Improvements from "@/components/modules/Improvements";

export default function Page() {
  return (
    <>
      <MajorAnalysis />
      <BgEvaluation />
      <GradeTarget />
      <Improvements />
    </>
  );
}
