import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ConsultComponent } from './components/consult/consult.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'consult', component: ConsultComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'request', component: RequestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
