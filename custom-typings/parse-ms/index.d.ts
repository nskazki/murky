declare module 'parse-ms' {
  function parseMs(ms: number): {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
  };
  export = parseMs;
}
