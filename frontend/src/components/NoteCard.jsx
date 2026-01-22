const NoteCard = ({ note }) => {
  return (
    <div>
      {note.title} | {note.content}
    </div>
  );
};

export default NoteCard;
