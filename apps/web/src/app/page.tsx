import { ChatCreator } from "./components/chat-creator";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-8 font-normal text-4xl text-white">
            What can we ship today?
          </h1>
        </div>

        <ChatCreator />
      </div>
    </div>
  );
}
