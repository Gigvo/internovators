"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <div>Loading...</div>;
}
