/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Create a quiz JSON with 10 questions, covering the categories "history" and "science." The questions should be of medium difficulty and include  options, hints, and explanations as well as question no. with each quiz having unique id',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "quizId": "history_science_quiz_1",\n  "title": "History and Science Quiz",\n  "questions": [\n    {\n      "questionNo": 1,\n      "category": "history",\n      "question": "Which civilization developed the concept of zero?",\n      "options": ["Ancient Egyptians", "Mayans", "Greeks", "Indians"],\n      "answer": "Indians",\n      "hint": "Think about the civilization that made significant contributions to mathematics.",\n      "explanation": "The concept of zero was first developed in India around the 5th century AD. It was later adopted by other civilizations, including the Arabs and Europeans."\n    },\n    {\n      "questionNo": 2,\n      "category": "science",\n      "question": "What is the smallest unit of matter?",\n      "options": ["Atom", "Molecule", "Cell", "Proton"],\n      "answer": "Atom",\n      "hint": "Think about the building blocks of everything around you.",\n      "explanation": "An atom is the smallest unit of an element that can exist and still retain the chemical properties of that element."\n    },\n    {\n      "questionNo": 3,\n      "category": "history",\n      "question": "Who wrote the famous play \'Hamlet\'?",\n      "options": ["William Shakespeare", "Christopher Marlowe", "John Milton", "Ben Jonson"],\n      "answer": "William Shakespeare",\n      "hint": "He\'s considered one of the greatest writers in the English language.",\n      "explanation": "William Shakespeare is known for his numerous plays and sonnets, including \'Hamlet\', \'Romeo and Juliet\', and \'Macbeth\'."\n    },\n    {\n      "questionNo": 4,\n      "category": "science",\n      "question": "What is the chemical formula for water?",\n      "options": ["H2O", "CO2", "NaCl", "O2"],\n      "answer": "H2O",\n      "hint": "It\'s composed of two hydrogen atoms and one oxygen atom.",\n      "explanation": "Water is a chemical compound with the formula H2O, meaning each molecule contains two hydrogen atoms and one oxygen atom."\n    },\n    {\n      "questionNo": 5,\n      "category": "history",\n      "question": "Which country was the first to send a person into space?",\n      "options": ["USA", "Russia", "China", "Japan"],\n      "answer": "Russia",\n      "hint": "The Cold War space race was fierce.",\n      "explanation": "The Soviet Union, now Russia, achieved this milestone in 1961 with Yuri Gagarin aboard the Vostok 1 spacecraft."\n    },\n    {\n      "questionNo": 6,\n      "category": "science",\n      "question": "What is the largest planet in our solar system?",\n      "options": ["Earth", "Mars", "Jupiter", "Saturn"],\n      "answer": "Jupiter",\n      "hint": "It\'s a gas giant with a distinctive red spot.",\n      "explanation": "Jupiter is a gas giant and the largest planet in our solar system, known for its Great Red Spot, a giant storm."\n    },\n    {\n      "questionNo": 7,\n      "category": "history",\n      "question": "Who was the first female Prime Minister of India?",\n      "options": ["Indira Gandhi", "Smt. Vijayalakshmi Pandit", "Pratibha Patil", "Sonia Gandhi"],\n      "answer": "Indira Gandhi",\n      "hint": "She was the daughter of Jawaharlal Nehru, the first Prime Minister of India.",\n      "explanation": "Indira Gandhi became the first female Prime Minister of India in 1966."\n    },\n    {\n      "questionNo": 8,\n      "category": "science",\n      "question": "What is the process of converting light energy into chemical energy called?",\n      "options": ["Photosynthesis", "Respiration", "Digestion", "Osmosis"],\n      "answer": "Photosynthesis",\n      "hint": "Think about how plants create their own food.",\n      "explanation": "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create their own food and release oxygen."\n    },\n    {\n      "questionNo": 9,\n      "category": "history",\n      "question": "When did World War II begin?",\n      "options": ["1914", "1939", "1941", "1945"],\n      "answer": "1939",\n      "hint": "Think about the invasion of Poland.",\n      "explanation": "World War II began on September 1, 1939, with the German invasion of Poland."\n    },\n    {\n      "questionNo": 10,\n      "category": "science",\n      "question": "What is the smallest bone in the human body?",\n      "options": ["Femur", "Tibia", "Stapes", "Fibula"],\n      "answer": "Stapes",\n      "hint": "It\'s located in the ear.",\n      "explanation": "The stapes is a tiny bone in the middle ear that is essential for hearing."\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
