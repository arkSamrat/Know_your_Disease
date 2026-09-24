from fastapi import FastAPI
from pydantic import BaseModel
import graph

app = FastAPI()

workflow = graph.workflow

class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    result: str



@app.post("/ask", response_model=QueryResponse)
def ask(request: QueryRequest):
    # print(request.query)
    result = workflow.invoke({
        "query": request.query,
        "result": "",
        "docs": [],
        "need_web_search": False,
    })
    # print(result["result"])
    return {
        "result": result["result"]
    }

@app.post("/ask/disease", response_model=QueryResponse)
def ask(request: QueryRequest):
    # print(request.query)
    result = workflow.invoke({
        "query": request.query,
        "result": "",
        "docs": [],
        "need_web_search": False,
    })
    # print(result["result"])
    return {
        "result": result["result"]
    }