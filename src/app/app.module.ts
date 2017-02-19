import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ControllerComponent } from './controller/controller.component';

import { LifeService } from './life.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ControllerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [LifeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
