"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown, ChevronRight, Check } from "lucide-react";

const SearchBar = ({ onSearch, products }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [activePanel, setActivePanel] = useState("main");
  const [
    selectedCategoryForSubcategories,
    setSelectedCategoryForSubcategories,
  ] = useState(null);

  const filterButtonRef = useRef(null);
  const filterModalRef = useRef(null);
  const subModalRef = useRef(null);

  const brands = [...new Set(products.map((product) => product.brand))];
  const categories = [...new Set(products.map((product) => product.Category))];

  const getSubcategories = (category) => {
    return [
      ...new Set(
        products
          .filter((p) => p.Category === category)
          .map((p) => p.subcategory)
      ),
    ];
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideFilter =
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target);

      const clickedOutsideSubModal =
        subModalRef.current &&
        !subModalRef.current.contains(event.target);

      if (clickedOutsideFilter && !isSubModalOpen) {
        setIsFilterModalOpen(false);
        setIsSubModalOpen(false);
      }

      if (clickedOutsideFilter && clickedOutsideSubModal) {
        setIsFilterModalOpen(false);
        setIsSubModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSubModalOpen]);

  useEffect(() => {
    const brandParams = searchParams.get("marca");
    const categoryParams = searchParams.get("categoria");
    const subcategoryParams = searchParams.get("subcategoria");

    if (brandParams) {
      setSelectedBrands(brandParams.split(","));
    }
    if (categoryParams) {
      setSelectedCategories(categoryParams.split(","));
    }
    if (subcategoryParams) {
      setSelectedSubcategories(subcategoryParams.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedBrands.length > 0) {
      queryParams.set("marca", selectedBrands.join(","));
    }
    if (selectedCategories.length > 0) {
      queryParams.set("categoria", selectedCategories.join(","));
    }
    if (selectedSubcategories.length > 0) {
      queryParams.set("subcategoria", selectedSubcategories.join(","));
    }

    router.push(`${pathname}?${queryParams.toString()}`);
    handleSearch();
  }, [selectedBrands, selectedCategories, selectedSubcategories, pathname, router]);

  const handleSearch = () => {
    let filtered = products.filter((product) => {
      const matchesQuery =
        !query ||
        [
          product.model,
          product.name,
          product.descripcion,
          product.brand,
          product.Category,
          product.subcategory,
        ].some((field) => field.toLowerCase().includes(query.toLowerCase()));

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.Category);
      const matchesSubcategory =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(product.subcategory);

      return (
        matchesQuery && matchesBrand && matchesCategory && matchesSubcategory
      );
    });

    onSearch(filtered);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    onSearch(products);
    router.push(pathname);
  };

  const getActiveFiltersCount = () => {
    const count = selectedBrands.length + selectedCategories.length + selectedSubcategories.length;
    return count > 0 ? count : null;
  };

  const FilterItem = ({ label, count, isSelected, onClick, hasSubmenu }) => (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <span
        className={`${
          isSelected ? "text-blue-600 font-medium" : "text-gray-700"
        }`}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        {count !== undefined && count > 0 && (
          <span className="text-sm text-gray-500">({count})</span>
        )}
        {hasSubmenu && (
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </div>
    </button>
  );

  return (
    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative">
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center border rounded-lg ${
            isFocused
              ? "border-blue-500 shadow-lg bg-white"
              : "border-gray-300 bg-white"
          } transition-all flex-grow relative`}
        >
          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-l-lg flex items-center gap-2 border-r border-gray-300"
          >
            <span className="text-gray-700">Filtros</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
            {getActiveFiltersCount() > 0 && (
              <span className="bg-yellow-700 text-white text-xs rounded-full px-2 py-1 ml-1">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full py-2 px-4 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />

          {query && (
            <button
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}

          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-gray-300 hover:bg-yellow-600 text-white rounded-r-lg transition-colors flex items-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isFilterModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40" />
          <div
            ref={filterModalRef}
            className="absolute z-50 mt-2 bg-white shadow-xl border border-gray-200 w-64"
            style={{
              top: filterButtonRef.current
                ? filterButtonRef.current.offsetTop +
                  filterButtonRef.current.offsetHeight +
                  8
                : 0,
              left: filterButtonRef.current
                ? filterButtonRef.current.offsetLeft
                : 0,
            }}
          >
            <div className="relative">
              <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
              <div className="p-2">
                <FilterItem
                  label="Marcas"
                  count={selectedBrands.length}
                  isSelected={selectedBrands.length > 0}
                  onClick={() => {
                    setActivePanel("brands");
                    setIsSubModalOpen(true);
                  }}
                  hasSubmenu
                />
                <FilterItem
                  label="Categorías"
                  count={selectedCategories.length}
                  isSelected={selectedCategories.length > 0}
                  onClick={() => {
                    setActivePanel("categories");
                    setIsSubModalOpen(true);
                  }}
                  hasSubmenu
                />
              </div>
            </div>
          </div>
        </>
      )}

      {isSubModalOpen && (
        <div
          ref={subModalRef}
          className="absolute z-50 mt-2 bg-white shadow-xl border border-gray-200 w-96"
          style={{
            top: filterButtonRef.current
              ? filterButtonRef.current.offsetTop +
                filterButtonRef.current.offsetHeight +
                8
              : 0,
            left: filterButtonRef.current
              ? filterButtonRef.current.offsetLeft + 260
              : 0,
          }}
        >
          <div className="p-2">
            {activePanel === "brands" && (
              <>
                <h3 className="px-4 py-2 font-medium text-gray-900">Marcas</h3>
                <div className="grid grid-cols-3 gap-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => {
                          if (selectedBrands.includes(brand)) {
                            setSelectedBrands(
                              selectedBrands.filter((b) => b !== brand)
                            );
                          } else {
                            setSelectedBrands([...selectedBrands, brand]);
                          }
                          handleSearch();
                        }}
                        className="w-4 h-4 border rounded-md text-blue-600 focus:ring-blue-500 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700 truncate">{brand}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {activePanel === "categories" && (
              <>
                <h3 className="px-4 py-2 font-medium text-gray-900">Categorías</h3>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="col-span-3">
                      <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => {
                            if (selectedCategories.includes(category)) {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== category)
                              );
                              setSelectedSubcategories(
                                selectedSubcategories.filter(
                                  (s) => !getSubcategories(category).includes(s)
                                )
                              );
                            } else {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            }
                            handleSearch();
                          }}
                          className="w-4 h-4 border rounded-md text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                      {selectedCategories.includes(category) && (
                        <div className="pl-6">
                          {getSubcategories(category).map((subcategory) => (
                            <label
                              key={subcategory}
                              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(subcategory)}
                                onChange={() => {
                                  if (selectedSubcategories.includes(subcategory)) {
                                    setSelectedSubcategories(
                                      selectedSubcategories.filter((s) => s !== subcategory)
                                    );
                                  } else {
                                    setSelectedSubcategories([
                                      ...selectedSubcategories,
                                      subcategory,
                                    ]);
                                  }
                                  handleSearch();
                                }}
                                className="w-4 h-4 border rounded-md text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{subcategory}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;