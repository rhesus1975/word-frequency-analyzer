import {getFileContents} from "./services/file-retrieval";
import {analyzeTextFrequency} from "./services/text-analyzer";

export const analyzeUrl = async (event: any) => {
    // These would be validated in the real world...
    const url = event.url || 'https://www.gutenberg.org/files/2701/2701-0.txt';
    const count = Number(event.count) || 50;

    const fileContents = await getFileContents(url);
    const results = analyzeTextFrequency(fileContents);
    console.info(`results returned ${results.size}`);

    return {
        result: JSON.stringify(new Map([...results].slice(0, count)))
    };
}

exports.handler = async (event: any) => {
    try {
        const response = await analyzeUrl(event);
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error'
            })
        };
    }
}