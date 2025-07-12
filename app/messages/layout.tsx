// app/messages/layout.tsx

import PrivateRoute from "@/components/auth/PrivateRoute";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      {/* Semua halaman di dalam /messages sekarang dilindungi */}
      <main>{children}</main>
    </PrivateRoute>
  );
} 