import { ImageCompression } from '@gkzlabs/image-compression'
import { sinter } from 'sinter-js'
import { compress as gunnyCompress } from '@gunny/compress-image'
import browserImageCompression from 'browser-image-compression'

export type CompressionPreset = 'upload' | 'preview'

export interface ImageCompressionOptions {
  preset?: CompressionPreset
  signal?: AbortSignal
  format?: 'image/webp' | 'image/jpeg' | 'image/png'
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

const PRESETS = {
  upload: { quality: 0.82, maxWidth: 2048, maxHeight: 2048 },
  preview: { quality: 0.78, maxWidth: 1440, maxHeight: 1440 },
} as const

const getExtension = (mimeType: string) =>
  mimeType === 'image/png' ? 'png' : mimeType === 'image/jpeg' ? 'jpg' : 'webp'

const toFile = (blob: Blob, source: File, mimeType: string) => {
  const baseName = source.name.replace(/\.[^/.]+$/, '') || 'image'
  return new File([blob], `${baseName}.${getExtension(mimeType)}`, {
    type: mimeType,
    lastModified: Date.now(),
  })
}

const assertNotAborted = (signal?: AbortSignal) => {
  if (signal?.aborted) throw new DOMException('Image compression was cancelled', 'AbortError')
}

export async function compressImage(
  source: File,
  options: ImageCompressionOptions = {},
): Promise<File> {
  if (!source.type.startsWith('image/')) return source

  const preset = PRESETS[options.preset ?? 'upload']
  const quality = options.quality ?? preset.quality
  const maxWidth = options.maxWidth ?? preset.maxWidth
  const maxHeight = options.maxHeight ?? preset.maxHeight
  const format = options.format ?? 'image/webp'

  assertNotAborted(options.signal)

  try {
    const result = await new ImageCompression().compress(source, {
      quality,
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      signal: options.signal,
    })
    assertNotAborted(options.signal)
    if (result.file instanceof File && result.file.size < source.size) return result.file
  } catch {
    // Continue through progressively broader browser-compatible fallbacks.
  }

  try {
    const result = await gunnyCompress(source, {
      quality,
      format,
      maxWidth,
      maxHeight,
      allowLarger: false,
    })
    assertNotAborted(options.signal)
    if (result.size < source.size) return toFile(result.blob, source, result.format)
  } catch {
    // Continue to sinter and the established fallback below.
  }

  try {
    const blob = await sinter()
      .toFormat(format === 'image/jpeg' ? 'jpeg' : format === 'image/png' ? 'png' : 'webp')
      .maxQuality(Math.round(quality * 100))
      .dimensions({ width: maxWidth, height: maxHeight })
      .compress(source)
    assertNotAborted(options.signal)
    if (blob.size < source.size) return toFile(blob, source, format)
  } catch {
    // browser-image-compression handles browsers without the newer APIs.
  }

  const fallback = await browserImageCompression(source, {
    maxSizeMB: Math.max(source.size / 1024 / 1024, 1),
    maxWidthOrHeight: Math.max(maxWidth, maxHeight),
    initialQuality: quality,
    useWebWorker: true,
    fileType: format,
    signal: options.signal,
  })
  assertNotAborted(options.signal)
  return fallback.size < source.size ? fallback : source
}

export async function compressImages(
  sources: File[],
  options: ImageCompressionOptions = {},
): Promise<File[]> {
  const results: File[] = []
  for (const source of sources) {
    assertNotAborted(options.signal)
    results.push(await compressImage(source, options))
  }
  return results
}

export function useImageCompression() {
  return { compressImage, compressImages }
}

export default useImageCompression

export type { CompressionResult } from '@gkzlabs/image-compression'
export type { CompressResult } from '@gunny/compress-image'
