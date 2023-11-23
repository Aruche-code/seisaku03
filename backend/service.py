import torch
import datetime
from diffusers import StableDiffusionPipeline

# モデル設定
# https://huggingface.co/shibal1/anything-v4.5-clone
# 自由にDiffusionモデルを変更してください
# 注意: ライセンスにはお気をつけてください
# model_id = "stabilityai/stable-diffusion-2-1"
model_id = "shibal1/anything-v4.5-clone"

# モデルの読み込み
pipe = StableDiffusionPipeline.from_pretrained(model_id)

# GPU/CPUチェック
if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"


# デバイスの設定
pipe = pipe.to(device)


# 画像生成処理
async def generate_image(payload):
    # シードを設定
    generator_list = []
    for i in range(payload.count):
        generator_list.append(torch.Generator(device).manual_seed(payload.seedList[i]))

    # 画像生成
    images_list = pipe(
        [payload.prompt] * payload.count,
        width=payload.width,
        height=payload.height,
        negative_prompt=[payload.negative] * payload.count,
        guidance_scale=payload.scale,
        num_inference_steps=payload.steps,
        generator=generator_list,
    )

    images = []
    # 画像を保存
    for i, image in enumerate(images_list["images"]):
        file_name = (
            "./outputs/image_"
            + datetime.datetime.now().strftime("%Y%m%d_%H%M%S%f")[:-3]
            + ".png"
        )
        image.save(file_name)
        images.append(image)

    return images
