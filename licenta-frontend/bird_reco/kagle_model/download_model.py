import kagglehub

# Download latest version
path = kagglehub.model_download("google/bird-vocalization-classifier/tensorFlow2/bird-vocalization-classifier")

print("Path to model files:", path)
