import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { elementsSignal } from '../store/periodic-elements.store';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../models/periodic-element.model';
import { ModalWindowComponent } from '../shared/modal-window/modal-window.component';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'periodic-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormField, MatInputModule, CommonModule, ModalWindowComponent, FormsModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PeriodicTableComponent {
  searchQuery = signal<string>('');
  modalTitle = 'Edit';
  elements = elementsSignal;
  modalOpen: boolean = false;
  editingRowIndex: number | null = null;
  editingRowData: PeriodicElement = { position: 0, name: '', weight: 0, symbol: '' };
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  filteredElements = computed(() => {
    const sq = this.searchQuery();
    return this.elements().filter(x =>
      x.name.toLowerCase().includes(sq.toLowerCase()) ||
      x.symbol.toLowerCase().includes(sq.toLowerCase()) ||
      x.position.toString().includes(sq.toLowerCase()) ||
      x.weight.toString().includes(sq.toLowerCase()) 
    );
  });

  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  openModal(element: PeriodicElement) {
    const index = this.elements().findIndex(e => e.position === element.position);
    this.editingRowIndex = index;
    this.editingRowData = { ...element };
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.editingRowIndex = null;
    this.editingRowData = { position: 0, name: '', weight: 0, symbol: '' };
  }

  saveModal(edited: PeriodicElement) {
    if (this.editingRowIndex !== null) {
      const updated = [...this.elements()];
      updated[this.editingRowIndex] = { ...edited };
      this.elements.set(updated);
    }
    this.closeModal();
  }

  trackByFn(index: number, element: PeriodicElement): number {
    return element.position;
  }
}
