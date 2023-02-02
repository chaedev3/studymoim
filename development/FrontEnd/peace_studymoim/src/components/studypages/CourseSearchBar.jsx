import { useState } from "react";
import useFetch from "../../hooks/useFetch";
export default function CourseSearchBar() {
  const [searchtext, setSearchtext] = useState("");
  const data = useFetch(`http://localhost:8080/api/v1/course/search/${searchtext}`); 

  // 뻐킹 검색 안돼서 포기 
  return (
    <div className="w-full"> 
      <input
        type="text"
        value={searchtext}
        onChange={(e) => {
          setSearchtext(e.target.value);
        }}
        className="w-full h-[90px] relative rounded border-2 border-[#b1b2ff]"
      />
    </div>
  );
}
