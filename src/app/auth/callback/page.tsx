"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback${window.location.search}`
        );
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          setError(data.message || "Authentication failed");
        }
      } catch(err) {
        setError("An error occurred during authentication " + err);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, []);

  useEffect(() => {
    if (error) {
      router.push("/signin");
    }
  }, [error, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}
