"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setInput("");
  };

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-zinc-800 mb-6">Todo</h1>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-zinc-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            placeholder="タスクを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button
            onClick={add}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
          >
            追加
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-8">タスクがありません</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 group"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                  className="w-4 h-4 accent-zinc-800 cursor-pointer"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.done ? "line-through text-zinc-400" : "text-zinc-700"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => remove(todo.id)}
                  className="text-zinc-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="text-xs text-zinc-400 mt-4 text-right">
            {todos.filter((t) => t.done).length} / {todos.length} 完了
          </p>
        )}
      </div>
    </div>
  );
}
