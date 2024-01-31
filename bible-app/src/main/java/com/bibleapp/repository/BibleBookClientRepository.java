package com.bibleapp.repository;

import java.io.File;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.TransportUtils;
import co.elastic.clients.transport.rest_client.RestClientTransport;

@Repository
public class BibleBookClientRepository {

	@Value("${elasticsearch.certificate.file.name}")
	private String elasticsearchCertificateFileName;

	@Value("${elasticsearch.user.name}")
	private String elasticsearchUserName;

	@Value("${elasticsearch.user.password}")
	private String elasticsearchUserPassword;

	@Value("${elasticsearch.server.url}")
	private String elasticsearchServerUrl;
	
	public ElasticsearchClient getElasticsearchClient() throws Exception {
		return getElasticsearchClient(elasticsearchCertificateFileName, elasticsearchUserName, elasticsearchUserPassword, elasticsearchServerUrl);
	}
		
	public ElasticsearchClient getElasticsearchClient(String certName, String userName, String password, String serverUrl) throws Exception {
		File certFile = new File(certName);
		SSLContext sslContext = TransportUtils
			    .sslContextFromHttpCaCrt(certFile);
		BasicCredentialsProvider credsProv = new BasicCredentialsProvider(); 
		credsProv.setCredentials(
		    AuthScope.ANY, new UsernamePasswordCredentials(userName, password)
		);

		RestClient restClient = RestClient
		    .builder(HttpHost.create(serverUrl)) 
		    .setHttpClientConfigCallback(hc -> hc
		        .setSSLContext(sslContext) 
		        .setDefaultCredentialsProvider(credsProv)
		    )
		    .build();

		// Create the transport and the API client
		ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
		ElasticsearchClient client = new ElasticsearchClient(transport);
		return client;
	}
}
