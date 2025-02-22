import { useState, useEffect } from "react";
import desktop from "../assets/desktop_windows_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.png";
import mailimg from "../assets/mail.png";
import domain from "../assets/public_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.png";
import locationimg from "../assets/edit_location_alt_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.png";
import categoryimg from "../assets/category_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.png";
import currencyimg from "../assets/currency.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StoreForm = () => {
  const [storeName, setStoreName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [storeNameError, setStoreNameError] = useState("");
  const [subdomainError, setSubdomainError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const suffix = ".expressitbd.com";

  const countryToCurrency = {
    Afghanistan: "AFN",
    Bangladesh: "BDT",
    Bhutan: "BTN",
    China: "CNY",
    India: "INR",
    Indonesia: "IDR",
    Japan: "JPY",
    Malaysia: "MYR",
    Pakistan: "PKR",
    "South Korea": "KRW",
  };

  const locations = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Japan", label: "Japan" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "South Korea", label: "South Korea" },
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home-decor", label: "Home Decor" },
    { value: "books", label: "Books" },
    { value: "sports-outdoors", label: "Sports & Outdoors" },
    { value: "beauty-personal-care", label: "Beauty & Personal Care" },
    { value: "toys-games", label: "Toys & Games" },
    { value: "furniture", label: "Furniture" },
    { value: "pet-supplies", label: "Pet Supplies" },
    { value: "groceries", label: "Groceries" },
  ];

  const currencies = [
    { value: "AFN", label: "AFN" },
    { value: "BDT", label: "BDT (Taka)" },
    { value: "BTN", label: "BTN" },
    { value: "CNY", label: "CNY (Yuan)" },
    { value: "INR", label: "INR (Rupee)" },
    { value: "IDR", label: "IDR (Rupiah)" },
    { value: "JPY", label: "JPY (Yen)" },
    { value: "MYR", label: "MYR (Ringgit)" },
    { value: "PKR", label: "PKR (Rupee)" },
    { value: "KRW", label: "KRW (Won)" },
  ];

  useEffect(() => {
    if (location && countryToCurrency[location]) {
      setCurrency(countryToCurrency[location]);
    }
  }, [location]);

  const checkDomainAvailability = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Checking domain:", subdomain + suffix);
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${
          subdomain + suffix
        }`
      );
      console.log("Domain API Response:", response.data);

      return response.data.data.taken;
    } catch (error) {
      console.error("Domain Check Error:", error);
      setError("Error checking domain. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const checkFields = () => {
    let isValid = true;

    if (
      !storeName ||
      !subdomain ||
      !location ||
      !category ||
      !currency ||
      !email
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    validateEmail();

    if (storeName.length < 3) {
      setStoreNameError("Store name must be at least 3 characters long.");
      isValid = false;
    } else {
      setStoreNameError("");
    }

    return isValid;
  };

  const createStore = async () => {
    try {
      const response = await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        {
          name: storeName,
          currency: currency,
          country: location,
          domain: subdomain,
          category: category,
          email: email,
        }
      );

      alert("Store created successfully!");
    } catch (error) {
      setError("Failed to create store. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isValid = checkFields();

    if (!isValid) {
      setLoading(false);
      return;
    }

    const isDomainAvailable = await checkDomainAvailability();

    if (isDomainAvailable) {
      setSubdomainError("Domain is not available. Please choose another one.");
      setLoading(false);
      return;
    }

    checkFields();

    createStore();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Create a Store</h2>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-lg text-gray-600">
          Add your basic store information and complete the setup
        </p>
        <hr className="mb-5 mt-3" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mb-7 mt-0"
              src={desktop}
              alt=""
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                Give your online store a name
              </label>
              <label className="text-sm text-gray-500 w-full">
                A great store name is a big part of your success. Make sure it
                aligns with your brand and products.
              </label>
            </div>
            <div className="flex flex-col w-full md:w-2/4 mt-4 md:mt-0">
              <input
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  storeNameError ? "border-red-500" : ""
                }`}
                placeholder="How'd you like to name your store?"
                value={storeName}
                onChange={(e) => {
                  setStoreName(e.target.value);
                  setStoreNameError("");
                }}
              />
              {storeNameError && (
                <p className="text-red-500 text-sm mt-1">{storeNameError}</p>
              )}
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mb-2 mt-0"
              src={domain}
              alt="subdomain"
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                Your online store subdomain
              </label>
              <label className="text-sm text-gray-500 w-full">
                A SEO-friendly store name is a crucial part of your success.
              </label>
            </div>
            <div className="flex flex-col w-full md:w-2/4 mt-4 md:mt-0 relative">
              <div className="relative">
                <input
                  type="text"
                  className={`w-full p-2 border rounded-lg pr-32 ${
                    subdomainError ? "border-red-500" : ""
                  }`}
                  placeholder="enter your domain name"
                  value={subdomain}
                  onChange={(e) => {
                    setSubdomain(e.target.value);
                    setSubdomainError("");
                  }}
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  {suffix}
                </span>
              </div>
              {subdomainError && (
                <p className="text-red-500 text-sm mt-1 absolute top-full">
                  {subdomainError}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mb-7 mt-0"
              src={locationimg}
              alt="subdomain"
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                Where's your store located?
              </label>
              <label className="text-sm text-gray-500 w-full">
                Set your store's default location so we can optimize store
                access and speed for your customers.
              </label>
            </div>
            <select
              className="w-full md:w-2/4 p-2 border rounded-lg mt-4 md:mt-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>
                Select Store Location
              </option>
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mb-7 mt-0"
              src={categoryimg}
              alt="subdomain"
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                What's your Category?
              </label>
              <label className="text-sm text-gray-500 w-full">
                Set your store's default category so we can optimize store
                access and speed for your customers.
              </label>
            </div>
            <select
              className="w-full md:w-2/4 p-2 border rounded-lg mt-4 md:mt-0"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Store Category
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mt-0"
              src={currencyimg}
              alt="subdomain"
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                Choose store currency
              </label>
              <label className="text-sm text-gray-500 w-full">
                This is the main currency you wish to sell in.
              </label>
            </div>
            <select
              className="w-full md:w-2/4 p-2 border rounded-lg mt-4 md:mt-0"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="" disabled>
                Select Currency
              </option>
              {currencies.map((cur) => (
                <option key={cur.value} value={cur.value}>
                  {cur.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
            <img
              className="block w-6 h-6 m-2 mb-4 md:mb-8 mt-0"
              src={mailimg}
              alt="subdomain"
            />
            <div className="flex flex-col w-full md:w-2/4 pr-4">
              <label className="text-sm font-bold text-gray-700 w-full">
                Store contact email
              </label>
              <label className="text-sm text-gray-500 w-full">
                This is the email you'll use for notifications to and receive
                orders from customers.
              </label>
            </div>
            <div className="flex flex-col w-full md:w-2/4 mt-4 md:mt-0">
              <input
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  emailError ? "border-red-500" : ""
                }`}
                value={email}
                onBlur={validateEmail}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="you@example.com"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end m-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Store"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center m-4 w-full max-w-5xl">
        <button
          className="w-full md:w-auto bg-green-500 text-white p-2 rounded"
          onClick={() => navigate("/products")}
        >
          View Products
        </button>
      </div>
    </div>
  );
};

export default StoreForm;
