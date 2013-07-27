<?php
if(!session_id()){
    session_start();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, font, img, ins, kbd, q, s, samp, small, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, p {
	border: 0 none;
	font-family: '微软雅黑', Arial, sans-serif;
	font-size: 100%;
	font-style: inherit;
	font-weight: inherit;
	margin: 0;
	outline: 0 none;
	padding: 0;
	vertical-align: baseline;
}
</style>
</head>
<body>
<span style="color:green;font-size:11px;" id="footer">
当前登陆用户：<img src="/admin/extjs/resources/images/user.png"/>
<?php
echo isset($_SESSION['user_username'])?$_SESSION['user_username'].'&nbsp;&nbsp;<a href="#" onclick="logout()" id="logout">退出</a>':'游客';
?>
</span>
<script type="text/javascript">
function logout(){
	top.location.href = '/index.php/login/logout';
}
</script>
</body>
</html>