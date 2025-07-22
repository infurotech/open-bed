"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/ui/button/Button";

export default function AddNewServicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "Physical Therapy",
    description: "",
    duration: "",
    price: "",
    maxPatientsPerDay: "",
    therapists: [] as string[],
    equipment: [] as string[],
    requirements: [] as string[],
    contraindications: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log("New service data:", formData);
    router.push('/rehab/beds-services');
  };

  const handleArrayChange = (field: string, item: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field as keyof typeof prev] as string[], item]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof typeof prev] as string[]).filter(i => i !== item)
      }));
    }
  };

  return (
    <ProtectedRoute>
      <div>
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Add New Service
          </h1>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Service Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Physical Therapy - Advanced"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Occupational Therapy">Occupational Therapy</option>
                    <option value="Speech Therapy">Speech Therapy</option>
                    <option value="Pain Management">Pain Management</option>
                    <option value="Cardiac Rehabilitation">Cardiac Rehabilitation</option>
                    <option value="Sports Rehabilitation">Sports Rehabilitation</option>
                    <option value="Neurological Rehabilitation">Neurological Rehabilitation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the service..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 45 minutes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 120"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Patients Per Day *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.maxPatientsPerDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxPatientsPerDay: e.target.value }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Equipment & Requirements
              </h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Equipment
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Treadmill",
                      "Resistance Bands", 
                      "Weights",
                      "Balance Equipment",
                      "ADL Equipment",
                      "Adaptive Devices",
                      "Communication Boards",
                      "Swallowing Equipment"
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.equipment.includes(item)}
                          onChange={(e) => handleArrayChange('equipment', item, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Requirements
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Comfortable clothing",
                      "Closed-toe shoes",
                      "Patient history",
                      "Current medications list",
                      "Recent evaluation",
                      "Swallowing assessment"
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.requirements.includes(item)}
                          onChange={(e) => handleArrayChange('requirements', item, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Contraindications
              </h3>
              
              <div className="space-y-2">
                {[
                  "Acute pain",
                  "Recent surgery",
                  "Fever",
                  "Severe cognitive impairment",
                  "Uncontrolled seizures",
                  "Severe dysphagia",
                  "Unstable vital signs"
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.contraindications.includes(item)}
                      onChange={(e) => handleArrayChange('contraindications', item, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600"
              >
                Add Service
              </button>
              <Button
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
} 