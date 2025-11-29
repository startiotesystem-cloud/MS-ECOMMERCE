export abstract class IStorageService {
  abstract upload(buffer: Buffer, fileName: string, mime: string): Promise<string>;
}
