import { Workbox } from "workbox-window";

const swRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }

  const wb = new Workbox("./sw.bundle.js");

  try {
    await wb.register();
    console.log("Service Worker registered");
  } catch (error) {
    console.log("Failed to register service worker", error);
  }
};

export default swRegister;
