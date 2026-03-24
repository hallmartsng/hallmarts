import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { Calendar, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";

// ---- TYPES ----
type EventType = "campus" | "vendor" | "hallmarts";
type EventStatus = "approved" | "pending" | "processing";

type Event = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  status: EventStatus;
  campus: string;
};
// ---- DUMMY DATA ----
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Exams Begin",
    date: "2026-04-10",
    type: "campus",
    status: "approved",
    campus: "University of Benue",
  },
  {
    id: 2,
    title: "Flash Sale - Sneakers",
    date: "2026-04-10",
    type: "vendor",
    status: "pending",
    campus: "University of Ilorin",
  },
  {
    id: 3,
    title: "Campus Pop-Up Market",
    date: "2026-04-12",
    type: "hallmarts",
    status: "approved",
    campus: "Bells University",
  },
  {
    id: 3,
    title: "Black friday",
    date: "2026-04-17",
    type: "hallmarts",
    status: "processing",
    campus: "Landmark university",
  },
];

// ---- COLOR MAP ----
const getDotColor = (type: EventType, status: EventStatus) => {
  if (status === "pending") return "bg-yellow-400";
  if (status === "approved") return "bg-green-500";
  if (status === "processing") return "bg-blue-500";
};

const CampusCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filterBy, setFilterBy] = useState<"all" | EventType>("all");
  const [previewEvent, setPreviewEvent] = useState<Event>(events[0]);
  const filters = [
    { key: "", label: "All Events" },
    { key: "campus", label: "Campus" },
    { key: "vendor_events", label: "My Events" },
    { key: "hallmarts", label: "Hallmarts" },
  ];
  // ---- FILTER EVENTS ----
  const filteredEvents =
    filterBy === "all" ? events : events.filter((e) => e.type === filterBy);

  // ---- EVENTS FOR SELECTED DATE ----
  const selectedEvents = filteredEvents.filter((e) => e.date === selectedDate);

  //   const eventDates = new Set(events.map((e) => e.date));
  return (
    <section className="flex sm:flex-row flex-col items-start gap-4">
      {/* LEFT PANEL */}
      <div className="w-full sm:w-auto">
        <div className="mb-4">
          <Select
            className="w-[160px] capitalize"
            defaultSelectedKeys={["all"]}
            aria-label="Filter sales chart"
            items={filters}
            selectedKeys={[filterBy]}
            startContent={"Filter:"}
            onChange={(e) => setFilterBy(e.target.value as EventType)}
          >
            {filters.map((filter) => (
              <SelectItem key={filter.key} className=" capitalize">
                {filter.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        {/* CALENDAR */}
        <Calendar
          aria-label="Campus Calendar"
          onChange={(date: any) => {
            // convert to YYYY-MM-DD
            const d = new Date(date);
            const formatted = d.toISOString().split("T")[0];
            setSelectedDate(formatted);
          }}
          //   className="w-full"
          //   calendarWidth={300}
          visibleMonths={2}
        />
      </div>
      {/* MIDDLE PANEL */}
      <div className="w-full sm:mt-14">
        <div className="sm:w-80  w-full bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">
            {selectedDate || "Select a date"}
          </h3>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-gray-500">No events for this day.</p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <button
                  key={event.id}
                  className="border border-primary-50 rounded-lg w-full p-3 flex flex-col items-start gap-1"
                  onClick={() => setPreviewEvent(event)}
                >
                  <div className="flex justify-between w-full items-center">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <span
                      className={`w-2 h-2 rounded-full ${getDotColor(
                        event.type,
                        event.status,
                      )}`}
                    />
                  </div>

                  <span className="text-xs text-gray-500 capitalize">
                    {event.type} (host)
                  </span>

                  <span
                    className={`text-xs ${
                      event.status === "approved"
                        ? "text-green-600"
                        : event.status === "processing"
                          ? "text-blue-600"
                          : "text-yellow-500"
                    }`}
                  >
                    {event.status === "approved"
                      ? "Approved"
                      : event.status === "processing"
                        ? "Processing"
                        : "Pending Approval"}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* INSIGHT */}
          <div className="mt-6 text-sm bg-red-50 p-3 rounded-lg">
            🔥 Peak sales time: 6PM – 9PM
          </div>
        </div>
        {/* EVENT DOTS LEGEND */}
        <div className="flex gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
            Processing
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Approved
          </span>
        </div>
      </div>
      {/* RIGHT PANEL */}
      <div className="w-full mt-10 sm:mt-14 flex flex-col gap-4">
        <h1 className="font-semibold flex items-start gap-1 sm:bg-white rounded-lg sm:shadow sm:p-3">
          Event Details
        </h1>
        <div className="bg-white text-sm rounded-lg shadow p-3 flex flex-col gap-4">
          <h1 className="font-semibold border-b-1 border-gray-100 flex items-start pb-3 gap-1">
            <BuildingLibraryIcon className="size-5" /> {previewEvent.campus}
          </h1>
          <span>
            {" "}
            {previewEvent.campus}{" "}
            <strong className="text-primary">{previewEvent.title}</strong> on{" "}
            <strong>{previewEvent.date}</strong>.
          </span>
        </div>
      </div>
    </section>
  );
};

export default CampusCalendar;
