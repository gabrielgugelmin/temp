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



/*
for($j=0;$j<count($blog);$j++){
	
	$data[] = array('value'=>$blog[$j]->idMarca.' - '.$blog[$j]->modelo,'data'=>$blog[$j]->tags,'link'=>$blog[$j]->alias.'/'.$blog[$j]->idblog);
	
}
*/

echo json_encode($blog);

//commit transaction
$transaction->commit();


	
?>