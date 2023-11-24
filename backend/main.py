# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import service
import glob
import os
from io import BytesIO
from zipfile import ZipFile
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()


# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# リクエストペイロード(型定義)
class PayloadType(BaseModel):
    prompt: str
    negative: str
    count: int
    width: int
    height: int
    scale: float
    steps: int
    seedList: list


# 画像生成API
@app.post("/api/generate/")
async def generate(payload: PayloadType):
    # 画像生成処理を試みる
    try:
        images = await service.generate_image(payload)
        # 画像をZIPファイルにパッケージング
        zip_buffer = BytesIO()
        # ZIPファイルを作成、モードでファイルに書き込みが可能
        with ZipFile(zip_buffer, "w") as zip_file:
            # 各indexと画像のリストをループ
            for i, image in enumerate(images):
                # 画像データを一時的に保存するためのバッファを作成
                memory_stream = BytesIO()
                # 画像データをmemory_streamにPNG形式で保存
                image.save(memory_stream, format="png")
                # バッファの位置を先頭に戻す
                # 次の操作でバッファのデータを正しく読み出すことができる
                memory_stream.seek(0)
                # ZIPファイルに画像データを書き込む
                zip_file.writestr(f"image_{i}.png", memory_stream.getvalue())
        # バッファを先頭に戻す
        zip_buffer.seek(0)
        # ZIPファイルとしてクライアントに提供
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=images.zip"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")


# 画像取得API
@app.get("/images")
async def get_images():
    images_path = "./outputs/*.png"
    image_paths = glob.glob(images_path)
    images = []
    for path in image_paths:
        file_name = os.path.basename(path)
        images.append({"name": file_name, "path": path})

    return JSONResponse(images)


# 画像削除API
@app.delete("/images/{img_name}")
async def delete_image(img_name: str):
    image_path = f"./outputs/{img_name}"

    if os.path.exists(image_path):
        os.remove(image_path)
        return {"message": "Image deleted successfully!"}
    else:
        return {"error": "Image not found!"}
