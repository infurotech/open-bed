"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

// Mock existing patients data
const existingPatients = [
  { id: "1", name: "John Smith", age: 45, phone: "(555) 123-4567" },
  { id: "2", name: "Sarah Johnson", age: 32, phone: "(555) 234-5678" },
  { id: "3", name: "Michael Brown", age: 58, phone: "(555) 345-6789" },
];

export default function BookingRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rehabId = searchParams.get('rehab');
  const bedId = searchParams.get('bed');
  
  const [selectedPatient, setSelectedPatient] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [needAmbulance, setNeedAmbulance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock bed data (same as in rehab page)
  const bedTypes = [
    {
      id: "1",
      name: "Standard Single Bed",
      description: "Comfortable single bed with basic amenities",
      price: 150,
      available: 8,
      total: 20,
      features: ["Private room", "Basic monitoring", "Daily care"]
    },
    {
      id: "2", 
      name: "Premium Single Bed",
      description: "Luxury single bed with enhanced amenities",
      price: 250,
      available: 3,
      total: 10,
      features: ["Private room", "Advanced monitoring", "Premium care", "Better meals"]
    },
    {
      id: "3",
      name: "Shared Room (2 beds)",
      description: "Shared room with two beds, cost-effective option",
      price: 100,
      available: 5,
      total: 15,
      features: ["Shared room", "Basic monitoring", "Daily care"]
    },
    {
      id: "4",
      name: "ICU Bed",
      description: "Intensive care unit bed with full monitoring",
      price: 400,
      available: 2,
      total: 5,
      features: ["Private ICU room", "24/7 monitoring", "Specialized care", "Emergency equipment"]
    }
  ];

  const selectedBed = bedTypes.find(bed => bed.id === bedId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccessModal(true);
    setIsSubmitting(false);
  };

  const handleViewRequests = () => {
    router.push('/booking-requests');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/booking-requests');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full">
          <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
          Complete Booking Request
          </h1>
        </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
                {/* Selected Bed Details */}
                {selectedBed && (
                  <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Selected Bed
                    </h3>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedBed.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedBed.description}</p>
                        <div className="mt-4 space-y-2">
                          {selectedBed.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-8">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">${selectedBed.price}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Patient Selection with Typeahead */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Select Patient *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search patients by name..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => {
                          const searchTerm = e.target.value.toLowerCase();
                          // Filter patients based on search
                        }}
                      />
                      <div className="absolute right-3 top-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Patient List */}
                    <div className="mt-4 space-y-2">
                      {existingPatients.map(patient => (
                        <label key={patient.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                          <input
                            type="radio"
                            name="patient"
                            value={patient.id}
                            checked={selectedPatient === patient.id}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            className="mr-4"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Age: {patient.age} | Phone: {patient.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Admission Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Admission Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={admissionDate}
                      onChange={(e) => setAdmissionDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Required Services *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Cardiac Rehab", "Respiratory Therapy", "Aquatic Therapy"].map(service => (
                        <label key={service} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedServices([...selectedServices, service]);
                              } else {
                                setSelectedServices(selectedServices.filter(s => s !== service));
                              }
                            }}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ambulance Service */}
                  <div>
                    <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={needAmbulance}
                        onChange={(e) => setNeedAmbulance(e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Need Ambulance Service
                      </span>
                    </label>
                    
                    {needAmbulance && (
                      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Ambulance Details
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Pickup Time *
                            </label>
                            <input
                              type="time"
                              required={needAmbulance}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Pickup Date *
                            </label>
                            <input
                              type="date"
                              required={needAmbulance}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pickup Location *
                          </label>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="pickupLocation"
                                value="hospital"
                                className="mr-3"
                                defaultChecked
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Same as hospital address</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="pickupLocation"
                                value="different"
                                className="mr-3"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Different address</span>
                            </label>
                          </div>
                          
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Enter pickup address"
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-sm text-green-800 dark:text-green-300">
                            Estimated arrival: 15-20 minutes from pickup time
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedPatient || !admissionDate || selectedServices.length === 0}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Complete Booking"}
                  </button>
                </form>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Booking Summary
                </h3>
                
                <div className="space-y-4">
                  {selectedBed && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{selectedBed.name}</h4>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedBed.price}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Selected Services:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedServices.length}</span>
                    </div>
                    
                    {needAmbulance && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Ambulance Service:</span>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">Included</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Booking Successful!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Your booking request has been submitted successfully.</p>
            <button
              onClick={handleViewRequests}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              View Requests
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-4 bg-gray-300 text-gray-800 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
} 