"use client";
import { useState } from "react";
import { getSecureUrl } from "./actions";

const Page = () => {
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ file });
    if (file) {
      const checksum = await computeSHA256(file!);
      const secureUrl = await getSecureUrl(
        file?.name,
        file?.type,
        file?.size,
        checksum
      );
      if (secureUrl.Failure !== undefined) {
        return;
      }
      if (secureUrl.Success) {
        const url = secureUrl.Success.url;
        await fetch(url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file?.type },
        });
      }
    }
  };
  return (
    <form className="p-48" onSubmit={handleSubmit}>
      <h1>Upload a File</h1>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>}
      <button className="px-4 py-2 bg-blue">Submit</button>
    </form>
  );
};

export default Page;
