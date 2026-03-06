import React from 'react';

/**
 * Format content with proper styling for headings and lists
 */
export const formatContent = (content: string): React.ReactNode[] => {
  // Clean up encoding artifacts, stray hyphens/dots used as bullets
  const cleaned = content
    .replace(/â€¢/g, '')
    .replace(/\r\n/g, '\n')
    // Remove lines that are purely decorative dashes like "---" or "- - -"
    .replace(/^[-–—]{2,}\s*$/gm, '')
    // Remove standalone dot-only lines
    .replace(/^\.\s*$/gm, '');

  const sections = cleaned.split(/\n{2,}/);

  return sections
    .map((section, index) => {
      const trimmed = section.trim();
      if (!trimmed) return null;

      // H2-level section heading: **text** alone on a line
      if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
        const text = trimmed.slice(2, -2);
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-10 mb-4 leading-tight border-l-4 border-orange-500 pl-4"
          >
            {text}
          </h2>
        );
      }

      // H2 heading with stray leading dash: - **text**
      if (/^-\s+\*\*[^*]+\*\*$/.test(trimmed)) {
        const text = trimmed.replace(/^-\s+\*\*/, '').replace(/\*\*$/, '');
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-10 mb-4 leading-tight border-l-4 border-orange-500 pl-4"
          >
            {text}
          </h2>
        );
      }

      // Short standalone title line (no markdown, short, likely a section header)
      // Must be a single line, no full stop at end, under 80 chars, not a quote
      if (
        !trimmed.includes('\n') &&
        trimmed.length < 80 &&
        !trimmed.startsWith('"') &&
        !trimmed.startsWith('-') &&
        !trimmed.startsWith('>') &&
        !/[.!?]$/.test(trimmed) &&
        !/\*/.test(trimmed) &&
        index > 0
      ) {
        return (
          <h3
            key={index}
            className="text-xl font-extrabold text-gray-900 mt-8 mb-3"
          >
            {trimmed}
          </h3>
        );
      }

      // H3-level sub-heading: ### text
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-800 mt-8 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      }

      // H2-level heading: ## text
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-10 mb-4 leading-tight border-l-4 border-orange-500 pl-4"
          >
            {trimmed.slice(3)}
          </h2>
        );
      }

      // Blockquote / pull quote: lines starting with >
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s?/, '');
        return (
          <blockquote
            key={index}
            className="my-8 border-l-4 border-orange-400 bg-orange-50 pl-6 pr-4 py-4 rounded-r-xl italic text-gray-700 text-lg font-medium"
          >
            {quoteText}
          </blockquote>
        );
      }

      // Pull quote: text wrapped in " "
      if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 30) {
        return (
          <blockquote
            key={index}
            className="my-8 border-l-4 border-orange-400 bg-orange-50 pl-6 pr-4 py-4 rounded-r-xl italic text-gray-700 text-lg font-medium"
          >
            {trimmed}
          </blockquote>
        );
      }

      // Bullet list — lines starting with •, -, or *
      const lines = trimmed.split('\n');
      const bulletLines = lines.filter(l => /^[\u2022\-\*]\s/.test(l.trim()));
      if (bulletLines.length > 0 && bulletLines.length >= lines.length * 0.6) {
        return (
          <ul key={index} className="my-6 space-y-3 pl-1">
            {bulletLines.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-base leading-relaxed">
                <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-orange-500" />
                <span>{item.trim().replace(/^[\u2022\-\*]\s+/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Inline bold formatting
      const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

      // First paragraph — large lead text with drop cap
      if (index === 0) {
        return (
          <p
            key={index}
            className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8 first-letter:text-6xl first-letter:font-black first-letter:text-orange-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
            dangerouslySetInnerHTML={{ __html: withBold }}
          />
        );
      }

      return (
        <p
          key={index}
          className="text-base md:text-lg text-gray-700 leading-[1.85] mb-6"
          dangerouslySetInnerHTML={{ __html: withBold }}
        />
      );
    })
    .filter(Boolean) as React.ReactNode[];
};

/**
 * Simple text formatter for excerpts and previews
 */
export const formatSimpleText = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/â€¢/g, '');
};
