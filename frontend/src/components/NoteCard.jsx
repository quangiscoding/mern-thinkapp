import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

import formatDate from "../lib/utils.js";
import { deleteNote } from "../lib/fetchJSON.js";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("You sure you wanna delete this note?")) return;

    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
    toast.success("Note deleted!");
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 border-t-4 border-solid border-[#FF79C6]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions flex items-center justify-between mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon />
            <div
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
              className="btn btn-ghost text-error"
            >
              <Trash2Icon className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
