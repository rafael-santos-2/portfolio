import { FileRejection } from "react-dropzone";
import { ListRoot } from "./upload-rejection-files-styles";

export type TRejectionFilesProps = React.ComponentProps<typeof ListRoot> & {
  files?: readonly FileRejection[];
};