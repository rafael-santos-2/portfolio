import { cloneElement, useCallback } from "react";
import { usePopups } from "@/providers/popups/context-popups";

/**
 * Imperative async popup hook.
 *
 * Pass the popup JSX element (without open/onClose) at call-site:
 *   const login = usePopup(<Popup_login />);
 *
 * Then open it from any async function and await the response:
 *   const ok = await login.open();
 *
 * Optionally pass title/description at open-time to override the element's props:
 *   const ok = await login.open({ title: "Confirm", description: "Are you sure?" });
 *
 * The component is enqueued into Provider_popups which renders it inside
 * the main React tree — all contexts (theme, i18n, auth, ...) are available.
 */
export function usePopup<TResult = unknown>(element: React.ReactElement) {

  const { enqueue } = usePopups();

  const open = useCallback(( { title, description }: { title?: string; description?: string } = {} ): Promise<TResult> => {
    const el = (title !== undefined || description !== undefined)
      ? cloneElement(element, { ...(title !== undefined && { title }), ...(description !== undefined && { description }) })
      : element;
    return enqueue(el) as Promise<TResult>;
  }, [element, enqueue]);

  return { open };

}
