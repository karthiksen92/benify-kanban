import { Component } from '@angular/core';
import { Board, Column, ModalCloseRespone } from './kanban-board.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditTaskModalComponent } from '../add-or-edit-task-modal/add-or-edit-task-modal.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent {
  constructor(public dialog: MatDialog) {}

  board: Board = new Board('Daily activities', [
    new Column('Todo', [
      'Clean the trash',
      'Pick up groceries',
      'Get up early in the morning',
      'Go to gym',
    ]),
    new Column('Implementing', [
      'Prepare documentation for office meeting',
      'Create the design',
      'Finish the landuary',
    ]),
    new Column('Done', [
      'Get up',
      'Submit the application',
      'Check e-mail',
      'Walk the dog',
    ]),
  ]);

  openDialog(columnIndex?: number, taskIndex?: number, task?: string): void {
    const dialogRef = this.dialog.open(AddOrEditTaskModalComponent, {
      width: '250px',
      data: { task },
    });
    dialogRef.afterClosed().subscribe((result: ModalCloseRespone) => {
      result.isEdit
        ? this.editTask(result.task, columnIndex!, taskIndex!)
        : this.saveTask(result.task);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  removeTask(columnIndex: number, task: string) {
    this.board.columns[columnIndex].tasks.splice(
      this.board.columns[columnIndex].tasks.indexOf(task),
      1
    );
  }

  saveTask(task: any): void {
    if (task && !this.board.columns[0].tasks.includes(task)) {
      this.board.columns[0].tasks.push(task);
      console.log('The dialog was closed');
    } else if (task && this.board.columns[0].tasks.includes(task)) {
      window.alert('Task already exists');
    }
  }

  editTask(task: string, columnIndex: number, taskIndex: number): void {
    if (task && !this.board.columns[columnIndex].tasks.includes(task)) {
      this.board.columns[columnIndex].tasks[taskIndex] = task;
      console.log('The dialog was closed');
    } else if (task && this.board.columns[columnIndex].tasks.includes(task)) {
      window.alert('Task already exists');
    }
  }
}
