
from langchain_ollama import ChatOllama 
from pydantic import BaseModel,Field
from langgraph.graph import StateGraph,START,END
from typing import TypedDict,List
import retriever as r

llm = ChatOllama(
    model = "tinyllama",
    temperature=0
)



def relevency_check(res):
    
    flag=False
    text = " "
    if res[0]['dist']>0.75:
        flag=True
        return True
    print(flag)
    return False


