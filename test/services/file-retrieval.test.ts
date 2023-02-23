import fetch from 'node-fetch';

jest.mock('node-fetch');

import {getFileContents} from '../../src/services/file-retrieval';

const MOBY_DICK_URL = 'https://www.gutenberg.org/files/2701/2701-0.txt';
const BAD_URL = 'https://example.com/not-found.txt';

const text = `
      This is some text.
      It includes a bunch of words, but only a few are unique.
      These are the unique words.
    `;

const mockFetch = (fetch as jest.MockedFunction<typeof fetch>);

describe('getFileContents',  () => {
    beforeEach(() => {
        jest.resetAllMocks();
        // @ts-ignore
        global.fetch = mockFetch;
    });

    test('mocking `global.fetch` works', async ()=>{
        const mockResponse: Partial<Response> = {
            ok: true,
            status: 200,
            text: jest.fn(async () => text),
            clone: jest.fn(),
            json: jest.fn(),
        };
        // @ts-ignore
        mockFetch.mockResolvedValue(mockResponse);
        const result = await fetch(MOBY_DICK_URL);

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(MOBY_DICK_URL);
        await expect(result.text()).resolves.toEqual(text);
    });

    test('getFileContents works as expected when ok and hits cache', async ()=>{
        const mockResponse: Partial<Response> = {
            ok: true,
            status: 200,
            text: jest.fn(async () => text),
            clone: jest.fn(),
            json: jest.fn(),
        };
        // @ts-ignore
        mockFetch.mockResolvedValue(mockResponse);
        const result = await getFileContents(MOBY_DICK_URL);

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(MOBY_DICK_URL);

        await expect(result).toStrictEqual(text);

        await getFileContents(MOBY_DICK_URL);

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(MOBY_DICK_URL);
    });

    test('getFileContent throws an error when response is not OK', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
            statusText: 'Not Found',
            text: jest.fn(() => Promise.resolve('')),
        };
        const mockFetch = jest.fn(() => Promise.resolve(mockResponse));
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

        await expect(getFileContents(BAD_URL)).rejects.toThrowError(
            `Failed to retrieve file 404 Not Found from ${BAD_URL}`
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(BAD_URL);
    });
});
