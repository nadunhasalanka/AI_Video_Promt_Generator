
import React, { useState } from 'react';
import { VideoPromptFormState } from './types';
import { VISUAL_STYLES, CAMERA_SHOTS, CAMERA_MOVEMENTS, LIGHTING_STYLES, MOODS } from './constants';
import { generateVideoPrompt } from './services/geminiService';
import { InputField } from './components/InputField';
import { SelectField } from './components/SelectField';
import { CodeBlock } from './components/CodeBlock';
import { ErrorMessage } from './components/ErrorMessage';
import { Icon } from './components/Icon';

const Generator: React.FC = () => {
  const [formData, setFormData] = useState<VideoPromptFormState>({
    subject: 'A majestic lion',
    environment: 'Serengeti plains at sunset',
    actions: 'Walking slowly, looking towards the horizon',
    style: VISUAL_STYLES[0],
    cameraShot: CAMERA_SHOTS[0],
    cameraMovement: CAMERA_MOVEMENTS[0],
    lighting: LIGHTING_STYLES[0],
    mood: MOODS[0],
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(null);

    try {
      const resultJsonString = await generateVideoPrompt(formData);
      // The result is already a string, but we can parse and re-stringify to ensure it's well-formatted.
      const parsedJson = JSON.parse(resultJsonString);
      setGeneratedPrompt(JSON.stringify(parsedJson, null, 2));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
        <div className="bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-800/30">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <InputField
                id="subject"
                label="Primary Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g., A futuristic robot, a curious fox"
                />
            </div>
             <div className="md:col-span-2">
                <InputField
                id="environment"
                label="Environment / Setting"
                name="environment"
                value={formData.environment}
                onChange={handleInputChange}
                placeholder="e.g., Neon-lit cyberpunk city, an enchanted forest"
                />
            </div>
             <div className="md:col-span-2">
                <InputField
                id="actions"
                label="Key Actions"
                name="actions"
                value={formData.actions}
                onChange={handleInputChange}
                placeholder="e.g., Scanning the area, drinking from a stream"
                />
            </div>
             <SelectField
                id="style"
                label="Visual Style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                options={VISUAL_STYLES}
            />
            <SelectField
                id="mood"
                label="Mood / Atmosphere"
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
                options={MOODS}
            />
            <SelectField
                id="lighting"
                label="Lighting"
                name="lighting"
                value={formData.lighting}
                onChange={handleInputChange}
                options={LIGHTING_STYLES}
            />
             <SelectField
                id="cameraShot"
                label="Camera Shot"
                name="cameraShot"
                value={formData.cameraShot}
                onChange={handleInputChange}
                options={CAMERA_SHOTS}
            />
             <SelectField
                id="cameraMovement"
                label="Camera Movement"
                name="cameraMovement"
                value={formData.cameraMovement}
                onChange={handleInputChange}
                options={CAMERA_MOVEMENTS}
            />
            
            <button
            type="submit"
            disabled={isLoading}
            className="md:col-span-2 mt-4 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
            {isLoading ? (
                <>
                <Icon type="spinner" className="w-5 h-5" />
                Generating...
                </>
            ) : (
                '✨ Generate Prompt'
            )}
            </button>
        </form>
        </div>

        {error && <ErrorMessage message={error} />}

        {generatedPrompt && (
        <div className="animate-fade-in">
            <CodeBlock jsonString={generatedPrompt} />
        </div>
        )}
    </main>
  );
};

export default Generator;
