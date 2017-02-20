import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ControllerComponent } from './controller/controller.component';

import { LifeService } from './life.service';
import { FileService } from './file.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ControllerComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [LifeService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
