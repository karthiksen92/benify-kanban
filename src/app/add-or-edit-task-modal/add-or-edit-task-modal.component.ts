import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../kanban-board/kanban-board.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-or-edit-task-modal.component.html',
  styleUrls: ['./add-or-edit-task-modal.component.scss'],
})
export class AddOrEditTaskModalComponent {
  taskForm = new FormControl('', [Validators.maxLength(40)]);
  isEditMode?: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddOrEditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.task ? true : false;

    if (this.isEditMode) {
      this.taskForm.patchValue(data.task);
    }
  }
  onModalClose(task?: string | null) {
    this.dialogRef.close({ task, isEdit: this.isEditMode });
  }
}
