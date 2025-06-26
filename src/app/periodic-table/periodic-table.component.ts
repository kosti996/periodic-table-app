import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { elementsSignal } from '../store/periodic-elements.store';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})

export class PeriodicTableComponent {
  elements = elementsSignal;
}
