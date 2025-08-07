const templates = {
  writing: [
    "Write a creative short story about '{input}', with a surprise ending.",
    "Describe a future where '{input}' has changed the world.",
    "Write a motivational speech about '{input}'.",
    "Turn '{input}' into a dark mystery plot."
  ],
  coding: [
    "Write a JavaScript function to {input}. Explain each step.",
    "Create a Python program that solves '{input}'.",
    "Develop a web app concept that uses '{input}' as its core feature.",
    "Make a game mechanic based on '{input}'."
  ],
  image: [
    "A hyper-realistic AI image of '{input}' in a sci-fi cityscape, 8K.",
    "Concept art of '{input}' in a fantasy realm, cinematic lighting.",
    "A surreal interpretation of '{input}' in abstract style.",
    "'{input}' visualized through cyberpunk aesthetics."
  ],
  music: [
    "Compose a song about '{input}' in the style of your favorite artist.",
    "Create a melody that captures the essence of '{input}'.",
    "Write lyrics for a song that tells a story about '{input}'.",
    "Imagine a soundtrack for a movie about '{input}'."
  ],
  video: [  
    "Create a video script that explores '{input}' in a documentary style.",
    "Make a short film concept based on '{input}', with a twist ending.",
    "Develop a vlog idea that discusses '{input}' in an engaging way.",
    "Produce a music video concept for a song about '{input}'."
  ],
  general: [
    "Brainstorm 10 innovative uses for '{input}' in everyday life.",
    "List 5 potential business ideas centered around '{input}'.",
    "Discuss the impact of '{input}' on modern society.",
    "Create a debate topic around '{input}' and its implications."
  ],
  custom: [
    "Imagine a world where '{input}' is the norm. Describe it.",
    "Create a fictional character whose life revolves around '{input}'.",
    "Design a product that solves a problem related to '{input}'.",
    "Write a letter to your future self about '{input}'."
  ],
  other: [
    "Invent a new sport that incorporates '{input}' as a key element.",
    "Devise a plan to promote '{input}' in your community.",
    "Create a recipe that features '{input}' as the main ingredient.",
    "Write a poem that captures the essence of '{input}'."
  ],
  business: [
    "Draft a business proposal that leverages '{input}' for growth.",
    "Create a marketing strategy centered around '{input}'.",
    "Analyze the market potential of '{input}' in your industry.",
    "Develop a pitch for investors about a startup based on '{input}'."
  ],
  education: [
    "Design a lesson plan that teaches students about '{input}'.",
    "Create an educational game that incorporates '{input}' as a learning tool.",
    "Write a research paper outline on the topic of '{input}'.",
    "Develop a workshop idea that explores '{input}' in depth."
  ]
};

const usedPrompts = {
  writing: [],
  coding: [],
  image: [],
  music: [],
  video: [],  
  general: [],
  custom: [],
  other: [],
  business: [],
  education: []
};

function generatePrompt() {
  const category = document.getElementById("category").value;
  let userInput = document.getElementById("inputText").value.trim();
  const output = document.getElementById("output");

  // Use default word if input is empty
  if (!userInput) {
    userInput = getRandomWord();
  }

  const available = templates[category].filter(t => !usedPrompts[category].includes(t));

  if (available.length === 0) {
    output.textContent = "You've generated all unique prompts in this category!";
    return;
  }

  const randomTemplate = available[Math.floor(Math.random() * available.length)];
  usedPrompts[category].push(randomTemplate);

  const finalPrompt = randomTemplate.replace("{input}", userInput);
  output.textContent = finalPrompt;
}

function getRandomWord() {
  const words = ["innovation", "time travel", "dreams", "sunset", "AI", "freedom", "space"];
  return words[Math.floor(Math.random() * words.length)];
}

function copyPrompt() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text)
    .then(() => alert("Prompt copied to clipboard!"))
    .catch(() => alert("Copy failed."));
}
