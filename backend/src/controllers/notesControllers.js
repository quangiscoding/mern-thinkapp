import Note from "../model/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // latest note first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes method:", error);
    res.status(500).json("Internal server error!");
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found!" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById method:", error);
    res.status(500).json("Internal server error!");
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // create a new note document and save it to MongoDB
    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNote method:", error);
    res.status(500).json("Internal server error!");
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      // new: true -> return the document AFTER the update (instead of before by default)
      { new: true, runValidators: true },
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found!" });
      return;
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote method:", error);
    res.status(500).json("Internal server error!");
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found!" });
      return;
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    console.error("Error in deleteNote method:", error);
    res.status(500).json("Internal server error!");
  }
}
