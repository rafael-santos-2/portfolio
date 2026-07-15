import sharp, { FormatEnum } from "sharp";

/**
 * Compress an image buffer while preserving its original format.
 *
 * @param buffer The input image buffer
 * @param quality Compression quality 1–100 (default 80). Lower = smaller file.
 * @returns Compressed buffer in the same format as the input
 */
export async function compress_file( buffer:Buffer , quality = 80 ):Promise<Buffer>{

  const { format } = await sharp(buffer).metadata();

  switch (format) {
    case "jpeg":
      return sharp(buffer).jpeg({ quality }).toBuffer();
    case "png":
      return sharp(buffer).png({ quality }).toBuffer();
    case "webp":
      return sharp(buffer).webp({ quality }).toBuffer();
    case "avif":
      return sharp(buffer).avif({ quality }).toBuffer();
    case "gif":
      return sharp(buffer).gif().toBuffer();
    default:
      return sharp(buffer).toBuffer();
  }

}

/**
 * 
 * @param buffer The input buffer of the image
 * @param size The size you want the image to have (width)
 * @returns Buffer that has been resized.
 */
export async function resize_file( buffer:Buffer , size:number ):Promise<Buffer> {

  return sharp(buffer).resize({ width:size }).toBuffer();

}

/**
 * Convert a file
 * 
 * @param buffer The input buffer of the image
 * @param extension Image extension that sharp supports
 * @param options Sharp options for the format
 * @returns Buffer that has been converted.
 */
export async function convert_file( buffer:Buffer , extension:keyof FormatEnum , options: sharp.OutputOptions | sharp.JpegOptions | sharp.PngOptions | sharp.WebpOptions | sharp.AvifOptions | sharp.HeifOptions | sharp.JxlOptions | sharp.GifOptions | sharp.Jp2Options | sharp.RawOptions | sharp.TiffOptions ):Promise<Buffer> {

  return await sharp(buffer).toFormat(extension , options).toBuffer();

}