import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { createPost } from '../store/slices/post-slice';
import { uploadImageToCloudinary } from '../utils/cloudinary'; // 🌩️ Utility

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caption.trim() && !imageFile) {
      toast.error('Please enter a caption or upload an image');
      return;
    }

    setIsLoading(true);
    let imageUrl: string | undefined;

    try {
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const newPost = {
        id: Date.now().toString(),
        caption,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        user: {
          name: user.name,
          email: user.email,
        },
      };

      const resultAction = await dispatch(createPost(newPost));
      if (createPost.fulfilled.match(resultAction)) {
        toast.success('Post created successfully 🚀');
        navigate('/');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      toast.error('Something went wrong while creating the post');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-slate-100">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-xl border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 resize-none"
            rows={4}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-300 bg-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 rounded-lg max-h-64 w-full object-contain border border-slate-700"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-60"
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
