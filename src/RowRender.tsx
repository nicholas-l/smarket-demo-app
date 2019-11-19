import React, { memo } from "react";
import SmarketsEvent, { SmarketsEventType } from "./SmarketsEvent";

interface RowRenderProps {
  index: number;
  style: Object;
  data: {
    items: ReadonlyArray<SmarketsEventType>;
    isItemLoaded(index: number): boolean;
  };
}

export default memo(function RowRender({
  index,
  style,
  data: { items, isItemLoaded }
}: RowRenderProps) {
  if (!isItemLoaded(index)) {
    return <div style={style}>Loading...</div>;
  }
  return (
    <div style={style}>
      <SmarketsEvent key={items[index].id} event={items[index]} />
    </div>
  );
});
