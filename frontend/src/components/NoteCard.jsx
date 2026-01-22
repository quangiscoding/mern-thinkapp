import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

const NoteCard = ({ note }) => {
  const handleDelete = (e, id) => {
    e.preventDefault();
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
          <span className="text-sm text-base-content/60">{note.createdAt}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon />
            <button
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
              className="btn btn-ghost text-error"
            >
              <Trash2Icon className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
