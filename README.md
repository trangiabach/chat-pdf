[ChatPDF](https://chat-to-pdf.vercel.app/) is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Live deployment link: [https://chat-to-pdf.vercel.app/](https://chat-to-pdf.vercel.app/).

## Local Development 💻

Here is a guide to run ChatPDF locally:

### Clone the repository:

```bash
git clone https://github.com/trangiabach/chat-pdf.git
```

### Install required packages:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and ChatPDF should be up and running!


## Architecture ⚙️

ChatPDF is partitioned into the following:
- **Client/Frontend Framework**: Next.js (React), TypeScript
- **Styling**: Tailwind CSS
- **Components Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Server/Backend Frameworks**: ChatPDF uses [Next.js serverless API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes), which creates API endpoints as Node.js serverless functions. These functions are defined under `app/api/*`
- **Storage**: A bucket to store PDF files using [Supabase Storage](https://supabase.com/docs/guides/storage)
- **Vector Store**: A vector store to  store embeddings of PDF files (for RAG) using [Supabase pgvector]
- **LLM Interface**: Uses Langchain to interface with multiple LLMs and create RAG features efficiently
- **LLM UI**: Uses [Vercel AI SDK](https://sdk.vercel.ai/docs) to handle streaming and state management in the UI efficiently



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
