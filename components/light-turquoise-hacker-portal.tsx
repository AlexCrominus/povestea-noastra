"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AnimatedScrollTimeline from "./animated-scroll-timeline";

// 1. Definirea interfeței pentru props-urile componentei CustomInput
interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// 2. Aplicarea interfeței la componenta CustomInput
const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Funcție pentru afișarea valorii cu stiluri suplimentare
  const getDisplayValue = () => {
    return placeholder
      ? placeholder
          .split("")
          .map((char, index) => {
            if (index < value.length) {
              return value[index];
            }
            return `<span class="text-teal-400">${char}</span>`;
          })
          .join("")
      : value;
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 font-mono text-teal-800 pointer-events-none p-2 text-base sm:text-lg"
        // Atenție: Utilizarea dangerouslySetInnerHTML poate fi riscantă dacă inputul nu este sanitizat
        dangerouslySetInnerHTML={{ __html: getDisplayValue() }}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-teal-400 text-teal-800 font-mono outline-none p-2 text-base sm:text-lg"
        style={{ caretColor: "teal" }}
      />
    </div>
  );
};

export default function LightTurquoiseHackerPortal() {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [animatedText, setAnimatedText] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const targetText = "Atunci a început povestea noastră...";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setAnimatedText((prevText) => {
        const result = targetText
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return targetText[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join("");

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }

        iteration += 0.25; // Incrementul a fost ajustat pentru a face iterațiile corecte
        return result;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Handler pentru schimbarea parolei
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handler pentru submit-ul formularului
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "13 iunie 2023") {
      setIsAuthenticated(true);
    } else {
      setMessage("Access Denied");
    }
  };

  if (isAuthenticated) {
    return <AnimatedScrollTimeline />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-mono px-4"
      style={{ backgroundColor: "#EFFDFA" }}
    >
      <div className="w-full max-w-md p-6 sm:p-8 border border-teal-600 rounded-lg bg-teal-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center min-h-[4rem] text-teal-800 break-words">
          {animatedText}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-teal-400 rounded">
            <CustomInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="** ***** ****"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 text-base sm:text-lg"
          >
            ENTER
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-center text-lg sm:text-xl font-bold text-teal-800">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
