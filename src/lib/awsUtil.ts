// utils.ts
import { getSecureUrl } from "@/actions/aws";
import { computeSHA256 } from "@/lib/bcrypt";

export const uploadFileToAWS = async (file: File): Promise<string | null> => {
  try {
    const checksum = await computeSHA256(file);
    const secureUrl = await getSecureUrl(
      file.name,
      file.type,
      file.size,
      checksum
    );
    if (secureUrl.Failure) {
      console.error("Error fetching secure URL:", secureUrl.Failure);
      return null;
    }
    if (secureUrl.Success) {
      const url = secureUrl.Success.url;
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file?.type },
      });
      return url.split("?")[0];
    }
  } catch (error) {
    console.error("File upload failed:", error);
    return null;
  }
  return null;
};
