from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from pydantic import BaseModel, Field
import pymupdf
import pandas as pd
import pickle
docs  = pymupdf.open(r"D:\RagPractice\ai_service\data\doc.pdf")
df = pd.read_csv(r"D:\RagPractice\ai_service\data\medicine.csv")
text = ''

for page in docs:
    text+=page.get_text()

splitter  = RecursiveCharacterTextSplitter(
            
                    chunk_size = 500,
                    chunk_overlap = 100,       
            )
chunks = splitter.split_text(text)
df.drop(columns=['Image URL'],inplace=True)

def row_to_text(row):
    return f"""
Medicine Name: {row['Medicine Name']}
Composition: {row['Composition']}
Uses: {row['Uses']}
Side Effects: {row['Side_effects']}
Manufacturer: {row['Manufacturer']}
Excellent Review: {row['Excellent Review %']}%
Average Review: {row['Average Review %']}%
Poor Review: {row['Poor Review %']}%
""".strip()

texts = df.apply(row_to_text,axis=1).tolist()
for tex in texts:
    chunks.append(tex)

model = SentenceTransformer('all-MiniLM-L6-v2')

embeddings = model.encode(chunks)

flat_embeddings = np.array(embeddings).astype('float32')
dimensions = flat_embeddings.shape[1]
index = faiss.IndexFlatL2(dimensions)
index.add(flat_embeddings)

faiss.write_index(index, r"D:\RagPractice\ai_service\vectorDB\index.faiss")
import pickle

with open(
    r"D:\RagPractice\ai_service\vectorDB\chunks.pkl",
    "wb"
) as f:
    pickle.dump(chunks, f)