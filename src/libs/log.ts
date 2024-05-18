/**
 * 로그 출력을 위한 객체입니다.
 */
export const log = {
  info: (message?: any, ...optionalParams: any[]) => {
    console.log("%c[MKRF]", "color: #4c80f1", message, ...optionalParams);
  },
};
