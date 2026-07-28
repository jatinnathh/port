"use client";

import { useEffect } from "react";

export default function VisitNotifier() {
  useEffect(() => {
    // Prevent repetitive email alerts on page reload within the same session
    if (typeof window === "undefined") return;

    const hasNotified = sessionStorage.getItem("portfolio_visit_notified");
    if (hasNotified) return;

    const notifyVisit = async () => {
      try {
        const details = [
          `Timestamp: ${new Date().toLocaleString()}`,
          `Page Path: ${window.location.pathname}`,
          `Referrer: ${document.referrer || "Direct / None"}`,
          `Screen Size: ${window.screen.width}x${window.screen.height}`,
          `Language: ${navigator.language}`,
          `User Agent: ${navigator.userAgent}`,
        ].join("\n");

        const response = await fetch("/api/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "Portfolio Page Visit",
            scenario: "Visitor Session Alert",
            result: "Active Page Visit",
            details,
          }),
        });

        const data = await response.json();
        if (data.status === "success") {
          sessionStorage.setItem("portfolio_visit_notified", "true");
        }
      } catch (err) {
        console.error("Failed to send visit notification:", err);
      }
    };

    notifyVisit();
  }, []);

  return null;
}
