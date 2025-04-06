import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { setLoading, updateProfileImage } from "../store/slices/auth-slice";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string>(user?.profileImage || "");

  useEffect(() => {
    if (user) {
      setImageUrl(user.profileImage || "");
    }
  }, [user]);

  if (!user)
    return <div className="text-center text-red-500 mt-10">User not found</div>;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    dispatch(setLoading(true));

    try {
      const uploadedImageUrl = await uploadImageToCloudinary(file);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
        dispatch(updateProfileImage(uploadedImageUrl));
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Error uploading image. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading image. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-start pt-12">
      <div className="w-full max-w-xl bg-slate-800 text-white shadow-lg rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={
                imageUrl ||
                `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
              }
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-indigo-500 object-cover"
            />
            <label
              htmlFor="file-upload"
              title="Edit profile picture"
              className="absolute bottom-1 right-1 bg-indigo-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-indigo-600 transition duration-200 shadow-md"
            >
              <FaEdit size={14} />
            </label>

            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-slate-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
