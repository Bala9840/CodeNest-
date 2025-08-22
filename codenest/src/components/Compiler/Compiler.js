import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../Editor/Editor';
import { executeCode } from '../../services/api';
import { codeTemplates, languageInfo } from '../../constants/codeTemplates';
import './Compiler.css';

const Compiler = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  // Set default code based on language when component mounts
  useEffect(() => {
    setCode(codeTemplates[lang] || '// Write your code here');
  }, [lang]);

  const runCode = async () => {
    setIsLoading(true);
    setOutput('Running your code...');
    setActiveTab('output');

    try {
      const result = await executeCode(lang, code);
      setOutput(result);
    } catch (err) {
      setOutput(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCode = () => {
    setCode(codeTemplates[lang] || '// Write your code here');
    setOutput('');
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with navigation */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Languages
            </button>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 capitalize">
              {lang} Compiler
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCode}
              className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            >
              <i className="fas fa-redo mr-2"></i> Reset Code
            </button>
            <button
              onClick={runCode}
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-lg transition-all disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Running...
                </>
              ) : (
                <>
                  <i className="fas fa-play-circle mr-2"></i> Run Code
                </>
              )}
            </button>
          </div>
        </header>

        {/* Editor and Output Tabs */}
        <div className="mb-4 border-b border-gray-700">
          <div className="flex">
            <button 
              className={`tab-button px-4 py-2 font-medium ${activeTab === 'editor' ? 'active text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('editor')}
            >
              <i className="fas fa-code mr-2"></i> Editor
            </button>
            <button 
              className={`tab-button px-4 py-2 font-medium ${activeTab === 'output' ? 'active text-blue-400' : 'text-gray-400 hover:text-gray-300'} flex items-center`}
              onClick={() => setActiveTab('output')}
            >
              <i className="fas fa-terminal mr-2"></i> Output
              {output && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {output.includes('Error') ? '!' : '✓'}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Editor */}
        {activeTab === 'editor' && (
          <div className="mb-6">
            <Editor
              language={lang}
              value={code}
              onChange={setCode}
              height="60vh"
            />
          </div>
        )}

        {/* Output */}
        {activeTab === 'output' && (
          <div className="output-panel bg-dark-800 rounded-lg p-4 mb-6 font-mono text-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output</h3>
              {output && (
                <button 
                  onClick={clearOutput}
                  className="text-xs text-gray-400 hover:text-gray-300"
                >
                  <i className="fas fa-times-circle mr-1"></i> Clear
                </button>
              )}
            </div>
            <pre className={`whitespace-pre-wrap ${output.includes('Error') ? 'text-red-400' : 'text-gray-300'}`}>
              {isLoading ? (
                <div className="flex items-center">
                  <i className="fas fa-spinner fa-spin mr-2 text-blue-400"></i>
                  <span>Running your code...</span>
                </div>
              ) : output ? (
                output
              ) : (
                <span className="text-gray-500">Output will appear here after code execution</span>
              )}
            </pre>
          </div>
        )}

        {/* Language Info */}
        <div className="bg-dark-800 rounded-lg p-4 mt-6">
          <h3 className="font-semibold mb-2">About {lang.toUpperCase()}</h3>
          <p className="text-gray-400 text-sm">
            {languageInfo[lang] || 'No information available for this language.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compiler;