import StatsCard from "./StatsCard";

type Props = {

    totalRecords: number;

    totalUploads: number;

    averageAge: number;

    duplicates: number;

};

const StatsGrid = ({
    totalRecords,
    totalUploads,
    averageAge,
    duplicates
}: Props) => {

    return (

        <section className="mb-10">

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                <StatsCard

                    title="Total Records"

                    value={totalRecords}

                    color="text-cyan-400"

                />

                <StatsCard

                    title="Uploads"

                    value={totalUploads}

                    color="text-green-400"

                />

                <StatsCard

                    title="Average Age"

                    value={averageAge}

                    color="text-yellow-400"

                />

                <StatsCard

                    title="Duplicates"

                    value={duplicates}

                    color="text-red-400"

                />

            </div>

        </section>

    );

};

export default StatsGrid;