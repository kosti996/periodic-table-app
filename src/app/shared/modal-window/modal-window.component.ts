import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule, NgModel } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  selector: 'modal-window',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {
  @Input() title = '';
  @Input() open = false;
  @Input() rowData!: PeriodicElement;
  @Output() save = new EventEmitter<PeriodicElement>();
  @Output() cancel = new EventEmitter<void>();

  onSave(form: NgForm) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    this.save.emit({ ...this.rowData });
  }

  onCancel() {
    this.cancel.emit();
  }

  errorMessage(field: string, model: NgModel): string {
    if (model.errors?.['required']) {
      switch (field) {
        case 'name':
          return 'Name is required';
        case 'weight':
          return 'Weight is required';
        case 'symbol':
          return 'Symbol is required';
        case 'position':
          return 'Element No. is required';
      }
    }
    return 'Invalid value';
  }
}
