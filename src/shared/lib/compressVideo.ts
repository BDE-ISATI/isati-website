import {
  ALL_FORMATS,
  BlobSource,
  BufferTarget,
  Conversion,
  Input,
  Mp4OutputFormat,
  Output,
  Quality,
  canEncodeAudio,
  getFirstEncodableVideoCodec,
} from "mediabunny";
import { registerAacEncoder } from "@mediabunny/aac-encoder";

const TARGET_BYTES = 3_500_000;
const MAX_DURATION_SECONDS = 90;
const CONTAINER_MARGIN = 0.92;
const AUDIO_BPS = 64_000;
const MIN_VIDEO_BPS = 200_000;
const MAX_WIDTH = 1280;
const FRAME_RATE = 30;

export type CompressVideoCode =
  | "no_video_track"
  | "no_encoder"
  | "undecodable"
  | "too_long"
  | "conversion_failed";

export class CompressVideoError extends Error {
  code: CompressVideoCode;

  constructor(code: CompressVideoCode) {
    super(code);
    this.code = code;
    this.name = "CompressVideoError";
  }
}

export type CompressVideoResult = {
  file: File
  duration: number
};

export type CompressVideoOptions = {
  targetBytes?: number
  maxDurationSeconds?: number
  onProgress?: (ratio: number, bytesWritten: number) => void
  signal?: AbortSignal
};

export default async function compressVideo(file: File, options: CompressVideoOptions = {}): Promise<CompressVideoResult> {

  const targetBytes = options.targetBytes ?? TARGET_BYTES;
  const maxDuration = options.maxDurationSeconds ?? MAX_DURATION_SECONDS;

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });

  const duration = await input.computeDuration();
  const videoTrack = await input.getPrimaryVideoTrack();
  if (!videoTrack) throw new CompressVideoError("no_video_track");

  if (file.size <= targetBytes) {
    return { file, duration };
  }

  const format = new Mp4OutputFormat();
  const videoCodec = await getFirstEncodableVideoCodec(format.getSupportedVideoCodecs());
  if (!videoCodec) throw new CompressVideoError("no_encoder");
  if (!(await videoTrack.canDecode())) throw new CompressVideoError("undecodable");
  if (duration > maxDuration) throw new CompressVideoError("too_long");

  if (!(await canEncodeAudio("aac"))) {
    registerAacEncoder();
  }

  const audioTrack = await input.getPrimaryAudioTrack();
  const audioBps = audioTrack ? AUDIO_BPS : 0;
  const videoBps = Math.floor((targetBytes * 8 * CONTAINER_MARGIN) / duration) - audioBps;
  if (videoBps < MIN_VIDEO_BPS) throw new CompressVideoError("too_long");

  const output = new Output({ format, target: new BufferTarget() });

  const conversion = await Conversion.init({
    input,
    output,
    tracks: "primary",
    video: async (track) => ({
      width: Math.min(await track.getDisplayWidth(), MAX_WIDTH),
      frameRate: FRAME_RATE,
      codec: "avc",
      quality: new Quality({ bitrate: videoBps, bitrateMode: "constant" }),
    }),
    audio: {
      codec: "aac",
      numberOfChannels: 1,
      quality: new Quality({ bitrate: AUDIO_BPS }),
    },
  });

  if (!conversion.isValid) throw new CompressVideoError("conversion_failed");

  let bytesWritten = 0;
  const stopListening = output.target.on("write", ({ end }) => {
    bytesWritten = Math.max(bytesWritten, end);
  });

  conversion.onProgress = (progress) => options.onProgress?.(progress, bytesWritten);

  const abort = () => { void conversion.cancel(); };
  options.signal?.addEventListener("abort", abort);

  try {
    await conversion.execute();
  } finally {
    stopListening();
    options.signal?.removeEventListener("abort", abort);
  }

  const buffer = output.target.buffer;
  if (!buffer) throw new CompressVideoError("conversion_failed");

  return {
    file: new File([buffer], "preuve.mp4", { type: "video/mp4" }),
    duration,
  };
}

