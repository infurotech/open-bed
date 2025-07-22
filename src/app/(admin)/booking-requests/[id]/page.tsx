"use client";

import React, { useState, use } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

interface BookingRequest {
  id: string;
  patientName: string;
  patientImage: string;
  patientAge: number;
  rehabName: string;
  rehabAddress: string;
  bedType: string;
  admissionDate: string;
  status: "pending" | "confirmed" | "cancelled" | "in_review" | "approved";
  services: string[];
  ambulance: boolean;
  ambulanceDetails?: {
    pickupTime: string;
    pickupDate: string;
    pickupLocation: string;
    estimatedArrival: string;
  };
  createdAt: string;
  price: number;
  totalDays: number;
  comments: Array<{
    id: string;
    author: string;
    authorRole: string;
    timestamp: string;
    message: string;
    type: "comment" | "query" | "status_update";
  }>;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    updatedBy: string;
    notes?: string;
  }>;
}

export default function BookingRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const resolvedParams = use(params);
  
  // Mock booking request data
  const request: BookingRequest = {
    id: resolvedParams.id,
    patientName: "John Smith",
    patientImage: "/images/user/user-01.jpg",
    patientAge: 65,
    rehabName: "Delaware Rehabilitation Center",
    rehabAddress: "123 Main Street, Wilmington, DE 19801",
    bedType: "Standard Single Bed",
    admissionDate: "2024-01-15",
    status: "pending",
    services: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
    ambulance: true,
    ambulanceDetails: {
      pickupTime: "09:00",
      pickupDate: "2024-01-15",
      pickupLocation: "Same as hospital address",
      estimatedArrival: "15-20 minutes"
    },
    createdAt: "2024-01-10",
    price: 150,
    totalDays: 14,
    comments: [
      {
        id: "1",
        author: "Dr. Sarah Johnson",
        authorRole: "Hospital Doctor",
        timestamp: "2024-01-10 14:30",
        message: "Patient is ready for transfer. All medical clearances completed.",
        type: "status_update"
      },
      {
        id: "2",
        author: "Michael Davis",
        authorRole: "Delaware Rehab Center",
        timestamp: "2024-01-11 09:15",
        message: "We have availability for the requested dates. Need insurance verification.",
        type: "query"
      },
      {
        id: "3",
        author: "John Smith",
        authorRole: "Patient",
        timestamp: "2024-01-11 16:45",
        message: "Insurance details have been provided. Please confirm bed availability.",
        type: "comment"
      }
    ],
    statusHistory: [
      {
        status: "Request Submitted",
        timestamp: "2024-01-10 14:30",
        updatedBy: "John Smith",
        notes: "Initial booking request submitted"
      },
      {
        status: "Under Review",
        timestamp: "2024-01-11 09:15",
        updatedBy: "Rehab Coordinator",
        notes: "Insurance verification required"
      },
      {
        status: "Pending",
        timestamp: "2024-01-11 16:45",
        updatedBy: "System",
        notes: "Awaiting insurance approval"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'in_review': return 'info';
      case 'approved': return 'success';
      default: return 'warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'in_review': return 'In Review';
      case 'approved': return 'Approved';
      default: return 'Pending';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case 'status_update': return 'success';
      case 'query': return 'warning';
      case 'comment': return 'info';
      default: return 'info';
    }
  };

  const getCommentTypeText = (type: string) => {
    switch (type) {
      case 'status_update': return 'Status Update';
      case 'query': return 'Query';
      case 'comment': return 'Comment';
      default: return 'Comment';
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Booking Request Details
          </h1>
        </div>

        {/* Request Info Card */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <Image
              src={request.patientImage}
              alt={request.patientName}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {request.patientName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Request ID: {request.id.padStart(4, '0')} | Age: {request.patientAge}
              </p>
              <div className="mt-2 flex gap-2">
                <Badge color={getStatusColor(request.status)} size="sm">
                  {getStatusText(request.status)}
                </Badge>
                <Badge color="info" size="sm">
                  ${request.price}/day
                </Badge>
                {request.ambulance && (
                  <Badge color="warning" size="sm">
                    🚑 Ambulance
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created: {formatDate(request.createdAt)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Admission: {formatDate(request.admissionDate)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Duration: {request.totalDays} days
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
                { id: 'status-tracking', name: 'Status Tracking' },
                { id: 'comments-queries', name: 'Comments & Queries' },
                { id: 'ambulance-details', name: 'Ambulance Details' }
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
              {/* Rehab Center & Bed Details */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Rehab Center & Bed Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rehab Center
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {request.rehabName}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {request.rehabAddress}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bed Type
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {request.bedType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Services Requested
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {request.services.map((service, index) => (
                        <Badge key={index} color="info" size="sm">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial & Timeline */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Financial & Timeline
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Daily Rate
                    </label>
                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                      ${request.price}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Total Duration
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {request.totalDays} days
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Estimated Total
                    </label>
                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                      ${request.price * request.totalDays}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admission Date
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatDate(request.admissionDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'status-tracking' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Status History
              </h3>
              <div className="space-y-4">
                {request.statusHistory.map((status, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      {index < request.statusHistory.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {status.status}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          by {status.updatedBy}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDateTime(status.timestamp)}
                      </p>
                      {status.notes && (
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          {status.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comments-queries' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Comments & Queries
              </h3>
              
              {/* Comments List */}
              <div className="space-y-4 mb-6">
                {request.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge color={getCommentTypeColor(comment.type)} size="sm">
                        {getCommentTypeText(comment.type)}
                      </Badge>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({comment.authorRole})
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add New Comment */}
              <div className="border-t pt-4">
                <h4 className="mb-3 text-md font-medium text-gray-900 dark:text-white">
                  Add Comment
                </h4>
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment or query here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Comment
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                      Add Query
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ambulance-details' && request.ambulance && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-6 text-lg font-semibold text-black dark:text-white flex items-center gap-2">
                🚑 Ambulance Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Date
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(request.ambulanceDetails!.pickupDate)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Time
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {request.ambulanceDetails!.pickupTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Location
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {request.ambulanceDetails!.pickupLocation}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Arrival
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {request.ambulanceDetails!.estimatedArrival}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ambulance-details' && !request.ambulance && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Ambulance Required</h3>
                <p className="text-gray-600 dark:text-gray-400">This booking request does not include ambulance service.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 