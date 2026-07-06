type PaginationProps = {

    page: number;

    setPage: React.Dispatch<React.SetStateAction<number>>;

};

const Pagination = ({
    page,
    setPage
}: PaginationProps) => {

    return (

        <div className="mt-8 flex items-center justify-center gap-5">

            <button

                onClick={() =>
                    setPage((prev) => Math.max(prev - 1, 1))
                }

                disabled={page === 1}

                className="rounded-lg bg-slate-700 px-5 py-2 transition hover:bg-slate-600 disabled:opacity-50"

            >

                Previous

            </button>

            <span className="font-semibold">

                Page {page}

            </span>

            <button

                onClick={() =>
                    setPage((prev) => prev + 1)
                }

                className="rounded-lg bg-cyan-500 px-5 py-2 transition hover:bg-cyan-600"

            >

                Next

            </button>

        </div>

    );

};

export default Pagination;