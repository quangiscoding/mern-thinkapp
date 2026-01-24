import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteNotFoundUI from "../components/NoteNotFoundUI.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");

        if (res.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests");
          return;
        }

        if (!res.ok) throw new Error(res.status);

        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to load notes!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-primary text-center py-10">Loading notes...</div>
        )}
        {!isLoading && notes.length === 0 && !isRateLimited && (
          <NoteNotFoundUI />
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
