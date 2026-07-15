"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Calendar from "@/components/calendar/calendar";
import { Popup, Popup_header } from "@/components/popup";
import Popup_confirm from "@/components/confirm/popup-confirm";
import { useCalendar } from "@/hooks/use-calendar";
import type { TCalendarEvent } from "@/hooks/use-calendar";

export default function TestPage() {
  const {
    view,
    date,
    events,
    loading,
    onChangeView,
    onToday,
    onPrev,
    onNext,
    onAddEvent,
    onUpdateEvent,
    onDeleteEvent,
  } = useCalendar({
    events: [],
  });

  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [pendingDate, setPendingDate] = useState<Date | null>(null);
  const [pendingAllDay, setPendingAllDay] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TCalendarEvent | null>(null);

  const handleSlotClick = (selectedDate: Date, allDay?: boolean) => {
    setPendingDate(selectedDate);
    setPendingAllDay(!!allDay);
    setNewTitle("");
    setOpenAddPopup(true);
  };

  const handleCreateEvent = () => {
    if (!pendingDate || !newTitle.trim()) return;

    const start = new Date(pendingDate);
    const end = new Date(pendingDate);

    if (pendingAllDay) {
      end.setDate(end.getDate() + 1);
    } else {
      end.setHours(end.getHours() + 1);
    }

    const newEvent: TCalendarEvent = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      start,
      end,
      allDay: pendingAllDay,
      color: "primary",
      category: "manual",
      description: "Handmatig toegevoegd event",
    };

    onAddEvent(newEvent);
    setOpenAddPopup(false);
    setPendingDate(null);
    setNewTitle("");
  };

  const handleEventClick = (event: TCalendarEvent) => {
    setSelectedEvent(event);
    setOpenDeletePopup(true);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    onDeleteEvent(selectedEvent.id);
    setOpenDeletePopup(false);
    setSelectedEvent(null);
  };

  const handleEventDrop = (event: TCalendarEvent, newStart: Date, newEnd?: Date) => {
    onUpdateEvent({
      ...event,
      start: newStart,
      end: newEnd,
    });
  };

  const handleEventResize = (event: TCalendarEvent, newStart: Date, newEnd: Date) => {
    onUpdateEvent({
      ...event,
      start: newStart,
      end: newEnd,
    });
  };

  return (
    <div>
      <p>Hier kan je events toevoegen, verslepen, aanpassen en verwijderen.</p>

      <Calendar
        events={events}
        view={view}
        date={date}
        loading={loading}
        onChangeView={onChangeView}
        onToday={onToday}
        onPrev={onPrev}
        onNext={onNext}
        onSlotClick={handleSlotClick}
        onEventClick={handleEventClick}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        categories={["manual"]}
      />

      <Popup
        open={openAddPopup}
        onClose={() => setOpenAddPopup(false)}
        style={{ width: 440 }}
        position={{
          horizontal: { desktop: "center", mobile: "center" },
          vertical: { desktop: "center", mobile: "bottom" },
        }}
      >
        <Popup_header title="Nieuw event toevoegen" />

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField
            label="Titel"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            autoFocus
          />

          <div style={{ display: "flex", gap: 12 }}>
            <Button fullWidth variant="outlined" color="inherit" onClick={() => setOpenAddPopup(false)}>
              Annuleren
            </Button>
            <Button fullWidth variant="contained" onClick={handleCreateEvent} disabled={!newTitle.trim()}>
              Opslaan
            </Button>
          </div>
        </div>
      </Popup>

      <Popup_confirm
        open={openDeletePopup && !!selectedEvent}
        title="Evenement verwijderen"
        description={`Weet je zeker dat je "${selectedEvent?.title}" wilt verwijderen?`}
        confirm={{ label: "Verwijderen", color: "error" }}
        onClose={(confirmed) => {
          if (confirmed) handleDeleteEvent();
          setOpenDeletePopup(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
}