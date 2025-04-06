import { useSelector } from "react-redux";
import { RootState } from "../store";
import FeedCard from "../components/FeedCard";

const Feed = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const authUser = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-400 text-center mb-10">
        {authUser
          ? `Welcome, ${authUser.name.split(" ")[0]} 👋`
          : "Welcome to Spider Connect"}
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-slate-400 text-lg">
            No posts yet. Be the first to share something!
          </div>
        ) : (
          posts
            .slice()
            .sort((a, b) => Number(b.id) - Number(a.id)) 
            .map((post) => <FeedCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
