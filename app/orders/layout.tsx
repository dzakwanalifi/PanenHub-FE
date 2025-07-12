// app/orders/layout.tsx

import PrivateRoute from "@/components/auth/PrivateRoute";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      {/* Semua halaman di dalam /orders sekarang dilindungi */}
      <main>{children}</main>
    </PrivateRoute>
  );
} 