import os
from matplotlib import pyplot as plt
import tensorflow as tf
import tensorflow_io as tfio


def load_wav_16k_mono(filename):
    # Load encoded wav file
    file_contents = tf.io.read_file(filename)
    # Decode wav (tensors by channels)
    wav, sample_rate = tf.audio.decode_wav(file_contents, desired_channels=1, desired_samples=48000)
    # Removes trailing axis
    wav = tf.squeeze(wav, axis=-1)
    sample_rate = tf.cast(sample_rate, dtype=tf.int64)
    # Goes from 44100Hz to 16000hz - amplitude of the audio signal
    wav = tfio.audio.resample(wav, rate_in=sample_rate, rate_out=16000)
    return wav

house_sparrows_dir = os.path.join('sounds', 'House Sparrow', 'splits')

lengths = []
for file in os.listdir(house_sparrows_dir):
    print(file)
    tensor_wave = load_wav_16k_mono(os.path.join(house_sparrows_dir, file))
    lengths.append(len(tensor_wave))