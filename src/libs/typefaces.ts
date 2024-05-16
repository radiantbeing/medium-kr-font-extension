export type Typeface = {
  name: string;
  value: string;
  style: "sans-serif" | "serif";
};

export const typefaces: Typeface[] = [
  {
    name: "IBM Plex Sans KR",
    value: "IBM Plex Sans KR",
    style: "sans-serif",
  },
  {
    name: "나눔바른고딕",
    value: "Nanum Barun Gothic",
    style: "sans-serif",
  },
  { name: "나눔고딕", value: "Nanum Gothic", style: "sans-serif" },
  {
    name: "나눔스퀘어 네오",
    value: "NanumSquare Neo variable",
    style: "sans-serif",
  },
  {
    name: "Noto Sans Korean",
    value: "Noto Sans KR",
    style: "sans-serif",
  },
  {
    name: "Pretendard",
    value: "Pretendard Variable",
    style: "sans-serif",
  },
  {
    name: "스포카 한 산스 네오",
    value: "Spoqa Han Sans Neo",
    style: "sans-serif",
  },
  { name: "Noto Serif Korean", value: "Noto Serif KR", style: "serif" },
  { name: "리디바탕", value: "RIDIBatang", style: "serif" },
];
