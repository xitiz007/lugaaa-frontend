import { useRouter } from "next/router";

function FilterProducts({ categories }) {

  const router = useRouter();
  const query = router.query;
  const path = router.pathname;

  const onCategoryChange = (category) => {
    query.search = "";
    query.category = category.toString();
    router.push({ pathname: path, query });
  };

  const isActive = (id) => query.category === id;

  const onSortByChange = (value) => {
    if (value === "newest") {
      query.price = "";
      query.sortBy = "createdAt:desc";
      router.push({ pathname: path, query });
    } else if (value === "oldest") {
      query.price = "";
      query.sortBy = "createdAt:asc";
      router.push({ pathname: path, query });
    } else if (value === "low") {
      query.sortBy = "";
      query.price = "low";
      router.push({ pathname: path, query });
    } else if (value === "high") {
      query.sortBy = "";
      query.price = "high";
      router.push({ pathname: path, query });
    }
  };

  return (
    <div className="px-2 py-3 text-sm md:text-base flex space-x-1 items-center justify-between">
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            className={`cursor-pointer px-3 py-2 rounded-full shadow-md tracking-wide font-normal text-xs md:text-sm transition duration-300 ease-out ${
              isActive(category._id)
                ? "bg-gradient-to-b from-yellow-100 to-yellow-400 border border-yellow-300"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {category.name}
          </div>
        ))}
      </div>
      <select
        className="z-10 p-2 md:p-3 bg-white border shadow-sm tracking-wide rounded-md text-xs md:text-sm"
        name="categories"
        onChange={(event) => onSortByChange(event.target.value)}
      >
        <option value="newest">Newest to oldest</option>
        <option value="oldest">Oldest to newest</option>
        <option value="low">Price low to high</option>
        <option value="high">Price high to low</option>
      </select>
    </div>
  );
}

export default FilterProducts;
