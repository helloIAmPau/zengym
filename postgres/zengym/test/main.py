from time import sleep
from traceback import print_exc

def test_embeddings_encode():
  from zengym.embedding import encode

  r = encode('chicken')
  assert 768 == len(r)
  print(r)

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
