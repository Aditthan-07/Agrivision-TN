import numpy as np
import os
from PIL import Image, ImageDraw, ImageFilter
import pickle
import json

np.random.seed(42)

DISEASES = {
    "healthy":          {"hue_range": (80, 130),  "saturation": (150, 220), "value": (80, 180)},
    "leaf_blight":      {"hue_range": (15, 35),   "saturation": (100, 180), "value": (60, 140)},
    "brown_spot":       {"hue_range": (10, 25),   "saturation": (120, 200), "value": (50, 130)},
    "blast":            {"hue_range": (20, 40),   "saturation": (80, 160),  "value": (40, 120)},
    "nutrient_deficiency": {"hue_range": (30, 60), "saturation": (100, 180), "value": (100, 200)},
}

def generate_leaf_image(disease_name, idx, split):
    disease = DISEASES[disease_name]
    img = Image.new("RGB", (224, 224), (200, 200, 200))
    draw = ImageDraw.Draw(img)

    h = np.random.randint(*disease["hue_range"])
    s = np.random.randint(*disease["saturation"])
    v = np.random.randint(*disease["value"])

    import colorsys
    r, g, b = colorsys.hsv_to_rgb(h / 360, s / 255, v / 255)
    base_color = (int(r * 255), int(g * 255), int(b * 255))

    points = []
    cx, cy = 112, 112
    for angle in range(0, 360, 15):
        radius = np.random.randint(60, 90)
        px = cx + radius * np.cos(np.radians(angle))
        py = cy + radius * np.sin(np.radians(angle))
        points.append((px, py))

    draw.polygon(points, fill=base_color)

    if disease_name != "healthy":
        for _ in range(np.random.randint(3, 10)):
            sx = np.random.randint(60, 164)
            sy = np.random.randint(60, 164)
            sw = np.random.randint(5, 20)
            sh = np.random.randint(5, 20)
            spot_color = (
                max(0, base_color[0] - 60),
                max(0, base_color[1] - 40),
                max(0, base_color[2] - 30),
            )
            draw.ellipse([sx, sy, sx + sw, sy + sh], fill=spot_color)

    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    noise = np.random.randint(-15, 15, (224, 224, 3), dtype=np.int16)
    img_array = np.clip(np.array(img).astype(np.int16) + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(img_array)

print("Generating synthetic crop disease images...")
for split in ["train", "val"]:
    counts = {"train": 80, "val": 25}
    for disease in DISEASES:
        path = f"datasets/disease_images/{split}/{disease}"
        os.makedirs(path, exist_ok=True)
        for i in range(counts[split]):
            img = generate_leaf_image(disease, i, split)
            img.save(f"{path}/{disease}_{i:04d}.jpg")
    print(f"  {split}: {counts[split]} images per class × {len(DISEASES)} classes")

try:
    import tensorflow as tf
    from tensorflow.keras.applications import MobileNetV2
    from tensorflow.keras import layers, models
    from tensorflow.keras.preprocessing.image import ImageDataGenerator

    print("\nBuilding MobileNetV2 disease classifier...")
    base = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights="imagenet")
    base.trainable = False

    model = models.Sequential([
        base,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation="relu"),
        layers.Dropout(0.3),
        layers.Dense(len(DISEASES), activation="softmax"),
    ])
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

    train_gen = ImageDataGenerator(rescale=1./255, horizontal_flip=True, rotation_range=20)
    val_gen = ImageDataGenerator(rescale=1./255)

    train_data = train_gen.flow_from_directory("datasets/disease_images/train", target_size=(224, 224), batch_size=16)
    val_data = val_gen.flow_from_directory("datasets/disease_images/val", target_size=(224, 224), batch_size=16)

    class_indices = train_data.class_indices
    json.dump(class_indices, open("models/disease_classes.json", "w"))

    history = model.fit(train_data, epochs=5, validation_data=val_data, verbose=1)

    os.makedirs("models", exist_ok=True)
    model.save("models/disease_model.keras")

    final_acc = history.history["val_accuracy"][-1]
    print(f"\nDisease model saved → val_accuracy: {final_acc:.4f}")
    json.dump({"val_accuracy": round(float(final_acc), 4), "classes": list(class_indices.keys())},
              open("models/disease_metrics.json", "w"), indent=2)

except Exception as e:
    print(f"\nTensorFlow training skipped: {e}")
    print("API will use rule-based fallback for disease detection.")
    classes = list(DISEASES.keys())
    json.dump({i: c for i, c in enumerate(classes)}, open("models/disease_classes.json", "w"))
    json.dump({"val_accuracy": 0.0, "classes": classes, "mode": "fallback"}, open("models/disease_metrics.json", "w"), indent=2)
    print("Fallback class map saved.")
