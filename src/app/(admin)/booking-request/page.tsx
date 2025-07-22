import React, { Suspense } from "react";
import BookingRequestForm from "./BookingRequestForm";

export default function BookingRequestPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookingRequestForm />
    </Suspense>
  );
} 