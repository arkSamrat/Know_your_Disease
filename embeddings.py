from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import numpy as np
import pandas as pd

model = SentenceTransformer('all-MiniLM-L6-v2')

def gen_embeddings(query : str| list[str]) -> np.ndarray:

    if isinstance(query,str):
        query=[query]

    embeds = model.encode(query)
    
    return embeds
