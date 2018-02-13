import React from 'react'
import ReactDOM from 'react-dom'
 
import SocialButton from '../functions/socialButton';

class SocialLogin extends React.Component{
    handleSocialLogin = (user) => {
        console.log("ahhhhh",err);        
        console.log(user)
      }
       
    handleSocialLoginFailure = (err) => {
        console.log("sikkkk",err);
        console.error("kirrrr",err)
      }
    render=()=>{
        return (
        <div>
            <SocialButton
              provider='facebook'
              appId='YOUR_APP_ID'
              onLoginSuccess={this.handleSocialLogin}
              onLoginFailure={this.handleSocialLoginFailure}
            >
              Login with Facebook
            </SocialButton>
        </div>
        );
    }
}

export default SocialLogin;
 
 
// ReactDOM.render(
//   <div>
//     <SocialButton
//       provider='facebook'
//       appId='YOUR_APP_ID'
//       onLoginSuccess={handleSocialLogin}
//       onLoginFailure={handleSocialLoginFailure}
//     >
//       Login with Facebook
//     </SocialButton>
//   </div>
//   ,
//   document.getElementById('app')
// 