import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

import { getNoteById, updateNote, deleteNote } from "../lib/fetchJSON.js";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id);
        setNote(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    try {
      if (!window.confirm("You sure you wanna update the note?")) return;

      setIsSaving(true);
      await updateNote(id, note);
      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update note!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("You sure you wanna delete the note?")) return;

      await deleteNote(id);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete note!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex justify-center items-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5" /> Delete note
            </button>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Note title"
                  value={note.title}
                  onChange={(e) => {
                    setNote((n) => ({ ...n, title: e.target.value }));
                  }}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  className="textarea textarea-bordered h-32"
                  placeholder="Note content"
                  value={note.content}
                  onChange={(e) => {
                    setNote((n) => ({ ...n, content: e.target.value }));
                  }}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
