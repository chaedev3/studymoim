import CourseBanner from "../components/coursedetail/CourseBanner";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import LectureShort from "../components/coursedetail/LectureShort";
import StudyShort from "../components/coursedetail/StudyShort";
import CourseQuestion from "../components/coursedetail/CourseQuestion";
import NavPagination from "../components/NavBar/NavPagination.jsx";
import questions from "../zustand/questions.js";

export default function CourseDetailRoot() {
  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;
  const props = useLocation().state.propData;
  const [currentClick, setCurrentClick] = useState("curriculum");
  const [prevClick, setPrevClick] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [word, setWord] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState("new");
  const [page, setPage] = useState(null);
  const [dataForBanner, setDataForBanner] = useState({
    courseId: props.course_id,
    title: props.title,
    thumbnail: props.thumbnail,
    courseProvider: props.courseProviderName,
    totalTime: 0,
    totalLecture: 0,
    likeUserCount: props.likeUserCount,
  });
  const [params, setParams] = useState({
    "key": "title",
    "word": "",
    "page": 0,
    "size": 10
  });

  useEffect(() => {
    updateBannerLecture();
  }, [])

  useEffect(() => {
    const getPage = async (url) => {
      let query = Object.keys(params)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
          .join('&');
      if(currentClick == 'curriculum') {}
      else if(currentClick == 'study') query = query + '&creationTime,desc'
      else if(currentClick == 'community') query = query + '&publishTime,desc'
      console.log(`${url}?${query}`);
      let resp = await fetch(`${url}?${query}`)
      let data = await resp.json()
      setPage(data);
      console.log(data);
    };
    if(currentClick=='curriculum'){
      getPage(`http://${API_SERVER}/api/v1/lecture/${props.course_id}`);
    }
    if(currentClick=='study') {
      getPage(`http://${API_SERVER}/api/v1/course/${props.course_id}/study_list`);
    }
    if(currentClick=='community') {
      getPage(`http://${API_SERVER}/api/v1/articles/question/course/${props.course_id}`);
    }
  }, [params]);

  const updateBannerLecture = async () => {
    let resp = await fetch(`http://${API_SERVER}/api/v1/lecture/${props.course_id}?page=0&size=10000`);
    let data = await resp.json();
    let tot = 0;
    data.content.forEach((lecture) => {
      tot += lecture.length;
    });
    console.log(data.content.length)
    console.log(tot)
    setDataForBanner({
      courseId: props.course_id,
      title: props.title,
      thumbnail: props.thumbnail,
      courseProvider: props.courseProviderName,
      totalTime: tot,
      totalLecture: data.content.length,
      likeUserCount: props.likeUserCount,
    });
  };
  // const studyInThisCourse = useFetch(
  //   `http://${API_SERVER}/api/v1/course/${props.course_id}/study_list`
  // );
  //
  // const questionInThisCourse = useFetch(
  //   `http://${API_SERVER}/api/v1/articles/question/course/${props.course_id}`
  // );

  // 누르면 전체/강의/자유 색이 바뀜
  const GetClick = (event) => {
    setCurrentClick(event.target.id);
  };

  useEffect((e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.backgroundColor = "#8871f9";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.backgroundColor = "#ad9dfe";
      }
      setPrevClick(currentClick);
      setParams({
        "key": "title",
        "word": "",
        "page": 0,
        "size": 10
      });
    },
    [currentClick]
  );

  useEffect(() => {
    const getParams = () => {
      setParams({
        "key": "title",
        "word": word,
        "page": currentPage-1,
        "size": 10
      })
    }
    getParams();
  }, [word, currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-row gap-5 my-[30px]">
      <div className="w-[35%] mt-[40px]">
        <CourseBanner dataForBanner={dataForBanner} />
      </div>
      {/* 네비게이션 */}
      <div className="w-[65%]">
        <div className="w-full flex">
          <div
            id="curriculum"
            onClick={GetClick}
            className="flex justify-center items-center w-[100px] h-[40px] rounded-tl-[15px] rounded-tr-[15px] bg-[#ad9dfe] border-0 text-[18px] font-bold text-center text-white cursor-pointer"
          >
            커리큘럼
          </div>
          <div
            id="study"
            onClick={GetClick}
            className="flex justify-center items-center w-[100px] h-[40px] rounded-tl-[15px] rounded-tr-[15px] bg-[#ad9dfe] border-0 text-[18px] font-bold text-center text-white cursor-pointer"
          >
            스터디
          </div>
          <div
            id="community"
            onClick={GetClick}
            className="flex justify-center items-center w-[100px] h-[40px] rounded-tl-[15px] rounded-tr-[15px] bg-[#ad9dfe] border-0 text-[18px] font-bold text-center text-white cursor-pointer"
          >
            커뮤니티
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full h-fit border-t border-gray-200 overflow-auto">
          {currentClick === "curriculum" ? (
            <div className="w-full flex flex-col justify-center items-center gap-[15px] p-3">
              {page ? page.content.map((lecture, idx) => (
                <LectureShort
                  key={lecture.lectureId}
                  propData={lecture}
                  lectureIndex={idx + 1}
                  courseId={props.course_id}
                />
              )) : null}
            </div>
          ) : null}
          {currentClick === "study" ? (
            <div className="w-full flex flex-col justify-center items-center gap-[15px] p-3">
              {page ? page.content.map((study, idx) => (
                <StudyShort
                  key={study.studyId}
                  propData={study}
                  studyIndex={idx + 1}
                />
              )) : null}
            </div>
          ) : null}
          {currentClick === "community" ? (
            <div className="w-full flex flex-col justify-center items-center gap-[15px] p-3">
              {page ? page.content.map((question, idx) => (
                <CourseQuestion
                  key={question.questionBoardId}
                  propData={question}
                  courseId={props.course_id}
                  questionIndex={idx + 1}
                />
              )) : null}
            </div>
          ) : null}
        </div>
        <NavPagination
            firstLabel="처음"
            lastLabel="마지막"
            breakLabel="..."
            onPageChange={setCurrentPage}
            pageCount={page ? page.totalPages : 0}
            pageRangeDisplayed={5}
        />
      </div>
    </div>
  );
}
