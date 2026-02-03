import React from 'react';

/**
 * Format content with proper styling for headings and lists
 */
export const formatContent = (content: string): React.ReactNode[] => {
  const sections = content.split('\n\n');
  
  return sections.map((section, index) => {
    const trimmedSection = section.trim();
    
    if (!trimmedSection) return null;
    
    // Handle bold headings (text between **)
    if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
      const headingText = trimmedSection.slice(2, -2);
      return (
        <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {headingText}
        </h3>
      );
    }
    
    // Handle bullet points (lines starting with •)
    if (trimmedSection.includes('•')) {
      const listItems = trimmedSection.split('\n').filter(line => line.trim().startsWith('•'));
      if (listItems.length > 0) {
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 ml-4">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">
                {item.trim().substring(1).trim()}
              </li>
            ))}
          </ul>
        );
      }
    }
    
    // Handle regular paragraphs
    const formattedText = trimmedSection.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return (
      <p 
        key={index} 
        className={index === 0 ? 
          "text-xl font-medium text-gray-900 mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-brand-red first-letter:float-left first-letter:mr-3" : 
          "mb-4 text-gray-700 leading-relaxed"
        }
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  }).filter(Boolean);
};

/**
 * Simple text formatter for excerpts and previews
 */
export const formatSimpleText = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/•/g, '•');
};