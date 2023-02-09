import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import StudySearch from "../components/studypages/StudySearch";
import { useState, useEffect } from "react";
import userInfo from "../zustand/store";
import LoginModal from "../components/NavBar/LoginModal";

export default function StudyRecruitMainPage() {
  const [showModal, setShowModal] = useState(false);

  function closeModalHandler() {
    setShowModal(false);
  }

  const { info } = userInfo();
  useEffect(() => {
    if (!info) {
      alert("로그인이 필요합니다.");
      setShowModal(true);
      return;
    }
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 bg-white my-[50px]">
        <div className="flex flex-row justify-between w-full border-b">
        <p className="text-[18px] font-bold">
          모집 중인 스터디
        </p>
          <Link to="/study/study_recruit_form">
            <div className="flex justify-center items-center w-[200px] h-[36px] rounded-tl-[15px] rounded-tr-[15px] bg-[#b1b2ff] text-[14px] text-center text-white cursor-pointer hover:bg-[#8871f9]">
              <FontAwesomeIcon icon={faPenToSquare} /> 스터디 만들기
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-start items-start">
          <StudySearch />
        </div>
      </div>
      {showModal ? (
        <LoginModal
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
        />
      ) : null}
    </>
  );
}
