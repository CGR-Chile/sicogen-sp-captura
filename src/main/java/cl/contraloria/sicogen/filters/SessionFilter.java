package cl.contraloria.sicogen.filters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.IOException;

public class SessionFilter extends OncePerRequestFilter {

    @Autowired
    DataSource dataSource;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpSession session = request.getSession(false);
        String requestUri = request.getRequestURI();

        if (requestUri.contains("/resources/")) {
            filterChain.doFilter(request, response);
        } else if (session == null || dataSource == null) {
            response.sendRedirect(request.getContextPath());
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
