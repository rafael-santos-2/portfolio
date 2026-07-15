// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { Tooltip, Typography } from '@mui/material';
import { IHeader } from './header.type';
import { useRouter } from 'next/navigation';
import { Popover , IconButton , Icon , Loader} from '@/components';
import { useId, useState } from 'react';

import css from './header.module.css';
// ----------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------
export default function Header({ children , title, icon, actions = [], back }: IHeader) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const ID = useId();
  const ROUTER = useRouter();

  const has_actions = actions && actions.length > 0;
  const has_to_many_actions = has_actions && actions.filter(a => !a.fix).length > 0;
  const visible_actions = actions?.filter(a => a.fix) || [];
  const hidden_actions = (has_to_many_actions && actions?.filter(a => !a.fix)) || [];
  // ----------------------------------------------------------------------------------------------------




  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ anchor , set_anchor ] = useState<HTMLButtonElement|null>(null);
  // ----------------------------------------------------------------------------------------------------



  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleBack(): void {
    if (typeof back === 'string') {
      ROUTER.push(back);
    } else {
      ROUTER.back();
    }
  }
  // ----------------------------------------------------------------------------------------------------



  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div key={ID} className={css.header}>

      <div className={css.left}>

        {back && (
          <IconButton onClick={handleBack}>
            <Icon name="chevron" direction="left" />
          </IconButton>
        )}

        {icon && <span className={css.icon}>{icon}</span>}

        <Typography variant="h6" className={css.title}>{title}</Typography>

      </div>

      <div className={css.right}>

        {/* OTHERS (children) */}
        { children }

        {/* VISIBLE ACTIONS */}
        { visible_actions.map(({ label , color , fix , className , icon , iconPlacement , loading , shape , variant , disabled , ...props }, i) => (
          <Tooltip key={`${ID}-header-action-${i}`} title={ shape === "icon" ? label : null} >
            <button className={[ css.header_button , css[variant || "contained"] , css[`color-${color || "primary"}`] , css[`shape-${shape || "button"}`] ].join(" ")} disabled={loading || disabled} {...props} >
              
              { !loading && iconPlacement !== "right" && icon }
              { loading && iconPlacement !== "right" &&  <Loader variant="circle" /> }
              
              { shape !== "icon" && label }

              { !loading && iconPlacement === "right" && icon }
              { loading && iconPlacement === "right" &&  <Loader variant="circle" /> }

              {/* { loading && <Loader variant={ shape === "icon" ? "circle" : "default" } /> } */}

            </button>
          </Tooltip>
        ))}

        {/* MORE BUTTON */}
        { has_to_many_actions && 
          <button className={[css.header_button , css["shape-icon"]].join(" ")} onClick={(e) => set_anchor(e.currentTarget)} >
            <Icon name="dots-more" direction='vertical' />
          </button>
        }

        {/* MENU */}
        <Popover
          open={Boolean(anchor)}
          onClose={() => set_anchor(null)}
          anchorEl={anchor}
          anchorOrigin={{horizontal:"right" , vertical:"top"}}
          transformOrigin={{horizontal:"right" , vertical:"top"}}
          slotProps={{ paper:{sx:{padding:0 , width:140}} }}
        >
          <div className={css.header_menu}>

            { hidden_actions.map(({ label , color , fix , className , icon , iconPlacement , loading , shape , variant , disabled , ...props }, i) => (
              <button key={`${ID}-header-hidden-action-menu-${i}`} className={[ css.header_button , css[variant || "contained"] , css[`color-${color || "primary"}`] , css[`shape-button`] ].join(" ")} disabled={loading || disabled} {...props} >
                
                { !loading && iconPlacement !== "right" && icon }
                { !loading && label }
                { !loading && iconPlacement === "right" && icon }

                { loading && <Loader variant="default" /> }

              </button>
            ))}

          </div>

        </Popover>

      </div>

    </div>

  )


}