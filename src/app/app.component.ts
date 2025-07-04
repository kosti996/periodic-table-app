import { Component } from '@angular/core';
import { PeriodicTableComponent } from "./periodic-table/periodic-table.component";

@Component({
  selector: 'app-root',
  imports: [PeriodicTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'periodic-table-app';
}
