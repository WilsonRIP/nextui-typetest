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
    <Card className="w-full shadow-sm mb-8">
      <CardHeader className="bg-purple-600 text-white">
        <h3 className="text-lg font-semibold">Test Settings</h3>
      </CardHeader>
      <CardBody className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select
              label="Duration"
              selectedKeys={[options.duration.toString()]}
              onChange={(e) => handleDurationChange(e.target.value)}
              className="max-w-full"
              disallowEmptySelection
              labelPlacement="outside"
              listboxProps={{
                itemClasses: {
                  base: "py-2",
                },
              }}
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
            <p className="text-xs text-gray-500 mt-1">
              How long the test will last
            </p>
          </div>

          <div>
            <Select
              label="Text Type"
              selectedKeys={[options.textType]}
              onChange={(e) => handleTextTypeChange(e.target.value)}
              className="max-w-full"
              disallowEmptySelection
              labelPlacement="outside"
              listboxProps={{
                itemClasses: {
                  base: "py-2",
                },
              }}
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
            <p className="text-xs text-gray-500 mt-1">
              What kind of text you&apos;ll type
            </p>
          </div>

          <div>
            <Select
              label="Difficulty"
              selectedKeys={[options.difficulty]}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="max-w-full"
              disallowEmptySelection
              labelPlacement="outside"
              listboxProps={{
                itemClasses: {
                  base: "py-2",
                },
              }}
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
            <p className="text-xs text-gray-500 mt-1">
              How challenging the text will be
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
