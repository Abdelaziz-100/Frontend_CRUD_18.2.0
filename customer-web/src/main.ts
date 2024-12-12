import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // Import this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this

import { appConfig } from './app/app.config'; // Existing appConfig
import { AppComponent } from './app/app.component';

// Add BrowserAnimationsModule to appConfig
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Keep existing providers
    importProvidersFrom(BrowserAnimationsModule), // Add BrowserAnimationsModule
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
