package com.example.application;

import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.server.communication.IndexHtmlResponse;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public VaadinServiceInitListener cspNonceInjector() {
        return initEvent -> initEvent.addIndexHtmlRequestListener(Application::injectCspNonce);
    }

    private static void injectCspNonce(IndexHtmlResponse response) {
        // Use CSP only in production mode since dev mode uses eval()
        if (!response.getVaadinRequest().getService().getDeploymentConfiguration().isProductionMode()) {
            return;
        }

        String nonce = UUID.randomUUID().toString();
        VaadinSession.getCurrent().setAttribute("csp-nonce", nonce);

        // Add a header to make the browser require the nonce in all script tags
        response.getVaadinResponse().setHeader("Content-Security-Policy",
                "script-src 'nonce-" + nonce + "' 'strict-dynamic'");

        // Add the nonce to all script tags in the host page
        response.getDocument().getElementsByTag("script").attr("nonce", nonce);
    }
}
