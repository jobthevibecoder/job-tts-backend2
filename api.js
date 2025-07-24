import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text required" });

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: text,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());

  res.setHeader("Content-Type", "audio/mpeg");
  res.send(buffer);
}
