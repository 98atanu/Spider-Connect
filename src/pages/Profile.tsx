import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <div className="text-center text-red-500 mt-10">User not found</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <div className="flex flex-col items-center">
        <img
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* You can also show user posts here in the future */}
    </div>
  );
};

export default Profile;
