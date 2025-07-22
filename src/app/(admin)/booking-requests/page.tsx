"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

// Mock booking requests data
const mockRequests = [
  {
    id: "1",
    patientName: "John Smith",
    patientImage: "/images/user/user-01.jpg",
    rehabName: "Delaware Rehabilitation Center",
    bedType: "Standard Single Bed",
    admissionDate: "2024-01-15",
    status: "pending",
    services: ["Physical Therapy", "Occupational Therapy"],
    ambulance: true,
    createdAt: "2024-01-10",
    price: 150
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    patientImage: "/images/user/user-02.jpg",
    rehabName: "Philadelphia Rehabilitation Center",
    bedType: "Premium Single Bed",
    admissionDate: "2024-01-20",
    status: "confirmed",
    services: ["Physical Therapy", "Speech Therapy", "Cardiac Rehab"],
    ambulance: false,
    createdAt: "2024-01-08",
    price: 250
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientImage: "/images/user/user-03.jpg",
    rehabName: "Newark Medical Rehabilitation",
    bedType: "ICU Bed",
    admissionDate: "2024-01-12",
    status: "cancelled",
    services: ["Respiratory Therapy"],
    ambulance: true,
    createdAt: "2024-01-05",
    price: 400
  },
  {
    id: "4",
    patientName: "Linda Thompson",
    patientImage: "/images/user/user-04.jpg",
    rehabName: "Baltimore Rehabilitation Center",
    bedType: "Shared Room (2 beds)",
    admissionDate: "2024-01-18",
    status: "pending",
    services: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
    ambulance: false,
    createdAt: "2024-01-12",
    price: 100
  },
  {
    id: "5",
    patientName: "David Wilson",
    patientImage: "/images/user/user-05.jpg",
    rehabName: "Washington DC Rehabilitation Hospital",
    bedType: "Premium Single Bed",
    admissionDate: "2024-01-25",
    status: "confirmed",
    services: ["Physical Therapy", "Sports Medicine"],
    ambulance: true,
    createdAt: "2024-01-15",
    price: 250
  }
];

export default function BookingRequestsPage() {
  const router = useRouter();
  const [requests] = useState(mockRequests);

  // Calculate statistics
  const totalRequests = requests.length;
  const confirmedRequests = requests.filter(request => request.status === "confirmed").length;
  const pendingRequests = requests.filter(request => request.status === "pending").length;
  const cancelledRequests = requests.filter(request => request.status === "cancelled").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const handleRequestClick = (requestId: string) => {
    // Navigate to request details page
    router.push(`/booking-requests/${requestId}`);
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Booking Requests Management
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalRequests} Total Requests
            </span>
          </div>
        </div>

        {/* Booking Requests Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-black dark:text-white">{totalRequests}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedRequests}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <div className="text-yellow-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledRequests}</p>
              </div>
              <div className="text-red-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <div className="w-full">
              <Table className="w-full">
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
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
                      Rehab Center
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Bed Type
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Services
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
                      Admission Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Price/Day
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {requests.map((request) => (
                    <TableRow 
                      key={request.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div 
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handleRequestClick(request.id)}
                        >
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              src={request.patientImage}
                              alt={request.patientName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {request.patientName}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              ID: {request.id.padStart(4, '0')} | {formatDate(request.createdAt)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white">
                            {request.rehabName}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {request.ambulance ? "🚑 Ambulance" : "No Ambulance"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white">
                            {request.bedType}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="max-w-xs">
                          {request.services.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={getStatusColor(request.status)}
                        >
                          {getStatusText(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {formatDate(request.admissionDate)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white">
                            ${request.price}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            per day
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestClick(request.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No booking requests</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You have not made any booking requests yet.</p>
            <button
              onClick={() => router.push('/search-rehab')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Search Rehab Centers
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 