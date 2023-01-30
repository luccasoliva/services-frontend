import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmarLogoutComponent } from './confirmar-logout/confirmar-logout.component';
import { MaterialModule } from '../material/material.module';
import { DataPipe } from '../pipes/date.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmarLogoutComponent,
    DataPipe
  ],
  imports: [
    MaterialModule
    
  ],
  exports: [
    NavbarComponent,
    ConfirmarLogoutComponent,
    DataPipe
  ],
})
export class SharedModule { }
