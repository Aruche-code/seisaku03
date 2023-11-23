# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import service
from io import BytesIO
from zipfile import ZipFile
from fastapi.responses import StreamingResponse

app = FastAPI()


# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ルート
@app.get("/")
async def root():
    return {"message": "Hello World"}


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
