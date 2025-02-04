// store/chatStore.ts
import {create} from 'zustand';

interface ChatStore {
  // An array of prompt strings returned from your backend/LLM
  prompts: string[];
  // An array of UI prompt templates to be used in the application
  uiPrompts: string[];
  // Function to set the prompts array
  setPrompts: (prompts: string[]) => void;
  // Function to set the UI prompts array
  setUiPrompts: (uiPrompts: string[]) => void;
  // Optionally, a function to reset the state
  reset: () => void;
  templateSet:boolean;
  setTemplateSet:(templateSet:boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  prompts: [],
  uiPrompts: [],
  setPrompts: (prompts: string[]) => set({ prompts }),
  setUiPrompts: (uiPrompts: string[]) => set({ uiPrompts }),
  reset: () => set({ prompts: [], uiPrompts: [] }),
  templateSet:false,
  setTemplateSet:(templateSet:boolean)=>set({templateSet})
}));
