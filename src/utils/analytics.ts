export interface ClientAnalytics {
  browser: string;
  device: string;
  referrer: string;
  currentPage: string;
  utmSource: string;
  utmCampaign: string;
  country: string;
}

export async function captureAnalytics(): Promise<ClientAnalytics> {
  const userAgent = navigator.userAgent;
  
  // Browser Detection
  let browser = "Unknown Browser";
  if (userAgent.indexOf("Firefox") > -1) {
    browser = "Mozilla Firefox";
  } else if (userAgent.indexOf("SamsungBrowser") > -1) {
    browser = "Samsung Internet";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browser = "Opera";
  } else if (userAgent.indexOf("Trident") > -1) {
    browser = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) {
    browser = "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browser = "Google Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browser = "Apple Safari";
  }

  // Device Detection
  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPad|Tablet/i.test(userAgent)) {
    if (/Tablet|iPad/i.test(userAgent)) {
      device = "Tablet";
    } else {
      device = "Mobile";
    }
  }

  // Get UTM parameters
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "Direct";
  const utmCampaign = params.get("utm_campaign") || "None";

  // Get Referrer & current page
  const referrer = document.referrer || "Direct Visit";
  const currentPage = window.location.href;

  // Retrieve country using a free, secure IP geolocation API
  let country = "United States"; // Default fallback
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      if (data.country_name) {
        country = data.country_name;
      }
    }
  } catch (error) {
    console.warn("Could not retrieve country via IP, falling back to system locale.", error);
    try {
      const locale = navigator.language;
      if (locale) {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const code = locale.split('-')[1];
        if (code) {
          country = regionNames.of(code) || country;
        }
      }
    } catch (_) {}
  }

  return {
    browser,
    device,
    referrer,
    currentPage,
    utmSource,
    utmCampaign,
    country
  };
}
