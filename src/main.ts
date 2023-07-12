import { enableProdMode } from '@angular/core';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Otherise, log the boot error
}).catch(err => console.error(err));