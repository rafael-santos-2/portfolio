// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRejectionFilesProps } from "./upload-rejection-files.type";
import { mergeClasses } from "minimal-shared/utils";
import { uploadClasses } from "../../classes";
import { file_data, format_data } from "@/utils/file";
import { ItemCaption, ItemTitle, ListItem, ListRoot } from "./upload-rejection-files-styles";


export default function UploadRejectionFiles({ files, sx, className, ...other }: TRejectionFilesProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <ListRoot className={mergeClasses([uploadClasses.uploadRejectionFiles, className])} sx={sx} {...other} >
      {files?.map(({ file, errors }) => {
        const { path, size } = file_data(file);

        return (
          <ListItem key={path}>
            <ItemTitle>
              {path} - {size ? format_data(size) : ''}
            </ItemTitle>

            {errors.map((error) => (
              <ItemCaption key={error.code}>- {error.message}</ItemCaption>
            ))}
          </ListItem>
        );
      })}
    </ListRoot>

  )


}