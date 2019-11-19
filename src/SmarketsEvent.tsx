import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export type SmarketsEventType = {
  id: string;
  bettable: boolean;
  chart_time_period: string;
  created: string;
  description: string | null;
  display_order: number;
  end_date: string;
  full_slug: string;
  hidden: boolean;
  inplay_enabled: boolean;
  modified: string;
  name: string;
  parent_id: number;
  short_name: string | null;
  slug: string;
  special_rules: string;
  start_date: string;
  start_datetime: string;
  state:
    | "new" // Not sure why "new"?
    | "upcoming"
    | "live"
    | "ended"
    | "settled"
    | "cancelled"
    | "suspended";
};

interface SmarketsEventProps {
  event: SmarketsEventType;
}

export default function SmarketsEvent({ event }: SmarketsEventProps) {
  return (
    <ListItem>
      <ListItemText primary={event.name} secondary={event.state} />
    </ListItem>
  );
}
