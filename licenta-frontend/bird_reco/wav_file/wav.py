import wave
import base64


def write_wav(file):
    with open(r"C:\dumi\IP\fastApiProject1\received.txt", 'rb') as f:

        data = base64.b64decode(f.read())
        obj = wave.open(file, 'wb')
        obj.setnchannels(1)
        obj.setsampwidth(1)
        obj.setframerate(48000)
        obj.writeframes(data)
        obj.close()

def main():
    obj = wave.open(r'C:\dumi\bird_recognizer\data\greattit_\724372.wav', 'rb')
    #
    # obj = wave.open(r'C:\dumi\IP\fastApiProject1\sound.wav', 'rb')

    print("framerate ", obj.getframerate())
    print("nr of channels ", obj.getnchannels())
    print("sample width ", obj.getsampwidth())
    print("nr of frames", obj.getnframes())
    print("parameters", obj.getparams())

    print("duration", obj.getnframes()/obj.getframerate())


if __name__ == "__main__":
    # main()
    write_wav(r'C:\dumi\IP\fastApiProject1\sound_.wav')
