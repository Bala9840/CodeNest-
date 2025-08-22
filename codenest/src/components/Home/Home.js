import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  const languages = [
    { 
      name: "Python", 
      code: "python", 
      icon: "fab fa-python",
      color: "from-blue-500 to-blue-700",
      textColor: "text-blue-400"
    },
    { 
      name: "JavaScript", 
      code: "javascript", 
      icon: "fab fa-js-square",
      color: "from-yellow-500 to-yellow-700",
      textColor: "text-yellow-400"
    },
    { 
      name: "C++", 
      code: "cpp", 
      icon: "fas fa-code",
      color: "from-pink-500 to-pink-700",
      textColor: "text-pink-400"
    },
    { 
      name: "Java", 
      code: "java", 
      icon: "fab fa-java",
      color: "from-red-500 to-red-700",
      textColor: "text-red-400"
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Multi-Language Code Compiler
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Write, run, and debug code in multiple programming languages right in your browser. 
            Select a language to get started.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {languages.map((lang) => (
            <div 
              key={lang.code}
              className={`bg-dark-800 rounded-xl p-6 flex flex-col items-center text-center card-hover border border-gray-700 cursor-pointer`}
              onClick={() => navigate(`/compiler/${lang.code}`)}
            >
              <div className={`${lang.textColor} language-icon`}>
                <i className={lang.icon}></i>
              </div>
              <h2 className="text-xl font-semibold mb-4">{lang.name}</h2>
              <button 
                className={`mt-auto bg-gradient-to-r ${lang.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
              >
                Open Compiler
              </button>
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Piston API & Monaco Editor</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;