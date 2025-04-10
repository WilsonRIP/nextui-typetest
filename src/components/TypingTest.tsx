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
  const textDisplayRef = useRef<HTMLDivElement>(null);

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
        setWpm(currentWpm || 0); // Prevent NaN
      }
    }
  };

  // Scroll the text display to keep the current character in view
  useEffect(() => {
    if (textDisplayRef.current && currentIndex > 0) {
      const characters = textDisplayRef.current.children;
      if (characters[currentIndex]) {
        characters[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

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

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Render text with proper spacing for code
  const renderText = () => {
    return textToType.split("").map((char, index) => {
      let className = "character character-ahead";

      if (index < inputValue.length) {
        className =
          inputValue[index] === char
            ? "character character-correct"
            : "character character-incorrect";
      }

      if (index === currentIndex) {
        className += " character-current";
      }

      // Handle whitespace characters
      if (char === " ") {
        return (
          <span key={index} className={className}>
            &nbsp;
          </span>
        );
      }

      if (char === "\n") {
        return <br key={index} />;
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <Card className="w-full shadow-md border border-gray-100">
      <CardHeader className="flex justify-between items-center bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Typing Test</h2>
        <div className="flex gap-2">
          <Chip
            color="primary"
            variant="flat"
            className="font-mono font-medium bg-white text-blue-600"
          >
            {formatTime(timeLeft)}
          </Chip>
          <Chip
            color="success"
            variant="flat"
            className="font-mono font-medium bg-white text-green-600"
          >
            {wpm} WPM
          </Chip>
          <Chip
            color={
              accuracy > 90 ? "success" : accuracy > 70 ? "warning" : "danger"
            }
            variant="flat"
            className="font-mono font-medium bg-white"
          >
            {accuracy}%
          </Chip>
        </div>
      </CardHeader>

      <CardBody className="p-4">
        <div
          className="p-6 rounded-lg bg-gray-50 font-mono text-lg mb-6 h-60 overflow-auto whitespace-pre shadow-inner"
          ref={textDisplayRef}
          style={{ lineHeight: "1.75", letterSpacing: "0.5px" }}
        >
          {renderText()}
        </div>

        <Progress
          value={(currentIndex / textToType.length) * 100}
          color="primary"
          className="mb-4 h-2"
          aria-label="Typing progress"
        />

        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="Type to start the test..."
            disabled={isTestComplete}
            autoFocus
            aria-label="Typing input field"
          />
          <Button color="primary" onPress={resetTest} size="md">
            Reset
          </Button>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between items-center border-t bg-gray-50 p-3">
        <div className="text-sm text-gray-500">
          {isTestActive
            ? `${currentIndex}/${textToType.length} characters`
            : "Type to start the test"}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">0%</span>
        </div>
      </CardFooter>
    </Card>
  );
}
