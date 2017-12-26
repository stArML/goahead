var jsonrpc;
var langAll=0;
onload=function(){
   jsonrpc=new JSONRpcClient("/json-rpc");
   //var lang=jsonrpc.lang.getLangMode();
   l = navigator.language? navigator.language:navigator.systemLanguage;
   if ((l=="zh-cn") || (l=="zh-CN"))
   {
      langAll=0;
   }
   else
   {
      langAll=1;
   }
   if(langAll==0)
   {//中文
      document.getElementById("username_txt").innerHTML="用户名";
      document.getElementById("password_txt").innerHTML="密  码";
      document.getElementById("login_image").src="images/bgimages/Login_cn.gif";
      document.getElementById("lang_image").src="images/bgimages/lang_en.jpg";
   }
   else
   {
      document.getElementById("username_txt").innerHTML="UserName";
      document.getElementById("password_txt").innerHTML="Password";
      document.getElementById("login_image").src="images/bgimages/Login_en.gif";
      document.getElementById("lang_image").src="images/bgimages/lang_cn.jpg";
   }
}

function langSubmit()
{
   if (langAll==0)
   {//现在是中文,变成英文
      langAll=1;
      document.getElementById("username_txt").innerHTML="UserName";
      document.getElementById("password_txt").innerHTML="Password";
      document.getElementById("login_image").src="images/bgimages/Login_en.gif";
      document.getElementById("lang_image").src="images/bgimages/lang_cn.jpg";
   }
   else
   {//现在是英文,变成中文
      langAll=0;
      document.getElementById("username_txt").innerHTML="用户名";
      document.getElementById("password_txt").innerHTML="密  码";
      document.getElementById("login_image").src="images/bgimages/Login_cn.gif";
      document.getElementById("lang_image").src="images/bgimages/lang_en.jpg";
   }
   jsonrpc.lang.setLangMode({"mode":langAll});
}

function loginSubmit()
{
   var username=document.getElementById("username_input").value;
   var passwd=document.getElementById("passwd_input").value;
   if (!username)
   {//用户名是空
      document.getElementById("name_table").style.border="1px solid red";
   }
   
   if (!passwd)
   {//密码是空
      document.getElementById("passwd_table").style.border="1px solid red";
   }

   if ((!username) || (!passwd))
   {
      if (langAll==0)
      {//中文
         document.getElementById("errormsg").innerHTML="输入不能为空2333!";
      }
      else
      {
         document.getElementById("errormsg").innerHTML="Empty input is invalid!";
      }
   } 
   else
   {
   	  document.getElementById("name_table").style.border="";
      document.getElementById("passwd_table").style.border="";
      document.getElementById("errormsg").innerHTML="";
       var res=jsonrpc.login.judge({"name":username, "passwd":passwd});
       if (res.flag==-1)
       {//用户不存在
           if (langAll==0)
           {//中文
              document.getElementById("errormsg").innerHTML="用户不存在!";
           }
           else
           {
              document.getElementById("errormsg").innerHTML="User does not exist!";
           }
       }
       else if (res.flag==-2)
       {//输入密码错误
           if (langAll==0)
           {//中文
              document.getElementById("errormsg").innerHTML="输入密码错误!";
           }
           else
           {
              document.getElementById("errormsg").innerHTML="Password is wrong!";
           }
       }
       else 
       {//登录成功
          window.location="work.html";
       }
   }
}
