import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

type CityData = {
    city: string;
    total: number;
};

type Props = {
    data: CityData[];
};

const CityChart = ({ data }: Props) => {

    return (

        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-semibold">

                📊 Records by City

            </h2>

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="city" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="total"
                            fill="#06B6D4"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default CityChart;