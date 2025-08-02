import { useState, useRef } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function MirrorSpace() {
  const [input, setInput] = useState("");
  const [reflection, setReflection] = useState("");
  const [audio, setAudio] = useState(null);
  const [recording, setRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const generateReflection = () => {
    if (!input.trim()) return;
    const tone = input.toLowerCase().includes("love")
      ? "This is a heart-centered wave."
      : input.toLowerCase().includes("dark")
      ? "You’re processing shadow with strength."
      : "This is a creative impulse seeking form.";
    setReflection(
      `Mirror Response:\n${tone}\nKeep weaving. Your expression holds frequency.`
    );
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudio(URL.createObjectURL(file));
    }
  };

  const toggleRecording = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setVoiceNote(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <Card>
        <CardContent>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 16 }}>MirrorSpace: Creative Log</h2>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            style={{ display: 'block', width: '100%', marginBottom: 16 }}
          />

          {audio && (
            <audio controls src={audio} style={{ width: '100%', marginBottom: 16 }}>
              Your browser does not support the audio element.
            </audio>
          )}

          <Button onClick={toggleRecording} style={{ width: '100%', marginBottom: 16 }}>
            {recording ? "Stop Recording" : "Record Voice Note"}
          </Button>

          {voiceNote && (
            <audio controls src={voiceNote} style={{ width: '100%', marginBottom: 16 }}>
              Your browser does not support the audio element.
            </audio>
          )}

          <Textarea
            placeholder="Write your lyrics, scenes, skits, or reflections here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ minHeight: 120, width: '100%', marginBottom: 16 }}
          />

          <Button onClick={generateReflection} style={{ width: '100%' }}>
            Reflect
          </Button>

          {reflection && (
            <div style={{ marginTop: 24, background: '#35355a', borderRadius: 12, padding: 18, whiteSpace: 'pre-wrap' }}>
              {reflection}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}