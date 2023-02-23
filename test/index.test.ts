import {analyzeUrl} from "../src";
import {getFileContents} from "../src/services/file-retrieval";
import {analyzeTextFrequency} from "../src/services/text-analyzer";

jest.mock('../src/services/file-retrieval');
jest.mock('../src/services/text-analyzer');

const mockFileContents = (getFileContents as jest.MockedFunction<typeof getFileContents>);
const mockAnalyze = (analyzeTextFrequency as jest.MockedFunction<typeof analyzeTextFrequency>);

describe('handler', () => {
    test('happy path', async () => {
        mockFileContents.mockResolvedValue('hello world');
        const map = new Map<string, number>();
        map.set('hello', 1);
        map.set('world', 1);
        mockAnalyze.mockReturnValue(map);
        const result = await analyzeUrl({});
        expect(result).toEqual(map);
    });
});