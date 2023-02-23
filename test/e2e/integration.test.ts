import {analyzeUrl} from "../../src";

describe('integration', () => {
    test('analysis of Moby Dick', async () => {
        const result = await analyzeUrl({});
        expect(result).toMatchInlineSnapshot(`
{
  "result": "{}",
}
`);
    });
});