import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "User Profile - Open Bed",
  description: "User profile management for Open Bed healthcare management system - Staff profiles, patient profiles, and healthcare provider information",
};

export default function Profile() {
  return (
    <ProtectedRoute>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profile
          </h3>
          <div className="space-y-6">
            <UserMetaCard />
            <UserInfoCard />
            <UserAddressCard />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
