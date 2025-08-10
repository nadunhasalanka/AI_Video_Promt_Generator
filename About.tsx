
import React from 'react';
import aboutImage from './images/about.png';

const About: React.FC = () => {
    const FieldDescription: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
        <div className="mb-4">
            <h4 className="font-semibold text-xl text-blue-300">{title}</h4>
            <p className="text-blue-200/80 leading-relaxed">{children}</p>
        </div>
    );

    return (
        <main className="animate-fade-in">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-800/30 text-blue-200/90 text-base">
                <h2 className="text-4xl font-bold text-blue-300 mb-4">About the AI Video Prompt Generator</h2>
                <p className="mb-4 leading-relaxed">
                    This tool is designed to bridge the gap between a simple idea and a detailed, structured prompt ready for an AI video generation model. By providing a few key details, you can leverage the creative power of Google's Gemini AI to flesh out a complete scene, complete with cinematic direction, mood, and style.
                </p>
                <p className="mb-6 leading-relaxed">
                    The goal is to empower creators, filmmakers, and hobbyists to produce higher quality, more intentional AI-generated videos by starting with a professional-grade prompt. The generated JSON output is specifically structured to be machine-readable, providing clear, unambiguous instructions to a video model.
                </p>
                <div className="my-8 p-4 border-2 border-dashed border-blue-800/50 rounded-lg bg-gray-950/50 flex items-center justify-center h-64">
                    <img
                        src={aboutImage}
                        alt="About screenshot"
                        className="object-contain h-full w-full rounded shadow"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                </div>

                <h3 className="text-3xl font-bold text-blue-300 mb-4 border-t border-blue-800/30 pt-6">Understanding the Fields</h3>
                <p className="mb-6 leading-relaxed">
                    Each field allows you to guide the AI's creativity. While you can leave fields as "Default" to give the AI more freedom, providing specific details will result in a prompt that is closer to your vision.
                </p>

                <div className="space-y-6">
                    <FieldDescription title="Primary Subject">
                        This is the main character or object of your scene. Be as specific or as general as you like. For example, "a stoic ancient warrior" is more descriptive than "a man".
                    </FieldDescription>
                    <FieldDescription title="Environment / Setting">
                        Describe the location where the scene takes place. Think about the time of day, the weather, and the overall feel of the place. "A rain-slicked neon street in Tokyo at midnight" sets a very different scene than "a sun-drenched meadow at dawn".
                    </FieldDescription>
                    <FieldDescription title="Key Actions">
                        What is the subject doing? List the most important actions that should occur in the video. This helps define the narrative of the short clip.
                    </FieldDescription>
                    <FieldDescription title="Visual Style">
                        This defines the overall aesthetic. Is it a photorealistic "Cinematic" style, a stylized "Anime" look, or a grainy "Vintage Film" effect? This selection heavily influences the final look.
                    </FieldDescription>
                    <FieldDescription title="Mood / Atmosphere">
                        What feeling should the scene evoke? A "Tense" mood will result in different choices for lighting and camera work than a "Joyful" one. This sets the emotional tone.
                    </FieldDescription>
                    <FieldDescription title="Lighting">
                        How is the scene lit? "Golden Hour" provides warm, soft light, while "Neon" suggests a vibrant, artificial, and often urban setting. Lighting is critical for mood.
                    </FieldDescription>
                    <FieldDescription title="Camera Shot">
                        This tells the AI how to frame the subject. A "Wide Shot" can establish the environment, while an "Extreme Close-up" focuses on a small detail to create intimacy or tension.
                    </FieldDescription>
                    <FieldDescription title="Camera Movement">
                        A "Static" camera is still, creating a stable, observational feel. A "Tracking Shot" follows a moving subject, creating a sense of dynamic action. This dictates how the virtual camera behaves.
                    </FieldDescription>
                </div>
            </div>
        </main>
    );
};

export default About;
