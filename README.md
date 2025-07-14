# AI UI Generator

A Next.js application that generates beautiful UI components using AI, powered by the **v0 SDK**.

## Features

- **Real v0 Integration**: Uses the official v0 SDK for generating UI components
- **Split-Screen Interface**: Chat interface with live preview panel
- **Simple Home Page**: Clean interface with prompt input box
- **Chat-based Interaction**: Dynamic `/chat/[id]` routes for ongoing conversations
- **Live Preview**: See your generated UI components in real-time
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Getting Started

### Prerequisites

1. **Get your V0 API Key**: Visit [v0.dev/chat/settings/keys](https://v0.dev/chat/settings/keys) to create an API key

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file in the `apps/web/` directory:
   ```bash
   # V0 API Configuration
   V0_API_KEY=your_v0_api_key_here
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Create a new UI**: 
   - Enter a description of the UI you want to create on the home page
   - Click "Generate UI" to **immediately redirect** to the chat interface
   - The system will start generating your component in the background

2. **Watch the generation**:
   - You'll see a loading spinner in the preview panel while v0 generates your component
   - The chat interface will show your original prompt and the generation progress
   - Once complete, the live preview will display your generated UI component

3. **Interact with v0**:
   - Use the chat interface to refine your UI requests
   - Each message updates the live preview in real-time
   - Click "View in v0.dev" links to open components in the official v0 interface

4. **Iterate and refine**:
   - Continue the conversation to modify your components
   - The preview panel will show a loading state during each update
   - View the component source code on v0.dev

## Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts          # v0 chat creation endpoint
│   │   │   └── generate/route.ts      # v0 message sending endpoint
│   │   ├── chat/[id]/page.tsx         # Split-screen chat interface
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Home page
│   └── lib/
│       └── v0-sdk.ts                  # v0 SDK integration utilities
```

## V0 SDK Integration

This application uses the **official v0 SDK** for:

- **Chat Creation**: Creates new v0 chat sessions
- **Message Sending**: Sends messages to existing chats
- **Live Previews**: Displays generated components in iframes
- **Error Handling**: Handles authentication and rate limiting

### Key Functions

- `createV0Chat()`: Creates a new v0 chat conversation
- `sendV0ChatMessage()`: Sends messages to existing chats
- `getV0Chat()`: Retrieves chat information
- `getV0User()`: Gets user information

## API Endpoints

### POST `/api/chat`
Creates a new v0 chat session.

**Request Body:**
```json
{
  "prompt": "Create a login form",
  "system": "You are an expert React developer...",
  "attachments": []
}
```

**Response:**
```json
{
  "chatId": "chat_id",
  "content": "Chat created successfully!",
  "previewUrl": "https://...",
  "chatUrl": "https://v0.dev/chat/..."
}
```

### POST `/api/generate`
Sends a message to an existing v0 chat.

**Request Body:**
```json
{
  "chatId": "chat_id",
  "message": "Add a submit button",
  "messages": []
}
```

**Response:**
```json
{
  "content": "Message sent successfully!",
  "previewUrl": "https://...",
  "chatUrl": "https://v0.dev/chat/...",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `V0_API_KEY` | Your v0 API key from v0.dev | Yes |

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **v0 SDK**: Official v0 SDK for AI UI generation
- **Turborepo**: Monorepo build system

## Error Handling

The application includes comprehensive error handling for:

- **Authentication errors**: Invalid or missing API keys
- **Rate limiting**: v0 API rate limits
- **Network errors**: Connection issues
- **Invalid inputs**: Malformed requests

## Development

This project uses a monorepo structure with:
- **apps/web**: Next.js application
- **packages/ui**: Shared UI components
- **packages/config**: Shared configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues with the v0 SDK, please refer to the [v0 documentation](https://v0.dev) or contact v0 support.

For issues with this application, please open an issue on GitHub.

## Technical Implementation

### Immediate Redirect Flow

The application uses a seamless redirect flow for better user experience:

1. **Home Page Submission**: When users submit a prompt, they're immediately redirected to the chat interface
2. **localStorage Bridge**: The initial prompt is stored in `localStorage` to bridge the redirect
3. **Background Generation**: The chat page picks up the prompt and starts v0 generation in the background
4. **Real-time Updates**: Users see loading states and live previews as components are generated

### localStorage Usage

The app uses `localStorage` to maintain state across the redirect:

```javascript
// Stored on home page submission
{
  "chatId": "chat_1234567890_abcdef123",
  "prompt": "Create a login form",
  "system": "You are an expert React developer...",
  "timestamp": 1234567890000
}
```

- **Auto-cleanup**: localStorage data is automatically cleared after use
- **Expiration**: Pending chats expire after 5 minutes
- **Error handling**: Handles malformed or missing localStorage data gracefully

### Error Handling

The application includes comprehensive error handling for:

- **Authentication errors**: Invalid or missing API keys
- **Rate limiting**: v0 API rate limits
- **Network errors**: Connection issues
- **Invalid inputs**: Malformed requests
- **Iframe failures**: Component rendering issues
