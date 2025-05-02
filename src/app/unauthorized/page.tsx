"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-gray-500 dark:text-gray-400">
          You do not have permission to view this page.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
