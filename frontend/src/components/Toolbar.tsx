import CityFilter from "./CityFilter";
import SortDropdown from "./SortDropdown";

type ToolbarProps = {

    search: string;

    setSearch: (value: string) => void;

    city: string;

    setCity: (value: string) => void;

    sort: string;

    order: string;

    setSort: (value: string) => void;

    setOrder: (value: string) => void;

    setPage: (page: number) => void;

};

const Toolbar = ({
    search,
    setSearch,
    city,
    setCity,
    sort,
    order,
    setSort,
    setOrder,
    setPage
}: ToolbarProps) => {

    return (

        <div className="flex flex-col gap-3 md:flex-row">

            <input

                type="text"

                placeholder="Search by name or email..."

                value={search}

                onChange={(e) => {

                    setSearch(e.target.value);

                    setPage(1);

                }}

                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-cyan-500"

            />

            <CityFilter

                city={city}

                setCity={(value) => {

                    setCity(value);

                    setPage(1);

                }}

            />

            <SortDropdown

                sort={sort}

                order={order}

                setSort={(value) => {

                    setSort(value);

                    setPage(1);

                }}

                setOrder={(value) => {

                    setOrder(value);

                    setPage(1);

                }}

            />

        </div>

    );

};

export default Toolbar;