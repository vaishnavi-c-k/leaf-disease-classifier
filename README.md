# 🌿 Leaf Disease Classifier

An AI-powered web app that identifies plant diseases from leaf photos. Upload an image of a tomato or potato leaf, and the model tells you whether it's healthy or diseased — along with a confidence score.

Built as a step toward **TreeSurvive**, a larger tree health monitoring platform.

---

## What it does

Upload a leaf photo → the model analyzes it → you get an instantresult like:
Result: Tomato Healthy
Confidence: 98.66%

It can currently recognize 5 categories:
- Tomato — Healthy
- Tomato — Early Blight
- Tomato — Late Blight
- Potato — Healthy
- Potato — Early Blight

---

## 🌱 The Biology, Explained Simply

You don't need a plant science background to understand what this project detects. Here's the plain-English version:

**Healthy leaves** look normal — even green color, smooth texture, no spots.

**Early Blight** is caused by a fungus. It shows up as **dark brown spots that look like little targets or bullseyes** (rings within rings) on the leaf, usually starting on the older, lower leaves first. Think of it like a mold spreading in circular patches.

**Late Blight** is caused by a different, faster-spreading organism. It's actually the same disease responsible for the **Irish Potato Famine in the 1840s** — one of the most devastating crop failures in history. It causes irregular, water-soaked, dark patches on the leaf that can spread very quickly in cool, damp weather, sometimes destroying a whole field within days.

**Why tomato and potato together?** These two plants are botanical cousins — both belong to the same plant family (nightshades), similar to how humans and chimpanzees are both primates. Because they're closely related, they're vulnerable to some of the same diseases, which is why Early Blight affects both of them, while Late Blight (the famine disease) is included here specifically for tomato.

In short: this tool helps a farmer or gardener catch these diseases early — from a photo — instead of relying on trained experts walking every row of crops. Early detection means the difference between saving a plant and losing an entire harvest.

---

## Tech Stack

**Machine Learning**
- TensorFlow / Keras
- MobileNetV2 (pretrained, via transfer learning)
- Trained on the PlantVillage dataset

**Backend**
- Flask (Python) — serves the trained model as a REST API

**Frontend**
- React
- Drag-and-drop image upload, live preview, styled results

---

## Model Performance

- Training accuracy: **97.17%**
- Validation accuracy: **~96%**
- Trained over 10 epochs using frozen MobileNetV2 base layers + a custom classification head

---

## How It Works (Technical Overview)

1. **Transfer Learning**: Instead of training a neural network from scratch, this project reuses MobileNetV2 — a model already trained on millions of general images — and only trains a small new "head" on top for the 5 leaf categories.

2. **Data Augmentation**: During training, images are randomly rotated, flipped, and zoomed so the model learns real disease patterns instead of memorizing exact photos.

3. **Flask API**: The trained model is loaded once when the server starts. When a user uploads a photo, it's resized, normalized, and passed through the model, which returns a predicted disease and confidence score as JSON.

4. **React Frontend**: A simple, clean interface for uploading a photo and viewing the result, communicating with the Flask API.

---

## Known Limitations

- The model only recognizes the 5 trained categories — uploading an unrelated image still returns a confident (but meaningless) guess, since there's no "unknown" category.
- Trained on lab-style photos; may be less accurate on messy real-world photos.

---

## Future Improvements

- Add more disease classes and plant species
- Add a confidence threshold to flag uncertain predictions
- Deploy live (Flask on Render, React on Vercel)
- Integrate into the TreeSurvive platform

---

## Author

Built by [Vaishnavi C K](https://github.com/vaishnavi-c-k)
