export default function RecommendBanner() {
  return (
    <div className="flex justify-start items-start bg-[#ebefff]">
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[648px] w-[720px] relative gap-[45px] pl-[150px] pr-[30px] py-[30px]">
        <p className="flex-grow-0 flex-shrink-0 w-[720px] text-[82px] font-bold text-left">
          <span className="flex-grow-0 flex-shrink-0 w-[720px] text-[82px] font-bold text-left text-[#a259ff]">
            싸피킴
          </span>
          <span className="flex-grow-0 flex-shrink-0 w-[720px] text-[82px] font-bold text-left text-black">
            님과{" "}
          </span>
          <br />
          <span className="flex-grow-0 flex-shrink-0 w-[720px] text-[82px] font-bold text-left text-black">
            딱 맞는 강좌
          </span>
        </p>
        <p className="flex-grow-0 flex-shrink-0 w-[720px] text-left text-[#58595d]">
          <span className="flex-grow-0 flex-shrink-0 w-[720px] text-2xl font-bold text-left text-[#58595d]">
            React 2022 개정판{" "}
          </span>
          <br />
          <span className="flex-grow-0 flex-shrink-0 w-[720px] text-xl text-left text-[#58595d]">
            생활코딩{" "}
          </span>
        </p>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[720px] gap-10 pr-[349.1875px]">
          <div
            className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative pl-[65px] pr-[66.046875px] py-[22px] rounded-[15px] bg-[#ff7262] border-2 border-[#2e2f35]"
            style={{ boxShadow: "3px 3px 0px 0 #2e2f35" }}
          >
            <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-center uppercase text-white">
              강좌 들으러 가기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
