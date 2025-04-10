"use client";

import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Tabs, Tab } from "@nextui-org/react";
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
    <div className="min-h-screen bg-slate-50">
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">TypeTest</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Improve Your Typing Speed
        </h1>

        <Tabs aria-label="Options" className="mb-6">
          <Tab key="practice" title="Practice">
            <div className="mt-6">
              <TestSettings options={options} onOptionsChange={setOptions} />

              {showResults ? (
                <TestResults
                  wpm={results.wpm}
                  accuracy={results.accuracy}
                  errors={results.errors}
                  duration={results.duration}
                />
              ) : (
                <TypingTest
                  textToType={text}
                  duration={options.duration}
                  onComplete={handleTestComplete}
                />
              )}

              {showResults && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={resetTest}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </Tab>
          <Tab key="about" title="About">
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">About TypeTest</h2>
              <p className="mb-4">
                TypeTest is a web application designed to help you improve your
                typing speed and accuracy. Regular practice can significantly
                improve your typing skills, which is beneficial for programmers,
                writers, and anyone who uses a computer regularly.
              </p>
              <h3 className="text-lg font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Customizable test durations</li>
                <li>Different text types: sentences, paragraphs, and code</li>
                <li>Multiple difficulty levels</li>
                <li>Real-time feedback on speed and accuracy</li>
                <li>Detailed test results</li>
              </ul>
              <p>
                Practice regularly to see your typing skills improve over time!
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
