// TODO: 이 화면은 로그인된 애는 못오게 해야함

export default function LogInMainRoot() {
  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;
  const REDIRECT_URI = `http://${API_SERVER}/api/v1/oauth/login`;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI;  
  }; 
  return (
    <div className="max-w-6xl mx-auto px-4 mb-5">
      <div className="flex flex-col justify-start items-center relative gap-[60px]">
        <img
          src="/logo.png"
          className="flex-grow-0 flex-shrink-0 w-[495px] h-[271px] object-cover mb-10"
        />
        
        <button onClick={handleLogin} className="hover:scale-95">
          <img src="data:image/png;base64,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" alt="" />
        </button>
      </div>
    </div>
  );
}
