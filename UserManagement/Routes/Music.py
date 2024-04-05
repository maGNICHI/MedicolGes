import sys
from pytube import YouTube
from pydub import AudioSegment
import requests
import os
from pathlib import Path
from datetime import datetime
import subprocess

# Set paths to ffmpeg and ffprobe
AudioSegment.converter = r"C:\ffmpeg\bin\ffmpeg.exe"
AudioSegment.ffprobe = r"C:\ffmpeg\bin\ffprobe.exe"
os.environ["PATH"] += os.pathsep + r'C:\ffmpeg\bin'

def sanitize_filename(filename):
    """Sanitize filename by removing or replacing invalid characters."""
    invalid_chars = '<>:"/\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    return filename

def embed_album_art_ffmpeg(audio_path, image_path):
    """Embeds album art into an MP3 file using FFmpeg."""
    output_path = audio_path.with_suffix('.temp.mp3')
    cmd = [
        'ffmpeg',
        '-i', str(audio_path),
        '-i', str(image_path),
        '-map', '0:0',
        '-map', '1:0',
        '-c', 'copy',
        '-id3v2_version', '3',
        '-metadata:s:v', 'title="Album cover"',
        '-metadata:s:v', 'comment="Cover (front)"',
        str(output_path)
    ]
    subprocess.run(cmd, check=True)
    os.replace(output_path, audio_path)  # Replace original file with the new one

def download_video_as_mp3(youtube_url, output_folder):
    try:
        yt = YouTube(youtube_url)
        title = sanitize_filename(yt.title)
        folder_path = Path(output_folder)
        folder_path.mkdir(parents=True, exist_ok=True)

        # Select the highest quality audio stream
        video = yt.streams.get_audio_only()
        temp_file = video.download(output_path=folder_path)

        # Output filename incorporates the title
        output_path = folder_path / f"{title}.mp3"
        
        # Convert to MP3
        audio_segment = AudioSegment.from_file(temp_file)
        audio_segment.export(output_path, format='mp3', bitrate="320k")

        # Download the thumbnail
        thumb_url = yt.thumbnail_url
        response = requests.get(thumb_url)
        thumb_path = folder_path / "thumbnail.jpg"
        with open(thumb_path, 'wb') as thumb_file:
            thumb_file.write(response.content)

        # Embed the thumbnail as album art
        embed_album_art_ffmpeg(output_path, thumb_path)

        print(f"Downloaded and converted to MP3: {output_path}")

        # Cleanup temporary files
        os.remove(temp_file)
        os.remove(thumb_path)  # Remove thumbnail after embedding
    except Exception as e:
        print(f"Error processing {youtube_url}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python your_script.py <youtube_url>")
        sys.exit(1)

    youtube_url = sys.argv[1]
    output_folder = Path('C:/Users/sinoh/Desktop/NewMusicFolder')
    download_video_as_mp3(youtube_url, output_folder)
