export interface Note {
  noteId: string;
  note: string;
  colors: {
    id: string,
    colorHeader: string,
    colorBody: string,
    colorText: string,
  };
  position: { x: number, y: number }
}