"use client";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-black/70 backdrop-blur-md border-b border-gray-700">
      <div className="flex items-center space-x-3">
      

        <h1 className="text-lg font-semibold">
          Control de Gastos – Mil Sabores
        </h1>
      </div>

      <button className="bg-white text-black font-medium px-4 py-1 rounded-lg hover:bg-gray-200">
        Login
      </button>
    </header>
  );
}
