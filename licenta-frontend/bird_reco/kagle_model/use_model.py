import tensorflow_hub as hub
import numpy as np
# Load the model.

model = hub.load('https://www.kaggle.com/models/google/bird-vocalization-classifier/TensorFlow2/bird-vocalization-classifier/8')

# Input: 5 seconds of silence as mono 32 kHz waveform samples.
waveform = np.zeros(5 * 32000, dtype=np.float32)

# Run the model, check the output.
logits = model.infer_tf(waveform[np.newaxis, :])

print(logits)
