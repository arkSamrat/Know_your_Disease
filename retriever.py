import embeddings as e
import vectorDB
import faiss
import pickle

index = faiss.read_index(r"D:\RagPractice\ai_service\vectorDB\index.faiss")
# chunks = 
chunks =[]
with open(r"D:\RagPractice\ai_service\vectorDB\chunks.pkl","rb") as f:
            chunks = pickle.load(f)
    


def retrieve(embeds) -> list:
    k=2
    distances,indices = index.search(embeds,k)
    
    result = []
    for i,dist in zip(indices[0],distances[0]):
        if i==-1:
            continue

        result.append({
               "chunks":chunks[i],
               "dist":dist
               })

    return result


    
