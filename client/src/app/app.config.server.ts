import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { BrowserStorageService } from './services/browserstorage.service';
import { BrowserStorageServerService } from './services/browserstorage.server.serice';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: BrowserStorageService,
      useClass: BrowserStorageServerService,
    },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
