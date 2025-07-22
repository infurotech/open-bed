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

// Mock patients data
const mockPatients = [
  {
    id: "1",
    name: "John Smith",
    image: "/images/user/user-01.jpg",
    age: 45,
    admissionDate: "2024-01-15",
    diagnosis: "Stroke - Left Hemiparesis",
    status: "Active",
    bedNumber: "A-101",
    doctor: "Dr. Michael Chen",
    expectedDischarge: "2024-02-15",
    roomType: "Private"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: "/images/user/user-02.jpg",
    age: 58,
    admissionDate: "2024-01-18",
    diagnosis: "Hip Fracture - Post Surgery",
    status: "Active",
    bedNumber: "B-203",
    doctor: "Dr. Emily Rodriguez",
    expectedDischarge: "2024-02-20",
    roomType: "Semi-Private"
  },
  {
    id: "3",
    name: "Robert Martinez",
    image: "/images/user/user-03.jpg",
    age: 62,
    admissionDate: "2024-01-20",
    diagnosis: "Spinal Cord Injury - T6",
    status: "Discharged",
    bedNumber: "A-105",
    doctor: "Dr. James Wilson",
    expectedDischarge: "2024-02-25",
    roomType: "Private"
  },
  {
    id: "4",
    name: "Linda Thompson",
    image: "/images/user/user-04.jpg",
    age: 71,
    admissionDate: "2024-01-22",
    diagnosis: "Cardiac Surgery - CABG",
    status: "Active",
    bedNumber: "B-207",
    doctor: "Dr. Sarah Davis",
    expectedDischarge: "2024-02-28",
    roomType: "Semi-Private"
  },
  {
    id: "5",
    name: "David Brown",
    image: "/images/user/user-05.jpg",
    age: 49,
    admissionDate: "2024-01-25",
    diagnosis: "Knee Replacement Surgery",
    status: "Pending",
    bedNumber: "C-301",
    doctor: "Dr. Robert Johnson",
    expectedDischarge: "2024-03-05",
    roomType: "Shared"
  }
];

export default function PatientsPage() {
  const router = useRouter();
  const [patients] = useState(mockPatients);

  // Calculate statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(patient => patient.status === "Active").length;
  const dischargedPatients = patients.filter(patient => patient.status === "Discharged").length;
  const pendingPatients = patients.filter(patient => patient.status === "Pending").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Discharged":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "light";
    }
  };

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Patients
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage patient information and care
            </p>
          </div>
          <Button variant="primary">
            Add New Patient
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {totalPatients}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Patients
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {activePatients}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Discharged
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {dischargedPatients}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {pendingPatients}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Patient List
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="font-medium">Patient</TableCell>
                  <TableCell className="font-medium">Age</TableCell>
                  <TableCell className="font-medium">Diagnosis</TableCell>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell className="font-medium">Bed</TableCell>
                  <TableCell className="font-medium">Doctor</TableCell>
                  <TableCell className="font-medium">Admission Date</TableCell>
                  <TableCell className="font-medium">Expected Discharge</TableCell>
                  <TableCell className="font-medium">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={patient.image}
                          alt={patient.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium text-black dark:text-white">
                          {patient.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {patient.age}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {patient.diagnosis}
                    </TableCell>
                    <TableCell>
                      <Badge color={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {patient.bedNumber}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {patient.doctor}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatDate(patient.admissionDate)}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatDate(patient.expectedDischarge)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientClick(patient.id)}
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
    </ProtectedRoute>
  );
} 