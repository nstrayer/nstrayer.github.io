declare module '*.csv' {
  const content: any[];
  export default content;
}

declare module '*.csv?raw' {
  const content: string;
  export default content;
}