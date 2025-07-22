"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";

// Mock rehab and bed data
const rehabData = {
  "1": {
    name: "Delaware Rehabilitation Center",
    address: "123 Main St, Wilmington, DE 19801",
    image: "/images/rehab/image1.jpeg"
  },
  "2": {
    name: "Philadelphia Rehabilitation Center", 
    address: "456 Oak Ave, Philadelphia, PA 19102",
    image: "/images/rehab/image2.jpg"
  }
};

const bedData = {
  "1": {
    name: "Standard Single Bed",
    price: 150,
    description: "Comfortable single bed with basic amenities"
  },
  "2": {
    name: "Premium Single Bed", 
    price: 250,
    description: "Luxury single bed with enhanced amenities"
  },
  "3": {
    name: "Shared Room (2 beds)",
    price: 100,
    description: "Shared room with two beds"
  },
  "4": {
    name: "ICU Bed",
    price: 400,
    description: "Intensive care unit bed with full monitoring"
  }
};

const services = [
  "Physical Therapy",
  "Occupational Therapy",
  "Speech Therapy", 
  "Cardiac Rehab",
  "Respiratory Therapy",
  "Aquatic Therapy",
  "Sports Medicine",
  "Neurological Rehab"
];

export default function BookingRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rehabId = searchParams.get('rehab');
  const bedId = searchParams.get('bed');

  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    admissionDate: '',
    estimatedStay: '',
    selectedServices: [] as string[],
    ambulanceRequired: false,
    specialRequirements: '',
    insuranceProvider: '',
    insuranceNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const rehab = rehabId ? rehabData[rehabId as keyof typeof rehabData] : null;
  const bed = bedId ? bedData[bedId as keyof typeof bedData] : null;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to booking requests list
    router.push('/booking-requests');
  };

  if (!rehab || !bed) {
    return (
      <ProtectedRoute>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Booking Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The rehabilitation center or bed type could not be found.
          </p>
          <Button onClick={() => router.push('/search-rehab')}>
            Search Rehabilitation Centers
          </Button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Request Bed Booking
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {rehab.name}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Form */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Full Name *</Label>
                      <Input
                        id="patientName"
                        type="text"
                        defaultValue={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientEmail">Email *</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        defaultValue={formData.patientEmail}
                        onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientPhone">Phone *</Label>
                      <Input
                        id="patientPhone"
                        type="tel"
                        defaultValue={formData.patientPhone}
                        onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="admissionDate">Preferred Admission Date *</Label>
                      <Input
                        id="admissionDate"
                        type="date"
                        defaultValue={formData.admissionDate}
                        onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        type="text"
                        defaultValue={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        defaultValue={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Required Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map(service => (
                      <div key={service} className="flex items-center">
                        <Checkbox
                          id={service}
                          checked={formData.selectedServices.includes(service)}
                          onChange={(checked) => {
                            if (checked) {
                              handleServiceToggle(service);
                            } else {
                              handleServiceToggle(service);
                            }
                          }}
                        />
                        <Label htmlFor={service} className="ml-2 cursor-pointer">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Additional Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Checkbox
                        id="ambulanceRequired"
                        checked={formData.ambulanceRequired}
                        onChange={(checked) => handleInputChange('ambulanceRequired', checked)}
                      />
                      <Label htmlFor="ambulanceRequired" className="ml-2 cursor-pointer">
                        Ambulance Service Required
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="estimatedStay">Estimated Length of Stay (days)</Label>
                      <Input
                        id="estimatedStay"
                        type="number"
                        min="1"
                        defaultValue={formData.estimatedStay}
                        onChange={(e) => handleInputChange('estimatedStay', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <textarea
                        id="specialRequirements"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                        placeholder="Any special medical requirements, dietary restrictions, or other needs..."
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Insurance Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        type="text"
                        defaultValue={formData.insuranceProvider}
                        onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="insuranceNumber">Insurance Number</Label>
                      <Input
                        id="insuranceNumber"
                        type="text"
                        defaultValue={formData.insuranceNumber}
                        onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Booking Summary
              </h3>
              
              {/* Rehab Center */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Rehabilitation Center
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={rehab.image}
                    alt={rehab.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {rehab.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rehab.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bed Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Selected Bed
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bed.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {bed.description}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${bed.price}/day
                  </p>
                </div>
              </div>

              {/* Services Summary */}
              {formData.selectedServices.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Selected Services
                  </h4>
                  <div className="space-y-1">
                    {formData.selectedServices.map(service => (
                      <div key={service} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Services */}
              {formData.ambulanceRequired && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Additional Services
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Ambulance Service
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 