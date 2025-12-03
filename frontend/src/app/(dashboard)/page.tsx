import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import ChartOverview from "@/components/ui/chart";
import { CreditCard, DollarSign, Package, Plus, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default async function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Bem-vindo! Aqui está o resumo das suas vendas.
          </p>
        </div>
        {/* Header */}
        <div className="flex flex-wrap gap-3">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <Plus size={18} /> Nova Venda
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
            <Users size={18} /> Clientes
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white gap-2">
            <Package size={18} /> Produtos
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <CreditCard size={18} /> Pagamentos
          </Button>
        </div>
      </div>

      {/* --- METRICS CARDS (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Total em Vendas */}
        <Card className="shadow-sm border-none relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="z-10">
              <p className="text-sm font-medium text-gray-500">Total em Vendas</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">R$ 5150.00</h2>
              <p className="text-xs text-gray-400 mt-1">4 vendas realizadas</p>
            </div>
            <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <DollarSign size={24} />
            </div>
          </CardHeader>
        </Card>

        {/* Card 2: Valor Líquido */}
        <Card className="shadow-sm border-none relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="z-10">
              <p className="text-sm font-medium text-gray-500">Valor Líquido</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">R$ 4987.25</h2>
              <p className="text-xs text-gray-400 mt-1">Após taxas</p>
            </div>
            <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <TrendingUp size={24} />
            </div>
          </CardHeader>
        </Card>
 
        {/* Card 3: Vendas Aprovadas */}
        <Card className="shadow-sm border-none relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="z-10">
              <p className="text-sm font-medium text-gray-500">Vendas Aprovadas</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">3</h2>
              <p className="text-xs text-gray-400 mt-1">de 4 total</p>
            </div>
            <div className="h-12 w-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
              <ShoppingCart size={24} />
            </div>
          </CardHeader>
        </Card>

        {/* Card 4: Total de Clientes */}
        <Card className="shadow-sm border-none relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="z-10">
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">3</h2>
              <p className="text-xs text-gray-400 mt-1">Clientes cadastrados</p>
            </div>
            <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Users size={24} />
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartOverview />
      </div>
    </div >
  );
}

