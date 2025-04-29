"use client";

import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MainNavigation } from "@/components/layout/main-navigation";

export default function FeedbackPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFeedback("");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation></MainNavigation>
      <main className="flex-1 container py-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">OtiBersuara</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Share your feedback anonymously with the Human Development team
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Anonymous Feedback</CardTitle>
              <CardDescription>
                Your identity will be kept confidential. Only Human Development
                team members can view these messages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <Alert className="bg-green-50 dark:bg-green-900/20">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertTitle>Feedback Submitted</AlertTitle>
                  <AlertDescription>
                    Thank you for your feedback. The Human Development team will
                    review it shortly.
                  </AlertDescription>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Feedback
                  </Button>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Share your thoughts, concerns, or suggestions..."
                      className="min-h-[200px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading || !feedback.trim()}
                    >
                      {isLoading ? "Submitting..." : "Submit Anonymously"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About OtiBersuara</CardTitle>
              <CardDescription>
                How your feedback helps improve our organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                OtiBersuara is a safe space for all members to voice their
                concerns, suggestions, and feedback about the organization. Your
                input helps us identify areas for improvement and create a
                better environment for everyone.
              </p>
              <div className="space-y-2">
                <h3 className="font-medium">What happens to your feedback?</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    All feedback is reviewed by the Human Development team
                  </li>
                  <li>
                    Actionable items are discussed with relevant division heads
                  </li>
                  <li>Your identity remains completely anonymous</li>
                  <li>
                    Periodic reports on improvements made based on feedback are
                    shared with the organization
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">Note:</p>
                <p>
                  While we encourage open and honest feedback, please ensure
                  your comments are constructive and respectful. For urgent
                  matters requiring immediate attention, please contact your
                  division head directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
