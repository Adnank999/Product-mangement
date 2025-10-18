import { LoginForm } from "../components/loginpage/login-form";
import PlasmaGlobe from "../components/globe";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-black text-primary-foreground dark:text-foreground items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-balance">Login to Shape Your Future</h1>
       
        </div>

        {/* Decorative element */}
        
         {/* <div className="">
          <PlasmaGlobe
            speed={1.2}
            intensity={0.5}
          />
         </div> */}
          
        
      </div>
    </div>
  )
}
