import * as FileSystem from "expo-file-system";
import {Audio} from "expo-av";
import {socket, uploadChunksToServer} from './socket';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native';
import MicIcon from './assets/icons/MicIcon.svg';
import StopIcon from './assets/icons/StopIcon.svg';
import Svg, { Path } from "react-native-svg"


export default function Recorder(){

const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sending, setSending] = useState(false);
  const [recordingBackLog, setRecordingBackLog] = useState([]);

  const [isRecording, setIsRecording] = React.useState(false);
  const [prevLen, setPrevLen] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

const MicIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 64 64">
    <Path d="M32 0a10 10 0 00-10 10v22a10 10 0 0020 0V10A10 10 0 0032 0zm18 32a18 18 0 01-36 0h-4a22 22 0 0044 0h-4zm-18 22a4 4 0 01-4-4h8a4 4 0 01-4 4z" />
  </Svg>
);

const StopIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 64 64">
    <Path d="M16 16h32v32H16z" />
  </Svg>
);

  useEffect(() => {
    if (socket.connected) {
      console.log('connected')
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

const convertMP4ToBase64 = async (uri, delay = 0) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
      position: 0,
      length: 100
    });

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return fileContent;
  } catch (error) {
    console.error('Error converting MP4 to base64:', error);
    return null;
  }
};

async function startRecording() {

  try {
    const perm = await Audio.requestPermissionsAsync();
    if (perm.status === "granted") {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync({
        android:{
          extension: '.wav',
          linearPCMIsBigEndian:false,
        },
        ios:{
          extension: '.wav',
          linearPCMIsBigEndian:false,
          audioQuality: 64,
          },
      });

      await recordingInstance.startAsync();

      setRecording(recordingInstance);
      setRecordingBackLog(prevBackLog => [...prevBackLog, recordingInstance]);

      await uploadChunksToServer(recordingInstance,  96000 * 3, 950 * 5 );

      recordingInstance.setOnRecordingStatusUpdate(async (status) => {
      });

    }
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

  async function stopRecording() {
    setPrevLen(0);
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      let allRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      allRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });
      setRecordings(allRecordings);
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(undefined);
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
  }

  function toggleRecording() {
    setIsRecording(prevState => !prevState);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([]);
  }

  return (
   <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.microphoneButton}>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.microphoneButton}>
          {recording ? <StopIcon /> : <MicIcon />}
        </TouchableOpacity>
        </TouchableOpacity>
      </View>
     <View style={styles.separatorContainer}>
       <Text style={styles.separator}>----------------------------------------------------</Text>
     </View>
     <ScrollView style={styles.recordingsContainer}>
       {getRecordingLines()}
        {recordings.length > 0 && (
          <View style={styles.clearButtonContainer}>
            <TouchableOpacity onPress={clearRecordings} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Recordings</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  microphoneButton: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 50,
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  separator: {
    fontSize: 14,
    color: '#ccc',
  },
  recordingsContainer: {
    flex: 1,
  },
  clearButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
  },
});