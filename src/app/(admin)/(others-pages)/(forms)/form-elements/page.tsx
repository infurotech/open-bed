import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CheckboxComponents from "@/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
import DropZone from "@/components/form/form-elements/DropZone";
import InputStates from "@/components/form/form-elements/InputStates";
import RadioButtons from "@/components/form/form-elements/RadioButtons";
import SelectInputs from "@/components/form/form-elements/SelectInputs";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Form Elements - Open Bed",
  description: "Form components for Open Bed healthcare management system - Patient registration forms, bed booking forms, and service request forms",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DefaultInputs />
          <InputStates />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SelectInputs />
          <TextAreaInput />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropZone />
        </div>
      </div>
    </div>
  );
}
