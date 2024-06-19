import os

from sound_processing.sound_processing import reduce_bird, to_wav, split_bird
from utils import birds
from xeno_wrapper.xeno_wrapper import download_sounds


def main():
    for bird in birds:
        # to_wav(bird, os.getcwd())
        reduce_bird(bird, os.getcwd())


if __name__ == "__main__":
    # download_sounds(birds)
    for bird in birds:
        to_wav(bird, os.getcwd())
        reduce_bird(bird, os.getcwd())
        split_bird(bird, os.getcwd())

