package com.medassist.basic.service;
import org.springframework.web.client.RestClient;
import org.springframework.stereotype.Service;
import com.medassist.basic.dto.Response;
import com.medassist.basic.dto.Query;

@Service
public class MedicineService {
    

    private final RestClient restClient;

    MedicineService(RestClient.Builder builder)
    {
        this.restClient = builder.baseUrl("http://localhost:8000").build();
    }


    public String getMedicine(String query)
    {
        String c = "Tell me only medicine names and composition nothing extra";
        query  = c+ query;
        Query q = new Query();

        q.setQuery(query);
        Response res = restClient.post().uri("/ask").body(q).retrieve().body(Response.class);
        // System.out.println(res);
        return res.getResult();
    }
    public String aboutDisease(String query)
    {
        String c = "Tell me only about the disease and medicine information if possible";
        query  = c+ query;
        Query q = new Query();

        q.setQuery(query);
        Response res = restClient.post().uri("/ask/disease").body(q).retrieve().body(Response.class);
        // System.out.println(res);
        return res.getResult();
    }
}
