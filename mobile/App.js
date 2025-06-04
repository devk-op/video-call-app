import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const SIGNAL_URL = 'ws://localhost:8000/ws/myroom';
const isCaller = true; // Set to false on the answering device

export default function App() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const ws = useRef(null);
  const pc = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
  );

  useEffect(() => {
    const start = async () => {
      const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      stream.getTracks().forEach((t) => pc.current.addTrack(t, stream));

      ws.current = new WebSocket(SIGNAL_URL);

      ws.current.onmessage = async (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'offer') {
          await pc.current.setRemoteDescription(msg.offer);
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          ws.current.send(JSON.stringify({ type: 'answer', answer }));
        } else if (msg.type === 'answer') {
          await pc.current.setRemoteDescription(msg.answer);
        } else if (msg.type === 'ice') {
          await pc.current.addIceCandidate(msg.candidate);
        }
      };

      pc.current.onicecandidate = (e) => {
        if (e.candidate) {
          ws.current.send(JSON.stringify({ type: 'ice', candidate: e.candidate }));
        }
      };

      pc.current.ontrack = (e) => {
        if (e.streams && e.streams[0]) {
          setRemoteStream(e.streams[0]);
        }
      };

      if (isCaller) {
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);
        ws.current.onopen = () => {
          ws.current.send(JSON.stringify({ type: 'offer', offer }));
        };
      }
    };

    start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={styles.self} />
      )}
      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={styles.remote} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  self: {
    width: '100%',
    height: '40%',
  },
  remote: {
    width: '100%',
    height: '60%',
  },
});
