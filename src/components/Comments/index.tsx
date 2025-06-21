import { useEffect, useState } from "react";
import axios from "axios";

export default function Comments({ movieId }: { movieId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`/api/comment/${movieId}`).then((res) => setComments(res.data));
  }, [movieId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post("/api/comment/add", { movieId, comment: text });
    setText("");

    axios.get(`/api/comment/${movieId}`).then((res) => setComments(res.data));
  };

  return (
    <div className="max-w-lg mx-auto shadow-md rounded-lg p-6">
      <form onSubmit={handleAddComment} className="flex items-center gap-3 mb-6">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
      >
        Post
      </button>
      </form>
      <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c.id} className="flex items-start gap-3 bg-gray-900 rounded-lg p-3 max-w-full">
        <div className="flex-shrink-0 w-9 h-9 bg-purple-400 rounded-full flex items-center justify-center text-purple-800 font-bold">
          {c.user?.name?.[0]?.toUpperCase() }
        </div>
        <div className="max-w-full">
          <div className="font-semibold text-gray-200">{c.user?.name}</div>
          <div className="text-gray-400 break-words max-w-full">{c.text}</div>
          <div className="text-xs text-gray-400 mt-1">
          {new Date(c.createdAt).toLocaleString()}
          </div>
        </div>
        </li>
      ))}
      </ul>
    </div>
  );
}
