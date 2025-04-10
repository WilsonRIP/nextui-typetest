"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Button, Progress, Chip } from "@nextui-org/react";

interface TypingTestProps {
  textToType: string;
  duration: number; // in seconds
  onComplete?: (wpm: number, accuracy: number, errors: number) => void;
}

export default function TypingTest({
  textToType,
  duration,
  onComplete,
}: TypingTestProps) {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Start the test when user begins typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isTestActive && value.length > 0) {
      setStartTime(Date.now());
      setIsTestActive(true);
    }

    // Only allow typing if test is active and not complete
    if (isTestActive && !isTestComplete) {
      // Check if the last typed character is correct
      if (value.length > inputValue.length) {
        const lastChar = value[value.length - 1];
        const expectedChar = textToType[currentIndex];

        if (lastChar !== expectedChar) {
          setErrors(errors + 1);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      } else if (value.length < inputValue.length) {
        // Handle backspace
        setCurrentIndex(Math.min(currentIndex, value.length));
      }

      setInputValue(value);

      // Calculate accuracy
      if (value.length > 0) {
        const correctChars = value
          .split("")
          .filter((char, i) => char === textToType[i]).length;
        const newAccuracy = Math.round((correctChars / value.length) * 100);
        setAccuracy(newAccuracy);
      }

      // Calculate WPM (Word Per Minute) - assuming average word is 5 characters
      if (startTime) {
        const elapsedTimeInMinutes = (Date.now() - startTime) / 60000;
        const wordsTyped = value.length / 5;
        const currentWpm = Math.round(wordsTyped / elapsedTimeInMinutes);
        setWpm(currentWpm);
      }
    }
  };

  // Timer for the test
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTestActive && !isTestComplete && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTestComplete(true);
            if (onComplete) {
              onComplete(wpm, accuracy, errors);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    isTestActive,
    isTestComplete,
    timeLeft,
    wpm,
    accuracy,
    errors,
    onComplete,
  ]);

  // Reset the test
  const resetTest = () => {
    setInputValue("");
    setCurrentIndex(0);
    setStartTime(null);
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    setIsTestActive(false);
    setIsTestComplete(false);
    setErrors(0);
    if (inputRef.current) inputRef.current.focus();
  };

  // Highlight text based on typing progress
  const renderText = () => {
    return textToType.split("").map((char, index) => {
      let color = "text-gray-400"; // Default color for text not yet reached

      if (index < inputValue.length) {
        color = inputValue[index] === char ? "text-green-500" : "text-red-500";
      }

      if (index === currentIndex) {
        color += " bg-gray-200";
      }

      return (
        <span key={index} className={color}>
          {char}
        </span>
      );
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Typing Test</h2>
        <div className="flex gap-2">
          <Chip color="primary">{timeLeft}s</Chip>
          <Chip color="success">{wpm} WPM</Chip>
          <Chip
            color={
              accuracy > 90 ? "success" : accuracy > 70 ? "warning" : "danger"
            }
          >
            {accuracy}% Accuracy
          </Chip>
        </div>
      </CardHeader>

      <CardBody>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-lg font-mono leading-relaxed">
          {renderText()}
        </div>

        <Progress
          value={(currentIndex / textToType.length) * 100}
          color="primary"
          className="mb-4"
          showValueLabel
        />

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Start typing here..."
          disabled={isTestComplete}
          autoFocus
        />
      </CardBody>

      <CardFooter>
        <Button color="primary" onClick={resetTest} className="ml-auto">
          {isTestComplete ? "Try Again" : "Reset"}
        </Button>
      </CardFooter>
    </Card>
  );
}
