// Common IT-related terms that help identify context
const itContextWords = [
  'computer', 'software', 'hardware', 'network', 'server', 
  'security', 'system', 'infrastructure', 'technology',
  'support', 'service', 'backup', 'database', 'cloud',
  'application', 'cyber', 'digital', 'technical', 'department',
  'systems', 'staff', 'services', 'professional', 'manager'
];

// Common phrases where "IT" definitely means Information Technology
const itPhrases = [
  'it department',
  'it support',
  'it infrastructure',
  'it services',
  'it systems',
  'it staff',
  'it professional',
  'it manager',
  'it security',
  'it maturity',
  'it health'
];

export const shouldCapitalizeIT = (sentence: string, wordPosition: number, words: string[]): boolean => {
  // Convert surrounding words to lowercase for comparison
  const surroundingWords = words.map(w => w.toLowerCase());
  
  // Check if it's part of a known IT phrase
  const twoWordPhrase = surroundingWords.slice(wordPosition, wordPosition + 2).join(' ');
  if (itPhrases.includes(twoWordPhrase)) {
    return true;
  }

  // Check nearby words (within 5 words) for IT context
  const start = Math.max(0, wordPosition - 5);
  const end = Math.min(surroundingWords.length, wordPosition + 5);
  const nearbyWords = surroundingWords.slice(start, end);
  
  return nearbyWords.some(word => itContextWords.includes(word));
};

export const formatText = (text: string): string => {
  if (!text) return '';
  
  const words = text.toLowerCase().split(/\s+/);
  
  return words
    .map((word, index) => {
      if (word.toLowerCase() === 'it') {
        return shouldCapitalizeIT(text, index, words) ? 'IT' : 'it';
      }
      return word.toLowerCase();
    })
    .join(' ');
};