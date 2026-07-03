import { useState, useEffect, useRef } from 'react';
import { X, Minimize, Terminal } from 'lucide-react';
import { allProjects } from 'content-collections';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export function CLITerminal() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [typingOutput, setTypingOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = (line: TerminalLine) => {
    setHistory(prev => [...prev, line]);
  };

  const typeText = async (text: string, type: 'output' | 'error' = 'output') => {
    setIsTyping(true);
    setTypingOutput('');
    
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setTypingOutput(text.slice(0, i + 1));
    }
    
    setTypingOutput('');
    addLine({ type, content: text });
    setIsTyping(false);
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;
    
    addLine({ type: 'input', content: `guest@portfolio:~$ ${cmd}` });
    setCommand('');

    if (trimmedCmd === 'help') {
      await typeText(`
Available commands:
  help     - Show this help message
  about    - About the portfolio owner
  projects - List all projects
  clear    - Clear the terminal
      `.trim());
    } else if (trimmedCmd === 'about') {
      await typeText(`
Hello! I'm Gwido Putra Wijaya, a full-stack developer passionate about building modern web and mobile applications.
I specialize in React, TypeScript, Node.js, and more. Let's create something amazing together!
      `.trim());
    } else if (trimmedCmd === 'projects') {
      const projectList = allProjects.map((p, i) =>
        `${i + 1}. ${p.title} - ${p.description}`
      ).join('\n');
      await typeText(`
Featured Projects:
${projectList}
      `.trim());
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
    } else {
      await typeText(`Command not found: ${trimmedCmd}`, 'error');
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history, typingOutput]);

  useEffect(() => {
    if (!isMinimized && !isClosed) {
      inputRef.current?.focus();
    }
  }, [isMinimized, isClosed]);

  if (isClosed) {
    return (
      <button
        onClick={() => setIsClosed(false)}
        className="fixed bottom-6 right-6 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50"
      >
        <Terminal size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-auto' : 'w-80 h-96'}`}>
      <div className={`bg-slate-900 rounded-lg shadow-2xl border border-slate-700 overflow-hidden ${isMinimized ? 'h-auto' : 'h-full'}`}>
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Minimize size={16} />
            </button>
            <button
              onClick={() => setIsClosed(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col h-[calc(100%-40px)]">
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-sm"
            >
              <div className="text-slate-400 mb-4">
                Welcome to Gwido's Portfolio CLI! Type 'help' to get started.
              </div>
              
              {history.map((line, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap ${
                    line.type === 'input'
                      ? 'text-cyan-400'
                      : line.type === 'error'
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {line.content}
                </div>
              ))}
              
              {isTyping && (
                <div className="text-green-400 whitespace-pre-wrap">
                  {typingOutput}
                  <span className="animate-pulse">▊</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-cyan-400">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(command);
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-white"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
