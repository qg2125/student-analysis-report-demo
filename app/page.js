import BgEvaluation from "@/components/modules/BgEvaluation";
import GradeTarget from "@/components/modules/GradeTarget";
import MajorAnalysis from "@/components/modules/MajorAnalysis";
import Improvements from "@/components/modules/Improvements";
import Cover from "@/components/modules/Cover";
import OverallGoals from "@/components/modules/OverallGoals";
import WrapUp from "@/components/modules/WrapUp";

export default function Page() {
  return (
    <>
      <Cover />
      <MajorAnalysis />
      <BgEvaluation />
      <OverallGoals />
      <GradeTarget />
      <Improvements />
      <WrapUp />
    </>
  );
}
