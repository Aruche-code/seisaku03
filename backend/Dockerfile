# ベースイメージ -slim
FROM python:3.11-slim

# ワークディレクトリの設定
WORKDIR /app

# 依存関係のインストール
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# カレントディレクトリの内容を/appのコンテナにコピー。
COPY . .

# ポートの公開
EXPOSE 8000

# Uvicornでアプリケーションを起動 --reloadオプションは開発環境なので付けています。
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000","--reload"]