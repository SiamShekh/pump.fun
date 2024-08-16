// global.d.ts
export {};

declare global {
  interface Window {
    solana: any; // You can replace 'any' with a more specific type if you have one
  }
}
