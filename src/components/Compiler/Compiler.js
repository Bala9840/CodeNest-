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
        <header className="compiler-header">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Languages
            </button>
            <h1 className="language-title">
              {lang.toUpperCase()} Compiler
            </h1>
          </div>
          <div className="header-actions">
            <button
              onClick={clearCode}
              className="btn btn-secondary"
            >
              <i className="fas fa-redo mr-2"></i> Reset Code
            </button>
            <button
              onClick={runCode}
              disabled={isLoading}
              className="btn btn-success"
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
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            <i className="fas fa-code mr-2"></i> Editor
          </button>
          <button 
            className={`tab-button ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            <i className="fas fa-terminal mr-2"></i> Output
            {output && (
              <span className={`output-badge ${output.includes('Error') ? 'error' : ''}`}>
                {output.includes('Error') ? '!' : ''}
              </span>
            )}
          </button>
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
          <div className="output-panel">
            <div className="output-panel-header">
              <h3 className="output-panel-title">Output</h3>
              {output && (
                <button 
                  onClick={clearOutput}
                  className="clear-output-btn"
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
        <div className="language-info">
          <h3 className="language-info-title">About {lang.toUpperCase()}</h3>
          <p className="language-info-content">
            {languageInfo[lang] || 'No information available for this language.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
