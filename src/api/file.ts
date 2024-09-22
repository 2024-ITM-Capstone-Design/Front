import { axiosInstance } from ".";
import axios from "axios";
export const getPresignedUrl = async (fileName: string, id: string) => {
  try {
    const res = await axiosInstance.get(
      `api/s3/presigned-url?fileName=${fileName}&inputDataId=${id}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageToS3 = async (file: File, presignedUrl: string) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    console.error("Image upload failed:", error);
  }
};
