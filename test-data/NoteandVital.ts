export interface NoteData {
  noteText: string;
  tags: string[];
}

export const notesTestData = {
  validNote: {
    noteText: "Creating note for testing purposes.",
    tags: ["Care Conference", "Covid", "Progress Note", "Vitals"]
  }
};