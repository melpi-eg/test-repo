class EGAnalytics {
    constructor(API_KEY) {
      // Check if the API key is valid
      if (!this.checkForValidAPIKey(API_KEY)) {
        throw new Error(
          "Invalid API key provided. Please provide a valid API key."
        );
      }
      this.sessionDuration = {
        start: Date.now(),
        end: 0,
      };
      this.userInteracted = false;
      this.user_bounced = false;
      this.API_KEY = API_KEY;
      this.startTracking();
      console.log("Analytics initialized with API key:", this.API_KEY);
    }
  
    async trackEvent(eventType, eventData) {
      // Create an object to hold event details
      const eventDetails = {
        event_type: eventType,
        event_target: eventData.target ? eventData.target.tagName : "N/A",
        event_timestamp: Date.now(),
        event_data: eventData,
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator,
        browser: navigator.appCodeName,
        pathname: window.location.pathname,
        languages: navigator.languages,
      };
  
      if (eventType === "beforeunload") {
        this.sessionDuration.end = Date.now();
      }
  
      if (eventType == "click") {
        this.userInteracted = true;
      }
  
      console.log("Event tracked:", eventDetails);
    }
  
    startTracking() {
      document.body.addEventListener("click", (event) => {
        this.trackEvent("click", event);
      });
  
      // Track Submit Events
      document.body.addEventListener("submit", (event) => {
        this.trackEvent("submit", event);
      });
  
      // Track Change Events
      document.body.addEventListener("change", (event) => {
        this.trackEvent("change", event);
      });
  
      // Track Focus Events
      document.body.addEventListener(
        "focus",
        (event) => {
          this.trackEvent("focus", event);
        },
        true
      );
  
      // Track Blur Events
      document.body.addEventListener(
        "blur",
        (event) => {
          this.trackEvent("blur", event);
        },
        true
      );
  
      // Track Keydown Events
      document.body.addEventListener("keydown", (event) => {
        this.trackEvent("keydown", event);
      });
  
      // Track Mouseover Events (e.g., mouse hovering over an element)
      // document.body.addEventListener("mouseover", (event) => {
      //   this.trackEvent("mouseover", event);
      // });
  
      // Track Resize Events
      window.addEventListener("resize", (event) => {
        this.trackEvent("resize", event);
      });
  
      // Track Scroll Events (e.g., when the user scrolls the page)
      window.addEventListener("scroll", (event) => {
        this.trackEvent("scroll", event);
      });
  
      // Track Input Events (e.g., typing in form fields)
      document.body.addEventListener("input", (event) => {
        this.trackEvent("input", event);
      });
  
      // Track Window Load Event (e.g., when the page is fully loaded)
      window.addEventListener("load", (event) => {
        this.trackEvent("load", event);
      });
  
      // Track Page Visibility (when the user switches tabs or minimizes the page)
      document.addEventListener("visibilitychange", () => {
        this.trackEvent("visibilitychange", {
          visible: document.visibilityState === "visible",
        });
      });
  
      // Track Unload Events (e.g., when the page is about to be unloaded)
      window.addEventListener("beforeunload", (event) => {
        this.trackEvent("beforeunload", event);
      });
  
      // check for the user bouncing
      setTimeout(() => {
        if (!this.userInteracted) {
          this.user_bounced = true;
          console.log("User bounced.");
        }
      }, 30 * 1000);
    }
  
    async checkForValidAPIKey(API_KEY) {
      return true;
    }
  }
  