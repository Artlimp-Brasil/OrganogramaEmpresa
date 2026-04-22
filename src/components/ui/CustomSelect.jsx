import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione",
  width = 260,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((opt) => opt.value === value);

  // fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: width,
      }}
    >
      {/* LABEL */}
      {label && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#334155",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}

      {/* SELECT */}
      <div
        style={{
          position: "relative",
          width: width,
        }}
      >
        {/* TRIGGER */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            height: 40,
            borderRadius: 10,
            border: open
              ? "1px solid #3b82f6"
              : "1px solid #e2e8f0",
            background: "#ffffff",
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            fontSize: 14,
            color: selected ? "#0f172a" : "#94a3b8",
            boxShadow: open
              ? "0 0 0 3px rgba(59,130,246,0.12)"
              : "0 1px 4px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
          }}
        >
          {selected ? selected.label : placeholder}

          <span
            style={{
              fontSize: 12,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
              color: "#64748b",
            }}
          >
            ▼
          </span>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: 46,
              left: 0,
              width: "100%",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
              overflow: "hidden",
              zIndex: 50,
              animation: "fadeIn 0.15s ease",
            }}
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    padding: "10px 12px",
                    fontSize: 14,
                    cursor: "pointer",
                    background: isSelected
                      ? "#f1f5f9"
                      : "#ffffff",
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isSelected
                      ? "#f1f5f9"
                      : "#ffffff";
                  }}
                >
                  {option.label}

                  {isSelected && (
                    <span style={{ fontSize: 12, color: "#3b82f6" }}>
                      ✔
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}