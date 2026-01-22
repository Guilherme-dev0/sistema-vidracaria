import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { useState } from 'react';

// Dados mockados para Entradas vs Saídas (últimos 30 dias)
const entradasSaidasData = [
  { dia: '01', entradas: 45, saidas: 32 },
  { dia: '03', entradas: 38, saidas: 28 },
  { dia: '05', entradas: 52, saidas: 41 },
  { dia: '07', entradas: 61, saidas: 38 },
  { dia: '09', entradas: 48, saidas: 45 },
  { dia: '11', entradas: 55, saidas: 39 },
  { dia: '13', entradas: 42, saidas: 48 },
  { dia: '15', entradas: 68, saidas: 52 },
  { dia: '17', entradas: 59, saidas: 44 },
  { dia: '19', entradas: 71, saidas: 58 },
  { dia: '21', entradas: 63, saidas: 49 },
  { dia: '23', entradas: 48, saidas: 51 },
  { dia: '25', entradas: 76, saidas: 62 },
  { dia: '27', entradas: 82, saidas: 68 },
  { dia: '29', entradas: 65, saidas: 55 },
  { dia: '30', entradas: 58, saidas: 47 },
];

// Dados mockados para Distribuição por Categoria
const distribuicaoCategoriaData = [
  { name: 'Vidros', value: 245, percentage: 42 },
  { name: 'Ferragens', value: 158, percentage: 27 },
  { name: 'Alumínios', value: 182, percentage: 31 },
];

// Cores em tons de ciano e cinzas neutros
const COLORS = ['#4DD0E1', '#78909C', '#B0BEC5'];

export function RelatoriosContent() {
  const [periodo, setPeriodo] = useState<'30' | '7' | '1'>('30');
  const periodoLabel = periodo === '30' ? 'Últimos 30 dias' : periodo === '7' ? 'Últimos 7 dias' : 'Hoje';
  return (
    <div className="space-y-6">
      {/* Título da Página */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios e Análises</h1>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value as '30' | '7' | '1')}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="30">Últimos 30 dias</option>
          <option value="7">Últimos 7 dias</option>
          <option value="1">Hoje</option>
        </select>
      </div>
      <p className="text-sm text-gray-500">
        Visualize métricas e tendências do seu estoque
      </p>

      {/* Gráfico de Linha - Entradas vs Saídas */}
      <div className="bg-white rounded-[20px] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#4DD0E1]/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#4DD0E1]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Entradas vs Saídas
            </h2>
            <p className="text-sm text-gray-500">{periodoLabel}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={entradasSaidasData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis 
              dataKey="dia" 
              stroke="#78909C"
              tick={{ fill: '#78909C', fontSize: 12 }}
              label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -5, fill: '#78909C' }}
            />
            <YAxis 
              stroke="#78909C"
              tick={{ fill: '#78909C', fontSize: 12 }}
              label={{ value: 'Quantidade', angle: -90, position: 'insideLeft', fill: '#78909C' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="entradas" 
              stroke="#4DD0E1" 
              strokeWidth={2.5}
              name="Entradas"
              dot={{ fill: '#4DD0E1', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="saidas" 
              stroke="#78909C" 
              strokeWidth={2.5}
              name="Saídas"
              dot={{ fill: '#78909C', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza - Distribuição por Categoria */}
      <div className="bg-white rounded-[20px] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#4DD0E1]/10 rounded-lg flex items-center justify-center">
            <PieChartIcon className="w-5 h-5 text-[#4DD0E1]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Distribuição por Categoria
            </h2>
            <p className="text-sm text-gray-500">Composição do estoque atual</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={300}>
            <PieChart>
              <Pie
                data={distribuicaoCategoriaData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                label={({ percentage }) => `${percentage}%`}
              >
                {distribuicaoCategoriaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legenda Customizada */}
          <div className="flex-1 pl-8">
            <div className="space-y-4">
              {distribuicaoCategoriaData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{item.value} unidades</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Total de Entradas (30 dias)</p>
          <p className="text-3xl font-bold text-[#4DD0E1]">
            {entradasSaidasData.reduce((sum, d) => sum + d.entradas, 0)}
          </p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Total de Saídas (30 dias)</p>
          <p className="text-3xl font-bold text-gray-600">
            {entradasSaidasData.reduce((sum, d) => sum + d.saidas, 0)}
          </p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Saldo Líquido</p>
          <p className="text-3xl font-bold text-green-600">
            +{entradasSaidasData.reduce((sum, d) => sum + d.entradas - d.saidas, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
