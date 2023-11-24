"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("http://localhost:8000/api/images/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const images = await response.json();
        // URLを絶対パスに変換
        const fullUrls = images.map((image) => `http://localhost:8000${image}`);
        setImages(fullUrls);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }

    const interval = setInterval(fetchImages, 60000); // 60秒ごとに実行
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {images.map((url, index) => (
        // キーとしてURLだけではなくインデックスを使用
        // URLにクエリパラメータを追加してキャッシュを防ぐ
        <img
          key={`${url}-${index}`}
          src={`${url}?v=${Date.now()}`}
          alt="Image"
        />
      ))}
    </div>
  );
};

export default ImageList;
