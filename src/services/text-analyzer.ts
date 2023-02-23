export const EXCLUDE_WORDS: string[] = [
    'the', 'of', 'to', 'and', 'a', 'in', 'is', 'it', 'you', 'that',
    'he', 'was', 'for', 'on', 'are', 'with', 'as', 'i', 'his', 'they',
    'be', 'at', 'one', 'have', 'this', 'from', 'or', 'had', 'by', 'not',
    'word', 'but', 'what', 'some', 'we', 'can', 'out', 'other', 'were', 'all',
    'there', 'when', 'up', 'use', 'your', 'how', 'said', 'an', 'each', 'she'
];

export const analyzeTextFrequency = (text: string, excludeWords: string[] = EXCLUDE_WORDS): Map<string, number> => {
    const wordFreq = new Map<string, number>();
    // Likely we would want to clean up punctuation and contractions... not sure if there is a NLTK port to TS or not.
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/);

    for (const word of words) {
        if (!excludeWords.includes(word)) {
            const count = wordFreq.get(word) || 0;
            wordFreq.set(word, count + 1);
        }
    }

    const sortedArray = Array.from(wordFreq.entries()).sort((a, b) => b[1] - a[1]);

    return new Map(sortedArray);
}
