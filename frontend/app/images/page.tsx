"use client";

import { useState, useEffect } from "react";

function Image({ image, onDelete }) {
  const [deleted, setDeleted] = useState(false);

  async function deleteImage() {
    const res = await fetch(`http://localhost:8000/images/${image.name}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setDeleted(true);
      onDelete(image.name);
    }
  }

  if (deleted) {
    return <p>削除</p>;
  }

  return (
    <>
      <img
        src={`http://localhost:8000/${image.path}`}
        className="shadow-lg rounded-lg" // 影と角の丸みを追加
      />
      <button
        onClick={deleteImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow" // ボタンスタイル
      >
        削除
      </button>
    </>
  );
}

export default function Images() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages() {
      const res = await fetch("http://localhost:8000/images");
      setImages(await res.json());
    }
    getImages();
  }, []);

  function handleDelete(deletedFileName) {
    setImages(images.filter((i) => i.name !== deletedFileName));
  }

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {images.map((img) => (
        <Image key={img.name} image={img} onDelete={handleDelete} />
      ))}
    </div>
  );
}
