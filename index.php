<?php global $pdo; ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Головна сторінка</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . "/_header.php";
    include $_SERVER['DOCUMENT_ROOT'] . "/config/connection_database.php";
    ?>

    <?php
    $n = 2;
    $list=array();
    $list[0]=[
        "id"=>1,
        "image"=>"https://content.rozetka.com.ua/goods/images/big/334492324.jpg",
        "name"=>"Ноутбук Lenovo IdeaPad Slim 5 16IAH8"
    ];
    $list[1]=[
        "id"=>2,
        "image"=>"https://content1.rozetka.com.ua/goods/images/big/380187733.jpg",
        "name"=>"Ноутбук Dell Latitude 5340"
    ];

    ?>

    <h1 class="text-center">Категорії</h1>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <?php
        // Select query
        $sql = "SELECT id, name, image, description FROM categories";
        $stmt = $pdo->query($sql);
        // Fetch the results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($results as $row) {
            $id=$row['id'];
            $image=$row['image'];
            $description=$row['image'];
            $name=$row['name'];
            echo "
            <tr>
                <th scope='row'>$id</th>
                <td><img src='$image' alt='Фото' width='100'></td>
                <td>$name</td>
                <td>
                    <a href='#' class='btn btn-danger'>delete</a>
                </td>
            </tr>
            ";
        }
        ?>
        </tbody>
    </table>
</div>
<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>
