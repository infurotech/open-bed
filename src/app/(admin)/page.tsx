import type { Metadata } from "next";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard - Open Bed",
  description: "Open Bed Dashboard - Monitor bed availability, patient admissions, rehabilitation services, and healthcare facility operations in real-time.",
  keywords: ['dashboard', 'bed-management', 'patient-tracking', 'healthcare-analytics', 'rehabilitation-services'],
};

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
