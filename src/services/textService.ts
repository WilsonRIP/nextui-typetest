import { TestOptions } from "../components/TestSettings";

// Sample sentences for typing practice
const easySentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A watched pot never boils.",
  "All that glitters is not gold.",
  "Actions speak louder than words.",
  "Better late than never, but never late is better.",
];

const mediumSentences = [
  "The five boxing wizards jump quickly to avoid the approaching blizzard.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow.",
  "The early bird might get the worm, but the second mouse gets the cheese.",
];

const hardSentences = [
  "Amazingly few discotheques provide jukeboxes quite worth investigating.",
  "Extraterrestrial aliens visited a quiet zoological garden while anxious farmers jeered.",
  "The wizard quickly jinxed the gnomes before they vaporized.",
  "The job requires extra pluck and zeal from every young wage earner.",
  "Six javelins thrown by the quick savages whizzed forty paces beyond the mark.",
];

// Sample paragraphs for typing practice
const easyParagraphs = [
  "The sun was setting behind the mountains, casting a warm orange glow across the valley. Birds were returning to their nests, singing their evening songs. The air was cool and crisp, with a gentle breeze rustling the leaves of the trees. It was a perfect end to a perfect day.",
  "She walked along the beach, feeling the sand between her toes. The waves crashed against the shore, creating a soothing rhythm. Seagulls circled overhead, occasionally diving into the water to catch a fish. She took a deep breath of the salty air and smiled.",
];

const mediumParagraphs = [
  "The ancient library was filled with dusty tomes and scrolls that hadn't been touched in centuries. A lone librarian worked diligently, cataloging and preserving these precious artifacts of knowledge. The smell of old paper and leather bindings permeated the air, creating an atmosphere of reverence for the wisdom contained within these walls.",
  "The spacecraft hurtled through the void, its engines pulsing with energy. Inside, the crew monitored various systems, ensuring everything was functioning properly. Earth was now just a tiny blue dot in the distance, growing smaller by the minute. They were venturing into the unknown, pioneers of a new age of exploration.",
];

const hardParagraphs = [
  "The quantum physicist explained that particles can exist in multiple states simultaneously until they are observed, at which point they collapse into a single state. This phenomenon, known as quantum superposition, challenges our classical understanding of reality and suggests that the act of measurement itself plays a crucial role in determining the outcome of quantum events.",
  "The linguistic anthropologist argued that the Sapir-Whorf hypothesis, which suggests that the structure of language affects its speakers' worldview, has profound implications for cross-cultural communication. The absence of certain grammatical features or vocabulary in a language might limit or shape the cognitive categories available to its speakers.",
];

// Sample code snippets for typing practice
const easyCode = [
  `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`,
  `const colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}`,
];

const mediumCode = [
  `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`,
  `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

const alice = new Person("Alice", 28);
console.log(alice.greet());`,
];

const hardCode = [
  `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function inOrderTraversal<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];
  
  function traverse(node: TreeNode<T> | null): void {
    if (node === null) return;
    
    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
  `const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
};`,
];

// Function to get text based on options
export function getRandomText(options: TestOptions): string {
  const { textType, difficulty } = options;

  let textArray: string[] = [];

  if (textType === "sentences") {
    if (difficulty === "easy") textArray = easySentences;
    else if (difficulty === "medium") textArray = mediumSentences;
    else textArray = hardSentences;
  } else if (textType === "paragraphs") {
    if (difficulty === "easy") textArray = easyParagraphs;
    else if (difficulty === "medium") textArray = mediumParagraphs;
    else textArray = hardParagraphs;
  } else if (textType === "code") {
    if (difficulty === "easy") textArray = easyCode;
    else if (difficulty === "medium") textArray = mediumCode;
    else textArray = hardCode;
  }

  // Return a random item from the selected array
  const randomIndex = Math.floor(Math.random() * textArray.length);
  return textArray[randomIndex];
}
