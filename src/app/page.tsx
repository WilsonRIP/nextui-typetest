"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tabs,
  Tab,
  Button,
  Link,
} from "@nextui-org/react";
import TypingTest from "@/components/TypingTest";
import TestSettings, { TestOptions } from "@/components/TestSettings";
import TestResults from "@/components/TestResults";
import { getRandomText } from "@/services/textService";

export default function Home() {
  const [options, setOptions] = useState<TestOptions>({
    duration: 60,
    textType: "sentences",
    difficulty: "medium",
  });

  const [text, setText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    duration: options.duration,
  });

  // Generate new text when options change
  useEffect(() => {
    setText(getRandomText(options));
    setShowResults(false);
  }, [options]);

  const handleTestComplete = (
    wpm: number,
    accuracy: number,
    errors: number
  ) => {
    setResults({
      wpm,
      accuracy,
      errors,
      duration: options.duration,
    });
    setShowResults(true);
  };

  const resetTest = () => {
    setText(getRandomText(options));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <Navbar className="shadow-sm bg-white">
        <NavbarBrand>
          <p className="font-bold text-2xl text-blue-600">TypeTest</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Link
            href="https://github.com"
            color="foreground"
            isExternal
            showAnchorIcon
          >
            GitHub
          </Link>
        </NavbarContent>
      </Navbar>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-violet-600">
          Improve Your Typing Speed
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Practice regularly to enhance your typing skills. Track your speed,
          accuracy, and progress over time.
        </p>

        <Tabs
          aria-label="Options"
          variant="underlined"
          color="secondary"
          classNames={{
            tab: "px-8",
            tabContent: "group-data-[selected=true]:text-purple-600",
            cursor: "bg-purple-600",
            tabList: "border-b border-divider gap-6",
          }}
        >
          <Tab key="practice" title="Practice">
            <div className="mt-6">
              <TestSettings options={options} onOptionsChange={setOptions} />

              {showResults ? (
                <div>
                  <TestResults
                    wpm={results.wpm}
                    accuracy={results.accuracy}
                    errors={results.errors}
                    duration={results.duration}
                  />
                  <div className="flex justify-center mt-6">
                    <Button
                      onPress={resetTest}
                      color="secondary"
                      className="px-6"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <TypingTest
                  textToType={text}
                  duration={options.duration}
                  onComplete={handleTestComplete}
                />
              )}
            </div>
          </Tab>
          <Tab key="about" title="About">
            <div className="mt-6 p-6 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                About TypeTest
              </h2>
              <p className="mb-4 text-gray-700">
                TypeTest is a web application designed to help you improve your
                typing speed and accuracy. Regular practice can significantly
                improve your typing skills, which is beneficial for programmers,
                writers, and anyone who uses a computer regularly.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Features:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                <li>Customizable test durations</li>
                <li>Different text types: sentences, paragraphs, and code</li>
                <li>Multiple difficulty levels</li>
                <li>Real-time feedback on speed and accuracy</li>
                <li>Detailed test results</li>
              </ul>
              <p className="text-gray-700">
                Practice regularly to see your typing skills improve over time!
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>

      <footer className="mt-16 py-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} TypeTest. All rights reserved.</p>
          <p className="mt-1 text-gray-400">
            Built with Next.js, TypeScript, and Next UI
          </p>
        </div>
      </footer>
    </div>
  );
}
