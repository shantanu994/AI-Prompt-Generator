import React, { useState } from 'react';
import './App.css';
import { fetchSuggestions } from './services/suggestService';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [category, setCategory] = useState('writing');
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('Your prompt will appear here...');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [usedPrompts] = useState({
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
  });

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

  const getRandomWord = () => {
    const words = ["innovation", "time travel", "dreams", "sunset", "AI", "freedom", "space"];
    return words[Math.floor(Math.random() * words.length)];
  };

  const generatePrompt = () => {
    let userInput = inputText.trim();
    
    if (!userInput) {
      userInput = getRandomWord();
    }
    const available = templates[category].filter(t => !usedPrompts[category].includes(t));

    if (available.length === 0) {
      setOutput("You've generated all unique prompts in this category!");
      return;
    }

    const randomTemplate = available[Math.floor(Math.random() * available.length)];
    usedPrompts[category].push(randomTemplate);

    const finalPrompt = randomTemplate.replace(/\{input\}/g, userInput);
    
    
    setTimeout(() => {
      setOutput(finalPrompt);
      
      const historyItem = {
        id: Date.now(),
        prompt: finalPrompt,
        category: category,
        input: userInput,
        timestamp: new Date().toLocaleTimeString()
      };
      setPromptHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 prompts
      
      // animations removed: no class toggling
    }, 100);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(output)
      .then(() => alert("Prompt copied to clipboard!"))
      .catch(() => alert("Copy failed."));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // removed useHistoryPrompt: history items will set output inline

  const clearHistory = () => {
    setPromptHistory([]);
    setShowHistory(false);
  };

  const suggestPrompt = async () => {
    try {
      const data = await fetchSuggestions({ input: inputText, category });
      // Assume the proxy returns a text suggestion in data.suggestion or data.text
      const suggestion = data.suggestion || data.text || JSON.stringify(data);
      setOutput(suggestion);
    } catch (e) {
      console.error('Suggest failed', e);
      setOutput('Suggestion failed. See console for details.');
    }
  };

  const LandingPage = () => (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <div className="navbar_container">
          <span className="navbar_logo">
            <i className="fa-solid fa-hexagon-nodes"></i>
            AI Prompt Generator
          </span>
          <button type="button" className="dark-mode-toggle" onClick={toggleDarkMode}>
            <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="text-content">
          <h2>What is AI Prompt Generator?</h2>
          <p>
            An AI prompt generator is a tool that helps create effective prompts
            for AI models
          </p>
        </div>
        <img
          src="/undraw_vibe-coding_mjme.svg"
          alt="Coding illustration"
          className="side-image"
        />
      </div>
      <div className="next-button">
        <button type="button" onClick={() => setCurrentView('generator')}>
          Go to Prompt Generator →
        </button>
      </div>
      <div id="about">
        <h2>About Us</h2>
        <p>
          Welcome to our <strong>AI Prompt Generator</strong> — your quick and
          easy tool to create powerful prompts for AI like ChatGPT, Midjourney,
          and more. <br /><br />
          This project was built by a passionate Computer Engineering student who
          loves turning ideas into code. Whether you're writing, coding, or
          experimenting, our tool is here to spark creativity.
          <br /><br />
          We're continuously improving the tool with new features and
          customizations, so stay connected and be part of the journey:
          <br /><br />
        </p>
        <div className="social-links">
          <a
            className="icons"
            href="https://www.instagram.com/shantan.u_21/?next=%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              alt="Instagram"
              width="40"
            />
          </a>
          <a
            className="icons"
            href="https://www.linkedin.com/in/shantanu-kulkarni-556074329/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              width="40"
            />
          </a>
          <a className="icons" href="https://wa.me/7028914114" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              width="40"
            />
          </a>
          <a
            className="icons"
            href="mailto:shantanukulkarni994@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              width="40"
            />
          </a>
        </div>
      </div>
    </div>
  );

  const GeneratorPage = () => (
    <div className={`generator-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="generator-container">
        <button type="button" className="dark-mode-toggle generator-toggle" onClick={toggleDarkMode}>
          <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
        </button>
        <h1>AI Prompt Generator</h1>

        <label htmlFor="category">Choose a category:</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="writing">Writing</option>
          <option value="coding">Coding</option>
          <option value="image">Image</option>
          <option value="music">Music</option>
          <option value="video">Video</option>
          <option value="general">General</option>
          <option value="custom">Custom</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>

        <input 
          type="text" 
          id="inputText" 
          placeholder="Enter a topic (optional)" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

  <div className="generate-row">
    <button type="button" onClick={generatePrompt}>Generate Prompt</button>
    <button type="button" onClick={suggestPrompt} className="suggest-btn">Suggest</button>
  </div>

        <div id="outputBox">
          <p id="info">Click again on Generate prompt to get more effective prompts.</p>
          <p id="output">{output}</p>
          <div className="output-actions">
            <button type="button" onClick={copyPrompt}>Copy</button>
            <button type="button" onClick={toggleHistory} className="history-btn">
              <i className="fa-solid fa-history"></i> History ({promptHistory.length})
            </button>
          </div>
          
          {showHistory && (
            <div className="history-panel">
              <div className="history-header">
                <h3>Recent Prompts</h3>
                <button type="button" onClick={clearHistory} className="clear-history">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="no-history">No prompts generated yet!</p>
              ) : (
                <div className="history-list">
                  {promptHistory.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="history-content">
                        <span className="history-category">{item.category}</span>
                        <span className="history-time">{item.timestamp}</span>
                        <p className="history-prompt" onClick={() => { setOutput(item.prompt); setShowHistory(false); }}>
                          {item.prompt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="links">
          <div className="social-links">
            <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="Chat-gpt" width="40" />
            </a>
            <a href="https://deepmind.google/models/gemini/" target="_blank" rel="noopener noreferrer">
              <img src="https://it.wisc.edu/wp-content/uploads/Google-Gemini-1080x480-News-Image.jpg" alt="gemini" width="40" height="40"/>
            </a>
            <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">
              <img src="https://i.gzn.jp/img/2024/11/15/anthropic-claude-nuclear-info/00.png" alt="Claude" width="40" height="40"/>
            </a>
            <a href="https://copilot.microsoft.com/chats/D3CVhToeoH1CL2cyDkVGR" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Microsoft_Copilot_Icon.svg/1200px-Microsoft_Copilot_Icon.svg.png" alt="Copilot" width="40" />
            </a>
          </div>
        </div>
        
        <button type="button" className="back-button" onClick={() => setCurrentView('landing')}>
          ← Back to Home
        </button>
      </div>
      <img id="image" src="/undraw_chore-list_ylw0.svg" alt="Checklist illustration" />
    </div>
  );

  return (
    <div className="App">
      {currentView === 'landing' ? <LandingPage /> : <GeneratorPage />}
    </div>
  );
}

export default App;
