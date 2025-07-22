"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";

interface Bed {
  id: string;
  bedNumber: string;
  roomType: "Private" | "Semi-Private" | "Shared" | "ICU";
  floor: string;
  wing: string;
  status: "Available" | "Occupied" | "Maintenance" | "Reserved";
  patientId?: string;
  patientName?: string;
  dailyRate: number;
  amenities: string[];
  lastCleaned: string;
  nextCleaning: string;
  description?: string;
  notes?: string;
}

interface Service {
  id: string;
  name: string;
  category: "Physical Therapy" | "Occupational Therapy" | "Speech Therapy" | "Pain Management" | "Cardiac Rehabilitation" | "Sports Rehabilitation" | "Neurological Rehabilitation" | "Other";
  description: string;
  duration: string;
  price: number;
  status: "Active" | "Inactive" | "Temporarily Unavailable";
  therapists: string[];
  equipment: string[];
  maxPatientsPerDay: number;
  currentBookings: number;
  requirements?: string[];
  contraindications?: string[];
}

// Mock data for beds
const bedsData: Bed[] = [
  {
    id: "1",
    bedNumber: "A-101",
    roomType: "Private",
    floor: "1st Floor",
    wing: "A Wing",
    status: "Occupied",
    patientId: "P001",
    patientName: "Sarah Johnson",
    dailyRate: 350,
    amenities: ["Private Bathroom", "TV", "WiFi", "Phone"],
    lastCleaned: "2024-01-25",
    nextCleaning: "2024-01-26",
    description: "Premium private room with modern amenities and excellent view",
    notes: "Patient prefers room temperature at 72°F"
  },
  {
    id: "2",
    bedNumber: "A-102",
    roomType: "Private",
    floor: "1st Floor",
    wing: "A Wing",
    status: "Available",
    dailyRate: 350,
    amenities: ["Private Bathroom", "TV", "WiFi", "Phone"],
    lastCleaned: "2024-01-25",
    nextCleaning: "2024-01-26",
    description: "Premium private room with modern amenities",
    notes: "Recently renovated with new furniture"
  },
  {
    id: "3",
    bedNumber: "B-201",
    roomType: "Semi-Private",
    floor: "2nd Floor",
    wing: "B Wing",
    status: "Occupied",
    patientId: "P002",
    patientName: "Robert Martinez",
    dailyRate: 250,
    amenities: ["Shared Bathroom", "TV", "WiFi"],
    lastCleaned: "2024-01-25",
    nextCleaning: "2024-01-26",
    description: "Comfortable semi-private room with shared facilities",
    notes: "Patient has dietary restrictions"
  }
];

// Mock data for services
const servicesData: Service[] = [
  {
    id: "1",
    name: "Physical Therapy - Basic",
    category: "Physical Therapy",
    description: "Comprehensive physical therapy sessions focusing on mobility, strength, and range of motion",
    duration: "45 minutes",
    price: 120,
    status: "Active",
    therapists: ["Dr. Michael Chen", "Dr. Emily Rodriguez"],
    equipment: ["Treadmill", "Resistance Bands", "Weights", "Balance Equipment"],
    maxPatientsPerDay: 20,
    currentBookings: 15,
    requirements: ["Comfortable clothing", "Closed-toe shoes"],
    contraindications: ["Acute pain", "Recent surgery", "Fever"]
  },
  {
    id: "2",
    name: "Occupational Therapy",
    category: "Occupational Therapy",
    description: "Therapy focused on daily living activities and functional independence",
    duration: "60 minutes",
    price: 140,
    status: "Active",
    therapists: ["Dr. Sarah Davis", "Dr. James Wilson"],
    equipment: ["ADL Equipment", "Adaptive Devices", "Kitchen Setup"],
    maxPatientsPerDay: 15,
    currentBookings: 12,
    requirements: ["Patient history", "Current medications list"],
    contraindications: ["Severe cognitive impairment", "Uncontrolled seizures"]
  },
  {
    id: "3",
    name: "Speech Therapy",
    category: "Speech Therapy",
    description: "Speech and language therapy for communication and swallowing disorders",
    duration: "30 minutes",
    price: 100,
    status: "Active",
    therapists: ["Dr. Lisa Anderson"],
    equipment: ["Communication Boards", "Swallowing Equipment", "Assessment Tools"],
    maxPatientsPerDay: 10,
    currentBookings: 8,
    requirements: ["Recent speech evaluation", "Swallowing assessment"],
    contraindications: ["Severe dysphagia", "Unstable vital signs"]
  }
];

export default function BedsServicesDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState<Bed | Service | null>(null);
  const [itemType, setItemType] = useState<'bed' | 'service' | null>(null);

  useEffect(() => {
    const id = params.id as string;
    
    // Check if it's a bed
    const bed = bedsData.find(b => b.id === id);
    if (bed) {
      setItem(bed);
      setItemType('bed');
      return;
    }

    // Check if it's a service
    const service = servicesData.find(s => s.id === id);
    if (service) {
      setItem(service);
      setItemType('service');
      return;
    }

    // If not found, redirect back
    router.push('/rehab/beds-services');
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
      case "Active":
        return "success";
      case "Occupied":
        return "error";
      case "Maintenance":
      case "Temporarily Unavailable":
        return "warning";
      case "Reserved":
      case "Inactive":
        return "info";
      default:
        return "info";
    }
  };

  const getRoomTypeColor = (roomType: string) => {
    switch (roomType) {
      case "Private":
        return "primary";
      case "Semi-Private":
        return "info";
      case "Shared":
        return "warning";
      case "ICU":
        return "error";
      default:
        return "info";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Physical Therapy":
        return "primary";
      case "Occupational Therapy":
        return "success";
      case "Speech Therapy":
        return "info";
      case "Pain Management":
        return "warning";
      case "Cardiac Rehabilitation":
        return "error";
      case "Sports Rehabilitation":
        return "primary";
      case "Neurological Rehabilitation":
        return "info";
      default:
        return "info";
    }
  };

  if (!item || !itemType) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              Loading...
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              {itemType === 'bed' ? 'Bed Details' : 'Service Details'}
              </h2>
              </div>
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              variant={isEditing ? "outline" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit'}
            </Button>
            {isEditing && (
              <Button size="sm" variant="primary">
                Save Changes
              </Button>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'details', name: 'Details' },
                { id: 'history', name: 'History' },
                { id: 'notes', name: 'Notes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    {itemType === 'bed' ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Bed Number:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            {(item as Bed).bedNumber}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Room Type:
                          </span>
                          <Badge
                            size="sm"
                            color={getRoomTypeColor((item as Bed).roomType)}
                          >
                            {(item as Bed).roomType}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location:
                          </span>
                          <span className="text-black dark:text-white">
                            {(item as Bed).floor}, {(item as Bed).wing}
                          </span>
                    </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Daily Rate:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            ${(item as Bed).dailyRate}
                          </span>
                    </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Service Name:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            {(item as Service).name}
                          </span>
                    </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category:
                          </span>
                          <Badge
                            size="sm"
                            color={getCategoryColor((item as Service).category)}
                          >
                            {(item as Service).category}
                          </Badge>
                    </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Duration:
                          </span>
                          <span className="text-black dark:text-white">
                            {(item as Service).duration}
                          </span>
                    </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            ${(item as Service).price}
                          </span>
                    </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Status Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status:
                      </span>
                      <Badge
                        size="sm"
                        color={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    
                    {itemType === 'bed' && (item as Bed).patientName && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current Patient:
                          </span>
                          <span className="text-black dark:text-white">
                            {(item as Bed).patientName}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Patient ID:
                          </span>
                          <span className="text-black dark:text-white">
                            {(item as Bed).patientId}
                          </span>
                        </div>
                      </>
                    )}

                    {itemType === 'service' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Capacity:
                          </span>
                          <span className="text-black dark:text-white">
                            {(item as Service).currentBookings}/{(item as Service).maxPatientsPerDay}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Amenities/Equipment */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    {itemType === 'bed' ? 'Amenities' : 'Equipment'}
                  </h3>
                  <div className="space-y-2">
                    {itemType === 'bed' ? (
                      (item as Bed).amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-black dark:text-white">{amenity}</span>
                        </div>
                      ))
                    ) : (
                      (item as Service).equipment.map((equipment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-black dark:text-white">{equipment}</span>
                      </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Staff/Therapists */}
                {itemType === 'service' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                      Therapists
                  </h3>
                  <div className="space-y-2">
                      {(item as Service).therapists.map((therapist, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {therapist.split(' ').map(n => n[0]).join('')}
                            </span>
                  </div>
                          <span className="text-black dark:text-white">{therapist}</span>
                </div>
                      ))}
              </div>
            </div>
          )}

                {/* Cleaning Schedule (for beds) */}
                {itemType === 'bed' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                      Cleaning Schedule
              </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last Cleaned:
                        </span>
                        <span className="text-black dark:text-white">
                          {formatDate((item as Bed).lastCleaned)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Next Cleaning:
                        </span>
                        <span className="text-black dark:text-white">
                          {formatDate((item as Bed).nextCleaning)}
                        </span>
                  </div>
              </div>
            </div>
          )}

                {/* Requirements & Contraindications (for services) */}
                {itemType === 'service' && (item as Service).requirements && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                      Requirements & Contraindications
              </h3>
              <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Requirements:
                        </h4>
                        <div className="space-y-1">
                          {(item as Service).requirements?.map((req, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-black dark:text-white text-sm">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contraindications:
                        </h4>
                        <div className="space-y-1">
                          {(item as Service).contraindications?.map((contra, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-black dark:text-white text-sm">{contra}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                History
              </h3>
              <div className="text-center py-8">
                <div className="text-gray-500 dark:text-gray-400">
                  History feature coming soon...
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Notes
              </h3>
              <div className="space-y-4">
                  <textarea 
                  rows={6}
                    className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Add notes about this item..."
                  defaultValue={itemType === 'bed' ? (item as Bed).notes : ''}
                  />
                <div className="flex justify-end">
                  <Button size="sm" variant="primary">
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 