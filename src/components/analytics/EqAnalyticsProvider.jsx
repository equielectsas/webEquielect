"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { eqPageview } from "../../../lib/eqTrack";

/**
 * Envía page_view a nuestro Analytics en cada navegación del sitio.
 */
export default function EqAnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    eqPageview(path);
  }, [pathname, searchParams]);

  return null;
}
