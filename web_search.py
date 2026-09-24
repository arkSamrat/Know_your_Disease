from ddgs import DDGS



def web_search(query):
    res = []
    
    with DDGS() as ddgs:
        results = ddgs.text(
            query,
            max_results=5
        )

        for i in results:
            res.append(i["body"])
        print(res)
    return res

