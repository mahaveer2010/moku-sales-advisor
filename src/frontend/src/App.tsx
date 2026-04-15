import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Route as rootRoute } from "./routes/__root";

// Lazy-load pages
const DashboardPage = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const ProductsPage = lazy(() =>
  import("./pages/Products").then((m) => ({ default: m.ProductsPage })),
);
const ProductDetailPage = lazy(() =>
  import("./pages/ProductDetail").then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const VerticalsPage = lazy(() =>
  import("./pages/Verticals").then((m) => ({ default: m.VerticalsPage })),
);
const VerticalDetailPage = lazy(() =>
  import("./pages/VerticalDetail").then((m) => ({
    default: m.VerticalDetailPage,
  })),
);
const ChatPage = lazy(() =>
  import("./pages/Chat").then((m) => ({ default: m.ChatPage })),
);
const GeneratePage = lazy(() =>
  import("./pages/Generate").then((m) => ({ default: m.GeneratePage })),
);
const SettingsPage = lazy(() =>
  import("./pages/Settings").then((m) => ({ default: m.SettingsPage })),
);

function PageLoader() {
  return (
    <div className="p-6 space-y-3" data-ocid="page_loading_state">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <Skeleton className="h-4 w-full max-w-md" />
    </div>
  );
}

// Route definitions
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductsPage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const verticalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verticals",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <VerticalsPage />
    </Suspense>
  ),
});

const verticalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verticals/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <VerticalDetailPage />
    </Suspense>
  ),
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChatPage />
    </Suspense>
  ),
});

const generateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/generate",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GeneratePage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  verticalsRoute,
  verticalDetailRoute,
  chatRoute,
  generateRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
