import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9090", // Replace with the actual URL of your Go backend
      changeOrigin: true,
    })
  );
}
