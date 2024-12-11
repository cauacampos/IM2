// app/layout.tsx
import './globals.css';  // Importando o arquivo CSS global aqui

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children} {/* Aqui ficam todos os filhos, ou seja, todas as páginas */}
      </body>
    </html>
  );
}
