/**
 * A telegram sticker
 */
export class Sticker {
  public fileId: string;

  /**
   * Constructs a sticker
   * @param {string} fileId - The telegram sticker’s file_id
   */
  constructor(fileId: string) {
    this.fileId = fileId;
  }
}
