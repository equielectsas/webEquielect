"use client";

import React from "react";

export default function HomeGlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --color-equielect-yellow: #ffcd00;
        --color-equielect-blue: #1c355e;
        --color-equielect-gray: #98989a;
      }
      .text-equielect-gray {
        color: var(--color-equielect-gray);
      }
      .text-equielect-blue {
        color: var(--color-equielect-blue);
      }
      .bg-equielect-yellow {
        background-color: var(--color-equielect-yellow);
      }
      .bg-equielect-blue {
        background-color: var(--color-equielect-blue);
      }

      .eq-phones-stage {
        perspective: 1200px;
        transform-style: preserve-3d;
      }
      .eq-phone-item {
        transition: transform 650ms cubic-bezier(0.22, 0.9, 0.2, 1),
          filter 650ms cubic-bezier(0.22, 0.9, 0.2, 1),
          opacity 650ms cubic-bezier(0.22, 0.9, 0.2, 1);
        will-change: transform, opacity, filter;
      }
      .eq-rotate-next .eq-phone-item {
        transition-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
      }
      .eq-rotate-prev .eq-phone-item {
        transition-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
      }

      .eq-phone-shell {
        box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
      }
      .eq-phone-glass {
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
          inset 0 18px 28px rgba(255, 255, 255, 0.05),
          inset 0 -18px 28px rgba(0, 0, 0, 0.2);
      }
      .eq-phone-glass video::-webkit-media-controls {
        display: none !important;
      }
      .eq-center-overlay {
        backdrop-filter: blur(2px);
      }
    `}</style>
  );
}