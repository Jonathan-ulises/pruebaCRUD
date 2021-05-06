import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { InsertClComponent } from './components/insert-cl/insert-cl.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { AppRoutingProviders, routing } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InsertClComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
    //AppRoutingModule
  ],
  providers: [
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
