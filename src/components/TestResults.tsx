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
    <Card className="w-full shadow-sm mb-8">
      <CardHeader className="bg-green-600 text-white flex justify-center">
        <h2 className="text-xl font-bold">Your Results</h2>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 py-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Typing Speed
            </h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">{wpm}</div>
            <div className="text-sm text-gray-500">WPM ({speedRating})</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Accuracy
            </h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {accuracy}%
            </div>
            <div className="text-sm text-gray-500">{accuracyRating}</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Errors
            </h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {errors}
            </div>
            <div className="text-sm text-gray-500">Total mistakes</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Duration
            </h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {duration}
            </div>
            <div className="text-sm text-gray-500">seconds</div>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="text-center text-gray-600 text-sm">
          The average typing speed is 40 WPM, with professional typists typing
          at 65-75 WPM.
        </div>
      </CardBody>
    </Card>
  );
}
