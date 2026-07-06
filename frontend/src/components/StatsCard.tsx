type StatsCardProps = {

    title: string;

    value: string | number;

    color: string;

};

const StatsCard = ({ title, value, color }: StatsCardProps) => {

    return (

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500 transition-all duration-300">

            <p className="text-slate-400 text-sm">

                {title}

            </p>

            <h2 className={`text-4xl font-bold mt-3 ${color}`}>

                {value}

            </h2>

        </div>

    );

};

export default StatsCard;