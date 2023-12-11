<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getList() {
        $data = [
            ['id' => 1, 'name' => 'Коти'],
            ['id' => 2, 'name' => 'Собачка'],
            ['id' => 3, 'name' => 'Мишка'],
        ];
        return response()->json($data)
            ->header('Content-Type', 'application/json; charset=utf-8');
    }
}
