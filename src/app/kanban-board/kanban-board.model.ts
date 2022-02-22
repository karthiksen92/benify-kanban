export class Board {
  constructor(public name: string, public columns: Column[]) {}
}
export class Column {
  constructor(public name: string, public tasks: string[]) {}
}

export interface DialogData {
  task: string;
}

export interface ModalCloseRespone {
  isEdit: boolean;
  task: string;
}
