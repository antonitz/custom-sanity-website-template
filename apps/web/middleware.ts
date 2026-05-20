import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

const BOT_PATTERN = new RegExp(AI_BOTS.join('|'), 'i');

export function middleware(request: NextRequest): NextResponse {
  const ua = request.headers.get('user-agent') ?? '';
  const match = ua.match(BOT_PATTERN);

  if (match) {
    console.log(
      JSON.stringify({
        event: 'ai_crawler',
        bot: match[0],
        path: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
