import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        setNotes(data);

        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      {isLoading && (
        <div className="text-primary text-center py-10">Loading notes...</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
