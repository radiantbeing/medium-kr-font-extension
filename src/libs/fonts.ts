/**
 * Medium KR Font 확장 프로그램에서 사용하는 글꼴의 타입입니다.
 */
export type Font = {
  value: string;
  name: string;
  style: "sans-serif" | "serif";
};

/**
 * Medium KR Font 확장 프로그램에서 사용하는 글꼴의 배열입니다.
 */
export const fonts: Font[] = [
  {
    value: "IBM Plex Sans KR",
    name: "IBM Plex Sans KR",
    style: "sans-serif",
  },
  {
    value: "Nanum Barun Gothic",
    name: "나눔바른고딕",
    style: "sans-serif",
  },
  { value: "Nanum Gothic", name: "나눔고딕", style: "sans-serif" },
  {
    value: "NanumSquare Neo",
    name: "나눔스퀘어 네오",
    style: "sans-serif",
  },
  {
    value: "Noto Sans KR",
    name: "Noto Sans Korean",
    style: "sans-serif",
  },
  {
    value: "Pretendard Variable",
    name: "Pretendard",
    style: "sans-serif",
  },
  {
    value: "Spoqa Han Sans Neo",
    name: "스포카 한 산스 네오",
    style: "sans-serif",
  },
  { value: "MaruBuri", name: "마루 부리", style: "serif" },
  { value: "Noto Serif KR", name: "Noto Serif Korean", style: "serif" },
  { value: "RIDIBatang", name: "리디바탕", style: "serif" },
];
