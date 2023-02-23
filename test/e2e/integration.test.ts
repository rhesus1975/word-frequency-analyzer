import {analyzeUrl} from "../../src";

describe('integration', () => {
    test('analysis of Moby Dick', async () => {
        const result = await analyzeUrl({});
        expect(result).toMatchInlineSnapshot(`
{
  "result": {
    "about": 315,
    "ahab": 416,
    "any": 361,
    "been": 415,
    "before": 299,
    "captain": 293,
    "chapter": 308,
    "do": 308,
    "down": 362,
    "great": 305,
    "has": 292,
    "her": 323,
    "him": 1041,
    "if": 497,
    "into": 523,
    "its": 465,
    "like": 575,
    "long": 314,
    "man": 435,
    "me": 605,
    "more": 503,
    "my": 584,
    "no": 579,
    "now": 765,
    "old": 442,
    "only": 374,
    "over": 404,
    "sea": 379,
    "ship": 384,
    "so": 1043,
    "still": 307,
    "such": 373,
    "than": 310,
    "their": 619,
    "them": 458,
    "then": 616,
    "these": 398,
    "those": 306,
    "though": 364,
    "time": 323,
    "upon": 567,
    "very": 321,
    "whale": 954,
    "whales": 396,
    "which": 647,
    "who": 336,
    "will": 395,
    "would": 427,
    "ye": 420,
    "yet": 339,
  },
}
`);
    });
});