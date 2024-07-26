import { Note } from "../types/types";

export const fakeData: Note[] = [
  {
      noteId: "1",
      note: 'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.',
      colors: {
          id: "color-purple",
          colorHeader: "#FED0FD",
          colorBody: "#FEE5FD",
          colorText: "#18181A",
      },
      position: { x: 505, y: 10 },
  },
  {
      noteId: "2",
      note: 'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.',
      colors: {
        id: "color-blue",
        colorHeader: "#9BD1DE",
        colorBody: "#A6DCE9",
        colorText: "#18181A",
      },
      position: {x: 305, y: 110 },
  },
  {
      noteId: "3",
      note: 'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.',
      colors: {
        id: "color-yellow",
        colorHeader: "#FFEFBE",
        colorBody: "#FFF5DF",
        colorText: "#18181A",
      },
      position: {x: 605, y: 500  },
  },
];