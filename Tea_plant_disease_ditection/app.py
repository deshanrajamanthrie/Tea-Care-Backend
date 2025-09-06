from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms, models
from PIL import Image

app = Flask(__name__)
CORS(app)

# --- Load Model ---
# Define architecture (must match training)
model = models.resnet18(pretrained=False)
model.fc = torch.nn.Linear(model.fc.in_features, 8)  # 8 classes

try:
    state_dict = torch.load("model.pth", weights_only=True)
    model.load_state_dict(state_dict)
except Exception:
    model = torch.load("model.pth", weights_only=False)

model.eval()

# --- Preprocessing ---
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# --- Class labels ---
classes = [
    'Anthracnose', 'algal leaf', 'bird eye spot',
    'brown blight', 'gray light', 'healthy',
    'red leaf spot', 'white spot'
]

# --- API Routes ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        img = Image.open(file).convert('RGB')
        img = transform(img).unsqueeze(0)

        with torch.no_grad():
            outputs = model(img)
            _, predicted = torch.max(outputs, 1)
            class_name = classes[predicted.item()]

        return jsonify({"prediction": class_name})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
