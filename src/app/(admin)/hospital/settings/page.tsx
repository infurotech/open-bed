"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export default function HospitalSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock hospital data
  const hospital = {
    name: "Delaware Valley Medical Center",
    type: "General Hospital",
    address: "123 Medical Center Drive",
    city: "Wilmington",
    state: "DE",
    zipCode: "19801",
    phone: "(302) 555-0123",
    email: "info@delawarevalleymc.com",
    website: "www.delawarevalleymc.com",
    description: "Comprehensive medical center serving the Delaware Valley region. We provide emergency care, surgery, intensive care, and rehabilitation services in a state-of-the-art facility.",
    specialties: ["Emergency Medicine", "Cardiology", "Neurology", "Orthopedics", "Surgery", "Intensive Care"],
    amenities: ["Emergency Room", "ICU", "Operating Rooms", "Laboratory", "Radiology", "Pharmacy", "Cafeteria", "Parking"],
    photos: [
      "/images/grid-image/image-01.png",
      "/images/grid-image/image-02.png",
      "/images/grid-image/image-03.png"
    ],
    operatingHours: {
      monday: "24/7",
      tuesday: "24/7",
      wednesday: "24/7",
      thursday: "24/7",
      friday: "24/7",
      saturday: "24/7",
      sunday: "24/7"
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Hospital Settings
          </h1>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'profile', name: 'Profile & Contact' },
                { id: 'photos', name: 'Photos' },
                { id: 'services', name: 'Services' },
                { id: 'hours', name: 'Hours' }
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
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        type="text"
                        defaultValue={hospital.name}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hospitalType">Hospital Type</Label>
                      <Input
                        id="hospitalType"
                        type="text"
                        defaultValue={hospital.type}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        defaultValue={hospital.address}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          defaultValue={hospital.city}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          type="text"
                          defaultValue={hospital.state}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          type="text"
                          defaultValue={hospital.zipCode}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue={hospital.phone}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={hospital.email}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        defaultValue={hospital.website}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Description
                  </h3>
                  <div>
                    <Label htmlFor="description">Hospital Description</Label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      defaultValue={hospital.description}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Hospital Overview */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Hospital Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                      <Badge color="primary" size="sm">{hospital.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                      <span className="text-sm text-gray-900 dark:text-white">{hospital.city}, {hospital.state}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Operating Hours</span>
                      <span className="text-sm text-gray-900 dark:text-white">24/7</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Medical Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, index) => (
                      <Badge key={index} color="info" size="sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Facilities & Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.amenities.map((amenity, index) => (
                      <Badge key={index} color="success" size="sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Hospital Photos
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {hospital.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo}
                      alt={`Hospital photo ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                      ×
                    </button>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center hover:border-gray-400 cursor-pointer">
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">+</div>
                    <div className="text-sm text-gray-500">Add Photo</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Medical Services & Specialties
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialties
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
                        <Badge key={index} color="primary" size="sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Facilities
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {hospital.amenities.map((amenity, index) => (
                        <Badge key={index} color="info" size="sm">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Operating Hours
              </h3>
              <div className="space-y-3">
                {Object.entries(hospital.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {day}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 