// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { create_classes } from "@/providers/theme/create-classes";


// CLASSES
// ----------------------------------------------------------------------------------------------------

export const chartClasses = {
  root: create_classes("chart__root"),
  loading: create_classes("chart__loading"),
  select: create_classes("chart__select"),
  legends: {
    root: create_classes("chart__legends__root"),
    item: {
      wrap: create_classes("chart__legends__item__wrap"),
      root: create_classes("chart__legends__item__root"),
      dot: create_classes("chart__legends__item__dot"),
      icon: create_classes("chart__legends__item__icon"),
      label: create_classes("chart__legends__item__label"),
      value: create_classes("chart__legends__item__value"),
    },
  },
};
