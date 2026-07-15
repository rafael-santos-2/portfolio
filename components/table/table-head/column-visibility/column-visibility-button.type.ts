import type { TUseColumnVisibilityReturn } from "../use-column-visibility";

export type TColumnVisibilityButtonProps = Pick<TUseColumnVisibilityReturn, "allCells" | "isVisible" | "toggleColumn">;
