"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

const rehabCenters: RehabCenter[] = rehabData.rehabCenters;

const allServices = [
  "Physical Therapy",
  "Occupational Therapy", 
  "Speech Therapy",
  "Cardiac Rehab",
  "Respiratory Therapy",
  "Aquatic Therapy",
  "Sports Medicine",
  "Neurological Rehab"
];

export default function SearchRehabPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [minAvailableBeds, setMinAvailableBeds] = useState<number>(0);
  const [currentLocation] = useState({ lat: 39.7447, lng: -75.5484 }); // Wilmington, DE
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const itemsPerPage = 10;

  const filteredRehabs = rehabCenters.filter(rehab => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        rehab.name.toLowerCase().includes(searchLower) ||
        rehab.address.toLowerCase().includes(searchLower) ||
        rehab.city.toLowerCase().includes(searchLower) ||
        rehab.state.toLowerCase().includes(searchLower) ||
        rehab.services.some(service => service.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Service filter
    if (selectedServices.length > 0) {
      const hasSelectedService = selectedServices.some(service => 
        rehab.services.includes(service)
      );
      if (!hasSelectedService) return false;
    }

    // Distance filter
    if (rehab.distance > maxDistance) return false;

    // Available beds filter
    if (rehab.availableBeds < minAvailableBeds) return false;

    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRehabs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRehabs = filteredRehabs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedServices, maxDistance, minAvailableBeds, searchQuery]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 50) return "success";
    if (percentage >= 25) return "warning";
    return "error";
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        {/* Search and Filters Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {/* Search and Controls Bar */}
          <div className="px-4 py-3">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
              {/* Search Box */}
                <div className="flex-1">
                  <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search rehab centers, addresses, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Results Count */}
                  <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {filteredRehabs.length} centers found
                  </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  showFilters
                        ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Filters
                    {(selectedServices.length > 0 || maxDistance < 50 || minAvailableBeds > 0) && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] flex items-center justify-center">
                      {selectedServices.length + (maxDistance < 50 ? 1 : 0) + (minAvailableBeds > 0 ? 1 : 0)}
                    </span>
                    )}
              </button>

                  {/* View Toggle */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                      className={`px-2.5 py-1.5 text-sm rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                      title="List view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                      className={`px-2.5 py-1.5 text-sm rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                      title="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 12h16M4 16h16" />
                  </svg>
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Filters Panel */}
          {showFilters && (
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="max-w-6xl mx-auto">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedServices([]);
                        setMaxDistance(50);
                        setMinAvailableBeds(0);
                        setSearchQuery('');
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                {/* Unified Filter Layout */}
                <div className="space-y-6">
                {/* Services Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Services
                  </h3>
                    <div className="flex flex-wrap gap-2">
                    {allServices.map(service => (
                        <button
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            selectedServices.includes(service)
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                          }`}
                        >
                          {service}
                        </button>
                    ))}
                  </div>
                </div>

                  {/* Distance and Beds in a row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Distance Filter */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Distance
                  </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {maxDistance} miles
                        </span>
                    </div>
                      <div className="space-y-2">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700"
                    />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>5 miles</span>
                          <span>100 miles</span>
                        </div>
                  </div>
                </div>

                {/* Available Beds Filter */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Available Beds
                  </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {minAvailableBeds}+ beds
                        </span>
                    </div>
                      <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={minAvailableBeds}
                      onChange={(e) => setMinAvailableBeds(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>0 beds</span>
                          <span>20+ beds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(selectedServices.length > 0 || maxDistance < 50 || minAvailableBeds > 0) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map(service => (
                        <span key={service} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          {service}
                          <button
                            onClick={() => handleServiceToggle(service)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                      {maxDistance < 50 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Within {maxDistance} miles
                    <button
                            onClick={() => setMaxDistance(50)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                    </button>
                        </span>
                      )}
                      {minAvailableBeds > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Min {minAvailableBeds} beds
                    <button
                            onClick={() => setMinAvailableBeds(0)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                    </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results and Map Section */}
        <div className="flex flex-1">
          {/* Results */}
          <div className="w-2/3 overflow-y-auto pl-0 p-6">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {paginatedRehabs.map(rehab => (
                  <div
                    key={rehab.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
                    onClick={() => router.push(`/rehab/${rehab.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={rehab.image}
                        alt={rehab.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {rehab.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {rehab.distance} miles
                            </span>
                            <Badge color={getAvailabilityColor(rehab.availableBeds, rehab.totalBeds)} size="sm">
                              {rehab.availableBeds}/{rehab.totalBeds} beds
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {rehab.address}, {rehab.city}, {rehab.state}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
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
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                              {rehab.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {rehab.services.slice(0, 3).map(service => (
                            <span
                              key={service}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
                            >
                              {service}
                            </span>
                          ))}
                          {rehab.services.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                              +{rehab.services.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedRehabs.map(rehab => (
                  <div
                    key={rehab.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
                    onClick={() => router.push(`/rehab/${rehab.id}`)}
                  >
                    <Image
                      src={rehab.image}
                      alt={rehab.name}
                      width={400}
                      height={128}
                      className="w-full h-32 rounded-lg object-cover mb-3"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {rehab.name}
                        </h4>
                        <Badge color={getAvailabilityColor(rehab.availableBeds, rehab.totalBeds)} size="sm">
                          {rehab.availableBeds}/{rehab.totalBeds}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {rehab.address}, {rehab.city}, {rehab.state}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
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
                          <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                            {rehab.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {rehab.distance} miles
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {rehab.services.slice(0, 2).map(service => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {service}
                          </span>
                        ))}
                        {rehab.services.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                            +{rehab.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredRehabs.length)} of {filteredRehabs.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Previous
                  </button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === page
                              ? 'bg-blue-500 text-white'
                              : 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="px-2 text-sm text-gray-500">...</span>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="w-1/3 mt-6 h-full">
            <div className="h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Map 
                center={currentLocation}
                markers={filteredRehabs.map(rehab => ({
                  id: rehab.id,
                  title: rehab.name,
                  lat: rehab.coordinates.lat,
                  lng: rehab.coordinates.lng
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 