import numpy as np
import librosa
import os

from pydub.silence import split_on_silence
from scipy.io import wavfile
import noisereduce as nr

import pydub
from utils import birds, dir_for_birds
from pydub.exceptions import CouldntDecodeError


def to_wav(bird, path):
    bird_dir = os.path.join(path, 'sounds', bird)
    bird_dir_sounds = os.path.join(bird_dir, dir_for_birds[bird])
    converted_files = []
    os.chdir(bird_dir_sounds)
    print(os.getcwd())
    delete_wavs = False
    print("recycling old stuff")

    for file in os.listdir(bird_dir_sounds):
        if '.wav' in file:
            if not delete_wavs:
                print(f"Do you want to delete all the .wav files inside {bird_dir_sounds} ?")
                delete_wavs = bool(int(input("1/0")))
            if delete_wavs:
                os.remove(file)

    print("writing .wav files")
    failed_files = []

    for file in os.listdir(bird_dir_sounds):
        mp3_file_path = os.path.join(os.getcwd(), file)  # Construct the full file path
        print(file)
        try:
            if '.mp3' in mp3_file_path:
                sound = pydub.AudioSegment.from_mp3(mp3_file_path)  # Load the MP3 file
                sound.export(f"{file.split('.')[0]}.wav", bitrate=16000, format="wav", )
                converted_files.append(file)
        except CouldntDecodeError as e:
            failed_files.append(file)

    print('failed for: ', failed_files)

    for file in failed_files:
        try:
            mp3_file_path = os.path.join(os.getcwd(), file)  # Construct the full file path
            sound = pydub.AudioSegment.from_file(mp3_file_path, format='mp4')  # Load the MP3 file
            sound.export(f"{file.split('.')[0]}.wav", format="wav")
            converted_files.append(file)
        except:
            pass

    print('deleting old mp3 files')

    for file in converted_files:
        os.remove(file)

    os.chdir(path)


def reduce_noise_(directory, sound_name, save_to):
    sound_path = directory + '\\' + sound_name
    rate, data = wavfile.read(sound_path)

    # Check if audio is stereo
    if len(data.shape) == 2 and data.shape[1] == 2:
        # If already stereo, reshape it properly
        data = np.transpose(data)
    else:
        # If mono, duplicate the channel
        data = np.stack((data, data))

    # Reduce noise
    reduced_noise = nr.reduce_noise(y=data, sr=rate, stationary=True)

    # Save the reduced noise audio
    reduced_file_name = fr"{save_to}\{sound_name.split('.')[0]}_reduced.wav"
    wavfile.write(reduced_file_name, rate, reduced_noise.T)  # Transpose back to original shape
    return reduced_file_name


def split_bird(bird, path):
    bird_dir = os.path.join(path, 'sounds', bird)
    bird_dir_sounds = os.path.join(bird_dir, f"{dir_for_birds[bird]}_reduced")
    os.chdir(bird_dir)
    try:
        os.mkdir('splits')
    except FileExistsError as e:
        pass
    file_count = 0
    for file in os.listdir(bird_dir_sounds):
        splits = split(file, f"{bird_dir_sounds}\\")
        print(len(splits), f" from {file}")
        save_slips(bird, splits, file_count)
        file_count += len(splits)
    os.chdir(path)


def split(file, path):
    print(file)
    sound = pydub.AudioSegment.from_file(path + file)
    chunks = split_on_silence(
        sound,
        min_silence_len=500,
        silence_thresh=sound.dBFS - 16,
        keep_silence=250
    )
    return chunks


def save_slips(bird_name, splits, file_count):
    export_path = os.path.join('.', 'splits')
    for _, split in enumerate(splits):
        split.export(f"{export_path}/{bird_name.split('.')[0]}_{file_count}.wav", format="wav", bitrate='16k')
        file_count += 1


def reduce_bird(bird, path):

    bird_dir = os.path.join(path, 'sounds', bird)
    os.chdir(bird_dir)
    bird_dir_sounds = os.path.join(bird_dir, dir_for_birds[bird])
    reduced_dir_name = f"{dir_for_birds[bird]}_reduced"

    try:
        os.mkdir(f"{reduced_dir_name}")
    except FileExistsError as e:
        print(e)

    reduced_dir = os.path.join(bird_dir, f"{reduced_dir_name}")

    for file in os.listdir(bird_dir_sounds):
        reduce_noise_(directory=bird_dir_sounds, sound_name=file, save_to=reduced_dir)

    os.chdir(path)

if __name__ == "__main__":
    # rate, data = wavfile.read(r"D:\DSUsers\uie32539\bird_reco\sounds\724642.wav")
    # reduced_noise = nr.reduce_noise(y=data, sr=rate)
    # reduced_file_name = fr"D:\DSUsers\uie32539\bird_reco\sounds\House Sparrow\HouseSparrow_reduced\806713_reduced.wav"
    # wavfile.write(reduced_file_name, 44000, reduced_noise)
    #
    # split_bird("House Sparrow", os.getcwd())
    pass
    # print(split(reduced_file_name))
