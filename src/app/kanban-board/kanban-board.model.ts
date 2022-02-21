export class Board {
  constructor(public name: string, public columns: Column[]) {}
}
export class Column {
  constructor(public name: string, public tasks: string[]) {}
}

// If you would like to use json instaed of class
export interface JsonTypeBoard {
  state: string;
  tasks: string[];
}

export interface DialogData {
  newTask: string;
}

export const BoardData: JsonTypeBoard[] = [
  {
    state: 'Todo',
    tasks: [
      'Clean the trash',
      'Pick up groceries',
      'Get up early in the morning',
      'Go to gym',
    ],
  },
  {
    state: 'Implementation',
    tasks: [
      'Prepare documentation for office meeting',
      'Create the design',
      'Finish the landuary',
    ],
  },
  {
    state: 'Done',
    tasks: ['Get up', 'Submit the application', 'Check e-mail', 'Walk the dog'],
  },
];
