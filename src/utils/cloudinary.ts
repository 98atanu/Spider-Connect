export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.error("Missing Cloudinary config:", { CLOUD_NAME, UPLOAD_PRESET });
    return null;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("folder", "uploads");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};
