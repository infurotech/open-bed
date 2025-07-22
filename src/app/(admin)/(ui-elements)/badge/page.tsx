import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { PlusIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Badges - Open Bed",
  description: "Badge components for Open Bed healthcare management system - Status indicators for patient conditions, bed availability, and service types",
};

export default function BadgePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Default Badge
            </h3>
            <div className="flex items-center gap-5">
              <Badge color="primary">Primary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="error">Error</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="info">Info</Badge>
              <Badge color="light">Light</Badge>
              <Badge color="dark">Dark</Badge>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Badge with Icon
            </h3>
            <div className="flex items-center gap-5">
              <Badge color="primary" startIcon={<PlusIcon />}>
                Primary
              </Badge>
              <Badge color="success" startIcon={<PlusIcon />}>
                Success
              </Badge>
              <Badge color="error" startIcon={<PlusIcon />}>
                Error
              </Badge>
              <Badge color="warning" startIcon={<PlusIcon />}>
                Warning
              </Badge>
              <Badge color="info" startIcon={<PlusIcon />}>
                Info
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
