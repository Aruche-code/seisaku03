"use client";

import Link from "next/link";

//ナビゲーション
const Navigation = () => {
  return (
    // border-b border-blue-100
    <header className=" p-5">
      <div className="text-center">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          AI SaaS
        </Link>
      </div>
    </header>
  );
};

export default Navigation;
