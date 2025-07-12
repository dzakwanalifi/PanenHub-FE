// app/dashboard/layout.tsx

import PrivateRoute from "@/components/auth/PrivateRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      {/* Semua halaman di dalam /dashboard sekarang dilindungi */}
      {/* Anda bisa menambahkan layout khusus dashboard di sini */}
      <main>{children}</main>
    </PrivateRoute>
  );
} 