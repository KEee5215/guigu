// src/types/nprogress.d.ts
declare module 'nprogress' {
  const nprogress: {
    start(): void
    done(): void
    configure(options: Record<string, any>): void
  }
  export default nprogress
}
