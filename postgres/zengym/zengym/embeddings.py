from sentence_transformers import SentenceTransformer
from numpy import float32

embedder = SentenceTransformer('msmarco-distilbert-base-v4')

def encode(text):
  return embedder.encode(text).astype(float32).tolist()
