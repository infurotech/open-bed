import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DefaultModal from "@/components/example/ModalExample/DefaultModal";
import FormInModal from "@/components/example/ModalExample/FormInModal";
import FullScreenModal from "@/components/example/ModalExample/FullScreenModal";
import ModalBasedAlerts from "@/components/example/ModalExample/ModalBasedAlerts";
import VerticallyCenteredModal from "@/components/example/ModalExample/VerticallyCenteredModal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Modals - Open Bed",
  description: "Modal components for Open Bed healthcare management system - Patient information dialogs, confirmation modals, and form overlays",
};

export default function Modals() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Modals" />
      <div className="space-y-5 sm:space-y-6">
        <DefaultModal />
        <FormInModal />
        <FullScreenModal />
        <ModalBasedAlerts />
        <VerticallyCenteredModal />
      </div>
    </div>
  );
}
