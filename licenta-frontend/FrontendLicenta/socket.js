import { io } from 'socket.io-client';
import * as FileSystem from "expo-file-system";

export const socket = io('http://192.168.1.3:8000'); // use the IP address of your machine


const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


export async function uploadChunksToServer(recordingInstance, chunkSize, delayBetweenChunks) {
  await sleep(4000);

  let info = await FileSystem.getInfoAsync(recordingInstance.getURI());
  let uri = info.uri;
  let currentPosition = 0;

  let current_file_size = info.size;
  let prev_pos = 0;
  let seconds = 5;

  do{
    try{

      let info = await FileSystem.getInfoAsync(recordingInstance.getURI());
      current_file_size = info.size;

        if (currentPosition + chunkSize >= current_file_size &&  currentPosition === prev_pos && prev_pos !== 0){
          console.log('blocked')
          continue;

        }
        else{
          const fileChunk = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
              position: currentPosition,
              length: chunkSize
            })
            currentPosition += chunkSize;
            socket.emit('audioData', fileChunk);
          }
          prev_pos = currentPosition;

    }
    catch (e) {
      console.log(e);
    }
    if (recordingInstance._isDoneRecording && current_file_size - currentPosition < chunkSize){
          const fileChunk = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
          position: currentPosition,
          length: current_file_size - currentPosition
        })
        currentPosition += current_file_size - currentPosition;
        socket.emit('audioData', fileChunk);
        break
      }

    // if(seconds < parseInt(current_file_size / 96000)){
    //     socket.emit('write_file', 1);
    //     seconds = seconds + 5;
    // }

    await sleep(delayBetweenChunks);

  }


  while(currentPosition < current_file_size)
  console.log("final report >> ", currentPosition, current_file_size);
  console.log('exiting');
  socket.emit('write_file', 1);


}


