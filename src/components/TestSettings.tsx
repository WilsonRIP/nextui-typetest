"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

export interface TestOptions {
  duration: number;
  textType: "sentences" | "paragraphs" | "code";
  difficulty: "easy" | "medium" | "hard";
}

interface TestSettingsProps {
  options: TestOptions;
  onOptionsChange: (options: TestOptions) => void;
}

export default function TestSettings({
  options,
  onOptionsChange,
}: TestSettingsProps) {
  const handleDurationChange = (value: string) => {
    onOptionsChange({ ...options, duration: parseInt(value) });
  };

  const handleTextTypeChange = (value: string) => {
    onOptionsChange({
      ...options,
      textType: value as "sentences" | "paragraphs" | "code",
    });
  };

  const handleDifficultyChange = (value: string) => {
    onOptionsChange({
      ...options,
      difficulty: value as "easy" | "medium" | "hard",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-semibold">Test Settings</h3>
      </CardHeader>
      <CardBody className="flex flex-wrap gap-4">
        <div className="w-full md:w-1/3">
          <Select
            label="Duration"
            value={options.duration.toString()}
            onChange={(e) => handleDurationChange(e.target.value)}
          >
            <SelectItem key="15" value="15">
              15 seconds
            </SelectItem>
            <SelectItem key="30" value="30">
              30 seconds
            </SelectItem>
            <SelectItem key="60" value="60">
              1 minute
            </SelectItem>
            <SelectItem key="120" value="120">
              2 minutes
            </SelectItem>
            <SelectItem key="300" value="300">
              5 minutes
            </SelectItem>
          </Select>
        </div>

        <div className="w-full md:w-1/3">
          <Select
            label="Text Type"
            value={options.textType}
            onChange={(e) => handleTextTypeChange(e.target.value)}
          >
            <SelectItem key="sentences" value="sentences">
              Sentences
            </SelectItem>
            <SelectItem key="paragraphs" value="paragraphs">
              Paragraphs
            </SelectItem>
            <SelectItem key="code" value="code">
              Code
            </SelectItem>
          </Select>
        </div>

        <div className="w-full md:w-1/3">
          <Select
            label="Difficulty"
            value={options.difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            <SelectItem key="easy" value="easy">
              Easy
            </SelectItem>
            <SelectItem key="medium" value="medium">
              Medium
            </SelectItem>
            <SelectItem key="hard" value="hard">
              Hard
            </SelectItem>
          </Select>
        </div>
      </CardBody>
    </Card>
  );
}
