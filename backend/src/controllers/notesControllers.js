import Note from "../model/Note.js";

// GET /notes
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET /notes/:id
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// POST /notes
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    // early validation (don’t hit DB unnecessarily)
    if (!title?.trim() || !content?.trim()) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// PUT /notes/:id
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      // new: true -> return the document AFTER the update (instead of before by default)
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE /notes/:id
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
