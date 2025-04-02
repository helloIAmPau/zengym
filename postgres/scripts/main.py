from time import sleep
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
from threading import Lock
from subprocess import run

lock = Lock()
src_path = None

class Watcher(FileSystemEventHandler):
  def on_any_event(self, event):
    global src_path

    if event.is_directory == True or event.event_type != 'closed':
      return

    with lock:
      src_path = event.src_path
    

watcher = Watcher()
observer = Observer()
observer.schedule(watcher, '/scripts/modules', recursive=True)
observer.start()

try:
  while True:
    try:
      with lock:
        if src_path == None:
          continue

        script = src_path
        src_path = None

      run(['python3', script])
    finally:
      sleep(1)
finally:
  observer.stop()
  observer.join()
