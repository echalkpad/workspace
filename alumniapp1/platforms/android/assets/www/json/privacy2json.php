<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
$sql="SELECT * FROM member_attribute left join attr_map on attr_map.aid = member_attribute.id left join (select id,student_id from member where student_id='".$_POST['student_id']."') member on attr_map.mid = member.id where student_id='".$_POST['student_id']."'";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>


