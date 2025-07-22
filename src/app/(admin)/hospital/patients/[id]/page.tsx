"use client";

import React, { useState, use } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

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
  medicalHistory: Array<{
    date: string;
    condition: string;
    treatment: string;
  }>;
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    purpose: string;
  }>;
  rehabRequirements: Array<{
    service: string;
    frequency: string;
    duration: string;
    priority: string;
  }>;
  transferNotes: string;
}

export default function HospitalPatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview');
  const resolvedParams = use(params);
  
  // Mock hospital patient data with rehab coordination focus
  const patient: HospitalPatient = {
    id: resolvedParams.id,
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
    estimatedDischarge: "2024-02-20",
    medicalHistory: [
      {
        date: "2024-02-10",
        condition: "Acute Ischemic Stroke",
        treatment: "Thrombolytic therapy, ICU monitoring"
      },
      {
        date: "2024-02-08",
        condition: "Hypertension",
        treatment: "Blood pressure management"
      }
    ],
    currentMedications: [
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        purpose: "Blood thinner"
      },
      {
        name: "Atorvastatin",
        dosage: "40mg",
        frequency: "Once daily",
        purpose: "Cholesterol management"
      }
    ],
    rehabRequirements: [
      {
        service: "Physical Therapy",
        frequency: "5x/week",
        duration: "6-8 weeks",
        priority: "High"
      },
      {
        service: "Occupational Therapy",
        frequency: "3x/week",
        duration: "4-6 weeks",
        priority: "Medium"
      }
    ],
    transferNotes: "Patient shows good progress in ICU. Ready for intensive rehab program. Requires specialized stroke rehabilitation facility."
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ProtectedRoute>
      <div>
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Hospital Patient Details
          </h1>
        </div>

        {/* Patient Info Card */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <Image
              src={patient.image}
              alt={patient.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {patient.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Patient ID: {patient.id.padStart(4, '0')} | Age: {patient.age}
              </p>
              <div className="mt-2 flex gap-2">
                <Badge color={getStatusColor(patient.status)} size="sm">
                  {patient.status}
                </Badge>
                <Badge color={getUrgencyColor(patient.urgency)} size="sm">
                  {patient.urgency} Priority
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bed: {patient.bedNumber}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Doctor: {patient.doctor}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Est. Discharge: {formatDate(patient.estimatedDischarge)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'rehab-coordination', name: 'Rehab Coordination' },
                { id: 'medical-history', name: 'Medical History' },
                { id: 'medications', name: 'Medications' },
                { id: 'rehab-requirements', name: 'Rehab Requirements' },
                { id: 'transfer-notes', name: 'Transfer Notes' }
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Diagnosis & Rehab Needs */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Diagnosis & Rehab Needs
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Primary Diagnosis
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.diagnosis}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rehab Services Needed
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.rehabNeeded}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admission Date
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatDate(patient.admissionDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Current Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Treatment Status
                    </label>
                    <div className="mt-1">
                      <Badge color={getStatusColor(patient.status)} size="sm">
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rehab Priority
                    </label>
                    <div className="mt-1">
                      <Badge color={getUrgencyColor(patient.urgency)} size="sm">
                        {patient.urgency} Priority
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Estimated Discharge
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatDate(patient.estimatedDischarge)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rehab-coordination' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Rehab Coordination
              </h3>
              <div className="space-y-6">
                {/* Rehab Requirements */}
                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Rehab Requirements
                  </h4>
                  <div className="space-y-3">
                    {patient.rehabRequirements.map((req, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-black dark:text-white">{req.service}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {req.frequency} for {req.duration}
                            </p>
                          </div>
                          <Badge 
                            color={req.priority === 'High' ? 'error' : req.priority === 'Medium' ? 'warning' : 'success'} 
                            size="sm"
                          >
                            {req.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transfer Notes */}
                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Transfer Notes
                  </h4>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {patient.transferNotes}
                    </p>
                  </div>
                </div>

                {/* Available Rehab Centers */}
                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Available Rehab Centers
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-black dark:text-white">Delaware Rehabilitation Center</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Specialized in stroke rehabilitation</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available beds: 3</p>
                        </div>
                        <Badge color="success" size="sm">Available</Badge>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-black dark:text-white">New York Recovery Institute</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive rehab services</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available beds: 1</p>
                        </div>
                        <Badge color="warning" size="sm">Limited</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical-history' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Medical History
              </h3>
              <div className="space-y-4">
                {patient.medicalHistory.map((history, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">{history.condition}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{history.treatment}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(history.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Current Medications
              </h3>
              <div className="space-y-4">
                {patient.currentMedications.map((med, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">{med.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {med.dosage} - {med.frequency}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Purpose: {med.purpose}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rehab-requirements' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Rehab Requirements
              </h3>
              <div className="space-y-4">
                {patient.rehabRequirements.map((req, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">{req.service}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Frequency: {req.frequency}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Duration: {req.duration}
                        </p>
                      </div>
                      <Badge 
                        color={req.priority === 'High' ? 'error' : req.priority === 'Medium' ? 'warning' : 'success'} 
                        size="sm"
                      >
                        {req.priority} Priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transfer-notes' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Transfer Notes
              </h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line">
                  {patient.transferNotes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 