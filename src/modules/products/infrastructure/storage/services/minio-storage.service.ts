import { Injectable } from "@nestjs/common";
import { IStorageService } from "../../../domain/repositories/services/storage.sevice";
import * as Minio from "minio";

@Injectable()
export class MinioStorageService implements IStorageService {
  private client: Minio.Client;

  constructor() {
    const endPoint = process.env.MINIO_ENDPOINT;
    const port = process.env.MINIO_PORT;
    const accessKey = process.env.MINIO_ACCESS_KEY;
    const secretKey = process.env.MINIO_SECRET_KEY;

    if (!endPoint || !port || !accessKey || !secretKey) {
      throw new Error("Faltan variables de entorno para configurar MinIO.");
    }

    this.client = new Minio.Client({
      endPoint,
      port: Number(port),
      useSSL: false,
      accessKey,
      secretKey,
    });
  }

  async upload(buffer: Buffer, fileName: string, mime: string): Promise<string> {
    const bucket = process.env.MINIO_BUCKET;
    const publicUrl = process.env.MINIO_PUBLIC_URL;

    if (!bucket) {
      throw new Error("MINIO_BUCKET no está definido.");
    }

    if (!publicUrl) {
      throw new Error("MINIO_PUBLIC_URL no está definido.");
    }

await this.client.putObject(
  bucket,
  fileName,
  buffer,
  buffer.length,
  { "Content-Type": mime },
);


    return `${publicUrl}/${bucket}/${fileName}`;
  }
}
