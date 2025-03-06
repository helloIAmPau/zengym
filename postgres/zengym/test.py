from time import sleep
from traceback import print_exc

def test_embeddings_encode():
  pass

try:
  test_embeddings_encode()

  print('All good!')
except:
  print_exc()
finally:
  print('Waiting for changes')

  while True:
    sleep(1)
