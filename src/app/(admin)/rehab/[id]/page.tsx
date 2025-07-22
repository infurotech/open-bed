"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Badge from "@/components/ui/badge/Badge";
import Map from "@/components/Map";
import rehabData from "@/data/rehab-centers.json";

interface RehabCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number;
  rating: number;
  image: string;
  services: string[];
  availableBeds: number;
  totalBeds: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  website: string;
  description: string;
  specialties: string[];
}

// Mock bed data
const bedTypes = [
  {
    id: "1",
    name: "Standard Single Bed",
    description: "Comfortable single bed with basic amenities and essential care services. Perfect for patients requiring standard rehabilitation care.",
    price: 150,
    available: 8,
    total: 20,
    features: ["Private room", "Basic monitoring", "Daily care", "Meal service", "Housekeeping"],
    image: "/images/rehab/image1.jpeg",
    roomSize: "200 sq ft",
    bathroom: "Private",
    wifi: true,
    tv: true,
    mealPlan: "3 meals/day"
  },
  {
    id: "2", 
    name: "Premium Single Bed",
    description: "Luxury single bed with enhanced amenities and premium care services. Ideal for patients seeking comfort and privacy during recovery.",
    price: 250,
    available: 3,
    total: 10,
    features: ["Private room", "Advanced monitoring", "Premium care", "Better meals", "Concierge service"],
    image: "/images/rehab/image2.jpg",
    roomSize: "300 sq ft",
    bathroom: "Private with shower",
    wifi: true,
    tv: true,
    mealPlan: "3 meals/day + snacks"
  },
  {
    id: "3",
    name: "Shared Room (2 beds)",
    description: "Shared room with two beds, cost-effective option for patients who don't mind sharing space. Great for social interaction during recovery.",
    price: 100,
    available: 5,
    total: 15,
    features: ["Shared room", "Basic monitoring", "Daily care", "Social interaction", "Cost-effective"],
    image: "/images/rehab/image3.jpg",
    roomSize: "250 sq ft",
    bathroom: "Shared",
    wifi: true,
    tv: true,
    mealPlan: "3 meals/day"
  },
  {
    id: "4",
    name: "ICU Bed",
    description: "Intensive care unit bed with full monitoring and specialized medical equipment. For patients requiring critical care and constant supervision.",
    price: 400,
    available: 2,
    total: 5,
    features: ["Private ICU room", "24/7 monitoring", "Specialized care", "Emergency equipment", "Medical staff"],
    image: "/images/rehab/image4.jpeg",
    roomSize: "400 sq ft",
    bathroom: "Private with medical equipment",
    wifi: true,
    tv: true,
    mealPlan: "Specialized diet"
  }
];

// Mock additional services
const additionalServices = [
  {
    name: "Ambulance Service",
    description: "Emergency medical transport to and from the facility",
    price: 200,
    available: true
  },
  {
    name: "Physical Therapy",
    description: "Comprehensive physical therapy sessions",
    price: 120,
    available: true
  },
  {
    name: "Occupational Therapy",
    description: "Daily living skills and functional training",
    price: 110,
    available: true
  },
  {
    name: "Speech Therapy",
    description: "Communication and swallowing therapy",
    price: 100,
    available: true
  },
  {
    name: "Respiratory Therapy",
    description: "Breathing treatments and respiratory care",
    price: 130,
    available: true
  },
  {
    name: "Pain Management",
    description: "Specialized pain treatment and management",
    price: 140,
    available: true
  }
];

export default function RehabDetailPage() {
  const params = useParams();
  const rehabId = params.id as string;
  const router = useRouter();
  
  const rehab = rehabData.rehabCenters.find(r => r.id === rehabId) as RehabCenter;
  
  if (!rehab) {
    return (
      <ProtectedRoute>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rehab Center Not Found</h1>
        </div>
      </ProtectedRoute>
    );
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 50) return "success";
    if (percentage >= 25) return "warning";
    return "error";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-full">
          {/* Header */}
          <div className="mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Center Details & Beds */}
            <div className="xl:col-span-2 space-y-6">
              {/* Hero Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-80">
                  <img
                    src={rehab.image}
                    alt={rehab.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color={getAvailabilityColor(rehab.availableBeds, rehab.totalBeds)} size="md">
                      {rehab.availableBeds}/{rehab.totalBeds} beds available
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {rehab.name}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                        {rehab.address}, {rehab.city}, {rehab.state}
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(rehab.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
                            {rehab.rating} ({rehab.distance} miles away)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    {rehab.description}
                  </p>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Phone</p>
                      <p className="text-lg text-gray-900 dark:text-white font-medium">{rehab.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Website</p>
                      <a 
                        href={rehab.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bed Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Available Beds
                </h3>
                
                <div className="space-y-6">
                  {bedTypes.map(bed => (
                    <div key={bed.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="flex">
                        {/* Image Section */}
                        <div className="w-1/3 h-64">
                          <img
                            src={bed.image}
                            alt={bed.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Content Section */}
                        <div className="w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{bed.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {bed.description}
                              </p>
                            </div>
                            <Badge color={getAvailabilityColor(bed.available, bed.total)} size="sm">
                              {bed.available} available
                            </Badge>
                          </div>
                          
                          {/* Room Details */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {bed.roomSize}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                              </svg>
                              {bed.bathroom}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              {bed.wifi ? "WiFi" : "No WiFi"}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m-6 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2" />
                              </svg>
                              {bed.tv ? "TV" : "No TV"}
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features:</h5>
                            <div className="flex flex-wrap gap-2">
                              {bed.features.map((feature, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Price and Action */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-3xl font-bold text-gray-900 dark:text-white">${bed.price}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bed.mealPlan}</p>
                            </div>
                            <button
                              onClick={() => router.push(`/booking-request?rehab=${rehab.id}&bed=${bed.id}`)}
                              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              Request Bed
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Services, Specialties, Map */}
            <div className="xl:col-span-1 space-y-6">
              {/* Services */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Available Services
                </h3>
                <div className="space-y-3">
                  {rehab.services.map(service => (
                    <div key={service} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        {service}
                      </span>
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Specialties
                </h3>
                <div className="space-y-3">
                  {rehab.specialties.map(specialty => (
                    <div key={specialty} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        {specialty}
                      </span>
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Services
                </h3>
                <div className="space-y-4">
                  {additionalServices.map(service => (
                    <div key={service.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                        <Badge color={service.available ? "success" : "error"} size="sm">
                          {service.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {service.description}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${service.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Location
                </h3>
                <div className="h-64 rounded-lg overflow-hidden">
                  <Map 
                    center={{ lat: rehab.coordinates.lat, lng: rehab.coordinates.lng }}
                    markers={[
                      {
                        position: { lat: rehab.coordinates.lat, lng: rehab.coordinates.lng },
                        title: rehab.name
                      }
                    ]}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {rehab.address}, {rehab.city}, {rehab.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 