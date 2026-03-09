import { create } from "zustand"
import { persist } from "zustand/middleware";

const DEFAULT_CODE = {
  javascript: `console.log("Hello, World!");`,

  python: `print("Hello, World!")`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
}


export const useEditorStore = create((set,get) => ({
  language: "javascript",
  code: DEFAULT_CODE.javascript,
  inp:"",
  setLanguage: (lang) => {
    const { language, code ,inp} = get()

    if (lang === language) return
    set({
      language: lang,
      code: DEFAULT_CODE[lang],
      inp: "",
    })
  },

   setCode: (newCode) => set({ code: newCode }),
   setInp: (newinp) => set({inp:newinp}),
}))


export const conversation = create((set) => ({
    idCounter: 1,
    messages: [],
    isLoading: false, 
    setLoading: (val) => set({ isLoading: val }),
    setMsg: (content, sender = "left") => set((state) => ({
        messages: [
            ...state.messages,
            { id: state.idCounter, sender, content, type: "text" }
        ],
        idCounter: state.idCounter + 1
    })),
}));

export const Visualization = create((set) => ({
  stepno: 0,
  steps: [],
  setSteps: (newSteps) =>
    set({
      steps: newSteps,
      stepno: 0, 
    }),
  setNextStep: () =>
    set((state) => ({
      stepno: Math.min(state.stepno + 1, state.steps.length - 1),
    })),
  setPrevStep: () =>
    set((state) => ({
      stepno: Math.max(state.stepno - 1, 0),
    })),
}));


export const useUserStore = create(
  persist(
    (set) => ({
      userId: "",
      setUserId: (newId) => set({ userId: newId }),
    }),
    {
      name: "cf-user",
    }
  )
);