

import embeddings as e
import rag as gen
import relevence_layer as rl
import retriever as r
import web_search as w

from langgraph.graph import StateGraph,START,END
from typing import TypedDict

class Assist(TypedDict):
    query:str
    result:str
    docs:list
    need_web_search:bool
    embeds:list

graph = StateGraph(Assist)

def general(state:Assist) -> Assist:

    embeds = e.gen_embeddings(state['query'])
    result  = r.retrieve(embeds)
    response = rl.relevency_check(result)
    state['need_web_search'] = response
    dox=[]
    if response==False:
        for i in result:
            dox.append(i['chunks'])
    state['docs']=dox
    return state

def route(state : Assist):
    if state['need_web_search']:
        return 'bad'
    return 'good'

def condition_node(state: Assist):
    return state

def web(state:Assist) -> Assist:
    res = w.web_search(state['query'])
    return {'docs':res}


def generate(state : Assist) -> Assist:

    return {'result':gen.generate(state['docs'],state['query'])}


graph.add_node('relevency_check',general)
graph.add_node('web_search',web)
graph.add_node('condition_node',condition_node)
graph.add_node('generate',generate)

graph.add_edge(START,'relevency_check')
graph.add_edge('relevency_check','condition_node')
graph.add_conditional_edges(
    'condition_node',
    route,
    {
        'bad':'web_search',
        'good':'generate'
    }
    )
graph.add_edge('web_search','generate')
graph.add_edge('generate',END)

workflow = graph.compile()

# result = workflow.invoke({
#     "query": "Tell me about Superman",
#     "result": "",
#     "docs": [],
#     "need_web_search": False
# })

    

    


