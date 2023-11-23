import { MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ModalProps } from "./types";

import Image from "next/image";

//モーダルウィンドウ
const Modal = ({ isOpen, closeModal, modalData }: ModalProps) => {
  // オープンチェック
  if (!isOpen) return null;

  // 背景クリック
  const handleBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation();
    // 閉じる
    closeModal();
  };

  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <div
        className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-all ${
          modalData.width > 512 ? "max-w-screen-xl" : "max-w-screen-md"
        }`}
        onClick={handleModalClick}
      >
        <div className="p-4 grid grid-cols-3 gap-4 relative">
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={closeModal}
          >
            <CloseIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div className="col-span-2 flex justify-center">
            <Image
              src={modalData.imageSrc}
              className="roundet-lg max-h-screen object-contain"
              alt="image"
              width={modalData.width}
              height={modalData.height}
            />
          </div>

          {/* 設定値の表示 */}
          <div className="col-span-1">
            <div className="mb-5">
              <div className="font-bold text-sm mb-1">Prompt</div>
              <div>{modalData.prompt}</div>
            </div>

            <div className="mb-5">
              <div className="font-bold text-sm mb-1">Negative Prompt</div>
              <div>{modalData.negative}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-bold text-sm mb-1">Ratio</div>
                <div>{modalData.ratio}</div>
              </div>

              <div>
                <div className="font-bold text-sm mb-1">Size</div>
                <div>
                  {modalData.width} X {modalData.height}
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-1">Seed</div>
                <div>{modalData.seed}</div>
              </div>

              <div>
                <div className="font-bold text-sm mb-1">Steps</div>
                <div>{modalData.steps}</div>
              </div>
            </div>
            {/* end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
