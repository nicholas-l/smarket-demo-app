import React, { memo, useMemo } from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import List from "@mui/material/List";
import RowRender from "./RowRender";
import { SmarketsEventType } from "./SmarketsEvent";

interface EventListProps {
  isItemLoaded(index: number): boolean;
  itemCount: number;
  events: ReadonlyArray<SmarketsEventType>;
  loadMoreItems(): Promise<any> | null;
}

export default memo(function EventList({
  isItemLoaded,
  itemCount,
  loadMoreItems,
  events
}: EventListProps) {
  // Memoise data for each of the rows.
  const data = useMemo(
    () => ({
      items: events,
      isItemLoaded
    }),
    [events, isItemLoaded]
  );
  return (
    <List style={{ flex: "auto" }}>
      <AutoSizer disableWidth>
        {({ height }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={height}
                width="100%"
                itemSize={72}
                itemData={data}
              >
                {RowRender}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </List>
  );
});
