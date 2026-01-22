import { Link } from "react-router-dom";
import { NotebookIcon } from "lucide-react";

const NoteNotFoundUI = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 mx-auto max-w-md text-center py-32">
      <div className="bg-primary/10 p-6 rounded-full">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link to="/create" className="btn btn-primary rounded-full">
        Create your first note
      </Link>
    </div>
  );
};

export default NoteNotFoundUI;
