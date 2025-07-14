import { ChatCreator } from "./components/chat-creator";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <h1 className="font-bold text-3xl text-gray-900">
              v0 Platform Demo
            </h1>
          </div>
        </div>

        <ChatCreator />

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Powered by{" "}
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              v0.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
