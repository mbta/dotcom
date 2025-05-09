import * as Sentry from "@sentry/react";
import beforeSend from "../js/sentry-filter";

declare global {
  interface Window {
    sentry: {
      dsn: string;
      environment: string;
    };
  }
}

export default function initializeSentry(): void {
  if (window.sentry) {
    Sentry.init({
      dsn: window.sentry.dsn,
      environment: window.sentry.environment,
      integrations: [Sentry.captureConsoleIntegration({ levels: ["error"] })],
      beforeSend,
      autoSessionTracking: false,
      sampleRate: 0.8, // error sampling - might increase later
      initialScope: {
        tags: { "dotcom.application": "frontend" }
      },
      beforeBreadcrumb: breadcrumb => {
        // omit breadcrumbs that are just these scripts
        // making their incessant pinging
        if (
          breadcrumb.data?.url?.contains("clarity.ms") ||
          breadcrumb.data?.url?.contains("doubleclick.net") ||
          breadcrumb.data?.url?.contains("google-analytics.com")
        ) {
          return null;
        }
        return breadcrumb;
      },
      // ignoreErrors is a list of messages to be filtered out before
      // being sent to Sentry as either regular expressions or strings.
      // When using strings, they’ll partially match the messages
      ignoreErrors: [
        "translate_",
        "ResizeObserver loop limit exceeded",
        "Non-Error promise rejection captured",
        "Extension context invalidated",
        /^xd\/\(\/_\/translate_http/i
      ],
      // we don't care about errors from external tools and libraries
      denyUrls: [
        // Chrome extensions
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
        // Firefox extensions
        /^resource:\/\//i,
        /^moz-extension:\/\//i,
        // Safari extensions
        /^safari-extension:/i,
        /safari-extension:\/\//i,
        // Others
        /google/i,
        /gtag/i,
        /gstatic/i,
        /clarity/i,
        // reCAPTCHA flakiness
        /gstatic\.com\/recaptcha\/releases/i,

        // Bing UET tracking flakiness
        /bat\.bing\.com\/bat\.js/i,

        // Local user files
        /file:\/\//i,

        // Trustpilot scripts
        /widget\.trustpilot\.com/i,

        // Hubspot scripts
        /js\.hs-banner\.com/i,
        /js\.hs-analytics\.net/i,
        /js\.hs-scripts\.com/i,
        /js\.hsadspixel\.net/i,

        // Sentry scripts
        /browser\.sentry-cdn\.com/i,

        // Facebook scripts
        /graph\.facebook\.com/i,
        /connect\.facebook\.net\/en_US\/all\.js/i,

        // Microsoft Clarity
        /clarity\.ms/i,

        // Twitter ads
        /ads-twitter\.com/i,

        // Google scripts
        /googletagmanager\.com/i,
        /google-analytics\.com/i,

        // LinkedIn scripts
        /snap\.licdn\.com/i,

        // Quora scripts
        /a\.quora\.com/i
      ]
    });
  }

  document.body.addEventListener(
    "error",
    event => {
      const target = event.target as Element;
      if (!event.target) return;

      if (target.tagName === "IMG") {
        Sentry.captureMessage(
          `Failed to load image: ${(<HTMLImageElement>event.target).src}`,
          "warning"
        );
      } else if (target.tagName === "LINK") {
        Sentry.captureMessage(
          `Failed to load css: ${(<HTMLLinkElement>event.target).href}`,
          "warning"
        );
      } else if (target.tagName === "SCRIPT") {
        Sentry.captureMessage(
          `Failed to load script: ${(<HTMLScriptElement>event.target).src}`,
          "warning"
        );
      } else if (target.tagName === "VIDEO") {
        Sentry.captureMessage(
          `Failed to load video: ${(<HTMLVideoElement>event.target).src}`,
          "warning"
        );
      }
    },
    true // useCapture - necessary for resource loading errors
  );
}
