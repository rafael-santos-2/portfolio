import { UseInViewOptions } from "framer-motion";
import { ImageImg, ImageOverlay, ImagePlaceholder, ImageRoot, TEffectsType } from "./styles";
import { Breakpoint } from "@mui/system";

type TAspectRatioType =
  | '2/3'
  | '3/2'
  | '4/3'
  | '3/4'
  | '6/4'
  | '4/6'
  | '16/9'
  | '9/16'
  | '21/9'
  | '9/21'
  | '1/1'
  | string;

export type TImageProps = React.ComponentProps<typeof ImageRoot> & {
  src?: string;
  alt?: string;
  delayTime?: number;
  onLoad?: () => void;
  effect?: TEffectsType;
  visibleByDefault?: boolean;
  disablePlaceholder?: boolean;
  viewportOptions?: UseInViewOptions;
  ratio?: TAspectRatioType | Partial<Record<Breakpoint, TAspectRatioType>>;
  slotProps?: {
    img?: Omit<React.ComponentProps<typeof ImageImg>, 'src' | 'alt'>;
    overlay?: React.ComponentProps<typeof ImageOverlay>;
    placeholder?: React.ComponentProps<typeof ImagePlaceholder>;
  };
};

export const DEFAULT_DELAY = 0;

export const DEFAULT_EFFECT: TEffectsType = {
  style: 'blur',
  duration: 300,
  disabled: false,
};