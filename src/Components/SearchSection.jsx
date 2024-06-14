import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../api";

import DefaultIcon from "/public/site_icon_default.png";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [isSearchingActive, setIsSearchingActive] = useState(false);
  const [result, setResult] = useState([]);
  const [resultStatus, setResultStatus] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() == "") {
      alert("Please enter your query!");
      return;
    }


    setIsSearchingActive(true);
    setResultStatus("");
    setResult([]);

    fetch(`${BACKEND_BASE_URL}/search-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == "success") {
          if(data.data.length == 0){
            setResultStatus("No result")
          }
          setIsSearchingActive(false);
          setResult(data.data);
          console.log(data);
        }
      })
      .catch((error) => {
        setIsSearchingActive(false);
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(result);
  }, [result]);


  const ensureDomainInLink = (imageLink, domain) => {
    // Check if the image link already contains the domain
    if (imageLink.startsWith('http://') || imageLink.startsWith('https://')) {
      // If it already includes the domain, return the image link as is
      return imageLink;
    } else {
      // If it does not include the domain, concatenate the domain and the image link
      // Ensure there is no double slash when concatenating
      if (domain.endsWith('/') && imageLink.startsWith('/')) {
        return domain.slice(0, -1) + imageLink;
      } else if (!domain.endsWith('/') && !imageLink.startsWith('/')) {
        return domain + '/' + imageLink;
      } else {
        return domain + imageLink;
      }
    }
  }


  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + '...';
    }
  }
  


  return (
    <>
      <form className="max-w-md mx-auto mt-20">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search anything..."
            required
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
            disabled={isSearchingActive}
          >
            {isSearchingActive ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {isSearchingActive ? (
        <>
          <div role="status" className="flex justify-center mx-auto mt-10">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          {result.length > 0 ? (
            <div className="mt-20 container mx-auto ">
              {result.map((item, idx) => (
                <div key={idx} className="hlcw0c flex justify-center">
                  <div className="MjjYud">
                    <div
                      className="g Ww4FFb vt6azd tF2Cxc asEBEc"
                      lang="en"
                      style={{ width: "600px" }}
                      data-hveid="CC0QAA"
                      data-ved="2ahUKEwjUnc_MhtiGAxWs-QIHHbeFDyUQFSgAegQILRAA"
                    >
                      <div className="N54PNb BToiNc cvP2Ce" data-snc="vmXdHb">
                        <div
                          className="kb0PBd cvP2Ce A9Y9g jGGQ5e"
                          data-snf="x5WNvb"
                          data-snhf="0"
                        >
                          <div className="yuRUbf">
                            <div>
                              <span>
                                <a
                                  href={item.link_of_site}
                                  target="_blank"
                                  data-ved="2ahUKEwjUnc_MhtiGAxWs-QIHHbeFDyUQFnoECCMQAQ"
                                  ping="/url?sa=t&amp;source=web&amp;rct=j&amp;opi=89978449&amp;url=https://www.freecodecamp.org/news/get-started-with-nodejs/&amp;ved=2ahUKEwjUnc_MhtiGAxWs-QIHHbeFDyUQFnoECCMQAQ"
                                >
                                  <br />
                                  <h3 className="LC20lb MBeuO DKV0Md">
                                    {truncateString(item.title, 60)}
                                  </h3>
                                  <div className="notranslate HGLrXd NJjxre iUh30 ojE3Fb">
                                    <div className="q0vns">
                                      <span className="DDKf1c">
                                        <div
                                          className="eqA2re UnOTSe Vwoesf"
                                          aria-hidden="true"
                                        >
                                          <img
                                            className="XNo5Ab"
                                            src={`${Object.keys(item.meta_tags).includes("site_icon") && item.meta_tags.site_icon!==null && item.meta_tags.site_icon!==undefined ? ensureDomainInLink(item.meta_tags.site_icon, item.meta_tags.main_site_url) : DefaultIcon  }`}
                                            style={{
                                              height: "26px",
                                              width: "26px",
                                            }}
                                            alt=""
                                            data-csiid="17"
                                            data-atf="4"
                                          />
                                        </div>
                                      </span>
                                      <div className="CA5RN">
                                        <div>
                                          <span className="VuuXrf">
                                            {item.meta_tags.site_name}
                                          </span>
                                        </div>
                                        <div className="byrV5b">
                                          <cite
                                            className="qLRx3b tjvcx GvPZzd cHaqb"
                                            role="text"
                                          >
                                            {truncateString(item.link_of_site, 60)}
                                          </cite>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span style={{ display: "none" }}></span>
                                </a>
                              </span>
                              <div className="B6fmyf byrV5b Mg1HEd">
                                <div className="HGLrXd iUh30 ojE3Fb">
                                  <div className="q0vns">
                                    <span className="DDKf1c">
                                      <div
                                        className="eqA2re UnOTSe"
                                        style={{
                                          height: "26px",
                                          width: "26px",
                                        }}
                                      ></div>
                                    </span>
                                    <div className="CA5RN">
                                      <div>
                                        <span className="VuuXrf">
                                          {item.meta_tags.site_name}
                                        </span>
                                      </div>
                                      <div className="byrV5b">
                                        <cite
                                          className="qLRx3b tjvcx GvPZzd cHaqb"
                                          role="text"
                                        >
                                          {item.link_of_site}
                                        </cite>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="csDOgf BCF2pd L48a4c">
                                  <div
                                    data-id="atritem-https://www.freecodecamp.org/news/get-started-with-nodejs/"
                                    data-viewer-group="1"
                                  >
                                    <div>
                                      <div
                                        data-viewer-entrypoint="1"
                                        data-ved="2ahUKEwjUnc_MhtiGAxWs-QIHHbeFDyUQ2esEegQIIxAJ"
                                      >
                                        <div>
                                          <div
                                            className="MJ8UF iTPLzd rNSxBe eY4mx lUn2nc"
                                            style={{ position: "absolute" }}
                                            aria-label="About this result"
                                            role="button"
                                            tabIndex="0"
                                          >
                                            <span className="D6lY4c mBswFe">
                                              <span
                                                className="xTFaxe z1asCe"
                                                style={{
                                                  height: "18px",
                                                  lineHeight: "18px",
                                                  width: "18px",
                                                }}
                                              >
                                                <svg
                                                  focusable="false"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                                </svg>
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="kb0PBd cvP2Ce A9Y9g"
                          data-snf="nke7rc"
                          data-sncf="1"
                        >
                          <div
                            className="VwiC3b yXK7lf lVm3ye r025kc hJNv6b Hdw6tb"
                            style={{ WebkitLineClamp: "2" }}
                          >
                            <span>{item.meta_tags.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : resultStatus == "No result" ? (
            <>
            <div className="flex justify-center mx-auto mt-10">
              <h3>No Data Found!!</h3>
            </div>
            </>
          ) : <></>}
        </>
      )}
    </>
  );
};

export default SearchSection;
