// app/account/layout.tsx

import PrivateRoute from "@/components/auth/PrivateRoute";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      {/* Semua halaman di dalam /account sekarang dilindungi */}
      {/* Anda bisa menambahkan layout khusus account di sini */}
      <main>{children}</main>
    </PrivateRoute>
  );
} 