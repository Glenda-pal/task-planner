import React, { useState } from "react";

// Utility for formatting and grouping tasks by date
function groupTasksByDate(tasks) {
  const groups = {};
  tasks.forEach((task) => {
    const dateObj = task.due_date ? new Date(task.due_date) : null;
    // Get YYYY-MM-DD string
    const key = dateObj
      ? dateObj.toISOString().slice(0, 10)
      : "No due date";
    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
  });
  // Sorted by date (No due date last)
  return Object.entries(groups)
    .sort(([a], [b]) => (a === "No due date" ? 1 : b === "No due date" ? -1 : a.localeCompare(b)));
}

const viewModes = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
];

const CalendarView = ({ tasks }) => {
  const [viewMode, setViewMode] = useState("month");

  // For simplicity, we show all tasks grouped by their due_date in all views
  const grouped = groupTasksByDate(tasks || []);

  // Simple inline styles
  const containerStyle = {
    background: "#fff",
    borderRadius: "8px",
    padding: "24px",
    margin: "0 auto",
    maxWidth: "800px",
    boxShadow: "2px 4px 8px rgba(0,0,0,0.05)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "8px",
    marginBottom: "20px",
  };

  const colStyle = {
    border: "1px solid #dde2e9",
    borderRadius: "6px",
    padding: "12px",
    minWidth: "220px",
    marginBottom: "16px",
    background: "#f8f9fb",
  };

  const dateStyle = {
    fontWeight: 600,
    color: "#4263eb",
    marginBottom: "10px",
    fontSize: "1.06em",
  };

  const taskStyle = {
    background: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "5px",
    padding: "7px 10px",
    marginBottom: "7px",
    fontSize: "1em",
    boxShadow: "1px 2px 6px rgba(0,0,0,0.02)",
  };

  const emptyStyle = {
    color: "#868e96",
    textAlign: "center",
    margin: "36px 0",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        {viewModes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setViewMode(mode.key)}
            style={{
              padding: "7px 18px",
              borderRadius: "6px",
              border: mode.key === viewMode ? "2px solid #4263eb" : "1px solid #d0d7df",
              background: mode.key === viewMode ? "#e7f1ff" : "#f5f8fd",
              fontWeight: 500,
              color: "#222",
              cursor: "pointer",
            }}
          >
            {mode.label}
          </button>
        ))}
      </div>
      {grouped.length === 0 ? (
        <div style={emptyStyle}>Nessun task da mostrare nel calendario</div>
      ) : (
        <div>
          {grouped.map(([date, dateTasks]) => (
            <div style={colStyle} key={date}>
              <div style={dateStyle}>
                {date === "No due date"
                  ? "Senza data di scadenza"
                  : new Date(date).toLocaleDateString()}
              </div>
              {dateTasks.map((task) => (
                <div style={taskStyle} key={task.id}>
                  <div><strong>{task.title}</strong></div>
                  <div style={{ color: "#6c757d", fontSize: "0.97em" }}>{task.description}</div>
                  <div>
                    <span style={{marginRight: "10px", fontSize: "0.92em", color: "#adb5bd"}}>
                      {task.status && (
                        <span>
                          Status: <b>{task.status.replace("_", " ")}</b>
                        </span>
                      )}
                    </span>
                    <span style={{fontSize: "0.92em", color: "#adb5bd"}}>
                      Priority: <b>{task.priority}</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
