import { Component, OnInit } from '@angular/core';
import { Board, Column } from './kanban-board.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
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

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.board.columns[0].tasks.push(result);
      console.log('The dialog was closed');
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

  removeTask(task: any) {
    console.log('task', task)
    console.log('this.boa', this.board.columns)
    console.log('test',   this.board.columns.filter((item) => item.tasks !== task))
    this.board.columns.filter((item) => item !== task);
  }
}
