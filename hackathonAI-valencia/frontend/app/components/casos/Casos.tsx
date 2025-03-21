"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Casos() {
  const router = useRouter();
  return (
    <button
      className="flex w-full flex-col bg-clip-border rounded-xl border-2 border-zinc-100 text-zinc-400 hover:text-zinc-100 p-6 shadow-lg hover:border-white shadow-cyan-500/70 hover:shadow-purple-500/40 duration-300"
      onClick={() => router.push("/board")}
    >
      <div className="mx-auto">
        <FontAwesomeIcon icon={faRoute} className="w-10 h-10" />
      </div>
      <h3 className="mt-6 text-2xl">Use Cases</h3>
      <p className="text-slate-500 h-16 mb-4">Casos</p>
    </button>
  );
}
