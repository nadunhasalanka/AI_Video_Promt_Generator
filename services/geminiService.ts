
import { GoogleGenAI, Type } from "@google/genai";
import { VideoPromptFormState } from '../types';

// This should be handled by the environment, but for this example, we'll ensure it's defined.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This is the specific schema the AI must follow.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        scene_description: {
            type: Type.STRING,
            description: "A detailed, narrative paragraph describing the entire scene from start to finish, including sensory details."
        },
        subject: {
            type: Type.OBJECT,
            properties: {
                description: { type: Type.STRING, description: "A detailed visual description of the subject, including appearance, clothing, and expression." },
                actions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A chronological list of specific actions the subject performs in the scene."
                }
            },
            required: ["description", "actions"]
        },
        environment: {
            type: Type.OBJECT,
            properties: {
                setting: { type: Type.STRING, description: "A detailed description of the physical environment/setting." },
                lighting: { type: Type.STRING, description: "Description of the lighting (e.g., 'golden hour', 'harsh noon sun', 'flickering neon glow')." },
                atmosphere: { type: Type.STRING, description: "The mood or feeling of the scene (e.g., 'serene and peaceful', 'tense and suspenseful', 'futuristic and cold')." }
            },
             required: ["setting", "lighting", "atmosphere"]
        },
        camera: {
            type: Type.OBJECT,
            properties: {
                shot_type: { type: Type.STRING, description: "The dominant camera shot type (e.g., 'close-up', 'wide shot', 'medium shot')." },
                angle: { type: Type.STRING, description: "The primary camera angle (e.g., 'low angle', 'high angle', 'eye-level')." },
                movement: { type: Type.STRING, description: "How the camera moves during the shot (e.g., 'slow pan right', 'dolly in', 'static')." }
            },
            required: ["shot_type", "angle", "movement"]
        },
        style: {
            type: Type.OBJECT,
            properties: {
                visual_style: { type: Type.STRING, description: "The overall visual style, consistent with user input." },
                color_palette: { type: Type.STRING, description: "A descriptive color palette (e.g., 'warm earth tones of ochre and sienna', 'vibrant neon cyans and magentas')." }
            },
            required: ["visual_style", "color_palette"]
        }
    },
    required: ["scene_description", "subject", "environment", "camera", "style"]
};

/**
 * Generates a detailed video prompt using the Gemini API.
 * @param formData The user's input from the form.
 * @returns A stringified JSON object conforming to the schema.
 */
export const generateVideoPrompt = async (formData: VideoPromptFormState): Promise<string> => {
  const { subject, environment, actions, style, cameraShot, cameraMovement, lighting, mood } = formData;

  const prompt = `
    You are a world-class cinematographer and creative prompt engineer for a state-of-the-art generative video AI.
    Your mission is to expand a user's basic idea into a rich, detailed, and structured JSON prompt.
    The final JSON must be a masterpiece of visual storytelling.

    **Instructions:**
    1.  **Analyze User Input:** Carefully consider all provided user inputs. They are the foundation of the scene.
    2.  **Creative Expansion:** Where the user has left fields blank or set them to 'Default', use your creative expertise to fill in the gaps. The generated details must be coherent with the specified inputs. For example, a 'serene' mood should not have 'harsh, jarring' camera movements unless there's a specific narrative reason.
    3.  **Cinematic Language:** Use evocative and precise language. Describe textures, lighting, shadows, and subtle movements.
    4.  **Strict Schema Adherence:** The output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any text, markdown, or explanations outside of the JSON object itself.

    **User Inputs to Base Your Creative Work On:**
    - Subject: "${subject || 'A lone figure'}"
    - Environment: "${environment || 'An empty landscape'}"
    - Key Actions: "${actions || 'Observing the surroundings'}"
    - Visual Style: "${style}"
    - Desired Camera Shot: "${cameraShot === 'Default' ? 'Your creative choice' : cameraShot}"
    - Desired Camera Movement: "${cameraMovement === 'Default' ? 'Your creative choice' : cameraMovement}"
    - Desired Lighting: "${lighting === 'Default' ? 'Your creative choice' : lighting}"
    - Desired Mood: "${mood === 'Default' ? 'Your creative choice' : mood}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });
    
    // The Gemini API with responseSchema returns the JSON object directly in response.text
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to generate prompt. The AI model returned an error: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while communicating with the AI."));
  }
};
