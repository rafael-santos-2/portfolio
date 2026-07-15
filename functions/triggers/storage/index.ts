// IMPORTS
// ---------------------------------------------------------------------------------------
import * as logger from "firebase-functions/logger";
import path from "path";

import { STORAGE_DEV , THUMBNAIL_SIZE } from "../../config/global";
import { onObjectFinalized, StorageEvent } from "firebase-functions/storage";
import { getStorage } from "firebase-admin/storage";
import { compress_file , resize_file } from "../../utils/file";
// ---------------------------------------------------------------------------------------




// ON UPLOAD FILE
// ---------------------------------------------------------------------------------------
async function handle_upload_file(event: StorageEvent) {
  try {

    const BUCKET = event.bucket;
    const PATH = event.data.name;
    const FILENAME = path.basename(PATH);
    const TYPE = event.data.contentType;
    const STORAGE = getStorage().bucket(BUCKET);
    const METADATA = event.data.metadata;


    // Check file is image
    // ************************************************************************************
    if( !TYPE || !TYPE.includes("image/") ){ return }
    // ************************************************************************************
    

    // ************************************************************************************
    try {
      
      // Retrieve file
      // ************************************************************************************
      logger.info("New image file uploaded");
      const FILE = await STORAGE.file(PATH).download();
      let BUFFER = FILE[0];
      // ************************************************************************************


      // Compress file & override
      // ************************************************************************************
      try {
        
        logger.info("Compressing and overriding.");
        BUFFER = await compress_file(BUFFER);
        await STORAGE.file(PATH).save( BUFFER, { contentType:TYPE , metadata:{ ...METADATA } });

      } catch (error) {

        logger.warn("Coudln't compress thumbnail file." , error)
        
      }
      // ************************************************************************************

      
      // Create default thumbnail
      // ************************************************************************************
      try {

        logger.info("Creating thumbnail.");
        const BUFFER_THUMBNAIL = await resize_file( BUFFER , THUMBNAIL_SIZE);
        const EXT = path.extname(FILENAME);
        const BASENAME = path.basename(FILENAME, EXT);
        const DIR = path.dirname(PATH);
        const THUMBNAIL_PATH = `${DIR}/${BASENAME}_thumbnail${EXT}`;
        await STORAGE.file(THUMBNAIL_PATH).save( BUFFER_THUMBNAIL, { contentType:TYPE , metadata:{ ...METADATA } });

      } catch (error) {
        
        logger.warn("Coudln't create thumbnail file." , error)

      }
      // ************************************************************************************

  
    } catch (error) {

      throw error;

    }
    // ************************************************************************************


  } catch (error) {

    logger.error("Error in trigger image file upload:", error);
    return;

  }

}



// ---------------------------------------------------------------------------------------
export const onUpload_file_development = onObjectFinalized( { bucket:STORAGE_DEV , memory:"4GiB" } , handle_upload_file );
// ---------------------------------------------------------------------------------------
