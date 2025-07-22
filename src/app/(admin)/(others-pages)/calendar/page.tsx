import Calendar from "@/components/calendar/Calendar";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Calendar - Open Bed",
  description: "Calendar component for Open Bed healthcare management system - Patient appointments, bed scheduling, and rehabilitation session planning",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
