<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>班级联络成员统计</title>
<link rel="stylesheet" href="bootstrap/css/bootstrap.css">
<style>
.addTable{margin: 50px auto 20px; width: 500px; }
.addTable td{height: 40px;}
.addTable tr td:first-child{text-align: right; padding-right: 15px;}
.addTable tr input[type="text"]{ line-height: 24px; padding: 2px; width: 300px;}
.ipt100{width: 100px;}
.ipt150{width: 150px;}
.ipt50{width: 50px;}
.tableList{width: 80%;margin: 0 auto;}
.tableList th{text-align: center;}
</style>
<script></script>
</head>
<body>
<form action="">
	<table class="addTable">
		<!-- <tr>
			<th>序号</th>
			<th>姓名</th>
			<th>入学时间</th>
			<th>学制</th>
			<th>现所在地区（市、县）</th>
			<th>工作单位</th>
			<th>职务/职称</th>
			<th>联系方式</th>
			<th>邮箱</th>
		</tr> -->
		<tr>
			<td width="35%"><span>姓名</span></td>
			<td width="65%"><input type="text"></td>
		</tr>
		<tr>
			<td><span>现所在地区（市、县）</span></td>
			<td><input type="text"></td>
		</tr>
		<tr>
			<td><span>工作单位</span></td>
			<td><input type="text"></td>
		</tr>
		<tr>
			<td><span>职务/职称</span></td>
			<td><input type="text"></td>
		</tr>
		<tr>
			<td><span>联系方式</span></td>
			<td><input type="text"></td>
		</tr>
		<tr>
			<td><span>邮箱</span></td>
			<td><input type="text"></td>
		</tr>
	</table>
	<p class="text-center" style="margin-bottom: 20px;">
		<input type="submit" value="提交" style="margin-right: 50px;">
		<input type="reset" value="重置">
	</p>
</form>

<table class="tableList table text-center">
	<tr>
		<th>序号</th>
		<th>姓名</th>
		<th>入学时间</th>
		<th>学制</th>
		<th>现所在地区（市、县）</th>
		<th>工作单位</th>
		<th>职务/职称</th>
		<th>联系方式</th>
		<th>邮箱</th>
		<th>修改</th>
	</tr>
	<tr>
		<td>1</td>
		<td class="name">张洪良</td>
		<td>2004</td>
		<td>4</td>
		<td>北京市朝阳区光华路汉威大厦</td>
		<td>中金在线北京分公司</td>
		<td>web前端开发</td>
		<td>18810005749</td>
		<td>hongliang40@163.com</td>
		<td><a href="javascript:;">修改</a></td>
	</tr>
</table>

</body>
</html>
<script>

</script>