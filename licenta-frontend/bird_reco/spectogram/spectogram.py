import numpy as np
import matplotlib.pyplot as plt
from pydub import AudioSegment
import librosa
import librosa.display


def convert_to_wav(mp3_file, wav_file):
    sound = AudioSegment.from_mp3(mp3_file)
    sound.export(wav_file, format="wav")


def spectrogram_(file):
    # Read some sample file (replace with your data):
    # Load WAV file
    y, sr = librosa.load(file)
    print(y, sr)
    # Compute spectrogram
    S = librosa.stft(y)
    D = librosa.amplitude_to_db(abs(S), ref=np.max)
    # Plot spectrogram
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Spectrogram')
    plt.show()


if __name__ == "__main__":
    # spectrogram_(r'C:\dumi\bird_recognizer\data\greattit_\724372.wav')
    spectrogram_(r'D:\DSUsers\uie32539\bird_reco\sounds\724642_reduced.wav')
    # spectrogram_(r'C:\dumi\bird_recognizer\data\greattit_\724845.wav')
