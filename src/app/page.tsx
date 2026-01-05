export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">3D Things</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Catalog
            </h2>
            <p className="mt-2 text-gray-600">
              Browse our collection of 3D printed models
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">
                  Abstract Vase
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Beautiful abstract design in PLA plastic
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  $29.99
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">
                  Robot Figure
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  3D printed robot with detailed articulation
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  $49.99
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">
                  Geometric Sculpture
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Modern geometric design in multiple colors
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  $39.99
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
