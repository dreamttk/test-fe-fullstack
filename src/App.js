import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import search from "./pic/search.png";
import close from "./pic/close.png";
import symbol from "./pic/symbol.png";
import arrow from "./pic/arrow.png";
import moment from "moment";

function App() {
  const [data, setData] = useState([]);
  const [slicedata, setSlicedata] = useState();
  const [uniquename, setUniquename] = useState([]);
  const [uniquerole, setUniquerole] = useState([]);
  const [valuename, setValuename] = useState("");
  const [valuerole, setValuerole] = useState("");
  const [page, setPage] = useState(1);
  const [allpage, setAllpage] = useState();
  const nameref = useRef();
  const roleref = useRef();

  // get data
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        //get unique name and role
        const uniqueNames = [...new Set(data.map((item) => item.firstname))];
        setUniquename(uniqueNames);
        const uniqueRole = [...new Set(data.map((item) => item.role))];
        setUniquerole(uniqueRole);
      });
  }, []);

  // slice data
  useEffect(() => {
    let start = (page - 1) * 100;
    let resdata = data;
    console.log(valuerole);

    if (valuename !== "") {
      let filterdata = [];
      resdata.forEach((items, index) => {
        if (items.firstname === valuename) {
          filterdata.push(items);
        }
      });
      resdata = filterdata.slice(start, Number(start) + Number(100));
      setAllpage(Math.ceil(resdata.length / 100));
      setSlicedata(resdata);
    }

    if (valuerole !== "") {
      let filterdata = [];
      resdata.forEach((items, index) => {
        if (items.role === valuerole) {
          filterdata.push(items);
        }
      });
      resdata = filterdata.slice(start, Number(start) + Number(100));
      setAllpage(Math.ceil(resdata.length / 100));
      setSlicedata(resdata);
    }

    if (valuename === "" && valuerole === "") {
      setAllpage(Math.ceil(resdata.length / 100));
      resdata = data.slice(start, Number(start) + Number(100));
      console.log("ddd", resdata.length, resdata);
      setSlicedata(resdata);
    }
  }, [data, page]);

  // next Page
  const OnNextPage = () => {
    if (page < allpage) {
      setPage(page + 1);
    }
  };

  // previous Page
  const OnPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const OnChangePage = (e) => {
    if (e.target.value > allpage) {
      setPage(allpage);
    } else {
      setPage(e.target.value);
    }
  };

  const OnSearch = () => {
    let start = (page - 1) * 100;
    let resdata = data;
    setPage(1);
    if (valuename !== "") {
      let filterdata = [];
      resdata.forEach((items, index) => {
        if (items.firstname === valuename) {
          filterdata.push(items);
        }
      });
      resdata = filterdata.slice(start, Number(start) + Number(100));
      setAllpage(Math.ceil(resdata.length / 100));
      setSlicedata(resdata);
    }

    if (valuerole !== "") {
      let filterdata = [];
      resdata.forEach((items, index) => {
        if (items.role === valuerole) {
          filterdata.push(items);
        }
      });
      resdata = filterdata.slice(start, Number(start) + Number(100));
      setAllpage(Math.ceil(resdata.length / 100));
      setSlicedata(resdata);
    }

    if (valuename === "" && valuerole === "") {
      setAllpage(Math.ceil(resdata.length / 100));
      resdata = data.slice(start, Number(start) + Number(100));
      console.log("ddd", resdata.length, resdata);
      setSlicedata(resdata);
    }
  };

  const ClearFilter = () => {
    nameref.current.selectedIndex = 0;
    roleref.current.selectedIndex = 0;
    setValuename("");
    setValuerole("");
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="bg-[#CCD3CA] w-[55vw] h-[85vh] flex jutify-center rounded-2xl flex-col items-center ">
          <p className="font-bold text-[#0f172a] text-3xl p-[1vw] mt-[2vw]">
            Log Device
          </p>
          <p className="font-bold text-[#0f172a] text-2xl mb-[1vw] mt-[-1vw]">
            Home-logDevice
          </p>
          <div className="flex flex-row w-[35vw] justify-between ml-[-15vw] mb-[1vw] ">
            <select
              className="w-[15vw] text-xl text-[#0d0d0d] cursor-pointer "
              onChange={(e) => setValuename(e.target.value)}
              ref={nameref}
            >
              <option value="">Name</option>
              {uniquename.map((items, index) => (
                <option value={items} key={index}>
                  {items}
                </option>
              ))}
            </select>
            <select
              className="w-[15vw] text-xl text-[#0d0d0d] cursor-pointer "
              onChange={(e) => setValuerole(e.target.value)}
              ref={roleref}
            >
              <option value="">Role</option>
              {uniquerole.map((items, index) => (
                <option value={items}>{items}</option>
              ))}
            </select>
            <div className="h-[2.6] bg-[#fff] w-[2vw] items-center flex justify-center">
              <img
                className="h-[2vh] cursor-pointer"
                src={close}
                onClick={() => ClearFilter()}
              />
            </div>
            <div className="h-[2.6] bg-[#fff] w-[2vw] items-center flex justify-center">
              <img
                className="h-[2vh] cursor-pointer"
                src={search}
                onClick={() => OnSearch()}
              />
            </div>
          </div>
          <table className="text-left w-[50vw] h-[50vh] border-collapse ">
            <thead className="bg-[#EED3D9] flex text-white w-full rounded-t-2xl ">
              <tr className="flex w-full font-bold text-[#0f172a] text-xl">
                <th className="p-4 w-1/4 ">Name</th>
                <th className="p-4 w-1/4 ">Role</th>
                <th className="p-4 w-1/4 ">Time</th>
                <th className="p-4 w-1/4 ">RFID</th>
              </tr>
            </thead>
            <tbody className="bg-[#F5E8DD] flex flex-col items-center justify-between overflow-y-scroll w-full h-[50vh]">
              {typeof slicedata !== "undefined" && Array.isArray(slicedata) ? (
                <>
                  {slicedata.map((items, index) => (
                    <tr className="flex w-full" key={index}>
                      <td className="p-4 w-1/4 ">
                        {items.firstname} {items.lastname}
                      </td>
                      <td className="p-4 w-1/4 ">{items.role}</td>
                      <td className="p-4 w-1/4 ">
                        {moment(new Date(items._id)).format(
                          "hh:MM:ss/DD-MM-YYYY "
                        )}
                      </td>
                      <td className="p-4 w-1/4 ">{items.rfid}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <div className="h-[5vh] w-[50vw] bg-[#EED3D9] flex items-center rounded-b-2xl ">
            <div className="flex h-[2vw] w-[30vw] flex justify-around items-center">
              <img
                className="h-[2vh] cursor-pointer"
                src={symbol}
                onClick={() => OnPreviousPage()}
              />
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>. . .</p>
              <p>{allpage}</p>
              <img
                className="h-[2vh] cursor-pointer"
                src={arrow}
                onClick={() => OnNextPage()}
              />
              <p>Go to</p>
              <input
                className="w-[2vw] text-center"
                value={page}
                onChange={(e) => OnChangePage(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
