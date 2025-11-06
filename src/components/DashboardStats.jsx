import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { supabase } from "@/lib/supabase"

export function ChartPieDonutText() {
  const [totalAceitos, setTotalAceitos] = React.useState(0)
  const [chartData, setChartData] = React.useState([])
  const MAX_TIMES = 20

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("inscricoes")
        .select("status")

      if (error) {
        console.error("Erro ao buscar inscrições:", error)
        return
      }

      const aceitos = data.filter((item) => item.status === "Aceitos").length
      const restantes = Math.max(MAX_TIMES - aceitos, 0)

      setTotalAceitos(aceitos)
      setChartData([
        { name: "Aceitos", value: aceitos, fill: "#ff3b8d" },
        { name: "Restantes", value: restantes, fill: "#d1d5db" },
      ])
    }

    fetchData()
  }, [])

  const chartConfig = {
    Aceitos: { label: "Times aceitos", color: "#ff3b8d" },
    Restantes: { label: "Vagas restantes", color: "#d1d5db" },
  }

  return (
    <section className="py-[2.6875rem] flex flex-col justify-center items-center">
      <div className="bg-white w-[80vw] rounded-2xl h-fit p-2 drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <h1 className="font-antonio text-[1.75rem] text-center pt-6 pb-9">
              Inscrições
            </h1>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig} // 👈 ESSA LINHA É O QUE FALTAVA
              className="mx-auto aspect-square max-h-[250px]"
            >
              <CardDescription className="place-self-center">
                Total aceitos
              </CardDescription>

              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const item = payload[0].payload
                      if (item.name === "Aceitos") {
                        return (
                          <div className="rounded-lg bg-white px-3 py-2 shadow text-sm font-medium text-pink-600">
                            {totalAceitos} times aceitos
                          </div>
                        )
                      } else {
                        return (
                          <div className="rounded-lg bg-white px-3 py-2 shadow text-sm font-medium text-gray-500">
                            {MAX_TIMES - totalAceitos} vagas restantes
                          </div>
                        )
                      }
                    }
                    return null
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  strokeWidth={0}
                  isAnimationActive={true}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalAceitos}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              / {MAX_TIMES} times
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              Atualizado em tempo real <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Mostrando o progresso das inscrições aceitas
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
