import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination"
export default function ListArt({ posts,totalRecords,id }) {
   const [paginatedPost, setPaginatedPosts] = useState(posts);
  
  const [total, setTotal] = useState(totalRecords);

  // const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(20);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const previous = () => {
  //   if (currentPage > 1) {
  //     let number = currentPage - 1;
  //     setCurrentPage(number);
  //   }
  // };
  // const next = () => {
  //   let totalpage = total / postsPerPage;
  //   if (currentPage < Math.ceil(totalpage)) {
  //     let number = currentPage + 1;
  //     setCurrentPage(number);
  //   }
  // };
  // useEffect(() => {
  //   //http://localhost:3000
  //   // process.env.Baseurl
  //   setPaginatedPosts(posts);

  //   // const url = `http://localhost:3000/api/art/byCategory/${id}?limit=${postsPerPage}&skip=${currentPage}`;
  //   // fetch(url).then(async (res) => {
      
  //   //   const {posts,totalRecords} = await res.json()
  //   //   setPaginatedPosts(posts);
     
  //   // });

  // }, [])
  const onChangePage=(currentPage)=>{
    const url = `${process.env.Baseurl}/api/art/byCategory/${id}?limit=${postsPerPage}&skip=${currentPage}`;
    fetch(url).then(async (res) => {
      
      const {posts,totalRecords} = await res.json()
      setPaginatedPosts(posts);
      setTotal(totalRecords)
    });
  }
  return (
    <div>
      <div>
        <div className="container mx-auto">
          <div className="max-w-lg mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl mt-2 mb-4 font-bold font-heading">
              Explore <span className="text-blue-600">NFTs</span>
            </h2>
            <p className="text-blueGray-400 leading-loose"></p>
          </div>

          <div>
            <div className="container mx-auto ">
              <div className="mt-8">
                <div className="flex flex-wrap py-1  bg-white rounded text-sm mb-8 items-center market-tabs all-tabs-col mb-5">
                  <Link href="/art">
                    <a className="inline-flex item-center w-full text-xl sm:w-auto mb-1 mr-4 py-2 px-4 bg-gray-100 hover:bg-white text-gray-500 hover:text-gray-900 rounded hover:shadow  focus:outline-none transition duration-200">
                      <img src="/images/all.png" alt="All"></img>
                      All
                    </a>
                  </Link>
                  <Link href="/art/category/diamond">
                    <button className="inline-flex item-center w-full text-xl sm:w-auto  mr-4 py-2 px-4 bg-gray-100 hover:bg-white text-gray-500 hover:text-gray-900 rounded hover:shadow focus:outline-none transition duration-200">
                      <img src="/images/Diamond.png" alt="“Music”"></img>{" "}
                      Diamond
                    </button>
                  </Link>
                  <Link href="/art/category/gold">
                    <button className="inline-flex item-center w-full text-xl sm:w-auto mr-4 py-2 px-4 bg-gray-100 hover:bg-white text-gray-500 hover:text-gray-900 rounded hover:shadow  focus:outline-none transition duration-200">
                      <img src="/images/bullion.png" alt="“Games”"></img> Gold &
                      Bullion
                    </button>
                  </Link>
                  <Link href="/art/category/Art">
                    <a className="inline-flex item-center w-full text-xl sm:w-auto mb-1 mr-4 py-2 px-4 bg-gray-100 hover:bg-white text-gray-500 hover:text-gray-900 rounded hover:shadow  focus:outline-none transition duration-200">
                      <img src="/images/art.png" alt="“Art”"></img> Art
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-12"></div>
          </div>
        </div>
        <div className="my-12"></div>
        <div>
          <div>
            <div className="my-12"></div>

            <div className="container mx-auto">
              <div className="radius-for-skewed flex flex-wrap row">
                {paginatedPost &&
                  !!paginatedPost.length &&
                  paginatedPost.map((o, i) => (
                    <div key={i} className="lg:w-1/4 mb-5 col-md-3 col-12">
                      <div className="w-full px-3 px-6">
                        <div className="shadow card-box-shadow">
                          <div className="pb-2 bg-white rounded  text-center tabs-card">
                            <div className="tabs-card-inner rounded-3xl pb-2">
                              <Link href={"/art/[id]"} as={`/art/${o._id}`}>
                                <a>
                                  <Image
                                    className="mb-2 w-full h-64 object-cover rounded-t-2xl"
                                    src={
                                      o.Url
                                        ? o.Url
                                        : "/image/22-anime-drawings-Underground.jpeg"
                                    }
                                    alt={o.name}
                                    width={500}
                                    height={500}
                                  ></Image>
                                </a>
                              </Link>

                              <div className="bid-btn-col">
                                <span>
                                  <h4 className="mb-1 text-1xl font-bold font-heading">
                                    {o.name}
                                  </h4>
                                  <span>
                                    <Image
                                      src="/images/tokenImg.png"
                                      alt={o.name}
                                      width={45}
                                      height={45}
                                    ></Image>
                                    {o.PriceBNB + "= $ "}{" "}
                                    {Math.round(Number(o.PriceBNB) * 407)}
                                  </span>
                                </span>

                                <a className="btn bid-btn">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  }
                 
              </div>
              <Pagination totalRecords={totalRecords} onChangePage={onChangePage}></Pagination>
                  {/* <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={totalRecords}
                  paginate={paginate}
                  previous={previous}
                  next={next} /> */}
                
          </div>
            </div>
            
         
        
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  let limit = 20; let skip = 1;
  const url = `${process.env.Baseurl}/api/art/byCategory/${id}?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  const {posts,totalRecords} = await res.json();
  return { props: { posts,totalRecords,id } };
}
