import { useEffect, useState } from "react";
import axios from "axios";

export default function Comments({ movieId }: { movieId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`/api/comment/${movieId}`).then(res => setComments(res.data));
  }, [movieId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post("/api/comment/add", { movieId, comment: text });
    setText("");
  
    axios.get(`/api/comment/${movieId}`).then(res => setComments(res.data));
  };

  return (
    <div>
      <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Send</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id} className="mb-2">
            <span className="font-bold">{c.user?.name || "User"}:</span>
            <span className="ml-2">{c.text}</span>
            <span className="ml-2 text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}