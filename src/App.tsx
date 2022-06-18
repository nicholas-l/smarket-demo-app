import React, { useEffect, useState, useCallback } from "react";
import {
  createTheme,
  styled,
  ThemeProvider,
} from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

import "./App.css";
import AppBar from "./AppBar";
import { SmarketsEventType } from "./SmarketsEvent";
import Select from "./Select";
import EventList from "./EventList";

import { EVENT_TYPES, EVENT_STATES, DEFAULT_TYPE } from "./data";

const DEFAULT_STATE = "upcoming";

type EventsResponse = {
  events: Array<SmarketsEventType>;
  pagination: {
    next_page: string;
  };
};

const StyledSelect = styled(Select)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  flex: "auto",
}));


const StyledDiv = styled('div')(({ theme }) => ({
  display: "flex",
}));


export function App() {
  const [eventType, setEventType] = useState<string>(DEFAULT_TYPE);
  const [events, setEvents] = useState<Array<SmarketsEventType>>([]);
  const [hasNextPage, setNextPage] = useState<string | null>(null);
  const [eventState, setEventState] = useState(DEFAULT_STATE);

  // Allows aborting the fetch in flight.
  let controller: AbortController | null = null;

  const handleEventChange = useCallback(
    (event) => {
      setEventType(event.target.value);
    },
    [setEventType]
  );

  const handleEventStateChange = useCallback(
    (event) => {
      setEventState(event.target.value);
    },
    [setEventState]
  );

  /**
   * Fetches the data from the API, currently proxied by yarn start
   */
  async function fetchEvents(
    url: string,
    events: Array<SmarketsEventType> = []
  ) {
    controller = new AbortController();
    const signal = controller.signal;
    const res = await fetch(url, { signal });
    const {
      events: moreEvents,
      pagination: { next_page },
    }: EventsResponse = await res.json();
    controller = null;
    moreEvents.sort((a, b) => a.display_order - b.display_order);
    setEvents([...events, ...moreEvents]);
    setNextPage(next_page);
  }

  // When changing event types or state, refetch the events
  useEffect(() => {
    fetchEvents(`/v3/events/?state=${eventState}&type=${eventType}`);
    return () => {
      // Abort request if in flight
      if (controller) {
        controller.abort();
      }
      setEvents([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType, eventState]);

  // Function callback that checks if the
  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < events.length,
    [hasNextPage, events]
  );
  const itemCount = hasNextPage ? events.length + 1 : events.length;

  const loadMoreItems = useCallback(
    function loadMoreItems() {
      // If we are already loading (controller) or there is no next page
      if (controller !== null || hasNextPage == null) {
        return null;
      }
      return fetchEvents(`/v3/events/${hasNextPage}`, events);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasNextPage, events]
  );

  return (
    <div className="App">
      <AppBar />
      <StyledDiv>
        <StyledSelect
          id="type-select"
          title="Event Type"
          value={eventType}
          onChange={handleEventChange}
          values={EVENT_TYPES}
          helper="Select event type to filter"
        />
        <StyledSelect
          id="state-select"
          title="Event State"
          value={eventState}
          onChange={handleEventStateChange}
          values={EVENT_STATES}
          helper="Select event state to filter"
        />
      </StyledDiv>
      <Divider />
      <div style={{ flex: "auto", display: "flex" }}>
        <EventList
          events={events}
          loadMoreItems={loadMoreItems}
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
        />
      </div>
    </div>
  );
}

const theme = createTheme();

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
