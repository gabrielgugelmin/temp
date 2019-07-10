<?php
	
header('Content-type: application/json');

/**
 * Include e Riquire CMS
 */
require_once('../../application/include_dao.php');

//start new transaction
$transaction = new Transaction();

$blog = new blog();

$blog = DAOFactory::getBlogDAO()->relTable(' SELECT *,b.alias as alias
													FROM blog b 
													INNER JOIN blogCategoria c ON (b.idBlogCategoria=c.idBlogCategoria) 
													WHERE b.status=1 ');



for($j=0;$j<count($blog);$j++){
	
	$data[] = array('value'=>$blog[$j]->titulo,'data'=>$blog[$j]->texto,'link'=>$blog[$j]->alias);
	
}

echo json_encode($data);

//commit transaction
$transaction->commit();


	
?>