from sentence_transformers import SentenceTransformer
from numpy import int8, float32

#model = SentenceTransformer('msmarco-distilbert-base-v4')
# shape 384
model = SentenceTransformer('all-MiniLM-L6-v2')

def encode(text):
#  with model.truncate_sentence_embeddings(truncate_dim=256):
  return model.encode(text).astype(float32).tolist()
