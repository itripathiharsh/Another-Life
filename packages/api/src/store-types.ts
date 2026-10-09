// Store types and interfaces decoupled from Node.js (for browser/offline compatibility).

export class StoreError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export interface SaveStore {
  save(id: string, snapshotJson: string): void;
  load(id: string): string;
  exists(id: string): boolean;
  list(): string[];
  remove(id: string): void;
}
