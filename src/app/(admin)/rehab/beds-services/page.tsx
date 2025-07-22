"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    nextCleaning: "2024-01-26"
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
    nextCleaning: "2024-01-26"
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
    nextCleaning: "2024-01-26"
  },
  {
    id: "4",
    bedNumber: "B-202",
    roomType: "Semi-Private",
    floor: "2nd Floor",
    wing: "B Wing",
      status: "Available",
    dailyRate: 250,
    amenities: ["Shared Bathroom", "TV", "WiFi"],
    lastCleaned: "2024-01-25",
    nextCleaning: "2024-01-26"
  },
  {
    id: "5",
    bedNumber: "C-301",
    roomType: "ICU",
    floor: "3rd Floor",
    wing: "C Wing",
    status: "Occupied",
    patientId: "P003",
    patientName: "Linda Thompson",
    dailyRate: 500,
    amenities: ["Private Bathroom", "TV", "WiFi", "Phone", "Monitoring Equipment"],
    lastCleaned: "2024-01-25",
    nextCleaning: "2024-01-26"
  },
  {
    id: "6",
    bedNumber: "A-103",
    roomType: "Private",
    floor: "1st Floor",
    wing: "A Wing",
      status: "Maintenance",
    dailyRate: 350,
    amenities: ["Private Bathroom", "TV", "WiFi", "Phone"],
    lastCleaned: "2024-01-24",
    nextCleaning: "2024-01-27"
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
    currentBookings: 15
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
    currentBookings: 12
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
    currentBookings: 8
  },
  {
    id: "4",
    name: "Pain Management",
    category: "Pain Management",
    description: "Specialized pain management therapy using various techniques",
    duration: "90 minutes",
    price: 180,
    status: "Active",
    therapists: ["Dr. Robert Taylor"],
    equipment: ["TENS Unit", "Heat/Cold Therapy", "Massage Equipment"],
    maxPatientsPerDay: 8,
    currentBookings: 6
  },
  {
    id: "5",
    name: "Cardiac Rehabilitation",
    category: "Cardiac Rehabilitation",
    description: "Specialized rehabilitation for cardiac patients",
    duration: "60 minutes",
    price: 160,
    status: "Active",
    therapists: ["Dr. Sarah Davis"],
    equipment: ["Cardiac Monitor", "Exercise Equipment", "ECG Machine"],
    maxPatientsPerDay: 12,
    currentBookings: 10
  },
  {
    id: "6",
    name: "Sports Rehabilitation",
    category: "Sports Rehabilitation",
    description: "Specialized therapy for sports-related injuries",
    duration: "75 minutes",
    price: 150,
    status: "Temporarily Unavailable",
    therapists: ["Dr. Emily Rodriguez"],
    equipment: ["Sports Equipment", "Rehabilitation Tools", "Assessment Devices"],
    maxPatientsPerDay: 10,
    currentBookings: 0
  }
  ];

export default function BedsServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'beds' | 'services'>('beds');
  
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
        return "success";
      case "Occupied":
        return "error";
      case "Maintenance":
        return "warning";
      case "Reserved":
        return "info";
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "Temporarily Unavailable":
        return "warning";
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

  const totalBeds = bedsData.length;
  const availableBeds = bedsData.filter(bed => bed.status === "Available").length;
  const occupiedBeds = bedsData.filter(bed => bed.status === "Occupied").length;
  const maintenanceBeds = bedsData.filter(bed => bed.status === "Maintenance").length;

  const totalServices = servicesData.length;
  const activeServices = servicesData.filter(service => service.status === "Active").length;
  const inactiveServices = servicesData.filter(service => service.status === "Inactive").length;

  const handleBedClick = () => {
    // Handle bed click
  };

  const handleServiceClick = () => {
    // Handle service click
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Beds & Services Management
          </h2>
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => router.push('/rehab/beds-services/new-bed')}
            >
              Add New Bed
            </Button>
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => router.push('/rehab/beds-services/new-service')}
            >
              Add New Service
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'beds', name: 'Beds Management', count: totalBeds },
                { id: 'services', name: 'Services Management', count: totalServices }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'beds' | 'services')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.name}
                  <Badge size="sm" color="info">
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'beds' && (
            <div>
              {/* Beds Statistics */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Beds</p>
                      <p className="text-2xl font-bold text-black dark:text-white">{totalBeds}</p>
                    </div>
                    <div className="text-blue-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
                      <p className="text-2xl font-bold text-green-600">{availableBeds}</p>
                    </div>
                    <div className="text-green-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupied</p>
                      <p className="text-2xl font-bold text-red-600">{occupiedBeds}</p>
                    </div>
                    <div className="text-red-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-600">{maintenanceBeds}</p>
                    </div>
                    <div className="text-yellow-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beds Table */}
                      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="w-full">
              <Table className="w-full">
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Bed Number
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Room Type
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Location
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Patient
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Daily Rate
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Last Cleaned
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                            Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {bedsData.map((bed) => (
                    <TableRow 
                      key={bed.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                              <span 
                                className="font-medium text-gray-800 text-theme-sm dark:text-white/90 cursor-pointer hover:text-blue-600"
                                onClick={() => handleBedClick()}
                              >
                                {bed.bedNumber}
                              </span>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <Badge
                                size="sm"
                                color={getRoomTypeColor(bed.roomType)}
                              >
                                {bed.roomType}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div>
                                <span className="block text-gray-800 dark:text-white">
                                  {bed.floor}
                                </span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  {bed.wing}
                            </span>
                          </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <Badge
                                size="sm"
                                color={getStatusColor(bed.status)}
                              >
                                {bed.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {bed.patientName ? (
                          <div>
                                  <span className="block text-gray-800 dark:text-white">
                                    {bed.patientName}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                    ID: {bed.patientId}
                            </span>
                          </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <span className="font-medium text-gray-800 dark:text-white">
                                ${bed.dailyRate}
                              </span>
                              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                per day
                              </span>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div>
                                <span className="block text-gray-800 dark:text-white">
                                  {formatDate(bed.lastCleaned)}
                                </span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  Next: {formatDate(bed.nextCleaning)}
                                </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="primary">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  Details
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              {/* Services Statistics */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
                      <p className="text-2xl font-bold text-black dark:text-white">{totalServices}</p>
                    </div>
                    <div className="text-blue-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Services</p>
                      <p className="text-2xl font-bold text-green-600">{activeServices}</p>
                    </div>
                    <div className="text-green-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Services</p>
                      <p className="text-2xl font-bold text-red-600">{inactiveServices}</p>
                    </div>
                    <div className="text-red-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Table */}
              <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="w-full">
                    <Table className="w-full">
                      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Service Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Category
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Duration & Price
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Status
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Therapists
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Capacity
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {servicesData.map((service) => (
                          <TableRow 
                            key={service.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                              <div>
                                <span 
                                  className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 cursor-pointer hover:text-blue-600"
                                  onClick={() => handleServiceClick()}
                                >
                                  {service.name}
                                </span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  {service.description}
                                </span>
                              </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                                color={getCategoryColor(service.category)}
                        >
                                {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                                <span className="block text-gray-800 dark:text-white">
                                  {service.duration}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  ${service.price}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <Badge
                                size="sm"
                                color={getStatusColor(service.status)}
                              >
                                {service.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="space-y-1">
                                {service.therapists.slice(0, 2).map((therapist, index) => (
                                  <span key={index} className="block text-gray-800 dark:text-white text-theme-xs">
                                    {therapist}
                                  </span>
                                ))}
                                {service.therapists.length > 2 && (
                                  <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                    +{service.therapists.length - 2} more
                                  </span>
                                )}
                              </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div>
                                <span className="block text-gray-800 dark:text-white">
                                  {service.currentBookings}/{service.maxPatientsPerDay}
                                </span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  patients today
                        </span>
                              </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="primary">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  Details
                                </Button>
                              </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 