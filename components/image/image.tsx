// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { forwardRef, startTransition, useCallback, useRef, useState } from "react"
import { DEFAULT_DELAY, DEFAULT_EFFECT, TImageProps } from "./image.type"
import { ImageImg, ImageOverlay, ImagePlaceholder, ImageRoot } from "./styles";
import { mergeClasses, mergeRefs } from "minimal-shared/utils";
import { imageClasses } from "./classes";
import { useInView } from "framer-motion";


export const Image = forwardRef<HTMLSpanElement, TImageProps>((props, ref) => {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const {
    sx,
    src,
    ratio,
    onLoad,
    effect,
    alt = '',
    slotProps,
    className,
    viewportOptions,
    disablePlaceholder,
    visibleByDefault = false,
    delayTime = DEFAULT_DELAY,
    ...other
  } = props;

  const localRef = useRef<HTMLSpanElement | null>(null);

  const finalEffect = {
    ...DEFAULT_EFFECT,
    ...effect,
  };

  const isInView = useInView(localRef, { once: true, ...viewportOptions });

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [isLoaded, setIsLoaded] = useState(false);

  const shouldRenderImage = visibleByDefault || isInView;
  const showPlaceholder = !visibleByDefault && !isLoaded && !disablePlaceholder;
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const handleImageLoad = useCallback(() => {
    const timer = setTimeout(() => {
      startTransition(() => { setIsLoaded(true); onLoad?.(); });
    }, delayTime);

    return (): void => clearTimeout(timer);
  }, [delayTime, onLoad]);
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <ImageRoot
      ref={mergeRefs([localRef, ref])}
      effect={visibleByDefault || finalEffect.disabled ? undefined : finalEffect}
      className={mergeClasses([imageClasses.root, className], {
        [imageClasses.state.loaded]: !visibleByDefault && isLoaded,
      })}
      sx={[
        {
          '--aspect-ratio': ratio,
          ...(!!ratio && { width: 1 }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >

      {slotProps?.overlay && (
        <ImageOverlay className={imageClasses.overlay} {...slotProps.overlay} />
      )}

      {showPlaceholder && (
        <ImagePlaceholder className={imageClasses.placeholder} {...slotProps?.placeholder} />
      )}

      {shouldRenderImage && (
        <ImageImg src={src} alt={alt} onLoad={handleImageLoad} className={imageClasses.img} {...slotProps?.img} />
      )}

    </ImageRoot>

  )


})

Image.displayName = "Image";