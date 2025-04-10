"use client";

import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
}

export default function TestResults({
  wpm,
  accuracy,
  errors,
  duration,
}: TestResultsProps) {
  let speedRating = "Beginner";
  if (wpm > 100) speedRating = "Expert";
  else if (wpm > 80) speedRating = "Advanced";
  else if (wpm > 60) speedRating = "Intermediate";
  else if (wpm > 40) speedRating = "Average";

  let accuracyRating = "Needs Improvement";
  if (accuracy > 98) accuracyRating = "Perfect";
  else if (accuracy > 95) accuracyRating = "Excellent";
  else if (accuracy > 90) accuracyRating = "Good";
  else if (accuracy > 85) accuracyRating = "Average";

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex justify-center">
        <h2 className="text-xl font-bold">Your Results</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Typing Speed:</span>
            <div className="text-right">
              <span className="text-2xl font-bold">{wpm}</span>
              <span className="ml-1 text-gray-500">WPM</span>
              <div className="text-sm text-gray-500">{speedRating}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Accuracy:</span>
            <div className="text-right">
              <span className="text-2xl font-bold">{accuracy}</span>
              <span className="ml-1 text-gray-500">%</span>
              <div className="text-sm text-gray-500">{accuracyRating}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Errors:</span>
            <span className="text-2xl font-bold">{errors}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Time:</span>
            <span className="text-2xl font-bold">{duration} seconds</span>
          </div>

          <Divider className="my-4" />

          <div className="text-center text-sm text-gray-500">
            The average typing speed is 40 WPM, with professional typists typing
            at 65-75 WPM.
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
