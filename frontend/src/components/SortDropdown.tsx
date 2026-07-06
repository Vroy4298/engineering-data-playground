
type Props = {

    sort: string;

    order: string;

    setSort: (value: string) => void;

    setOrder: (value: string) => void;

};

const SortDropdown = ({
    sort,
    order,
    setSort,
    setOrder
}: Props) => {

    return (

        <div className="flex gap-3">

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
            >
                <option value="id">Latest</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="city">City</option>
            </select>

            <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>

        </div>

    );

};

export default SortDropdown;