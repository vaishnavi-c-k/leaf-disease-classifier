from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from io import BytesIO
import numpy as np

app = Flask(__name__)
CORS(app)

model = load_model("leaf_model.h5")

CLASSES = [
    "Tomato_healthy",
    "Tomato_Late_blight",
    "Tomato_Early_blight",
    "Potato___healthy",
    "Potato___Early_blight"
]

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    img = image.load_img(BytesIO
(file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_index])

    return jsonify({
        "disease": CLASSES[predicted_index],
        "confidence": round(confidence * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)