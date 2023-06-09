import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "appwrite-capacitor-oauth2-test",
  webDir: "dist",
  server: {
    androidScheme: "https",
    hostname: "dev.fire-and-forget.de"
  }
};

export default config;
