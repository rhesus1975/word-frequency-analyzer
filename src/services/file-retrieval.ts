const urlMap = new Map<string, string>();

export const getFileContents = async (url: string): Promise<string> => {
    if (urlMap.has(url)) {
        return urlMap.get(url) || ''; // linting rule needed to prevent this from being flagged with a warning
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to retrieve file ${response.status} ${response.statusText} from ${url}`);
    }

    const content = await response.text();
    urlMap.set(url, content);

    return content;
};