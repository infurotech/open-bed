"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import Map from "@/components/Map";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock facility data
  const facility = {
    name: "Delaware Valley Rehabilitation Center",
    type: "Rehabilitation Center",
    address: "456 Medical Center Drive",
    city: "Wilmington",
    state: "DE",
    zipCode: "19801",
    phone: "(302) 555-0123",
    email: "info@delawarevalleyrehab.com",
    website: "www.delawarevalleyrehab.com",
    description: "Premier rehabilitation center serving the Delaware Valley region. We specialize in comprehensive physical therapy, occupational therapy, and pain management services in a state-of-the-art facility.",
    specialties: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Pain Management", "Sports Rehabilitation"],
    amenities: ["Private Rooms", "WiFi", "Cafeteria", "Garden", "Parking", "Gym", "Pool"],
    photos: [
      "/images/grid-image/image-01.png",
      "/images/grid-image/image-02.png",
      "/images/grid-image/image-03.png"
    ],
    operatingHours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  };

  return (
    <ProtectedRoute>
      <div>
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Facility Settings
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Facility Name
                      </label>
                      <input 
                        type="text" 
                        defaultValue={facility.name}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Facility Type
                      </label>
                      <input 
                        type="text" 
                        defaultValue={facility.type}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea 
                        defaultValue={facility.description}
                        rows={4}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        defaultValue={facility.phone}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        defaultValue={facility.email}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website
                      </label>
                      <input 
                        type="url" 
                        defaultValue={facility.website}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Address & Map */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Address & Location
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input 
                        type="text" 
                        defaultValue={facility.address}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <input 
                          type="text" 
                          defaultValue={facility.city}
                          className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State
                        </label>
                        <input 
                          type="text" 
                          defaultValue={facility.state}
                          className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input 
                        type="text" 
                        defaultValue={facility.zipCode}
                        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Map Section */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location Map
                      </label>
                      <div className="h-64 rounded-lg overflow-hidden">
                        <Map 
                          center={{ lat: 39.7447, lng: -75.5484 }} // Default to Wilmington, DE
                          markers={[
                            {
                              id: "facility",
                              title: facility.name,
                              lat: 39.7447,
                              lng: -75.5484
                            }
                          ]}
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <a 
                          href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${facility.address}, ${facility.city}, ${facility.state} ${facility.zipCode}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <span>Open in OpenStreetMap</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}

          {activeTab === 'photos' && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Facility Photos
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {facility.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo}
                      alt={`Facility photo ${index + 1}`}
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
                  Specialties & Services
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialties
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {facility.specialties.map((specialty, index) => (
                        <Badge key={index} color="primary" size="sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amenities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {facility.amenities.map((amenity, index) => (
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
                {Object.entries(facility.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="font-medium text-black dark:text-white capitalize">
                      {day}
                    </span>
                    <input 
                      type="text" 
                      defaultValue={hours}
                      className="w-32 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 