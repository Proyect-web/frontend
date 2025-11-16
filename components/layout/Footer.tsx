// src/components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-base text-gray-500">
          &copy; {new Date().getFullYear()} Proyecto Next. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}