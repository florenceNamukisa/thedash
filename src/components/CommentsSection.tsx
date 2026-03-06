import { useState, useEffect } from "react";
import { MessageCircle, Send, ThumbsUp, User, Clock, MoreHorizontal, LogIn } from "lucide-react";
import { Button } from "./ui/button";

interface Comment {
  id: string;
  author: string;
  authorEmail?: string;
  content: string;
  date: Date;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  articleId: string;
}

export const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auto-detect user from localStorage or Google
  useEffect(() => {
    // Check for saved user info
    const savedName = localStorage.getItem("user_name");
    const savedEmail = localStorage.getItem("user_email");
    
    if (savedName) {
      setAuthorName(savedName);
      setIsLoggedIn(true);
    }
    if (savedEmail) {
      setAuthorEmail(savedEmail);
    }

    // Try to get Google identity (if Google Sign-In is loaded)
    if ((window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          callback: (response: any) => {
            // Decode JWT token to get user info
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            setAuthorName(payload.name);
            setAuthorEmail(payload.email);
            setIsLoggedIn(true);
            localStorage.setItem("user_name", payload.name);
            localStorage.setItem("user_email", payload.email);
          }
        });
      } catch (e) {
        console.log("Google Sign-In not configured");
      }
    }
  }, []);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${articleId}`);
    if (savedComments) {
      try {
        const parsed = JSON.parse(savedComments);
        setComments(parsed.map((c: any) => ({
          ...c,
          date: new Date(c.date)
        })));
      } catch (e) {
        console.error("Failed to parse comments", e);
      }
    }
    setIsLoading(false);
  }, [articleId]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments_${articleId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      authorEmail: authorEmail || undefined,
      content: newComment.trim(),
      date: new Date(),
      likes: 0
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    // Trigger Google Sign-In
    if ((window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.prompt();
    } else {
      // Fallback: just save the name manually entered
      if (authorName.trim()) {
        localStorage.setItem("user_name", authorName.trim());
        setIsLoggedIn(true);
      }
    }
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    saveComments(updatedComments);
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-black text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Leave a comment</h3>
        
        {!isLoggedIn ? (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <span className="text-gray-400 text-sm">or</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                maxLength={50}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-green-700">Signed in as {authorName}</span>
            <button
              type="button"
              onClick={() => { setIsLoggedIn(false); localStorage.removeItem("user_name"); }}
              className="text-xs text-gray-500 hover:text-gray-700 ml-auto"
            >
              Sign out
            </button>
          </div>
        )}
        
        <div className="mb-4">
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
            rows={4}
            maxLength={1000}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{newComment.length}/1000</p>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{comment.author}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(comment.date)}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
