import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FourIsToThree from "@/components/videos/FourIsToThree";
import OneIsToOne from "@/components/videos/OneIsToOne";
import SixteenIsToNine from "@/components/videos/SixteenIsToNine";
import TwentyOneIsToNine from "@/components/videos/TwentyOneIsToNine";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Videos - Open Bed",
  description: "Video components for Open Bed healthcare management system - Medical training videos, patient education content, and facility tour videos",
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="1:1 Aspect Ratio">
          <OneIsToOne />
        </ComponentCard>

        <ComponentCard title="4:3 Aspect Ratio">
          <FourIsToThree />
        </ComponentCard>

        <ComponentCard title="16:9 Aspect Ratio">
          <SixteenIsToNine />
        </ComponentCard>

        <ComponentCard title="21:9 Aspect Ratio">
          <TwentyOneIsToNine />
        </ComponentCard>
      </div>
    </div>
  );
}
