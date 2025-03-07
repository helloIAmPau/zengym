from time import sleep
from traceback import print_exc

def test_embeddings_encode():
  from zengym.embeddings import encode

  r = encode('a text')
  assert 768 == len(r)

try:
  print('Loading tests')

  test_embeddings_encode()

  print('All good!')
except:
  print_exc()
finally:
  print('Waiting for changes')

  while True:
    sleep(1)
