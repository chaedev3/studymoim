import NavBarRouter from "./NavBarRouter";
import { Link } from "react-router-dom";
import BellIcon from "./BellIcon";
import MailIcon from "./MailIcon";

/** @function 로그인된상태네비게이션바 */
export default function NavBarLogIn() {
  return (
    <div className="flex justify-between items-center w-full gap-[616px] bg-white">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[15px]">
        <NavBarRouter />
      </div>
      <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-[360px] relative gap-[26px]">
        {/* TODO: 알림모달? 드랍박스? 기능넣고, 필요한 화면 추가 */}
        <BellIcon />
        <Link to="/mail">
          <MailIcon />
        </Link>
        <Link to="/mypage">
          <button
            className="text-[11px] text-white px-3.5 py-[11px] rounded-[14px] bg-[#f0db4f] hover:bg-[#ebd43c] hover:scale-90"
            style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
          >
            MyPage
          </button>
        </Link>
        {/* TODO: 로그아웃 버튼 따로 만들고 기능넣기 */}
        <button
          className="px-3.5 py-[11px] rounded-[14px] text-[11px] text-white bg-[#ff7262] hover:bg-[#ff5441] hover:scale-90"
          style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
