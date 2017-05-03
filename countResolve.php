<?php

	$filename="count.txt";

	$handle=fopen($filename,"a+");

	$name = $_POST['name'];
	$area = $_POST['area'];
	$company = $_POST['company'];
	$zhicheng = $_POST['zhicheng'];
	$mobile = $_POST['mobile'];
	$email = $_POST['email'];

	$str = $name."  ".$area."  ".$company."  ".$zhicheng." ".$mobile."  ".$email."  "."\r\n";

	$ffstr=fwrite($handle,$str);

	if($ffstr && isset($name)){
		/*echo "<script>alert('添加成功')</script>";
		$name = '';
		$area = '';
		$company = '';
		$zhicheng = '';
		$mobile = '';
		$email = '';*/
		echo "1";
	}

	

	fclose($handle);
	//echo $_POST['name'];



?>