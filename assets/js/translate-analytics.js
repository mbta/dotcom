// Detects if the page is translated and notifies analyticis
const getNewLanguage = () => {
  const html = document.getElementsByTagName("html")[0];
  return html.getAttribute("lang")?.valueOf();
};

// adapted from: https://analytical42.com/2022/detect-track-translations-ga4/
export default () => {
  // Start by checking if the MutationObserver API is available
  if (typeof MutationObserver === "function") {
    // Tell the observer to monitor for changes to HTML attributes
    const config = { attributes: true };
    // Build the function to run when a change is observed
    const callback = mutationList => {
      // Loop through each observed change
      for (let i = 0; i < mutationList.length; i += 1) {
        // Only do something if the change was on an attribute
        if (mutationList[i].type === "attributes") {
          if (mutationList[i].attributeName === "lang") {
            // Send an event to the dataLayer
            const newLanguage = getNewLanguage();
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "translate"
            });
            if (newLanguage) {
              window.dataLayer.push({
                language: newLanguage
              });
            }
          }
        }
      }
    };
    // Create the actual observer
    const observer = new MutationObserver(callback);
    // Attach the observer to the <title> tag
    observer.observe(document.getElementsByTagName("title")[0], config);
    // Attach the observer to the <html> tag
    observer.observe(document.getElementsByTagName("html")[0], config);
  }
};
