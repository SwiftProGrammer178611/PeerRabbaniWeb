export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-red-100 rounded-xl shadow-lg border-2 border-blue-500">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind + React Works! 🎉
        </h1>
        <p className="text-gray-700 text-lg">
          If you see this styled box, Tailwind is installed correctly.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
          Click Me
        </button>
      </div>
    </div>
  );
}
