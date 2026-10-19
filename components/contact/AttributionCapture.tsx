"use client";

import { useEffect } from "react";

const attributionKey = "imadi-innovations-lead-attribution-v1";

export function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(attributionKey)) {
        return;
      }

      const params = new URLSearchParams(window.location.search);
      sessionStorage.setItem(
        attributionKey,
        JSON.stringify({
          utmSource: params.get("utm_source") ?? "",
          utmMedium: params.get("utm_medium") ?? "",
          utmCampaign: params.get("utm_campaign") ?? "",
          utmTerm: params.get("utm_term") ?? "",
          utmContent: params.get("utm_content") ?? "",
          referrer: document.referrer,
          landingPage: `${window.location.pathname}${window.location.search}`,
        }),
      );
    } catch {
      // Attribution is optional and must never block navigation or forms.
    }
  }, []);

  return null;
}
