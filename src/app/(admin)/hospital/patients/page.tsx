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

interface HospitalPatient {
  id: string;
  name: string;
  image: string;
  age: number;
  admissionDate: string;
  diagnosis: string;
  rehabNeeded: string;
  urgency: "High" | "Medium" | "Low";
  status: "In Treatment" | "Ready for Rehab" | "Rehab Requested" | "Rehab Approved" | "Transferred";
  bedNumber: string;
  doctor: string;
  estimatedDischarge: string;
}

// Mock data for hospital patients with rehab focus
const hospitalPatientsData: HospitalPatient[] = [
  {
    id: "1",
    name: "John Smith",
    image: "/images/user/user-01.jpg",
    age: 65,
    admissionDate: "2024-02-10",
    diagnosis: "Stroke - Left Hemiparesis",
    rehabNeeded: "Physical Therapy, Occupational Therapy",
    urgency: "High",
    status: "Ready for Rehab",
    bedNumber: "ICU-12",
    doctor: "Dr. Sarah Johnson",
    estimatedDischarge: "2024-02-20"
  },
  {
    id: "2",
    name: "Mary Wilson",
    image: "/images/user/user-02.jpg",
    age: 72,
    admissionDate: "2024-02-08",
    diagnosis: "Hip Fracture - Post Surgery",
    rehabNeeded: "Physical Therapy, Pain Management",
    urgency: "Medium",
    status: "In Treatment",
    bedNumber: "SURG-05",
    doctor: "Dr. Michael Chen",
    estimatedDischarge: "2024-02-25"
  },
  {
    id: "3",
    name: "Robert Davis",
    image: "/images/user/user-03.jpg",
    age: 58,
    admissionDate: "2024-02-05",
    diagnosis: "Cardiac Surgery - CABG",
    rehabNeeded: "Cardiac Rehabilitation",
    urgency: "Medium",
    status: "Rehab Requested",
    bedNumber: "CCU-08",
    doctor: "Dr. Emily Rodriguez",
    estimatedDischarge: "2024-02-28"
  },
  {
    id: "4",
    name: "Linda Thompson",
    image: "/images/user/user-04.jpg",
    age: 45,
    admissionDate: "2024-02-03",
    diagnosis: "Spinal Cord Injury - T6",
    rehabNeeded: "Physical Therapy, Occupational Therapy, Speech Therapy",
    urgency: "High",
    status: "Rehab Approved",
    bedNumber: "ICU-15",
    doctor: "Dr. James Wilson",
    estimatedDischarge: "2024-03-05"
  },
  {
    id: "5",
    name: "David Brown",
    image: "/images/user/user-05.jpg",
    age: 69,
    admissionDate: "2024-02-01",
    diagnosis: "Knee Replacement Surgery",
    rehabNeeded: "Physical Therapy",
    urgency: "Low",
    status: "Transferred",
    bedNumber: "ORTH-03",
    doctor: "Dr. Sarah Davis",
    estimatedDischarge: "2024-02-15"
  },
  {
    id: "6",
    name: "Maria Garcia",
    image: "/images/user/user-06.jpg",
    age: 51,
    admissionDate: "2024-01-28",
    diagnosis: "Traumatic Brain Injury",
    rehabNeeded: "Physical Therapy, Occupational Therapy, Speech Therapy",
    urgency: "High",
    status: "In Treatment",
    bedNumber: "ICU-20",
    doctor: "Dr. Robert Taylor",
    estimatedDischarge: "2024-03-10"
  }
];

export default function HospitalPatientsPage() {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Treatment":
        return "warning";
      case "Ready for Rehab":
        return "success";
      case "Rehab Requested":
        return "info";
      case "Rehab Approved":
        return "success";
      case "Transferred":
        return "error";
      default:
        return "info";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "info";
    }
  };

  const handlePatientClick = (patientId: string) => {
    router.push(`/hospital/patients/${patientId}`);
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Hospital Patients Management
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {hospitalPatientsData.length} Total Patients
            </span>
          </div>
        </div>

        {/* Hospital Patients Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-black dark:text-white">{hospitalPatientsData.length}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready for Rehab</p>
                <p className="text-2xl font-bold text-green-600">{hospitalPatientsData.filter(p => p.status === "Ready for Rehab").length}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Treatment</p>
                <p className="text-2xl font-bold text-yellow-600">{hospitalPatientsData.filter(p => p.status === "In Treatment").length}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{hospitalPatientsData.filter(p => p.urgency === "High").length}</p>
              </div>
              <div className="text-red-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1400px]">
              <Table>
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
                      Rehab Needs
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Urgency
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
                      Bed/Doctor
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Est. Discharge
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {hospitalPatientsData.map((patient) => (
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
                        {patient.rehabNeeded}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={getUrgencyColor(patient.urgency)}
                        >
                          {patient.urgency}
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
                            {patient.doctor}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {formatDate(patient.estimatedDischarge)}
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