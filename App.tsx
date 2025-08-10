
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import Generator from './Generator';
import About from './About';

type Page = 'generator' | 'about';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('generator');

    const renderPage = () => {
        switch (currentPage) {
            case 'generator':
                return <Generator />;
            case 'about':
                return <About />;
            default:
                return <Generator />;
        }
    };
    
    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-4">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        AI Video Prompt Generator
                        </span>
                    </h1>
                    <p className="mt-3 text-xl text-blue-200/70">
                        Turn your simple ideas into detailed, cinematic prompts for generative AI.
                    </p>
                </header>

                <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

                {renderPage()}
            </div>
            <footer className="text-center mt-12 text-gray-500 text-base">
                <p>Powered by Google Gemini</p>
            </footer>
        </div>
    );
};

export default App;
