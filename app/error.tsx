"use client";
import { PageHeader } from "@/components/appeal-letter/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Something Went Wrong" />
      
      <div className="overflow-auto bg-white dark:bg-black rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center text-center flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Error Icon */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-red-500" />
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-custom-red text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
              !
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white px-2">
              Oops! Something went wrong
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-md lg:max-w-lg px-4">
              We encountered an unexpected error. Please try again or go back to the main page.
            </p>
            {error.digest && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md mx-4">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md px-4">
            <Button
              onClick={reset}
              className="bg-custom-teal hover:bg-custom-teal/90 text-white w-full sm:w-auto px-6 py-2 sm:py-2.5"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Try Again</span>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 w-full sm:w-auto px-6 py-2 sm:py-2.5"
            >
              <Link href="/appeal-letter" className="flex items-center gap-2 justify-center">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm sm:text-base">Go Back to Appeal Letter</span>
              </Link>
            </Button>
            
            <Button
              asChild
              variant="ghost"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 w-full sm:w-auto px-6 py-2 sm:py-2.5"
            >
              <Link href="/" className="flex items-center gap-2 justify-center">
                <Home className="w-4 h-4" />
                <span className="text-sm sm:text-base">Go Home</span>
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
            <p>If the problem persists, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
