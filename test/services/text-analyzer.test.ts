import {analyzeTextFrequency} from "../../src/services/text-analyzer";

describe('analyzeTextFrequency', () => {
    it('returns the correct word frequency for a simple text', () => {
        const text = 'the quick brown fox jumps over the lazy dog';
        const wordFreq = analyzeTextFrequency(text);

        expect(wordFreq.size).toBe(7);
        expect(wordFreq.get('quick')).toBe(1);
        expect(wordFreq.get('brown')).toBe(1);
        expect(wordFreq.get('fox')).toBe(1);
        expect(wordFreq.get('jumps')).toBe(1);
        expect(wordFreq.get('over')).toBe(1);
        expect(wordFreq.get('lazy')).toBe(1);
        expect(wordFreq.get('dog')).toBe(1);
    });

    it('returns the correct word frequency for a text with repeated words', () => {
        const text = 'the quick brown fox jumps over the lazy dog. The quick brown fox was not lazy.';
        const wordFreq = analyzeTextFrequency(text);

        expect(wordFreq.size).toBe(7);
        expect(wordFreq.get('quick')).toBe(2);
        expect(wordFreq.get('brown')).toBe(2);
        expect(wordFreq.get('fox')).toBe(2);
        expect(wordFreq.get('jumps')).toBe(1);
        expect(wordFreq.get('over')).toBe(1);
        expect(wordFreq.get('lazy')).toBe(2);
        expect(wordFreq.get('dog')).toBe(1);
    });
});
