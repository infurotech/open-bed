"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Badge from "@/components/ui/badge/Badge";

export default function DashboardContent() {
  const { user } = useAuth();
  const isHospital = user?.type === 'hospital';

  // Simple pending tasks data
  const pendingTasks = [
    {
      id: 1,
      title: "Review patient discharge reports",
      priority: "high",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Update bed availability status",
      priority: "medium",
      dueDate: "2024-02-14"
    },
    {
      id: 3,
      title: "Schedule staff training session",
      priority: "low",
      dueDate: "2024-02-16"
    },
    {
      id: 4,
      title: "Process insurance claims",
      priority: "high",
      dueDate: "2024-02-13"
    }
  ];

  // Requests data
  const requests = [
    {
      id: 1,
      patientName: "John Smith",
      type: "Bed Request",
      status: "pending",
      date: "2024-02-13",
      priority: "high"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      type: "Transfer Request",
      status: "approved",
      date: "2024-02-12",
      priority: "medium"
    },
    {
      id: 3,
      patientName: "Michael Brown",
      type: "Discharge Request",
      status: "pending",
      date: "2024-02-14",
      priority: "low"
    },
    {
      id: 4,
      patientName: "Emily Davis",
      type: "Bed Request",
      status: "rejected",
      date: "2024-02-11",
      priority: "high"
    },
    {
      id: 5,
      patientName: "Robert Wilson",
      type: "Transfer Request",
      status: "pending",
      date: "2024-02-15",
      priority: "medium"
    }
  ];

  // Simple calendar data for current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "light";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "light";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Welcome Section */}
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isHospital ? "Hospital Management Dashboard" : "Rehabilitation Center Dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge color="primary" size="md">
                {user?.role}
              </Badge>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last updated</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isHospital ? "Total Patients" : "Total Beds"}
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {isHospital ? "45" : "50"}
              </p>
            </div>
            <div className="text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isHospital ? "In Treatment" : "Available Beds"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {isHospital ? "28" : "12"}
              </p>
            </div>
            <div className="text-green-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isHospital ? "Ready for Rehab" : "Active Patients"}
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {isHospital ? "12" : "38"}
              </p>
            </div>
            <div className="text-yellow-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isHospital ? "High Priority" : "Recent Admissions"}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {isHospital ? "8" : "5"}
              </p>
            </div>
            <div className="text-red-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

{/* Recent Requests */}
<div className="col-span-12 lg:col-span-4">
  <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Recent Requests
      </h3>
      <Badge color="info" size="sm">
        {requests.length} requests
      </Badge>
    </div>
    <div className="space-y-3">
      {requests.map((request) => (
        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">
              {request.patientName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {request.type} • {formatDate(request.date)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge color={getStatusColor(request.status)} size="sm">
              {request.status}
            </Badge>
            <Badge color={getPriorityColor(request.priority)} size="sm">
              {request.priority}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Pending Tasks */}
      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pending Tasks
            </h3>
            <Badge color="warning" size="sm">
              {pendingTasks.length} tasks
            </Badge>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {formatDate(task.dueDate)}
                  </p>
                </div>
                <Badge color={getPriorityColor(task.priority)} size="sm">
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Calendar */}
      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-8"></div>
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = day === currentDate.getDate();
              return (
                <div
                  key={day}
                  className={`h-8 flex items-center justify-center text-sm rounded ${
                    isToday
                      ? 'bg-blue-500 text-white font-medium'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          
          {/* Calendar Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Regular</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 