"use client";

import React, { useState, use } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

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
  treatmentPlan: Array<{
    service: string;
    frequency: string;
    duration: string;
    progress: string;
  }>;
  progressNotes: Array<{
    date: string;
    note: string;
    therapist: string;
  }>;
  goals: Array<{
    goal: string;
    targetDate: string;
    status: "Completed" | "In Progress" | "Not Started";
  }>;
}

export default function RehabPatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview');
  const resolvedParams = use(params);
  
  // Mock rehab patient data with treatment progress focus
  const patient: RehabPatient = {
    id: resolvedParams.id,
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
    roomType: "Private",
    treatmentPlan: [
      {
        service: "Physical Therapy",
        frequency: "5x/week",
        duration: "6-8 weeks",
        progress: "85% Complete"
      },
      {
        service: "Occupational Therapy",
        frequency: "3x/week",
        duration: "4-6 weeks",
        progress: "70% Complete"
      }
    ],
    progressNotes: [
      {
        date: "2024-02-10",
        note: "Patient showing excellent progress in mobility. Can now walk with minimal assistance.",
        therapist: "Dr. Emily Rodriguez"
      },
      {
        date: "2024-02-08",
        note: "Significant improvement in left arm strength. Starting advanced exercises.",
        therapist: "Dr. James Wilson"
      }
    ],
    goals: [
      {
        goal: "Independent walking",
        targetDate: "2024-02-20",
        status: "In Progress"
      },
      {
        goal: "Return to daily activities",
        targetDate: "2024-02-25",
        status: "In Progress"
      },
      {
        goal: "Home discharge",
        targetDate: "2024-02-15",
        status: "In Progress"
      }
    ]
  };

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

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Not Started":
        return "error";
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
            Rehab Patient Details
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
                <Badge color={getProgressColor(patient.progress)} size="sm">
                  {patient.progress} Progress
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Room: {patient.bedNumber} ({patient.roomType})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Doctor: {patient.doctor}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expected Discharge: {formatDate(patient.expectedDischarge)}
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
                { id: 'treatment-plan', name: 'Treatment Plan' },
                { id: 'progress-notes', name: 'Progress Notes' },
                { id: 'goals', name: 'Goals' },
                { id: 'schedule', name: 'Schedule' },
                { id: 'discharge-planning', name: 'Discharge Planning' }
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
              {/* Progress Summary */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Progress Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall Progress
                    </label>
                    <div className="mt-1">
                      <Badge color={getProgressColor(patient.progress)} size="sm">
                        {patient.progress}
                      </Badge>
                    </div>
                  </div>
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
                      Days in Treatment
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {Math.floor((new Date().getTime() - new Date(patient.admissionDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Schedule for Today
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div>
                      <p className="font-medium text-black dark:text-white">Physical Therapy</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">9:00 AM - 10:30 AM</p>
                    </div>
                    <Badge color="info" size="sm">Scheduled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div>
                      <p className="font-medium text-black dark:text-white">Occupational Therapy</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">2:00 PM - 3:00 PM</p>
                    </div>
                    <Badge color="info" size="sm">Scheduled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div>
                      <p className="font-medium text-black dark:text-white">Doctor Check-up</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">4:00 PM - 4:30 PM</p>
                    </div>
                    <Badge color="warning" size="sm">Pending</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'treatment-plan' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Treatment Plan
              </h3>
              <div className="space-y-4">
                {patient.treatmentPlan.map((plan, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">{plan.service}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.frequency} for {plan.duration}
                        </p>
                      </div>
                      <Badge color="success" size="sm">
                        {plan.progress}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress-notes' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Progress Notes
              </h3>
              <div className="space-y-4">
                {patient.progressNotes.map((note, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(note.date)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {note.therapist}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {note.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Treatment Goals
              </h3>
              <div className="space-y-4">
                {patient.goals.map((goal, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">{goal.goal}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Target: {formatDate(goal.targetDate)}
                        </p>
                      </div>
                      <Badge color={getGoalStatusColor(goal.status)} size="sm">
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Weekly Schedule
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <div key={day} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                      <h4 className="font-medium text-black dark:text-white mb-2">{day}</h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="font-medium text-black dark:text-white">PT</p>
                          <p className="text-gray-600 dark:text-gray-400">9:00 AM</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-black dark:text-white">OT</p>
                          <p className="text-gray-600 dark:text-gray-400">2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discharge-planning' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Discharge Planning
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Discharge Criteria
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Independent walking achieved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Activities of daily living independence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Home safety assessment completed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Post-Discharge Plan
                  </h4>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <ul className="space-y-2 text-sm text-gray-900 dark:text-white">
                      <li>• Outpatient physical therapy 2x/week for 4 weeks</li>
                      <li>• Home exercise program provided</li>
                      <li>• Follow-up appointment in 2 weeks</li>
                      <li>• Home health services arranged</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-md font-semibold text-black dark:text-white">
                    Expected Discharge Date
                  </h4>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <p className="text-lg font-medium text-black dark:text-white">
                      {formatDate(patient.expectedDischarge)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.floor((new Date(patient.expectedDischarge).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                    </p>
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