'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { createPortal } from 'react-dom';
import { useRef, useLayoutEffect, useId, JSX, useState } from 'react';
import { DEFAULT_STACK_OFFSET, IPopup, IPopupHeader, MAX_VISIBLE_ACTIONS_IN_HEADER, TPopupPositionX, TPopupPositionY } from './popup.type';
import { usePopups } from '@/providers/popups/context-popups';
import { useApp } from '@/providers/app/context-app';
import { PopupContext, usePopupContext } from './context-popup';
import Icon from '@/components/icon';

import css from './popup.module.css';
import Loader from '../loader/loader';
import { Popover } from '@/components/popover';
import { Tooltip } from '@mui/material';
// ----------------------------------------------------------------------------------------------------




// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function Popup({

  children,
  open=false,
  onClose= () => {},
  style,

  variant = 'default',
  position,
  overlay,

  // POPOVER PROPS
  target,
  anchorOrigin,
  transformOrigin,
  anchorPosition,

  offset = DEFAULT_STACK_OFFSET,
  animation,
  onClosed,

  ...props

}: IPopup): JSX.Element|null {




  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const ID = useId();
  const REF_POPUP = useRef<HTMLDivElement>(null);
  const POPUPS = usePopups();
  const APP = useApp();
  const LEVEL = Math.max( POPUPS.stack.findIndex( p => p.id === ID ) , 0 );
  const PARENT = POPUPS.stack.at(LEVEL + 1) || null;
  const CHILD = POPUPS.stack.at(LEVEL - 1) || null;
  // ----------------------------------------------------------------------------------------------------



  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ transform, set_transform ] = useState<string>("0px 0px");
  const [ closing, set_closing ] = useState(false);
  const [ visible, set_visible ] = useState(false);
  // ----------------------------------------------------------------------------------------------------



  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handle_close(event: React.MouseEvent<HTMLDivElement, MouseEvent>){

    if(
      REF_POPUP.current &&
      REF_POPUP.current.parentNode === event.target
    ){
      onClose();
    }

  }
  function calculate_offset( direction:"horizontal"|"vertical" ):number {

    const parent_width = CHILD?.getBoundingClientRect()?.width || 0;
    const parent_height = CHILD?.getBoundingClientRect()?.height || 0;

    let result = 0;

    if( direction === "horizontal" ){
      result = Math.round( (Math.max( 0 , parent_width - offset ) * LEVEL) * 100 ) / 100;
    }
    if( direction === "vertical" ){
      const offset_vertical = (APP.size_screen === "sm" && REF_POPUP.current) ? Math.max( REF_POPUP.current.getBoundingClientRect().height - offset , 0 ) : offset;
      result = Math.round( (Math.max( 0 , parent_height - offset_vertical  ) * LEVEL) * 100 ) / 100;
    }

    return result;

  }
  function get_position(): { horizontal: TPopupPositionX , vertical: TPopupPositionY } {

    // Default positions
    let pos_hor:TPopupPositionX = (APP.size_screen === "sm" ? "center" : "right");
    let pos_ver:TPopupPositionY = (APP.size_screen === "sm" ? "bottom" : "top");

    // No position provided
    if( !position ) return { horizontal: pos_hor , vertical: pos_ver };

    // Position specified
    if( position ){

      // Not responsive
      if( typeof position.horizontal === "string" ){ pos_hor = position.horizontal; }
      if( typeof position.vertical === "string" ){ pos_ver = position.vertical; }

      // Responsive horizontal
      if( typeof position.horizontal === "object" ){ 

        pos_hor = (APP.size_screen === "sm") ? (position.horizontal.mobile || pos_hor) : (position.horizontal.desktop || pos_hor);

      }

      // Responsive vertical
      if( typeof position.vertical === "object" ){ 

        pos_ver = (APP.size_screen === "sm") ? (position.vertical.mobile || pos_ver) : (position.vertical.desktop || pos_ver);

      }

    }

    // const pos_hor:TPopupPositionX = position?.horizontal || (APP.size_screen === "sm" ? "center" : "right");
    // const pos_ver:TPopupPositionY = position?.vertical || (APP.size_screen === "sm" ? "bottom" : "top");
    
    return { horizontal: pos_hor , vertical: pos_ver };

  }
  function handle_animation_end(){
    if( closing ){
      POPUPS.remove(ID);
      set_visible(false);
      set_closing(false);
      onClosed?.();
    }
  }
  // ----------------------------------------------------------------------------------------------------



  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useLayoutEffect(() => {

    if( variant !== "default" ) return;

    if( open ){
      /* eslint-disable react-hooks/set-state-in-effect -- syncing visibility/closing state to the `open` prop for the animation lifecycle */
      set_closing(false);
      set_visible(true);
      if( REF_POPUP.current ) POPUPS.add(REF_POPUP.current);
    } else {
      set_closing(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }

    return () => { POPUPS.remove(ID); };

    // eslint-disable-next-line react-hooks/exhaustive-deps -- POPUPS (singleton registry) and ID (stable useId) are intentionally excluded; effect keys on open/variant
  }, [open, variant ]);

  useLayoutEffect(() => {

    if( REF_POPUP.current ){

      let translate_x = 0;
      let translate_y = 0;
      const {horizontal , vertical} = get_position();

      // HOR LEFT
      if( horizontal === "left" ){ translate_x = calculate_offset("horizontal"); }

      // HOR RIGHT
      if( horizontal === "right" ){ translate_x = -(calculate_offset("horizontal")); }

      // VERT TOP
      if( horizontal === "center" && vertical === "top" ){ translate_y = calculate_offset("vertical"); }

      // VERT BOTTOM
      if( horizontal === "center" && vertical === "bottom" ){ translate_y = -(calculate_offset("vertical")); }

      set_transform(`${translate_x}px ${translate_y}px`);

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- get_position/calculate_offset are per-render helpers; effect intentionally keys on layout inputs only
  },[ APP.size_screen , POPUPS.stack , LEVEL , PARENT , CHILD , offset ]);

    useLayoutEffect(() => {
    if (!open && !visible) return;

    function handle_keydown(event: KeyboardEvent) {
      const IS_TOP_POPUP = LEVEL === POPUPS.stack.length - 1;

      if (event.key === "Escape" && IS_TOP_POPUP) {
        onClose();
      }
    }
    window.addEventListener("keydown", handle_keydown);
    return () => {
      window.removeEventListener("keydown", handle_keydown);
    };
  }, [open, visible, onClose, LEVEL, POPUPS.stack.length]);
  // ----------------------------------------------------------------------------------------------------



  if( open || visible ){
    return (

      <PopupContext.Provider value={{ onClose , id: ID }}>

        { variant === "popover" && target &&
          <Popover
            open={open}
            onClose={onClose}
            anchorEl={target}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            anchorPosition={anchorPosition}
          >
            {children}
          </Popover>
        }

        { variant !== "popover" && createPortal(
          <div
            style={overlay?.style}
            onMouseDown={handle_close}
            className={[
              css.overlay ,
              css[`variant-${variant}`] ,
              css[`pos-${get_position().vertical}-${get_position().horizontal}`],
              (LEVEL === POPUPS.stack.length - 1) ? css["blur"] : "",
              closing ? css["closing"] : "",
            ].join(" ")}
          >

            <div
              id={ID}
              ref={REF_POPUP}
              className={[ css.card , (closing ? css["closing"] : "") , css[`animation-${animation || ( ((get_position().vertical === "center" && get_position().horizontal === "center") || variant === "fullscreen") ? "pop" : "slide" )}`] ].join(" ")}
              style={{
                translate: transform,
                scale: `${LEVEL ? Math.max( 1 - (0.1 * (LEVEL)) , 0.5 ) : "1"}`,
                ...style
              }}
              onAnimationEnd={handle_animation_end}
              {...props}
            >
              {children}
            </div>

          </div>
          , document.body
        )}

      </PopupContext.Provider>

    )
  } else {
    return null
  }

}
// ----------------------------------------------------------------------------------------------------



// HEADER
// ----------------------------------------------------------------------------------------------------
export function Popup_header({ variant="border" , closeable=true , title, subtitle, actions }: IPopupHeader): JSX.Element {


  const { onClose , id } = usePopupContext();


  const has_actions = actions && actions.length > 0;
  const has_to_many_actions = has_actions && actions.filter(a => !a.fix).length > MAX_VISIBLE_ACTIONS_IN_HEADER;
  const visible_actions = actions?.filter(a => a.fix) || [];
  const hidden_actions = (has_to_many_actions && actions?.filter(a => !a.fix)) || [];


  const [ menu_anchor , set_menu_anchor ] = useState<HTMLButtonElement|null>(null);


  return (
    <div className={[ css.header , css[`variant-${variant}`] ].join(" ")}>

      <div className={css.header_text}>
        { title && <span className={css.header_title}>{title}</span> }
        { subtitle && <span className={css.header_subtitle}>{subtitle}</span> }
      </div>

      <div className={css.header_actions}>

        {/* VISIBLE ACTIONS */}
        { visible_actions.map(({ label , color , fix , className , icon , iconPlacement , loading , shape , variant , disabled , ...props }, i) => (
          <Tooltip key={`${id}-header-action-${i}`} title={ shape === "icon" ? label : null} >
            <button className={[ css.header_button , css[variant || "text"] , css[`color-${color || "inherit"}`] , css[`shape-${shape || "icon"}`] ].join(" ")} disabled={loading || disabled} {...props} >
              
              { !loading && iconPlacement !== "right" && icon }
              { !loading && shape !== "icon" && label }
              { !loading && iconPlacement === "right" && icon }

              { loading && <Loader variant={ shape === "icon" ? "circle" : "default" } /> }

            </button>
          </Tooltip>
        ))}


        {/* CLOSE BUTTON */}
        { !has_to_many_actions && closeable && (
          <button className={[css.header_button , css["shape-icon"]].join(" ")} onClick={() => onClose()}>
            <Icon name="close" />
          </button>
        )}

        {/* MORE BUTTON */}
        { has_to_many_actions && 
          <button className={[css.header_button , css["shape-icon"]].join(" ")} onClick={(e) => set_menu_anchor(e.currentTarget)} >
            <Icon name="dots-more" direction='vertical' />
          </button>
        }

        <Popover
          open={Boolean(menu_anchor)}
          onClose={() => set_menu_anchor(null)}
          anchorEl={menu_anchor}
          anchorOrigin={{horizontal:"right" , vertical:"top"}}
          transformOrigin={{horizontal:"right" , vertical:"top"}}
          slotProps={{ paper:{sx:{padding:0 , width:140}} }}
        >
          <div className={css.header_menu}>

            { hidden_actions.map(({ label , color , fix , className , icon , iconPlacement , loading , shape , variant , disabled , ...props }, i) => (
              <button key={`${id}-header-hidden-action-menu-${i}`} className={[ css.header_button , css[variant || "text"] , css[`color-${color || "inherit"}`] , css[`shape-button`] ].join(" ")} disabled={loading || disabled} {...props} >
                
                { !loading && iconPlacement !== "right" && icon }
                { !loading && label }
                { !loading && iconPlacement === "right" && icon }

                { loading && <Loader variant="default" /> }

              </button>
            ))}

          </div>
          
          
          { closeable && 
            <>
              <div className={css.divider} />
              <div className={css.header_menu}>

                <button className={[css.header_button , css["shape-button"] , css[`color-error`]].join(" ")} onClick={() => { set_menu_anchor(null); onClose(); }}>
                  <Icon name="close" />
                  Close
                </button>

              </div>
            </>
          }


        </Popover>

      </div>

    </div>
  );

}
// ----------------------------------------------------------------------------------------------------
