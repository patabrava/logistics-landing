'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

// NavaTransport chat integration configuration
const CHAT_URL = 'https://digitalspine.app.n8n.cloud/webhook/61e97c35-bc3b-422f-b41c-598841f4a868/chat';
const BRAND_SHADOW_SM = '0 6px 16px rgba(15,23,42,.08), 0 2px 8px rgba(15,23,42,.05)';
const BRAND_SHADOW_LG = '0 14px 40px rgba(15,23,42,.18)';

type ChatRole = 'assistant' | 'user' | 'system';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  isError?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'failed';
}

interface ChatWidgetProps {
  title?: string;
}

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
};

const sanitizeMessage = (raw: string) => {
  if (!raw) return '';

  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^\s*-\s+/gm, '• ')
    .replace(/`/g, '')
    .trim();
};

const extractAssistantReply = (payload: unknown): string => {
  if (!payload) return '';

  if (typeof payload === 'string') {
    return payload;
  }

  if (typeof payload === 'object') {
    if ('output' in payload && typeof (payload as { output: unknown }).output === 'string') {
      return (payload as { output: string }).output;
    }

    if ('message' in payload && typeof (payload as { message: unknown }).message === 'string') {
      return (payload as { message: string }).message;
    }

    if ('data' in payload && typeof (payload as { data: unknown }).data === 'string') {
      return (payload as { data: string }).data;
    }
  }

  try {
    return JSON.stringify(payload, null, 2);
  } catch (error) {
    return 'Antwort konnte nicht interpretiert werden.';
  }
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  title = 'NavaTransport Assistant'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const storedSession = typeof window !== 'undefined'
      ? window.sessionStorage.getItem('navatransport-chat-session-id')
      : null;

    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSessionId = createSessionId();
      setSessionId(newSessionId);

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('navatransport-chat-session-id', newSessionId);
      }
    }
  }, []);

  useEffect(() => {
    if (!isOpen || messages.length > 0) {
      return;
    }

    setMessages([
      {
        id: 'assistant-welcome',
        role: 'assistant',
        content:
          'Hallo! Ich bin der NavaTransport Assistant. Wie kann ich Ihnen heute bei Ihren Logistik- und Transportanfragen helfen?',
        timestamp: Date.now()
      }
    ]);
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const openChat = () => {
    setIsOpen(true);
  };

  // Expose openChat function globally for CTA buttons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openNavaTransportChat = openChat;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).openNavaTransportChat;
      }
    };
  }, []);

  const appendMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${message.role}-${Date.now()}-${Math.floor(Math.random() * 10_000)}`,
        timestamp: Date.now(),
        ...message
      }
    ]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isSending || !sessionId) {
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');
    appendMessage({ role: 'user', content: userMessage, status: 'sent' });
    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatInput: userMessage,
          sessionId,
          action: 'sendMessage'
        })
      });

      if (!response.ok) {
        throw new Error(`Server antwortete mit Status ${response.status}`);
      }

      const payload = await response.json();
      const reply = sanitizeMessage(extractAssistantReply(payload));

      setIsTyping(false);

      if (reply) {
        appendMessage({ role: 'assistant', content: reply, status: 'delivered' });
      } else {
        appendMessage({
          role: 'assistant',
          content: 'Die Antwort konnte nicht geladen werden. Bitte versuchen Sie es erneut.',
          isError: true,
          status: 'failed'
        });
      }
    } catch (error) {
      setIsTyping(false);
      appendMessage({
        role: 'assistant',
        content:
          'Entschuldigung, die Verbindung zum Chat-Service konnte nicht hergestellt werden. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es noch einmal.',
        isError: true,
        status: 'failed'
      });
      console.error('ChatWidget error:', error);
    } finally {
      setIsSending(false);
    }
  }, [appendMessage, inputValue, isSending, sessionId]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-start gap-2 animate-fade-in">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src="/Google_AI_Studio_2025-10-19T23_34_02.499Z.png"
          alt="Assistant"
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white border border-ink-100 rounded-2xl px-4 py-3 shadow-sm" style={{ boxShadow: '0 2px 6px rgba(15,23,42,.06)' }}>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );

  const renderMessage = useCallback((message: ChatMessage) => {
    const isUser = message.role === 'user';
    const alignment = isUser ? 'items-end' : 'items-start';
    const bubbleClasses = isUser
      ? 'bg-brand-600 text-white'
      : message.isError
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-white text-ink-900 border border-ink-100';

    return (
      <div key={message.id} className={`flex gap-2 ${alignment} animate-fade-in`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/Google_AI_Studio_2025-10-19T23_34_02.499Z.png"
              alt="Assistant"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 max-w-[75%]">
          <div
            className={`rounded-2xl px-4 py-3 shadow-sm text-[0.875rem] leading-relaxed ${bubbleClasses}`}
            style={{
              boxShadow: isUser ? BRAND_SHADOW_SM : '0 2px 6px rgba(15,23,42,.06)',
              whiteSpace: 'pre-line'
            }}
          >
            {message.content}
          </div>
          <div className={`flex items-center gap-1 px-2 text-xs text-ink-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span>{new Date(message.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
            {isUser && message.status && (
              <span>
                {message.status === 'sent' && '✓'}
                {message.status === 'delivered' && '✓✓'}
                {message.status === 'failed' && '✗'}
              </span>
            )}
          </div>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            👤
          </div>
        )}
      </div>
    );
  }, []);

  const disabled = useMemo(() => !inputValue.trim() || isSending, [inputValue, isSending]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 w-[60px] h-[60px] rounded-full border-0 bg-brand-600 text-white cursor-pointer z-[9999] transition-transform duration-200 hover:bg-brand-500 hover:scale-105 flex items-center justify-center"
        style={{ boxShadow: BRAND_SHADOW_SM }}
        aria-label={isOpen ? 'Chat schließen' : 'Chat öffnen'}
      >
        <span className="text-[26px]">💬</span>
      </button>

      {isOpen && (
        <div
          className="fixed bottom-[90px] right-5 w-full max-w-[380px] bg-surface-0 text-ink-900 z-[10000] flex flex-col text-[15px] leading-[1.6]"
          style={{
            borderRadius: '24px',
            boxShadow: BRAND_SHADOW_LG
          }}
        >
          <header className="flex items-center justify-between px-5 py-4 bg-navy-900" style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
            </div>
            <button
              onClick={toggleChat}
              className="bg-white/10 hover:bg-white/20 transition-colors duration-150 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              aria-label="Chat schließen"
            >
              ×
            </button>
          </header>

          <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto bg-surface-alt" style={{ minHeight: '280px', maxHeight: '360px' }}>
            {messages.map(renderMessage)}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="px-4 pb-4 pt-3 bg-surface-0"
            onSubmit={(event) => {
              event.preventDefault();
              handleSendMessage();
            }}
          >
            <label htmlFor="navatransport-chat-input" className="sr-only">
              Nachricht an den NavaTransport Assistant eingeben
            </label>
            <div className="relative rounded-full border border-ink-200 bg-white focus-within:border-brand-500 focus-within:shadow-[0_0_0_3px_rgba(243,127,62,.12)] transition-all duration-200">
              <input
                id="navatransport-chat-input"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht schreiben..."
                className="w-full rounded-full pl-5 pr-12 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                disabled={disabled}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-500 hover:scale-110 active:scale-95"
                aria-label="Nachricht senden"
              >
                {isSending ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
