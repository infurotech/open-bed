"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RehabPatient {
  id: string;
  name: string;
  image: string;
  age: number;
  admissionDate: string;
  diagnosis: string;
  rehabServices: string;
  progress: "Excellent" | "Good" | "Fair" | "Poor";
  status: "Active" | "Discharged" | "Pending";
  bedNumber: string;
  doctor: string;
  expectedDischarge: string;
  roomType: string;
}

// Mock data for rehab patients
const rehabPatientsData: RehabPatient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "/images/user/user-01.jpg",
    age: 45,
    admissionDate: "2024-01-15",
    diagnosis: "Stroke - Left Hemiparesis",
    rehabServices: "Physical Therapy, Occupational Therapy",
    progress: "Excellent",
    status: "Active",
    bedNumber: "A-101",
    doctor: "Dr. Michael Chen",
    expectedDischarge: "2024-02-15",
    roomType: "Private"
  },
  {
    id: "2",
    name: "Robert Martinez",
    image: "/images/user/user-02.jpg",
    age: 58,
    admissionDate: "2024-01-18",
    diagnosis: "Hip Fracture - Post Surgery",
    rehabServices: "Physical Therapy, Pain Management",
    progress: "Good",
    status: "Active",
    bedNumber: "B-203",
    doctor: "Dr. Emily Rodriguez",
    expectedDischarge: "2024-02-20",
    roomType: "Semi-Private"
  },
  {
    id: "3",
    name: "Linda Thompson",
    image: "/images/user/user-03.jpg",
    age: 62,
    admissionDate: "2024-01-20",
    diagnosis: "Spinal Cord Injury - T6",
    rehabServices: "Physical Therapy, Occupational Therapy, Speech Therapy",
    progress: "Fair",
    status: "Active",
    bedNumber: "A-105",
    doctor: "Dr. James Wilson",
    expectedDischarge: "2024-02-25",
    roomType: "Private"
  },
  {
    id: "4",
    name: "David Brown",
    image: "/images/user/user-04.jpg",
    age: 71,
    admissionDate: "2024-01-22",
    diagnosis: "Cardiac Surgery - CABG",
    rehabServices: "Cardiac Rehabilitation",
    progress: "Excellent",
    status: "Active",
    bedNumber: "B-207",
    doctor: "Dr. Sarah Davis",
    expectedDischarge: "2024-02-28",
    roomType: "Semi-Private"
  },
  {
    id: "5",
    name: "Maria Garcia",
    image: "/images/user/user-05.jpg",
    age: 49,
    admissionDate: "2024-01-25",
    diagnosis: "Knee Replacement Surgery",
    rehabServices: "Physical Therapy",
    progress: "Good",
    status: "Active",
    bedNumber: "A-108",
    doctor: "Dr. Robert Taylor",
    expectedDischarge: "2024-03-05",
    roomType: "Private"
  },
  {
    id: "6",
    name: "John Wilson",
    image: "/images/user/user-06.jpg",
    age: 55,
    admissionDate: "2024-01-28",
    diagnosis: "Traumatic Brain Injury",
    rehabServices: "Physical Therapy, Occupational Therapy, Speech Therapy",
    progress: "Poor",
    status: "Active",
    bedNumber: "C-301",
    doctor: "Dr. Lisa Anderson",
    expectedDischarge: "2024-03-15",
    roomType: "Private"
  }
];

export default function RehabPatientsPage() {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalPatients = rehabPatientsData.length;
  const activePatients = rehabPatientsData.filter(patient => patient.status === "Active").length;
  const dischargedPatients = rehabPatientsData.filter(patient => patient.status === "Discharged").length;
  const pendingPatients = rehabPatientsData.filter(patient => patient.status === "Pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Discharged":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "info";
    }
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Excellent":
        return "success";
      case "Good":
        return "success";
      case "Fair":
        return "warning";
      case "Poor":
        return "error";
      default:
        return "info";
    }
  };

  const handlePatientClick = (patientId: string) => {
    router.push(`/rehab/patients/${patientId}`);
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Rehab Patients Management
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalPatients} Total Patients
            </span>
          </div>
        </div>

        {/* Patients Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-black dark:text-white">{totalPatients}</p>
              </div>
              <div className="text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Patients</p>
                <p className="text-2xl font-bold text-green-600">{activePatients}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Discharged</p>
                <p className="text-2xl font-bold text-blue-600">{dischargedPatients}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPatients}</p>
              </div>
              <div className="text-yellow-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] overflow-hidden">
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
                      Diagnosis
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Rehab Services
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Progress
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
                      Bed/Room
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Expected Discharge
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {rehabPatientsData.map((patient) => (
                    <TableRow 
                      key={patient.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div 
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handlePatientClick(patient.id)}
                        >
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={patient.image}
                              alt={patient.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {patient.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              ID: {patient.id.padStart(4, '0')} | Age: {patient.age}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white">
                            {patient.diagnosis}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            Admitted: {formatDate(patient.admissionDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {patient.rehabServices}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={getProgressColor(patient.progress)}
                        >
                          {patient.progress}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={getStatusColor(patient.status)}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white">
                            {patient.bedNumber}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {patient.roomType}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {formatDate(patient.expectedDischarge)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 