import ProductTableContainer from "@/components/table/product-table-containter";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <ProductTableContainer />
    </div>
  );
}
