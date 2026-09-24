from langchain_ollama import ChatOllama 
from pydantic import BaseModel,Field
from langgraph.graph import StateGraph,START,END
from typing import TypedDict,List
import retriever as r
import relevence_layer as rl


llm = ChatOllama(
    model = "tinyllama",
    temperature=0
)


def generate(docs,query) -> str:

    
    res = "\n\n".join(doc for doc in docs)

    
    prompt = prompt = f"""
    You are a helpful medical assistant.

    Answer the user's question using the provided context.
    If the answer cannot be found in the context, say that you don't know.
    try not tell that any context is provided to you
    Context:
    {res}

    Question:
    {query}
    """
    response= llm.invoke(prompt).content
    
    return response
