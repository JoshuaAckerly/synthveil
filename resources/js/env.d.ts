/// <reference types="vite/client" />

declare interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    // add other env vars here as needed
}

declare interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob(pattern: string): Record<string, () => Promise<unknown>>;
}
