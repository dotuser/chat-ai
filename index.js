import fs from 'fs/promises';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const hf = new HfInference(process.env.OPEN_AI_API_KEY); // PASTE YOUR OPEN AI API KEY

// Function to read the file
async function readFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    throw error;
  }
}

// Function to ask a question
async function askQuestion(context, question) {
  const response = await hf.questionAnswering({
    model: 'bert-large-uncased-whole-word-masking-finetuned-squad',
    inputs: {
      question,
      context,
    },
  });
  return response;
}

// Main function
(async () => {
  try {
    const context = await readFile('./About/abramov.txt');
    const question = 'What did author study in college?';
    const res = await askQuestion(context, question);
    console.log(res.answer);
  } catch (error) {
    console.error('Error:', error);
  }
})();

// const question = 'At what age, did author wanted to work in Russian social media company?'; // Must return 20
// const question = 'How much did author earn?';
// const question = 'How much bonus did author make?';